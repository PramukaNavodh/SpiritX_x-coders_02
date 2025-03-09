import React from 'react';
import { useRouter } from 'next/navigation'; 

const UniversitySection = () => {
    const router = useRouter();

  const handleClick = () => {
    router.push('/allplayers'); 
  };
  return (
    <div className="bg-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          CREATE YOUR TEAM 
        </h2>
        <p className="mt-4 text-lg text-gray-700 mt-5">
        At our website, we bring you the excitement of fantasy sports by featuring real 
        university players who are ready to help you craft the ultimate fantasy team. 
        Dive into a world where you can strategically select and manage your roster, 
        showcasing your skills as a team manager. With access to accurate player stats 
        and performance updates, you can make informed decisions and watch your team thrive 
        in real-time. Join our community today and experience the thrill of competing with 
        top-notch talent right at your fingertips!
        </p>
        <p className="mt-4 text-lg text-gray-700 mt-8">
        Our site features an incredible selection of players from multiple universities, giving 
        you a diverse pool of talent to choose from. With athletes from various programs, you 
        can build a fantasy team that suits your strategy and maximizes your chances of success. 
        Join us and explore the exciting possibilities as you compete with top players from across 
        the nation!
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-6">
          <img src="/mora.png" alt="University of Moratuwa" className="h-15" />
          <img src="/japura.png" alt="University of Sri Jayawardenapura" className="h-15" />
          <img src="/colombo.png" alt="University of Colombo" className="h-15" />
          <img src="/pera.png" alt="University of Peradeniya" className="h-15" />
          <img src="/kelani.png" alt="University of Kelaniya" className="h-15" />
          <img src="/va.png" alt="University of Visual and Performing Arts" className="h-15" />
          <img src="/eastern.png" alt="Eastern University" className="h-15" />
          <img src="/jaffna.png" alt="University of Jaffna" className="h-15" />
        </div>
        <button
            onClick={handleClick} 
            className="mt-15 bg-gray-900 hover:bg-gray-600 text-white font-semibold py-2 px-6 rounded-full"
        >
            VIEW ALL PLAYERS
        </button>
      </div>
    </div>
  );
};

export default UniversitySection;