"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { ChatMessage } from "../chatbot.types";
import { CHATBOT_INITIAL_MESSAGES } from "../constants";
import { getBotReply } from "../chatbot.utils";

export function useChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(
    CHATBOT_INITIAL_MESSAGES,
  );
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messageCounterRef = useRef(0);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping, scrollToBottom]);

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const closeChat = useCallback(() => {
    setIsOpen(false);
  }, []);

  const sendMessage = useCallback(
    (textToSend?: string) => {
      const query = (textToSend || inputValue).trim();
      if (!query) return;

      messageCounterRef.current += 1;
      const userMessage: ChatMessage = {
        id: `user-${messageCounterRef.current}`,
        sender: "user",
        text: query,
        timestamp: "Just now",
      };

      setMessages((prev) => [...prev, userMessage]);
      setInputValue("");
      setIsTyping(true);

      setTimeout(() => {
        messageCounterRef.current += 1;
        const botResponse = getBotReply(query);
        const botMessage: ChatMessage = {
          id: `bot-${messageCounterRef.current}`,
          sender: "bot",
          text: botResponse,
          timestamp: "Just now",
        };
        setMessages((prev) => [...prev, botMessage]);
        setIsTyping(false);
      }, 450);
    },
    [inputValue],
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      sendMessage();
    },
    [sendMessage],
  );

  return {
    isOpen,
    setIsOpen,
    toggleOpen,
    closeChat,
    messages,
    inputValue,
    setInputValue,
    isTyping,
    messagesEndRef,
    sendMessage,
    handleSubmit,
  };
}
