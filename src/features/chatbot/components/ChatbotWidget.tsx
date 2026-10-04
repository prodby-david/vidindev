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
    handleSubmit,
  } = useChatbot();

  return (
    <>
      <ChatbotLauncher isOpen={isOpen} onToggle={toggleOpen} />

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed bottom-18 right-4 sm:bottom-20 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[380px] h-[480px] max-h-[calc(100vh-6.5rem)] rounded-md bg-polaroid dark:bg-sand border border-deep-ocean/10 dark:border-horizon/20 shadow-xl flex flex-col overflow-hidden"
          >
            <ChatbotHeader onClose={closeChat} />
            <ChatbotMessageList
              messages={messages}
              isTyping={isTyping}
              messagesEndRef={messagesEndRef}
            />
            <ChatbotInput
              inputValue={inputValue}
              onChange={setInputValue}
              onSubmit={handleSubmit}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
