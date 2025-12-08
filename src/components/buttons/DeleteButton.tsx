import {X} from "lucide-react";

interface DeleteButtonProps {
  onClick: () => void;
}

export const DeleteButton = ({onClick}: DeleteButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="p-1 rounded-lg hover:bg-gray-200 transition-colors group"
    >
      <X size={20} className="text-red-500 group-hover:text-red-600" />
    </button>
  );
};
