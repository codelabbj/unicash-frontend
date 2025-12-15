import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AdCarousel = ({ banners }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (!banners || banners.length === 0) return;

        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
        }, 5000); // 5 seconds

        return () => clearInterval(interval);
    }, [banners]);

    if (!banners || banners.length === 0) return null;

    return (
        <div className="relative w-full max-w-full overflow-hidden rounded-2xl shadow-md bg-gray-100 mb-6">
            <div
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {banners.map((banner) => (
                    <div key={banner.id} className="w-full flex-shrink-0">
                        <Link to={banner.link} className="block w-full h-56 relative">
                            <div className="w-full h-full relative group">
                                {/* Background Image */}
                                <img
                                    src={banner.image}
                                    alt={banner.title}
                                    loading="lazy"
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                                {/* Overlay for readability */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                                {/* Content */}
                                <div className="relative z-10 h-full p-6 flex flex-col justify-end text-white">
                                    <h3 className="font-bold text-lg mb-1 leading-tight">{banner.title}</h3>
                                    <p className="text-xs text-gray-200 line-clamp-2">{banner.description}</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>

            {/* Dots Indicators */}
            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {banners.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-white w-4' : 'bg-white/50'
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default AdCarousel;
