import React from 'react';

function Banner({ backgroundImage }) {
  return (
    <div
      className="relative h-[80vh] w-full bg-cover bg-center" // Adjust height here (e.g., h-3/4, h-[80vh], or fixed height)
      style={{ backgroundImage: `url("${backgroundImage}")` }}
    >
      <div className="absolute inset-0 bg-gray-900 opacity-60"></div>

      <div className="relative z-10 flex flex-col items-start justify-center h-full px-8 md:px-16 lg:px-32">
        <div className="mb-4">
          <h2 className="text-white text-xl font-semibold uppercase">
            ABSTRACT BACKGROUND
          </h2>
          <h1 className="text-white text-5xl font-bold">
            LANDING PAGE
          </h1>
        </div>

        <p className="text-white text-lg mb-8">
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
          diam nonummy nibh euismod tincidunt ut laoreet dolore magna
          aliquam erat volutpat. Ut wisi enim ad minim veniam, quis
          nostrud exerci tation ullamcorper suscipit lobortis nisi ut
          aliquip ex ea commodo consequat. Duis autem vel eum iriure
          dolor in hendrerit in vulputate.
        </p>
      </div>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center text-white text-sm">
        LANDING PAGE & BACKGROUND DESIGN
      </div>
    </div>
  );
}

export default Banner;