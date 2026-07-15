import { useState, useEffect } from 'react';
// import productsData from './data/products.json';
import Header from './components/Header';
import Filters from './components/Filters';
import ProductCard from './components/ProductCard';
import Footer from './components/Footer';
import Cart from './components/Cart';
import ProductPage from './components/ProductPage';

export default function App() {
  const [categorias, setCategorias] = useState([]);
  const [precoMin, setPrecoMin] = useState('');
  const [precoMax, setPrecoMax] = useState('');
  const [corSelecionada, setCorSelecionada] = useState('');
  const [apenasEstoque, setApenasEstoque] = useState(false);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const [produtoSelecionado, setProdutoSelecionado] = useState(null);

  const [productsData, setProductsData] = useState([]); // Começa como um array vazio

  useEffect(() => {
    fetch('https://cautious-space-funicular-5vvqxrx46gcp74r-8000.app.github.dev/api/products/') 
      .then(response => response.json())
      .then(data => {
        setProductsData(data); // Salva os produtos do banco de dados no estado
      })
      .catch(error => {
        console.error("Erro ao carregar os produtos:", error);
      });
  }, []);

  const handleAddToCart = (produto, quantidade = 1) => {
    setCartItems(prev => {
      const itemExistente = prev.find(item => item.nome === produto.nome);
      
      if (itemExistente) {
        return prev.map(item =>
          item.nome === produto.nome
            ? { 
                ...item, 
                quantidade: Math.min(item.quantidade + quantidade, item.estoqueOriginal) 
              }
            : item
        );
      }
      
      return [...prev, { 
        ...produto, 
        estoqueOriginal: produto.quantidade, 
        quantidade: quantidade 
      }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (nome, delta) => {
    setCartItems(prev => {
      return prev.map(item => {
        if (item.nome === nome) {
          return { ...item, quantidade: item.quantidade + delta };
        }
        return item;
      }).filter(item => item.quantidade > 0);
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalItemsInCart = cartItems.reduce((acc, item) => acc + item.quantidade, 0);

  const toggleCategoria = (cat) => {
    setCategorias(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const limparFiltros = () => {
    setCategorias([]);
    setPrecoMin('');
    setPrecoMax('');
    setCorSelecionada('');
    setApenasEstoque(false);
  };

  const produtosFiltrados = Array.isArray(productsData) ? productsData.filter(produto => {
    const matchCategoria = categorias.length === 0 || categorias.includes(produto.categoria);
    const matchPrecoMin = precoMin === '' || produto.preco >= Number(precoMin);
    const matchPrecoMax = precoMax === '' || produto.preco <= Number(precoMax);
    const matchCor = corSelecionada === '' || produto.cor === corSelecionada;
    const matchEstoque = !apenasEstoque || produto.em_estoque;
    
    return matchCategoria && matchPrecoMin && matchPrecoMax && matchCor && matchEstoque;
  }) : [];

  return (
    <div className="bg-[#03042C] min-h-screen text-white font-sans relative flex flex-col">
      
      <Header onOpenCart={() => setIsCartOpen(true)} cartCount={totalItemsInCart} />
      
      <main className="flex-grow w-full max-w-7xl mx-auto py-8 px-4 md:px-0">
        
        {produtoSelecionado ? (
          <ProductPage 
            produto={produtoSelecionado} 
            onAddToCart={handleAddToCart} 
            onBack={() => setProdutoSelecionado(null)} 
          />
        ) : (
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-64 flex-shrink-0">
              <Filters 
                categorias={categorias}
                toggleCategoria={toggleCategoria}
                precoMin={precoMin}
                setPrecoMin={setPrecoMin}
                precoMax={precoMax}
                setPrecoMax={setPrecoMax}
                corSelecionada={corSelecionada}
                setCorSelecionada={setCorSelecionada}
                apenasEstoque={apenasEstoque}
                setApenasEstoque={setApenasEstoque}
                limparFiltros={limparFiltros}
              />
            </div>
            <div className="flex-grow">
              <ProductCard 
                produtos={produtosFiltrados} 
                onAddToCart={handleAddToCart} 
                onViewProduct={setProdutoSelecionado} 
              />
            </div>
          </div>
        )}

      </main>

      <Footer />

      <Cart 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        updateQuantity={updateQuantity}
        clearCart={clearCart}
      />
    </div>
  );
}