import { Product } from "@/app/types/Product";
import ProductCard from "./ProductCard";

export default async function ProductList() {
  const response = await fetch("https://fakestoreapi.com/products?limit=6", {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Falha ao carregar os produtos");
  }

  const products: Product[] = await response.json();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
