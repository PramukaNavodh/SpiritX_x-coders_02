import React from 'react';

function Banner({ backgroundImage }) {
  return (
    <div
      className="relative h-[80vh] w-full bg-cover bg-center"
      style={{ backgroundImage: `url("/cricketbg.jpg")` }}
    >
      <div className="absolute inset-0 bg-gray-900 opacity-60"></div>

      <div className="relative z-10 flex flex-col items-start justify-center h-full px-8 md:px-16 lg:px-32">
        <div className="mb-4">
          <h2 className="text-white text-xl font-semibold uppercase">
          CRICKET STARS ARENA
          </h2>
          <h1 className="text-white text-5xl font-bold">
          DREAM. PICK. PLAY.
          </h1>
        </div>

        <p className="text-white text-lg mb-8">
        Step into the world of fantasy cricket and explore top players in the game. 
        Browse through profiles and analyze stats. Click on a player card to unlock 
        detailed insights and make informed selections. From rising talents to seasoned 
        pros, discover their strengths, performance history, and game-changing moments. 
        Stay ahead with in-depth data, and experience cricket like never before.
        </p>
      </div>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center text-white text-sm">
      FANTASY CRICKET BEGINS WITH THE RIGHT PLAYERS.
      </div>
    </div>
  );
}

export default Banner;