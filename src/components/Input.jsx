import React from 'react'

function Input({inputType, inputLabel, onChange}) {
  return (
    <div>
      <label htmlFor={inputLabel} className="relative">
        <input
          type={inputType}
          id={inputLabel}
          onChange={onChange}
          placeholder=""
          className="peer mt-0.5 w-full h-full shadow-sm sm:text-xl px-3 py-2 border-2 border-indigo-500 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-400"
        />

        <span
          className="absolute inset-y-0 start-3 -translate-y-8 bg-white px-0.5 text-sm font-medium text-gray-700 transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-8 dark:bg-gray-900 dark:text-white"
        >
          {inputLabel}
        </span>
      </label>
    </div>
  )
}

export default Input