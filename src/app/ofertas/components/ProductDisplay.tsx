import { Product } from "@/app/types/Product";
import ProductCardGrid from "./ProductCardGrid";
import ProductCardList from "./ProductCardList";

type ProductDisplayProps = {
  products: Product[];
  viewMode: "grid" | "list";
  currentPage: number;
};

const ProductDisplay = ({
  products,
  viewMode,
  currentPage,
}: ProductDisplayProps) => {
  return (
    <div className="mb-8">
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <div
              key={`product-${currentPage}-${index}-${product.id}`}
              className="relative"
            >
              <ProductCardGrid product={product} />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {products.map((product, index) => (
            <div
              key={`product-list-${currentPage}-${index}-${product.id}`}
              className="relative"
            >
              <ProductCardList product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductDisplay;
