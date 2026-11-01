"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { ChatMessage } from "../chatbot.types";
import { CHATBOT_INITIAL_MESSAGES } from "../constants/chatbot.constant";

export function useChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>(CHATBOT_INITIAL_MESSAGES);
  const [isTyping, setIsTyping] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) setIsOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, isTyping]);

  const sendMessage = useCallback(
    async (textToSend?: string) => {
      const query = (textToSend || inputVal).trim();
      if (!query || isStreaming) return;

      setInputVal("");

      const formatTime = () =>
        new Intl.DateTimeFormat("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        }).format(new Date());

      const userMsgId = `user-${Date.now()}`;
      const botMsgId = `bot-${Date.now()}`;

      const userMessage: ChatMessage = {
        id: userMsgId,
        sender: "user",
        text: query,
        timestamp: formatTime(),
      };

      const updatedHistory = [...messages, userMessage];
      setMessages(updatedHistory);
      setIsTyping(true);
      setIsStreaming(true);

      const apiMessages = updatedHistory
        .filter((m) => !m.isError)
        .map((m) => ({
          role: m.sender === "user" ? ("user" as const) : ("assistant" as const),
          content: m.text,
        }));

      abortControllerRef.current?.abort();
      const abortController = new AbortController();
      abortControllerRef.current = abortController;

      try {
        const response = await fetch("/api/chatbot", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ messages: apiMessages }),
          signal: abortController.signal,
        });

        if (!response.ok || !response.body) {
          throw new Error("Chatbot API response error.");
        }

        const botPlaceholder: ChatMessage = {
          id: botMsgId,
          sender: "bot",
          text: "",
          timestamp: formatTime(),
        };

        setMessages((prev) => [...prev, botPlaceholder]);
        setIsTyping(false);

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let accumulatedText = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          accumulatedText += decoder.decode(value, { stream: true });
          const currentText = accumulatedText;

          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === botMsgId ? { ...msg, text: currentText } : msg
            )
          );
        }
      } catch (error: unknown) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        setIsTyping(false);
        setMessages((prev) => [
          ...prev.filter((m) => m.id !== botMsgId),
          {
            id: `error-${Date.now()}`,
            sender: "bot",
            text: "Unable to reach me right now. Please try again or email me at johndavidgaspar.dev@gmail.com.",
            timestamp: "",
            isError: true,
          },
        ]);
      } finally {
        setIsStreaming(false);
        setIsTyping(false);
      }
    },
    [inputVal, isStreaming, messages]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage();
  };

  const resetChat = useCallback(() => {
    abortControllerRef.current?.abort();
    setMessages(CHATBOT_INITIAL_MESSAGES);
    setInputVal("");
    setIsTyping(false);
    setIsStreaming(false);
  }, []);

  return {
    isOpen,
    setIsOpen,
    toggleOpen: () => setIsOpen((prev) => !prev),
    closeChat: () => setIsOpen(false),
    resetChat,
    messages,
    inputValue: inputVal,
    setInputValue: setInputVal,
    isTyping,
    messagesEndRef,
    sendMessage,
    handleSubmit,
  };
}
