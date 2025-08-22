export const ProductCardSkeletonGrid = () => {
  return (
    <div className="border border-gray-200 rounded-lg p-4 animate-pulse">
      <div className="w-full h-48 bg-gray-200 rounded-md mb-4"></div>
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
    </div>
  );
};

export const ProductCardSkeletonList = () => {
  return (
    <div className="flex border border-gray-200 rounded-lg p-4 animate-pulse">
      <div className="w-24 h-24 bg-gray-200 rounded-md mr-4"></div>
      <div className="flex-1">
        <div className="h-6 bg-gray-200 rounded w-1/2 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
      </div>
    </div>
  );
};
