import React, { useCallback, useEffect, useState } from 'react'
import Button from './Button'
import Input from './Input';
import { changeCountry, changeMedia } from '../store/gallerySlice';
import config from '../config/config'
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

function Home() {
  const [destination, setDestination] = useState("")
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleOnClick = useCallback(async() => {
  
    try {
      const res1 = await fetch(`https://restcountries.com/v3.1/name/${destination}`);
      const json1 = await res1.json();

      if (json1 && json1.length > 0) {
        const country = json1[0];

        // keep only necessary info
        const countryData = {
          name: country.name.common,
          flag: country.flags?.svg || country.flags?.png,
        };

        console.log(countryData)

        dispatch(changeCountry(countryData)); // update country slice

        // Step 2: Fetch photos for that country
        const res2 = await fetch(
          `https://api.unsplash.com/search/photos?page=1&query=${countryData.name}&client_id=${config.unsplashId}`
        );
        const json2 = await res2.json();

        // Step 3: Keep only url + location
        const media = json2.results?.map(photo => ({
          url: photo.urls.small,
          location: photo.location?.name || photo.alt_description || "Unknown",
        }));

        console.log(media)   
  
        dispatch(changeMedia(media)); // update media slice
        
        navigate('/gallery')
    } else {
      console.log("No country found");
    }
    } catch (error) {
      console.log(error);
    }
  })

  return (
    <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      {/* Left Side: Text */}

      <div className="text-white">
        <h1 className="text-5xl font-bold mb-6">
          Get Travel Ideas on the go
        </h1>
        <p className="text-lg mb-8 text-slate-300">
          Explore breathtaking destinations, hidden gems, and personalized travel ideas — all in one place. Plan the journey of your dreams.
        </p>
        <div className="flex gap-4 align-middle">
          <Input inputType = "text" inputLabel = "Where To ?" onChange = {(e) => {setDestination(e.target.value)}}/>
          <Button onclick={handleOnClick} buttonText={"Go"}/>
        </div>
      </div>

      {/* Right Side: Image cards */}
      <div className="grid grid-cols-2 gap-6">
        <img src="https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dHJhdmVsJTIwcGxhY2VzfGVufDB8fDB8fHwwttps://source.unsplash.com/300x400/?people,chat" className="rounded-xl shadow-lg object-cover" alt="card1" />
        <img src="https://plus.unsplash.com/premium_photo-1719581957038-0121108b9455?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dHJhdmVsJTIwcGxhY2VzfGVufDB8fDB8fHww" className="rounded-xl shadow-lg object-cover mt-12" alt="card2" />
        <img src="https://plus.unsplash.com/premium_photo-1661885523029-fc960a2bb4f3?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dGFqJTIwbWFoYWx8ZW58MHx8MHx8fDA%3D" className="rounded-xl shadow-lg object-cover" alt="card3" />
        <img src="https://images.unsplash.com/photo-1698621081118-e5fe009a305d?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHRyYXZlbCUyMHBsYWNlc3xlbnwwfHwwfHx8MA%3D%3D" className="rounded-xl shadow-lg object-cover mt-12" alt="card4" />
      </div>
    </div>
  )
}

export default Home