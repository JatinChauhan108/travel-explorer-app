import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const Gallery = () => {
  const {countryData : country, mediaData : media, loading, error} = useSelector(state => state)

  console.log(country, media, loading, error);
  
  if(error){
    return(
      <div className="flex flex-col justify-center items-center h-screen text-red-400">
        <p className="text-xl font-semibold">{error}</p>
      </div>
    )
  }

  const ShimmerCard = () => (
    <div className="bg-gray-800 rounded-xl shadow-lg animate-pulse overflow-hidden">
      <div className="w-full h-72 bg-gray-700"></div>
      <div className="p-4">
        <div className="h-4 bg-gray-600 rounded w-3/4 mb-2"></div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-blue-900 to-gray-900 p-10 text-white">
      
      {/* Country Header */}
      <div className="flex items-center space-x-4 mb-12">
        {loading ? (
          <div className="w-14 h-14 bg-gray-700 rounded shadow-lg animate-pulse"></div>
        ) : (
          <img
            src={country.flag}
            alt={`${country.name} Flag`}
            className="w-14 h-14 rounded shadow-lg border border-gray-700"
          />
        )}
        <h1 className="text-4xl font-extrabold tracking-wide">
          {loading ? (
            <div className="h-8 bg-gray-700 rounded w-48 animate-pulse"></div>
          ) : (
            country.name
          )}
        </h1>
      </div>

      {/* Images Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
        {loading
          ? Array.from({ length: 6 }).map((_, index) => (
              <ShimmerCard key={index} />
            ))
          : media.map((item, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300 overflow-hidden"
              >
                <img
                  src={item.url}
                  alt={item.location || `${country.name} Image ${index + 1}`}
                  className="w-full h-72 object-cover"
                />
                <div className="p-4">
                  <p className="text-md text-gray-200 truncate">
                    {item.location || "Unknown Location"}
                  </p>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Gallery;
