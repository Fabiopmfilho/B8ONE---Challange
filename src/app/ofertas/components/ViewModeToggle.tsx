import { LayoutGridIcon, ListIcon } from "lucide-react";

type ViewModeToggleProps = {
  viewMode: "grid" | "list";
  onViewModeChange: (mode: "grid" | "list") => void;
};

const ViewModeToggle = ({
  viewMode,
  onViewModeChange,
}: ViewModeToggleProps) => {
  return (
    <div className="flex gap-2">
      <button
        onClick={() => onViewModeChange("grid")}
        className={`p-2 rounded-md border transition-colors ${
          viewMode === "grid"
            ? "bg-blue-500 text-white border-blue-500"
            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
        }`}
      >
        <LayoutGridIcon size={18} />
      </button>
      <button
        onClick={() => onViewModeChange("list")}
        className={`p-2 rounded-md border transition-colors ${
          viewMode === "list"
            ? "bg-blue-500 text-white border-blue-500"
            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
        }`}
      >
        <ListIcon size={18} />
      </button>
    </div>
  );
};

export default ViewModeToggle;
