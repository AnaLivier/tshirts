const initialTshirts = [
  {
    id: 1, 
    title: 'Blue T-Shirt',
    image: './images/blue-t-shirt.jpg',
    price: 7.99,
    stock: 4
  },
  {
    id: 2, 
    title: 'Bright Purple T-Shirt',
    image: './images/bright-purple-t-shirt.jpg',
    price: 5.99,
    stock: 1
  },
  {
    id: 3, 
    title: 'Cobalt Blue T-Shirt',
    image: './images/cobalt-blue-t-shirt.jpg',
    price: 9.99,
    stock: 5
  },
  {
    id: 4, 
    title: 'Green T-Shirt',
    image: './images/green-t-shirt.jpg',   
    price: 6.99,
    stock: 0
  },
  {
    id: 5, 
    title: 'Grey T-Shirt',
    image: './images/grey-t-shirt.jpg', 
    price: 4.99,
    stock: 2
  },
  {
    id: 6, 
    title: 'Light Green T-Shirt',
    image: './images/light-green-t-shirt.jpg',
    price: 7.99,
    stock: 4
  },
  {
    id: 7, 
    title: 'Purple T-Shirt',
    image: './images/purple-t-shirt.jpg',
    price: 7.99,
    stock: 0
  },
  {
    id: 8, 
    title: 'Red T-Shirt',
    image: './images/red-t-shirt.jpg',
    price: 6.99,
    stock: 3
  },
  {
    id: 9, 
    title: 'Teal T-Shirt',
    image: './images/teal-t-shirt.jpg',
    price: 7.99,
    stock: 2
  }
];

function TShirt({ tshirt, onBuy, onQuantityChange }) {
    

    const quantityOptions = [];
    for (let i = 1; i <= tshirt.stock; i++) {
        quantityOptions.push(<option key={i} value={i}>{i}</option>);
    }

    const handleQuantityChange = (e) => {
        onQuantityChange(tshirt.id, parseInt(e.target.value, 10));
    };
    
    const handleBuyClick = () => {
        onBuy(tshirt.id);
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
            <img 
                src={tshirt.image} 
                alt={tshirt.title} 
                className="w-full h-64 object-cover"
                onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/400x400/cccccc/ffffff?text=Image+Error'; }}
            />
            <div className="p-6 flex flex-col flex-grow">
                <h2 className="text-xl font-bold text-gray-800">{tshirt.title}</h2>
                <p className="text-lg text-gray-600 mt-1">${tshirt.price.toFixed(2)}</p>
                <p className="text-sm text-gray-500 mt-2">
                    {tshirt.stock > 0 ? `${tshirt.stock} in stock` : ''}
                </p>
                
                <div className="mt-auto pt-4">
                    {tshirt.stock > 0 ? (
                        <div className="flex items-center space-x-4">
                            <select 
                                onChange={handleQuantityChange}
                                className="block w-24 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                aria-label="Quantity"
                            >
                                {quantityOptions}
                            </select>
                            <button 
                                onClick={handleBuyClick}
                                className="flex-1 bg-indigo-600 text-white font-bold py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300 ease-in-out"
                            >
                                Buy
                            </button>
                        </div>
                    ) : (
                        <p className="text-center font-bold text-red-500 p-2 bg-red-100 rounded-md">Out of Stock</p>
                    )}
                </div>
            </div>
        </div>
    );
}


function App() {
    const [tshirts, setTshirts] = React.useState(
        initialTshirts.map(shirt => ({ ...shirt, selectedQuantity: 1 }))
    );

    const handleQuantityChange = (tshirtId, newQuantity) => {
        setTshirts(currentTshirts => 
            currentTshirts.map(shirt => 
                shirt.id === tshirtId ? { ...shirt, selectedQuantity: newQuantity } : shirt
            )
        );
    };


    const handleBuy = (tshirtId) => {
        setTshirts(currentTshirts => {
            const newTshirts = currentTshirts.map(shirt => {
                if (shirt.id === tshirtId) {
                    if (shirt.stock >= shirt.selectedQuantity) {                  
                        return { ...shirt, stock: shirt.stock - shirt.selectedQuantity };
                    }
                }
                return shirt;
            });
            return newTshirts;
        });
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-10">T-Shirt Storefront</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {tshirts.map(tshirt => (
                    <TShirt 
                        key={tshirt.id} 
                        tshirt={tshirt}
                        onBuy={handleBuy}
                        onQuantityChange={handleQuantityChange}
                    />
                ))}
            </div>
        </div>
    );
}


const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<App />);
