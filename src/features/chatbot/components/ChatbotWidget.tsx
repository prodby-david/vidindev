"use client";

import { motion, AnimatePresence } from "motion/react";
import { useChatbot } from "../hooks/useChatbot";
import ChatbotLauncher from "./ChatbotLauncher";
import ChatbotHeader from "./ChatbotHeader";
import ChatbotMessageList from "./ChatbotMessageList";
import ChatbotInput from "./ChatbotInput";

export default function ChatbotWidget() {
  const {
    isOpen,
    toggleOpen,
    closeChat,
    messages,
    inputValue,
    setInputValue,
    isTyping,
    messagesEndRef,
    sendMessage,
    handleSubmit,
  } = useChatbot();

  return (
    <>
      {!isOpen && <ChatbotLauncher isOpen={isOpen} onToggle={toggleOpen} />}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.99 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.99 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-0 z-50 flex flex-col h-dvh max-h-dvh bg-warm/95 dark:bg-warm/95 backdrop-blur-md text-deep-ocean overflow-hidden"
          >
            <ChatbotHeader onClose={closeChat} />
            <ChatbotMessageList
              messages={messages}
              isTyping={isTyping}
              messagesEndRef={messagesEndRef}
              onQuickPrompt={sendMessage}
            />
            <ChatbotInput
              inputValue={inputValue}
              onChange={setInputValue}
              onSubmit={handleSubmit}
              isDisabled={isTyping}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
