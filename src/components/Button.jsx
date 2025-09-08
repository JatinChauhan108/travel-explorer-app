import React from 'react'

function Button({onclick, buttonText}) {
  return (
    <div>
        <button onClick={onclick} className='h-full'>
            <a
                className="group relative inline-block overflow-hidden border border-indigo-600 px-8 py-3 focus:ring-3 focus:outline-hidden"
            >
                <span
                    className="absolute inset-y-0 left-0 w-[2px] bg-indigo-600 transition-all group-hover:w-full"
                ></span>

                <span
                    className="relative text-md font-medium text-indigo-400 transition-colors group-hover:text-white"
                >
                   {buttonText} 
                </span>
            </a>
        </button>
    </div>
  )
}

export default Button