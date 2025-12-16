import { useState, useEffect } from 'react';

function OfferBar() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const offers = [
        "🎉 SPECIAL: Flat 20% OFF on Kaju Katli! Use Code: SWEET20",
        "🚚 FREE Delivery on orders above ₹999 within city limits",
        "🥥 Fresh Coconut Burfi - Just Arrived! Taste the tradition",
        "🍯 Pure Ghee Sweets made with premium ingredients"
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % offers.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className=" from-red-900 via-maroon to-red-900 text-gold ">
            <div className="max-w-7xl mx-auto px-4 h-10 flex items-center justify-center relative overflow-hidden">
                {offers.map((offer, index) => (
                    <div
                        key={index}
                        className={`absolute w-full text-center transition-all duration-700 transform ${
                            index === currentIndex 
                                ? 'opacity-100 translate-y-0' 
                                : 'opacity-0 translate-y-4'
                        }`}
                    >
                        <span className="font-medium tracking-wide flex items-center justify-center gap-2">
                            <span className="text-xl">✨</span> 
                            {offer} 
                            <span className="text-xl">✨</span>
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default OfferBar;
