export default function ChatbotTypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="px-3.5 py-2.5 rounded-md bg-sand/70 dark:bg-sand/20 border border-deep-ocean/10 dark:border-horizon/15 flex items-center gap-1">
        <span className="w-1.5 h-1.5 rounded-full bg-horizon animate-bounce [animation-delay:-0.3s]" />
        <span className="w-1.5 h-1.5 rounded-full bg-horizon animate-bounce [animation-delay:-0.15s]" />
        <span className="w-1.5 h-1.5 rounded-full bg-horizon animate-bounce" />
      </div>
    </div>
  );
}
