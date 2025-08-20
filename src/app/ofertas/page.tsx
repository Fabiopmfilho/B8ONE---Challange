import Image from "next/image";
import ProductList from "./components/ProductList";

export default async function OfertasPage() {
  return (
    <main className="p-6 max-w-6xl mx-auto">
      <div className="w-full h-64 relative mb-10">
        <Image
          src="https://images.pexels.com/photos/1488467/pexels-photo-1488467.jpeg"
          alt="Banner"
          fill
          className="object-cover"
          priority
        />
      </div>

      <h1 className="text-3xl font-bold mb-8 text-center">Ofertas</h1>

      <ProductList />
    </main>
  );
}
