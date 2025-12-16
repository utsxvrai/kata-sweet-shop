import { useState, useEffect } from 'react';

const AVAILABLE_COUPONS = [
    { code: 'SWEET20', discount: 20, desc: '20% OFF on all sweets' },
    { code: 'FESTIVE10', discount: 10, desc: '10% OFF Festive Sale' }
];

function PurchaseModal({ isOpen, onClose, sweet, onPurchase }) {
    const [quantity, setQuantity] = useState(1);
    const [couponCode, setCouponCode] = useState('');
    const [discount, setDiscount] = useState(0);
    const [appliedCoupon, setAppliedCoupon] = useState(null);
    const [step, setStep] = useState('select'); // select, processing, success
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        if (isOpen && sweet) {
            setQuantity(1);
            setTotalPrice(Number(sweet.price) || 0);
            setStep('select');
            setDiscount(0);
            setAppliedCoupon(null);
            setCouponCode('');
        }
    }, [isOpen]); 

    useEffect(() => {
        if (sweet) {
            const price = Number(sweet.price) || 0;
            const basePrice = price * quantity;
            const discountAmount = (basePrice * discount) / 100;
            setTotalPrice(Math.max(0, basePrice - discountAmount));
        }
    }, [quantity, sweet, discount]);

    const handleApplyCoupon = (code) => {
        if (!code) return;
        const coupon = AVAILABLE_COUPONS.find(c => c.code === code.toUpperCase());
        if (coupon) {
            setDiscount(coupon.discount);
            setAppliedCoupon(coupon.code);
            setCouponCode(coupon.code);
        } else {
            alert('Invalid coupon code');
            setDiscount(0);
            setAppliedCoupon(null);
        }
    };

    const handlePay = async () => {
        setStep('processing');
        // Mock API call / Payment Gateway delay
        setTimeout(async () => {
            try {
                // Attempt to update backend, but proceed to success regardless as requested
                if (onPurchase && sweet) {
                    await onPurchase(sweet.id, quantity);
                }
            } catch (error) {
                console.warn('Backend update failed:', error);
            }
            setStep('success'); // Always show success
        }, 3000);
    };

    if (!isOpen || !sweet) return null;

    const safePrice = Number(sweet.price) || 0;
    const subTotal = safePrice * quantity;
    const discountVal = (subTotal * discount) / 100;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden transform transition-all scale-100">

                {/* Header */}
                <div className="bg-maroon p-4 text-white flex justify-between items-center">
                    <h3 className="font-serif text-xl font-bold">
                        {step === 'select' && 'Review Order'}
                        {step === 'processing' && 'Processing Payment'}
                        {step === 'success' && 'Order Confirmed'}
                    </h3>
                    <button onClick={onClose} className="text-white/80 hover:text-white">✕</button>
                </div>

                <div className="p-6">
                    {step === 'select' && (
                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 bg-cream rounded-lg flex items-center justify-center text-2xl border border-gold">
                                    🍬
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg text-gray-800">{sweet.name || 'Unknown Sweet'}</h4>
                                    <p className="text-sm text-gray-500">{sweet.category || 'General'}</p>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                                <div className="flex justify-between items-center">
                                    <label className="text-gray-600 font-medium">Price per unit</label>
                                    <span className="font-mono">₹{safePrice}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <label className="text-gray-600 font-medium">Quantity</label>
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center font-bold text-gray-600"
                                        >
                                            -
                                        </button>
                                        <span className="w-8 text-center font-bold">{quantity}</span>
                                        <button
                                            onClick={() => setQuantity(Math.min(sweet.quantity || 100, quantity + 1))}
                                            className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center font-bold text-gray-600"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                                <div className="h-px bg-gray-200 my-2"></div>

                                {/* Coupon Section */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Available Offers</label>
                                    <div className="flex gap-2 flex-wrap">
                                        {AVAILABLE_COUPONS.map(c => (
                                            <button
                                                key={c.code}
                                                onClick={() => handleApplyCoupon(c.code)}
                                                className={`text-xs px-2 py-1 rounded border border-dashed transition-colors ${appliedCoupon === c.code ? 'bg-green-100 border-green-500 text-green-700' : 'bg-yellow-50 border-gold text-maroon hover:bg-yellow-100'}`}
                                            >
                                                {c.code}
                                            </button>
                                        ))}
                                    </div>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            placeholder="Enter Coupon Code"
                                            value={couponCode}
                                            onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                                            className="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded focus:border-maroon focus:outline-none"
                                        />
                                        <button
                                            onClick={() => handleApplyCoupon(couponCode)}
                                            className="px-3 py-1.5 text-sm bg-maroon text-white rounded hover:bg-maroon/90"
                                        >
                                            Apply
                                        </button>
                                    </div>
                                    {appliedCoupon && (
                                        <p className="text-xs text-green-600 font-medium">
                                            ✅ Coupon {appliedCoupon} applied! ({discount}% OFF)
                                        </p>
                                    )}
                                </div>

                                <div className="h-px bg-gray-200 my-2"></div>
                                <div className="space-y-1">
                                    <div className="flex justify-between items-center text-gray-600 text-sm">
                                        <span>Subtotal</span>
                                        <span>₹{subTotal.toFixed(0)}</span>
                                    </div>
                                    {discount > 0 && (
                                        <div className="flex justify-between items-center text-green-600 text-sm font-medium">
                                            <span>Discount ({discount}%)</span>
                                            <span>-₹{discountVal.toFixed(0)}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between items-center text-lg font-bold text-maroon pt-2">
                                        <span>Total Amount</span>
                                        <span>₹{totalPrice.toFixed(0)}</span>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={handlePay}
                                className="w-full py-3 bg-gradient-to-r from-maroon to-red-800 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
                            >
                                Pay ₹{totalPrice.toFixed(0)}
                            </button>
                        </div>
                    )}

                    {step === 'processing' && (
                        <div className="text-center py-8">
                            <div className="w-16 h-16 border-4 border-gray-200 border-t-maroon rounded-full animate-spin mx-auto mb-4"></div>
                            <h4 className="text-lg font-bold text-gray-800 mb-2">Contacting Bank Server...</h4>
                            <p className="text-gray-500 text-sm">Please do not close this window.</p>
                        </div>
                    )}

                    {step === 'success' && (
                        <div className="text-center py-6">
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                            </div>
                            <h4 className="text-2xl font-bold text-green-700 mb-2">Payment Successful!</h4>
                            <p className="text-lg text-maroon font-semibold mb-2">Thank you for buying sweets at Kata Sweet Shop! 🎉</p>
                            <p className="text-gray-600 mb-6">Your order for {quantity} {sweet.name} has been placed.</p>
                            <button
                                onClick={onClose}
                                className="w-full py-3 bg-gray-800 text-white font-bold rounded-lg hover:bg-gray-900 transition-colors"
                            >
                                Close Receipt
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default PurchaseModal;
