import React from "react";
import { PinData } from "../context/PinContext";
import Masonry from "react-masonry-css";
import { Loading, LoadingAnimation } from "../components/Loading";
import Pincard from '../components/Pincard'

const Home = () => {
  const { pins, loading } = PinData();
  const breakpointColumnsObj = {
    default: 4, 
    1100: 3,    
    700: 2,    
    500: 1  
  };
  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">  
              {pins && pins.length > 0 ? (
                <Masonry breakpointCols={breakpointColumnsObj} className='flex gap-4' columnClassName='bg-clip-padding'>
                {pins.map((e, i) => <Pincard key={i} pin={e}/>)}
              </Masonry>) : (
                <p>No Pins Yet</p>
              )}
        </div>
      )}
    </div>
  );
};

export default Home;
