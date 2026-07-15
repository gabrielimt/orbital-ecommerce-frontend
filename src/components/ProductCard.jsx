export default function ProductCard({ produtos, onAddToCart, onViewProduct }) {
  return (
    <section className="products grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4 md:p-8 bg-[#03042C] min-h-screen font-sans">
      {produtos.map((product, index) => (
        <article 
          key={index} 
          className="product_card h-[360px] justify-between flex flex-col bg-[#03042C] border border-[#483ACC]/30 rounded-2xl p-4 transition-all duration-300 hover:shadow-[0_0_15px_rgba(248,151,254,0.15)]"
        >
          <div 
            onClick={() => onViewProduct(product)}
            className="w-full aspect-square overflow-hidden rounded-xl mb-4 relative bg-[#172090]/20 cursor-pointer group"
          >
            <img 
              src={product.imagem} 
              alt={product.nome} 
              className={`w-full h-full object-cover mix-blend-lighten transition-transform duration-500 group-hover:scale-110 ${!product.em_estoque ? 'grayscale opacity-50' : ''}`}
            />

            {!product.em_estoque && (
              <span className="absolute top-3 left-3 bg-[#BC5572] text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-lg z-10 border border-red-400/30">
                Esgotado
              </span>
            )}
          </div>

          <div 
            onClick={() => onViewProduct(product)}
            className="flex flex-col flex-grow cursor-pointer"
          >
            <h3 className="text-white font-semibold text-base leading-tight mb-2 line-clamp-1 hover:text-[#F897FE] transition-colors">
              {product.nome}
            </h3>
            
            <p className="text-[#993FC5] font-bold text-lg mb-4">
              R$ {Number(product.preco).toFixed(2)}
            </p>
          </div>

          <button 
            onClick={() => onAddToCart(product)}
            disabled={!product.em_estoque}
            className={`w-full text-sm font-medium py-2.5 rounded-full transition-colors duration-300 ${
              product.em_estoque 
                ? 'bg-[#935AF0] hover:bg-[#F897FE] text-white' 
                : 'bg-transparent border border-gray-600 text-gray-500 cursor-not-allowed'
            }`}
          >
            {product.em_estoque ? 'Adicionar ao Carrinho' : 'Indisponível'}
          </button>
        </article>
      ))}
    </section>
  );
}