"use client";

import { useEffect, useState } from "react";
import { Product } from "@/app/types/Product";
import { FilterOptions } from "@/app/types/FilterOptions";
import FilterComponent from "./Filter";
import ProductCardList from "./ProductCardList";
import ProductCardGrid from "./ProductCardGrid";

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products", {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Error trying to load products");
        }

        const data: Product[] = await response.json();
        setProducts(data);
        setFilteredProducts(data);

        const uniqueCategories = Array.from(
          new Set(
            data.map((product) => product.category ?? "Outros").filter(Boolean)
          )
        );

        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleFiltersChange = (filters: FilterOptions) => {
    let filtered = products;

    if (filters.category) {
      filtered = filtered.filter(
        (product) => product.category === filters.category
      );
    }

    filtered = filtered.filter((product) => {
      return (
        product.price >= filters.minPrice && product.price <= filters.maxPrice
      );
    });

    setFilteredProducts(filtered);
  };

  if (loading) {
    return <div className="text-center">Carregando produtos...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 md:grid-cols-[16rem_1fr] gap-6">
        <div className="md:order-none md:sticky md:top-6 h-fit">
          <FilterComponent
            onFiltersChange={handleFiltersChange}
            categories={categories}
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-4">
            <p className="text-gray-600">
              Mostrando {filteredProducts.length} de {products.length} produtos
            </p>

            <div className="flex gap-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`px-3 py-1 rounded-md border ${
                  viewMode === "grid"
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-white text-gray-700 border-gray-300"
                }`}
              >
                🔲
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`px-3 py-1 rounded-md border ${
                  viewMode === "list"
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-white text-gray-700 border-gray-300"
                }`}
              >
                📋
              </button>
            </div>
          </div>

          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id}>
                  <ProductCardGrid key={product.id} product={product} />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {filteredProducts.map((product) => (
                <div key={product.id}>
                  <ProductCardList key={product.id} product={product} />
                </div>
              ))}
            </div>
          )}

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                Nenhum produto encontrado com os filtros aplicados.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
