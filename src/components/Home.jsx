import React, { useCallback, useState } from "react";
import Button from "./Button";
import Input from "./Input";
import { fetchMedia } from "../store/gallerySlice"; // ✅ only import thunk
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

function Home() {
  const [destination, setDestination] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOnClick = useCallback(async () => {
    if (!destination.trim()) return; // prevent empty queries

    // ✅ Navigate immediately so gallery shows loading state
    navigate("/gallery");

    // ✅ Dispatch thunk, which handles startLoading, country, media, errors
    dispatch(fetchMedia({ country: destination, page: 1 }));
  }, [destination, dispatch, navigate]);

  return (
    <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      {/* Left Side: Text */}
      <div className="text-white">
        <h1 className="text-5xl font-bold mb-6">Get Travel Ideas on the go</h1>
        <p className="text-lg mb-8 text-slate-300">
          Explore breathtaking destinations, hidden gems, and personalized travel ideas — all in one place. Plan the journey of your dreams.
        </p>
        <div className="flex gap-4 align-middle">
          <Input
            inputType="text"
            inputLabel="Where To ?"
            onChange={(e) => setDestination(e.target.value)}
          />
          <Button onclick={handleOnClick} buttonText={"Go"} />
        </div>
      </div>

      {/* Right Side: Image cards */}
      <div className="grid grid-cols-2 gap-6">
        <img
          src="https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=700&auto=format&fit=crop&q=60"
          className="rounded-xl shadow-lg object-cover"
          alt="card1"
        />
        <img
          src="https://plus.unsplash.com/premium_photo-1719581957038-0121108b9455?w=700&auto=format&fit=crop&q=60"
          className="rounded-xl shadow-lg object-cover mt-12"
          alt="card2"
        />
        <img
          src="https://plus.unsplash.com/premium_photo-1661885523029-fc960a2bb4f3?w=700&auto=format&fit=crop&q=60"
          className="rounded-xl shadow-lg object-cover"
          alt="card3"
        />
        <img
          src="https://images.unsplash.com/photo-1698621081118-e5fe009a305d?w=700&auto=format&fit=crop&q=60"
          className="rounded-xl shadow-lg object-cover mt-12"
          alt="card4"
        />
      </div>
    </div>
  );
}

export default Home;

