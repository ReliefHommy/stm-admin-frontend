'use client';

import Link from "next/link";

export default function  DeshbroadHomePage() {



  return (
    <section
      className="relative w-full h-[90vh] bg-cover bg-center transition-all duration-700"
    
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20 z-0" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold text-black drop-shadow-md mb-6">
          Welcome to STM Admin
        </h1>
                 <Link
            href="/login"
            className="bg-white text-black-600 hover:bg-gray-100 px-6 py-3 rounded font-medium transition"
          >
            Go To Login
          </Link>

      </div>


    </section>
  );
}
