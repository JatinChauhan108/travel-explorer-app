import React from 'react';
import { useSelector } from 'react-redux';

const Gallery = () => {
  const country = useSelector(state => state.countryData);
  const media = useSelector(state => state.mediaData);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-blue-900 to-gray-900 p-10 text-white">
      {/* Country Header */}
      <div className="flex items-center space-x-4 mb-12">
        <img
          src={country.flag}
          alt={`${country.name} Flag`}
          className="w-14 h-14 rounded shadow-lg border border-gray-700"
        />
        <h1 className="text-4xl font-extrabold tracking-wide">{country.name}</h1>
      </div>

      {/* Images Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
        {media.map((item, index) => (
          <div
            key={index}
            className="bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300 overflow-hidden"
          >
            <img
              src={item.url}
              alt={item.location || `${country.name} Image ${index + 1}`}
              className="w-full h-72 object-cover"   // increased height
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

