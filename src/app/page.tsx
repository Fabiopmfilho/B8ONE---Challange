export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-2 row-start-2 items-center sm:items-start">
        <h1 className="text-3xl font-bold mb-6">
          Bem-vindo ao Projeto de Vitrine
        </h1>
        <p className="text-gray-700 leading-relaxed mb-4">
          Este projeto foi desenvolvido como um exercício prático para simular
          uma vitrine de produtos online.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          Nele implementei uma página de <strong>Ofertas</strong>, onde é
          exibido produtos com imagem, nome, preço e botão de compra. O foco
          principal foi trabalhar a organização do código, responsividade e uso
          de boas práticas com <strong>Next.js</strong> e{" "}
          <strong>Tailwind CSS</strong>.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Clique em <strong>Ofertas</strong> no menu acima para visualizar a
          vitrine.
        </p>
      </main>
    </div>
  );
}
