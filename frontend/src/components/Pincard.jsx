import React from 'react'
import { Link } from "react-router-dom";

const Pincard = ({ pin }) => {
  return (
    <div className="mb-4">
      <div className="bg-white overflow-hidden shadow rounded-lg relative group cursor-pointer hover:scale-105 transition-transform duration-300">
        <img 
          src={pin.image.url} 
          alt="" 
          className="w-full h-auto object-cover"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-300 flex items-center justify-center">
          <div className="flex flex-col justify-center items-center gap-2">
            <Link 
              to={`/pin/${pin._id}`} 
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              View
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Pincard
