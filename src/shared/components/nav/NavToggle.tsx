import { Menu, X } from "lucide-react";

interface NavToggleProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function NavToggle({ isOpen, onToggle }: NavToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
      className="md:hidden p-2 text-deep-ocean hover:text-ocean focus:outline-none rounded-md transition-colors cursor-pointer"
    >
      {isOpen ? <X size={24} /> : <Menu size={24} />}
    </button>
  );
}
