'use client';

import Link from "next/link";

export default function  EntreDoorway() {



  return (
    <section
      className="relative w-full h-[90vh] bg-cover bg-center transition-all duration-700"
    
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20 z-0" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold text-black drop-shadow-md mb-6">
          Choose A Dashboard
        </h1>
        <div className="flex gap-4">
          <Link
            href="/admindashboard"
            className="bg-white text-black-600 hover:bg-gray-100 px-6 py-3 rounded font-medium transition"
          >
            Admin
          </Link>
          <Link
            href="/food-dashboard"
            className="bg-white text-black-600 hover:bg-gray-100 px-6 py-3 rounded font-medium transition"
          >
            Foods
          </Link>
                    <Link
            href="/studio-dashboard"
            className="bg-white text-black-600 hover:bg-gray-100 px-6 py-3 rounded font-medium transition"
          >
            Studio
          </Link>
        </div>
      </div>


    </section>
  );
}