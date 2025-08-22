import { FilterOptions } from "@/app/types/FilterOptions";
import { useEffect, useState } from "react";

type ProductFiltersProps = {
  onFiltersChange: (filters: FilterOptions) => void;
  categories: string[];
};

const FilterComponent = ({
  onFiltersChange,
  categories,
}: ProductFiltersProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");

  useEffect(() => {
    onFiltersChange({
      category: selectedCategory,
      minPrice: minPrice ? Number(minPrice) : 0,
      maxPrice: maxPrice ? Number(maxPrice) : 1000,
    });
  }, [selectedCategory, minPrice, maxPrice, onFiltersChange]);

  const clearFilters = () => {
    setSelectedCategory("");
    setMinPrice("");
    setMaxPrice("");
  };

  return (
    <div className="bg-gray-50 p-6 rounded-lg mb-6">
      <h2 className="text-xl font-semibold mb-4">Filtros</h2>

      <div className="flex flex-row md:flex-col gap-4">
        <div className="flex-1 flex flex-col justify-between">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Categoria
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full h-10 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Todas as categorias</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preço Mínimo (R$)
          </label>
          <input
            type="number"
            value={minPrice}
            placeholder="0"
            onChange={(e) => setMinPrice(e.target.value)}
            min="0"
            step="0.01"
            className="w-full h-10 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preço Máximo (R$)
          </label>
          <input
            type="number"
            value={maxPrice}
            placeholder="1000"
            onChange={(e) => setMaxPrice(e.target.value)}
            min="0"
            step="0.01"
            className="w-full h-10 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="flex gap-3 mt-4">
        <button
          onClick={clearFilters}
          className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
        >
          Limpar Filtros
        </button>
      </div>
    </div>
  );
};

export default FilterComponent;
