"use client";

import { useEffect, useState, useCallback } from "react";
import { Product } from "@/app/types/Product";
import { FilterOptions } from "@/app/types/FilterOptions";
import FilterComponent from "./Filter";
import ProductCardList from "./ProductCardList";
import ProductCardGrid from "./ProductCardGrid";
import {
  LayoutGridIcon,
  ListIcon,
  ChevronLeft,
  ChevronRight,
  ChevronsRightIcon,
  ChevronsLeftIcon,
} from "lucide-react";

export default function ProductList() {
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
          product.price >= filters.minPrice && product.price <= filters.maxPrice
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

  const handlePageClick = (page: number) => {
    if (page !== currentPage && page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando produtos...</p>
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
            <div className="text-sm text-gray-600">
              <p>
                Mostrando {currentProducts.length > 0 ? startIndex + 1 : 0} -{" "}
                {Math.min(endIndex, filteredProducts.length)} de{" "}
                {filteredProducts.length} produtos
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-md border transition-colors ${
                  viewMode === "grid"
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                }`}
              >
                <LayoutGridIcon size={18} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-md border transition-colors ${
                  viewMode === "list"
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                }`}
              >
                <ListIcon size={18} />
              </button>
            </div>
          </div>

          {currentProducts.length > 0 ? (
            <div className="mb-8">
              {viewMode === "grid" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentProducts.map((product, index) => (
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
                  {currentProducts.map((product, index) => (
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
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl text-gray-300 mb-4">🔍</div>
              <p className="text-gray-500 text-lg font-medium">
                Nenhum produto encontrado
              </p>
            </div>
          )}

          {totalPages > 1 && (
            <div className="border-t pt-6 sm:pt-6">
              <div className="flex flex-col sm:flex-row items-center gap-3 justify-between">
                <div className="text-sm text-gray-600">
                  Página {currentPage} de {totalPages}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handlePageClick(1)}
                    disabled={currentPage === 1}
                    className="px-3 py-2 text-sm border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    <ChevronsLeftIcon />
                  </button>

                  <button
                    onClick={() => handlePageClick(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-2 text-sm border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 flex items-center gap-1"
                  >
                    <ChevronLeft size={16} />
                    Anterior
                  </button>

                  <div className="flex gap-1">
                    {getVisiblePageNumbers().map((pageNum, index) => (
                      <button
                        key={`page-btn-${index}`}
                        onClick={() =>
                          typeof pageNum === "number"
                            ? handlePageClick(pageNum)
                            : undefined
                        }
                        disabled={pageNum === "..."}
                        className={`px-3 py-2 text-sm rounded-md transition-colors min-w-[40px] ${
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
                    onClick={() => handlePageClick(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-2 text-sm border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 flex items-center gap-1"
                  >
                    Próxima
                    <ChevronRight size={16} />
                  </button>

                  <button
                    onClick={() => handlePageClick(totalPages)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-2 text-sm border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    <ChevronsRightIcon />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
