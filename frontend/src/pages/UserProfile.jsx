import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Masonry from "react-masonry-css";
import axios from "axios";
import { PinData } from "../context/PinContext";
import Pincard from "../components/Pincard";
import { UserData } from "../context/UserContext";
const UserProfile = ({ user: loggedInUser }) => {
  const params = useParams();
  const [user, setUser] = useState([]);
  const [isFollow, setIsFollow] = useState(false);
  const {followUser}=UserData();
  const { pins } = PinData();
    
let userPins;
if (pins) {
    userPins = pins.filter((pin) => pin.owner === user._id);
}
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };
  const followHandler = () => {
    followUser(user._id,fetchUser);
    setIsFollow((e)=>!e);
  };
  async function fetchUser() {
    try {
      const { data } = await axios.get(`/api/user/${params.id}`);
      console.log(data);
      setUser(data);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    fetchUser();
  }, [params.id]);

  useEffect(()=>{
    if(user.followers&&user.followers.includes(loggedInUser._id))
        setIsFollow(true);
  },[user])
  return (
    <div>
      {user && (
        <div className="flex flex-col items-center justify-center">
          <div className="p-6 w-full">
            <div className="flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center">
                {user.name&&<span className="text-3xl text-gray-700">
                  {user.name.slice(0, 1).toUpperCase()}
                </span>}
              </div>
            </div>
            <h1 className="text-center text-2xl font-bold mt-4">{user.name}</h1>
            <p className="text-center text-gray-600 mt-2">{user.email}</p>
            <p className="flex justify-center items-center text-center text-gray-600 mt-2 gap-3">
              {user.followers&&<p>{user.followers.length} followers</p>}
              {user.followings&&<p>{user.followings.length} following</p>}
            </p>
            <div className="flex justify-center mt-4 space-x-2">
              <button
                onClick={followHandler}
                className="bg-gray-200 px-4 py-2 rounded cursor-pointer"
              >
                {isFollow ? "UnFollow" : "Follow"}
              </button>
            </div>
            <div className="mt-4 flex flex-wrap justify-center gap-4">
              {userPins && userPins.length > 0 ? (
                <Masonry
                  breakpointCols={breakpointColumnsObj}
                  className="flex gap-4"
                  columnClassName="bg-clip-padding"
                >
                  {userPins.map((e) => (
                    <Pincard key={e._id} pin={e} />
                  ))}
                </Masonry>
              ) : (
                <p>No Pins Yet</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
