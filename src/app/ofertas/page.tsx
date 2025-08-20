import Image from "next/image";

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
};

export default async function OfertasPage() {
  const response = await fetch("https://fakestoreapi.com/products?limit=6", {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Falha ao carregar os produtos");
  }

  const products: Product[] = await response.json();

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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex flex-col h-full border rounded-xl p-4 shadow hover:shadow-lg transition"
          >
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
              <h2 className="text-lg font-medium mb-2 line-clamp-2">
                {product.title}
              </h2>
              <p className="text-xl font-bold text-green-600 mb-4">
                R$ {product.price.toFixed(2)}
              </p>
            </div>

            <div className="mt-auto">
              <button className="w-full bg-blue-600 text-white py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition">
                Comprar
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
