import React from "react";
import { PinData } from "../context/PinContext";
import Masonry from "react-masonry-css";
import Pincard from "../components/Pincard";
import { useNavigate } from "react-router-dom";
import { UserData } from "../context/UserContext";
const Account = ({ user }) => {
  const {logoutUser}=UserData();
  const navigate=useNavigate();
  const logoutHandler = () => {
    logoutUser(navigate);
  };
  const breakpointColumnsObj = {
    default: 4, 
    1100: 3,    
    700: 2,    
    500: 1  
  };
  const { pins } = PinData();
  
  let userPins;
  if (pins) {
    userPins = pins.filter((pin) => pin.owner === user._id);
  }
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="p-6 w-full">
        <div className="flex items-center justify-center">
          <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center">
            <span className="text-3xl text-gray-700">
              {user.name.slice(0, 1).toUpperCase()}
            </span>
          </div>
        </div>
        <h1 className="text-center text-2xl font-bold mt-4">{user.name}</h1>
        <p className="text-center text-gray-600 mt-2">{user.email}</p>
        <div className="flex justify-center mt-4 space-x-2">
          <button
            onClick={logoutHandler}
            className="bg-gray-200 px-4 py-2 rounded cursor-pointer"
          >
            Logout
          </button>
        </div>
        <div className="mt-4 flex flex-wrap justify-center gap-4">
            {
                userPins && userPins.length>0?( 
                    <Masonry breakpointCols={breakpointColumnsObj} className='flex gap-4' columnClassName='bg-clip-padding'>
                        {userPins.map((e, i) => <Pincard key={e._id} pin={e}/>)}
                    </Masonry>)
                :<p>No Pins Yet</p>
            }
        </div>
      </div>
    </div>
  );
};

export default Account;
