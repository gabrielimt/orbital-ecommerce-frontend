import React, { useState } from 'react';

export default function ProductPage({ produto, onAddToCart, onBack }) {
  const [quantidadeDesejada, setQuantidadeDesejada] = useState(1);

  if (!produto) return null;

  const esgotado = !produto.em_estoque;

  const handleAdd = () => {
    onAddToCart(produto, quantidadeDesejada);
  };

  return (
    <div className="w-full min-h-[80vh] bg-[#03042C] p-6 md:p-12 text-gray-300">
      <div className="max-w-6xl mx-auto">
        <button 
          onClick={onBack}
          className="mb-8 flex items-center text-sm text-gray-400 hover:text-[#F897FE] transition-colors"
        >
          <span className="mr-2">←</span> Voltar para o catálogo
        </button>

        <div className="flex flex-col md:flex-row gap-12">
          <div className="w-full md:w-1/2">
            <div className={`border border-[#483ACC]/30 rounded-2xl overflow-hidden bg-[#03042C] aspect-square flex items-center justify-center ${esgotado ? 'grayscale opacity-60' : ''}`}>
               <img 
                 src={produto.imagem} 
                 alt={produto.nome} 
                 className="object-cover w-full h-full"
               />
            </div>
          </div>

          <div className="w-full md:w-1/2 flex flex-col justify-center">
            <span className="text-xs uppercase tracking-widest text-[#F897FE] font-semibold mb-3">
              {produto.categoria}
            </span>
            
            <h1 className="text-4xl font-bold text-white mb-4">
              {produto.nome}
            </h1>
            
            <p className="text-3xl font-bold text-[#935AF0] mb-8">
              {/* CORREÇÃO AQUI: Convertendo para Number antes de usar o toFixed */}
              R$ {Number(produto.preco).toFixed(2)}
            </p>

            <div className="mb-8 pb-8 border-b border-[#483ACC]/30">
              <h3 className="text-lg text-white font-semibold mb-2">Sobre o produto</h3>
              <p className="text-gray-400 leading-relaxed">
                {produto.descricao}
              </p>
            </div>

            {esgotado ? (
              <div className="p-4 rounded-xl border border-red-500/50 bg-red-500/10 text-red-400 text-center font-bold uppercase tracking-wide">
                Indisponível no momento
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium text-gray-300">Quantidade:</span>
                  
                  <div className="flex items-center border border-[#483ACC]/50 rounded-lg overflow-hidden bg-gray-900/50">
                    <button 
                      onClick={() => setQuantidadeDesejada(Math.max(1, quantidadeDesejada - 1))}
                      className="px-4 py-2 text-gray-300 hover:bg-[#483ACC]/30 hover:text-[#F897FE] transition-colors"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 font-semibold text-white border-x border-[#483ACC]/50 min-w-[3rem] text-center">
                      {quantidadeDesejada}
                    </span>
                    <button 
                      onClick={() => setQuantidadeDesejada(Math.min(produto.quantidade, quantidadeDesejada + 1))}
                      className="px-4 py-2 text-gray-300 hover:bg-[#483ACC]/30 hover:text-[#F897FE] transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-xs text-[#483ACC]">
                    ({produto.quantidade} em estoque)
                  </span>
                </div>

                <button 
                  onClick={handleAdd}
                  className="w-full py-4 rounded-full bg-[#935AF0] hover:bg-[#F897FE] text-white font-bold text-lg transition-all duration-300 shadow-[0_0_15px_rgba(147,90,240,0.3)] hover:shadow-[0_0_25px_rgba(248,151,254,0.5)] flex justify-center items-center gap-2"
                >
                  Adicionar ao Carrinho
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}