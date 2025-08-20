"use client";

import { useEffect, useState } from "react";
import { Product } from "@/app/types/Product";
import ProductCard from "./ProductCard";
import { FilterOptions } from "@/app/types/FilterOptions";
import FilterComponent from "./Filter";

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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
          new Set(data.map((product) => product.category).filter(Boolean))
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
      {/* GRID: 1 coluna no mobile, 2 colunas no desktop */}
      <div className="grid grid-cols-1 md:grid-cols-[16rem_1fr] gap-6">
        {/* FILTRO: em cima no mobile, lateral no desktop */}
        <div className="md:order-none md:sticky md:top-6 h-fit">
          <FilterComponent
            onFiltersChange={handleFiltersChange}
            categories={categories}
          />
        </div>

        {/* PRODUTOS */}
        <div>
          <div className="mb-4">
            <p className="text-gray-600">
              Mostrando {filteredProducts.length} de {products.length} produtos
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

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
