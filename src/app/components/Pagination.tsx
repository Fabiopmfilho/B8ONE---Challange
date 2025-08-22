import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from "lucide-react";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const getVisiblePageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="border-t pt-6 sm:pt-6">
      <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between sm:gap-4">
        <div className="text-xs sm:text-sm text-gray-600 order-2 sm:order-1">
          Página {currentPage} de {totalPages}
        </div>
        <div className="flex items-center gap-1 sm:gap-2 order-1 sm:order-2">
          <button
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
            className="px-3 py-2 text-sm border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 min-w-[44px] h-[40px] flex items-center justify-center"
          >
            <ChevronsLeftIcon size={16} />
          </button>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-2 text-sm border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 h-[40px] flex items-center gap-1"
          >
            <ChevronLeftIcon size={16} />
            <span className="hidden sm:inline">Anterior</span>
          </button>
          <div className="flex gap-1">
            {getVisiblePageNumbers().map((pageNum, index) => (
              <button
                key={`page-btn-${index}`}
                onClick={() =>
                  typeof pageNum === "number" && onPageChange(pageNum)
                }
                disabled={pageNum === "..."}
                className={`px-3 py-2 text-sm rounded-md transition-colors min-w-[40px] h-[40px] flex items-center justify-center ${
                  pageNum === currentPage
                    ? "bg-blue-500 text-white"
                    : pageNum === "..."
                    ? "text-gray-400 cursor-default"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-blue-50 hover:border-blue-300"
                }`}
              >
                {pageNum}
              </button>
            ))}
          </div>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-2 text-sm border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 h-[40px] flex items-center gap-1"
          >
            <span className="hidden sm:inline">Próxima</span>
            <ChevronRightIcon size={16} />
          </button>
          <button
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages}
            className="px-3 py-2 text-sm border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 min-w-[44px] h-[40px] flex items-center justify-center"
          >
            <ChevronsRightIcon size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
