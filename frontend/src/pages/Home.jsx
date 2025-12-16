import { useState, useEffect } from 'react';
import { getAllSweets, searchSweets, addSweet, updateSweet, deleteSweet, purchaseSweet } from '../api/sweets.api';
import { useAuth } from '../context/AuthContext';
import SweetModal from '../components/SweetModal';
import OfferBar from '../components/OfferBar';
import PurchaseModal from '../components/PurchaseModal';

function Home() {
    const [sweets, setSweets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { user } = useAuth();

    // Admin Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingSweet, setEditingSweet] = useState(null);
    const [purchaseSweetItem, setPurchaseSweetItem] = useState(null);
    const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('');

    const categories = ['Milk', 'Ghee', 'Dry Fruit', 'Bengali'];

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchSweets();
        }, 500);

        return () => clearTimeout(timer);
    }, [searchTerm, category]);

    const fetchSweets = async (silent = false) => {
        if (!silent) setLoading(true);
        try {
            let data;
            if (searchTerm || category) {
                data = await searchSweets({ name: searchTerm, category: category === 'All' ? '' : category });
            } else {
                data = await getAllSweets();
            }
            setSweets(data);
        } catch (err) {
            setError('Failed to load sweets. Please try again later.');
            console.error(err);
        } finally {
            if (!silent) setLoading(false);
        }
    };

    const handleAdd = () => {
        setEditingSweet(null);
        setIsModalOpen(true);
    };

    const handleEdit = (sweet) => {
        setEditingSweet(sweet);
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this sweet?')) {
            try {
                await deleteSweet(id);
                fetchSweets(); // Refresh list
            } catch (err) {
                alert('Failed to delete sweet');
                console.error(err);
            }
        }
    }

    const handlePurchaseClick = (sweet) => {
        if (!user) {
            alert('Please login to purchase sweets');
            return;
        }
        setPurchaseSweetItem(sweet);
        setIsPurchaseModalOpen(true);
    };

    const handlePurchaseComplete = async (sweetId, quantity) => {
        await purchaseSweet(sweetId, quantity);
        fetchSweets(true); // Silent refresh to keep modal open
    };

const handleModalSubmit = async (formData) => {
    try {
        if (editingSweet) {
            await updateSweet(editingSweet.id, formData);
        } else {
            await addSweet(formData);
        }
        setIsModalOpen(false);
        fetchSweets(); // Refresh list
    } catch (err) {
        alert(err.message || 'Operation failed');
    }
};

if (loading) {
    return (
        <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-maroon"></div>
        </div>
    );
}

if (error) {
    return (
        <div className="text-center py-10">
            <p className="text-red-600 text-lg">{error}</p>
            <button
                onClick={fetchSweets}
                className="mt-4 px-4 py-2 bg-maroon text-white rounded hover:bg-maroon/90"
            >
                Retry
            </button>
        </div>
    );
}

return (
    <div className="relative min-h-screen">
        {/* Background Mandala Animation */}
        <div className="mandala-bg"></div>

        <OfferBar />

        <div className="relative z-10 px-4 py-8 max-w-7xl mx-auto">
            {/* Dashboard Header */}
            <div className="mb-12 text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-maroon mb-4 font-serif">
                    Our <span className="text-gold">Hertiage</span> Collection
                </h1>
                <p className="text-gray-600 max-w-2xl mx-auto text-lg italic">
                    "Experience the royal taste of authentic Indian craftsmanship, perfected since 1995"
                </p>
                <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-6"></div>
            </div>

            {/* Search and Filter Section */}
            <div className="max-w-4xl mx-auto mb-12">
                <div className="flex flex-col md:flex-row gap-4 p-6 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-gold/20 items-center transform transition-all hover:scale-[1.01]">
                    {/* Search Input */}
                    <div className="flex-1 relative w-full">
                        <input
                            type="text"
                            placeholder="Search for sweets..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                        />
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400 absolute left-3 top-2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 5.196 5.196Z" />
                        </svg>
                    </div>

                    {/* Category Dropdown */}
                    <div className="w-full md:w-48">
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent bg-white"
                        >
                            <option value="">All Categories</option>
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    {/* Admin Add Button */}
                    {user?.role === 'ADMIN' && (
                        <button
                            onClick={handleAdd}
                            className="w-full md:w-auto px-6 py-2 bg-maroon text-white font-medium rounded-lg hover:bg-maroon/90 whitespace-nowrap"
                        >
                            + New Sweet
                        </button>
                    )}
                </div>
            </div>

            {/* Sweets Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sweets.map((sweet) => (
                    <div
                        key={sweet.id}
                        className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 border-t-4 border-gold overflow-hidden"
                    >
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <span className="inline-block px-2 py-1 text-xs font-semibold text-saffron bg-orange-50 rounded-full mb-2 uppercase tracking-wide">
                                        {sweet.category}
                                    </span>
                                    <h3 className="text-xl font-bold text-maroon leading-tight">
                                        {sweet.name}
                                    </h3>
                                </div>
                                <div className="text-right">
                                    <p className="text-lg font-bold text-gray-800">
                                        ₹{sweet.price}
                                    </p>
                                    <p className="text-xs text-gray-500">per piece</p>
                                </div>
                            </div>

                            <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                                <div className={`flex items-center space-x-2 ${sweet.quantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                    <span className={`h-2.5 w-2.5 rounded-full ${sweet.quantity > 0 ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                    <span className="text-sm font-medium">
                                        {sweet.quantity > 0 ? `${sweet.quantity} in stock` : 'Out of Stock'}
                                    </span>
                                </div>


                                {user?.role === 'ADMIN' ? (
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleEdit(sweet)}
                                            className="px-3 py-1 bg-blue-50 text-blue-600 border border-blue-200 rounded hover:bg-blue-100 text-xs font-medium"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(sweet.id)}
                                            className="px-3 py-1 bg-red-50 text-red-600 border border-red-200 rounded hover:bg-red-100 text-xs font-medium"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex gap-2 w-full">
                                        <button
                                            onClick={() => handlePurchaseClick(sweet)}
                                            disabled={sweet.quantity <= 0}
                                            className={`flex-1 px-4 py-2 rounded text-sm font-medium transition-colors ${
                                                sweet.quantity > 0
                                                ? 'bg-maroon text-white hover:bg-maroon/90 shadow-sm'
                                                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                            }`}
                                        >
                                            {sweet.quantity > 0 ? 'Buy Now' : 'Out of Stock'}
                                        </button>
                                        <button
                                            className="px-3 py-2 bg-cream text-maroon border border-maroon rounded hover:bg-maroon hover:text-white transition-colors text-sm font-medium"
                                        >
                                            View
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {sweets.length === 0 && !loading && (
                <div className="text-center py-12 bg-white rounded-lg shadow">
                    <p className="text-gray-500 text-lg">No sweets found in the inventory.</p>
                </div>
            )}
        </div>

        {/* Admin Modal */}
        <SweetModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSubmit={handleModalSubmit}
            initialData={editingSweet}
                isEditing={!!editingSweet}
            />

            {/* Purchase Modal */}
            <PurchaseModal
                isOpen={isPurchaseModalOpen}
                onClose={() => setIsPurchaseModalOpen(false)}
                sweet={purchaseSweetItem}
                onPurchase={handlePurchaseComplete}
            />
    </div>
);
}

export default Home;
