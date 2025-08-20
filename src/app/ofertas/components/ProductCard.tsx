import { Product } from "@/app/types/Product";
import Image from "next/image";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="flex flex-col h-full rounded-xl p-4 shadow hover:shadow-lg transition">
      <div className="flex justify-center items-center mb-4 h-48">
        <Image
          src={product.image}
          alt={product.title}
          width={200}
          height={200}
          className="object-contain h-full w-auto"
        />
      </div>

      <div className="flex-1 flex flex-col">
        <h2 className="text-lg font-medium mb-2 line-clamp-3 flex-grow">
          {product.title}
        </h2>
        <div className="mt-auto">
          <p className="text-xl font-bold text-green-600 mb-4">
            R$ {product.price.toFixed(2)}
          </p>
          <button className="w-full bg-blue-600 text-white py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition">
            Comprar
          </button>
        </div>
      </div>
    </div>
  );
}
