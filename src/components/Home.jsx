import React, { useCallback, useEffect } from 'react'
import Button from './Button'
import Input from './Input';

function Home() {
  const handleOnClick = useCallback(() => window.location.href = "https://google.com")
  return (
    <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      {/* Left Side: Text */}

      <div className="text-white">
        <h1 className="text-5xl font-bold mb-6">
          Get Travel Ideas on the go
        </h1>
        <p className="text-lg mb-8 text-slate-300">
          Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem
          cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat.
        </p>
        <div className="flex gap-4 items-center">
          <Input inputType = "text" inputLabel = "Where To ?"/>
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