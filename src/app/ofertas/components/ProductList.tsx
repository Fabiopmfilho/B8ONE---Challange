"use client";

import { useEffect, useState, useCallback } from "react";
import { Product } from "@/app/types/Product";
import { FilterOptions } from "@/app/types/FilterOptions";
import FilterComponent from "./Filter";
import ProductDisplay from "./ProductDisplay";
import Pagination from "./Pagination";
import ResultsSummary from "./ResultsSummary";
import ViewModeToggle from "./ViewModeToggle";
import { ProductCardSkeletonGrid, ProductCardSkeletonList } from "./Skeleton";

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const itemsPerPage = 6;

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

  const handleFiltersChange = useCallback(
    (filters: FilterOptions) => {
      let filtered = products;

      if (filters.category) {
        filtered = filtered.filter(
          (product) => product.category === filters.category
        );
      }

      filtered = filtered.filter((product) => {
        return (
          product.price >= (filters.minPrice ?? 0) &&
          product.price <= (filters.maxPrice ?? Infinity)
        );
      });

      setFilteredProducts(filtered);
      setCurrentPage(1);
    },
    [products]
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    if (page !== currentPage && page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-[16rem_1fr] gap-6">
          <div className="md:order-none md:sticky md:top-6 h-fit">
            <ProductCardSkeletonGrid />
          </div>
          <div>
            <div className="flex justify-between items-center mb-6">
              <div className="h-6 bg-gray-200 rounded w-1/3 animate-pulse"></div>
              <div className="flex gap-2">
                <div className="h-10 w-10 bg-gray-200 rounded-md animate-pulse"></div>
                <div className="h-10 w-10 bg-gray-200 rounded-md animate-pulse"></div>
              </div>
            </div>
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: itemsPerPage }).map((_, index) => (
                  <ProductCardSkeletonGrid key={`skeleton-grid-${index}`} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {Array.from({ length: itemsPerPage }).map((_, index) => (
                  <ProductCardSkeletonList key={`skeleton-list-${index}`} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
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
          <div className="flex justify-between items-center mb-6">
            <ResultsSummary
              startIndex={startIndex}
              endIndex={endIndex}
              totalItems={filteredProducts.length}
            />
            <ViewModeToggle
              viewMode={viewMode}
              onViewModeChange={setViewMode}
            />
          </div>

          {currentProducts.length > 0 ? (
            <ProductDisplay
              products={currentProducts}
              viewMode={viewMode}
              currentPage={currentPage}
            />
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl text-gray-300 mb-4">🔍</div>
              <p className="text-gray-500 text-lg font-medium">
                Nenhum produto encontrado
              </p>
            </div>
          )}

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
