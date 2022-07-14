import React from 'react'
import Single from "../assets/single.png"
 
 const Cards = () => {
   return (
     <div className="w-full py-[10rem] px-4">
       <div className="max-w-[1240px] mx-auto">
         <div className="w-full shadow-xl border flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300">
           <img className="w-20 mx-auto" src={Single} alt="img" />
           <h2 className="text-2xl font-bold text-center py-8">
             Single treatment
           </h2>
           <p className="text-center text-4xl font-bold">$149</p>
           <div className="text-center font-medium">
             <p className="py-2 border-b mx-8 mt-8">some text here</p>
             <p className="py-2 border-b mx-8">some text here</p>
             <p className="py-2 border-b mx-8 mb-4">some text here</p>
           </div>
           <div className='text-center'>
             <button className="bg-[#d3d3d3] w-[200px] rounded-md font-medium mx-5 my-6 py-3 ml-4">
               Send
             </button>
           </div>
         </div>
       </div>
     </div>
   );
 }
 
 export default Cards