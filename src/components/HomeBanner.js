"use client";

import React, {useState, useEffect} from 'react';

function HomeBanner({images, interval = 9000}) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, interval);

        return () => clearInterval(timer);
    }, [images, interval]);

    return (
        <div
            className="relative h-[80vh] w-full bg-cover bg-center transition-opacity duration-1000"
            style={{backgroundImage: `url("${images[currentImageIndex]}")`}}
        >
            <div className="absolute inset-0 bg-gray-900 opacity-60"></div>

            <div className="relative z-10 flex flex-col items-start justify-center h-full px-8 md:px-16 lg:px-32">
                <div className="mb-4">

                    <h1 className="text-white text-5xl font-bold">
                        DREAM. PICK. PLAY.
                    </h1>
                    <h2 className="text-white text-xl font-semibold uppercase">
                        Create your imaginations
                    </h2>
                </div>

            </div>
        </div>
    );
}

export default HomeBanner;