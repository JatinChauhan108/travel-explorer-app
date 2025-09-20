import { useSelector, useDispatch } from "react-redux";
import { removeFavorite } from "../store/favoritesSlice";
import { Heart } from "lucide-react";

const Favorites = () => {
  const favorites = useSelector((state) => state.favorites);
  const dispatch = useDispatch();

  if (favorites.items.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-screen text-gray-400">
        <p className="text-xl font-semibold">No favorites yet 💔</p>
        <p className="text-sm mt-2">Go explore destinations and add some!</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-blue-900 to-gray-900 p-10 text-white">
      <h1 className="text-3xl font-bold mb-8 text-center">Your Favorite Destinations ❤️</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {favorites.items.map((item, index) => (
          <div
            key={index}
            className="relative bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300 overflow-hidden"
          >
            {/* Remove Favorite Button */}
            <button
              onClick={() => dispatch(removeFavorite(item.id))}
              className="absolute top-3 right-3 bg-gray-900 bg-opacity-60 p-2 rounded-full hover:bg-red-600 transition"
            >
              <Heart className="w-6 h-6 text-red-400 fill-red-400" />
            </button>

            {/* Image */}
            <img
              src={item.url}
              alt={item.location || `Favorite ${index + 1}`}
              className="w-full h-72 object-cover"
            />

            {/* Location */}
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

export default Favorites;

