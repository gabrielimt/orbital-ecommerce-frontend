import React from 'react';

export default function Cart({ isOpen, onClose, cartItems = [], updateQuantity, clearCart }) {
  if (!isOpen) return null;

  // CORREÇÃO 1: Convertendo item.preco para Number no reduce
  const totalDoCarrinho = cartItems.reduce((acc, item) => acc + (Number(item.preco) * item.quantidade), 0);

  return (
    <>
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      ></div>

      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-[#03042C] border-l border-[#483ACC]/30 shadow-[0_0_30px_rgba(0,0,0,0.8)] z-50 flex flex-col transform transition-transform duration-300">
        
        <div className="flex items-center justify-between p-6 border-b border-[#483ACC]/30">
          <h2 className="text-xl font-bold text-white tracking-wide">Seu Carrinho</h2>
          <div className="flex items-center gap-4">
            {cartItems.length > 0 && (
              <button
                onClick={clearCart}
                className="text-sm font-medium text-[#BC5572] hover:text-red-400 transition-colors"
              >
                Limpar
              </button>
            )}
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-[#F897FE] transition-colors"
              aria-label="Fechar carrinho"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 space-y-4">
              <svg className="w-16 h-16 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <p>Seu carrinho está vazio, astronauta.</p>
            </div>
          ) : (
            cartItems.map((item, index) => (
              <div key={index} className="flex flex-col gap-3 bg-[#172090]/20 p-4 rounded-lg border border-[#483ACC]/30">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 flex-shrink-0">
                    <img src={item.imagem} alt={item.nome} className="w-full h-full object-cover rounded aspect-square" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-white line-clamp-2">{item.nome}</h3>
                    {/* CORREÇÃO 2: Convertendo item.preco para Number antes do toFixed */}
                    <p className="text-[#F897FE] font-medium mt-1">R$ {Number(item.preco).toFixed(2)}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-[#483ACC]/20">
                  <div className="flex items-center gap-3 bg-[#03042C] rounded-full px-3 py-1 border border-[#483ACC]/50">
                    <button 
                      onClick={() => updateQuantity(item.nome, -1)}
                      className="text-gray-400 hover:text-[#BC5572] transition-colors"
                    >
                      -
                    </button>
                    <span className="text-white text-sm font-medium w-4 text-center">{item.quantidade}</span>
                    <button 
                      onClick={() => updateQuantity(item.nome, 1)}
                      disabled={item.quantidade >= item.estoqueOriginal}
                      className={`transition-colors ${
                        item.quantidade >= item.estoqueOriginal
                          ? 'text-gray-600 cursor-not-allowed'
                          : 'text-[#935AF0] hover:text-[#F897FE]'
                      }`}
                      title={item.quantidade >= item.estoqueOriginal ? "Estoque máximo atingido" : ""}
                    >
                      +
                    </button>
                  </div>
                  <p className="text-xs text-gray-400">
                    {/* CORREÇÃO 3: Convertendo item.preco para Number no Subtotal */}
                    Subtotal: <span className="text-gray-200">R$ {(Number(item.preco) * item.quantidade).toFixed(2)}</span>
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-6 border-t border-[#483ACC]/30 bg-[#03042C]">
          <div className="flex justify-between items-center mb-6 text-white">
            <span className="font-medium text-lg">Total:</span>
            <span className="text-2xl font-bold text-[#F897FE]">
              R$ {totalDoCarrinho.toFixed(2)}
            </span>
          </div>
          <button 
            disabled={cartItems.length === 0}
            className={`w-full font-bold py-3 rounded-full transition-all duration-300 ${
              cartItems.length > 0 
                ? 'bg-[#935AF0] hover:bg-[#F897FE] text-white shadow-[0_0_15px_rgba(147,90,240,0.4)] hover:shadow-[0_0_25px_rgba(248,151,254,0.6)]' 
                : 'bg-transparent border border-[#483ACC]/50 text-gray-500 cursor-not-allowed'
            }`}
          >
            Finalizar Compra
          </button>
        </div>
      </div>
    </>
  );
}