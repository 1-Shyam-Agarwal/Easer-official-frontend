import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Printer } from "lucide-react";

const ExploreServices = () => {

 const navigate = useNavigate();
  return (
    <div className='w-full min-h-screen bg-gray-50 flex flex-col justify-start items-center'>

        <div className="text-center m-8 w-full p-4">
          <h1 className="text-3xl font-normal text-gray-800">Currently Available Services</h1>
          <p className="text-gray-600 text-base mt-2">Select your favourite service to get started</p>
          <div className="h-[4px] w-16 bg-blue-500 mx-auto rounded-full mt-4" />
        </div>

        <div 
            onClick={() => navigate('/services/printing/select-college')}
            className="bg-white p-8 m-8 rounded-[8px] shadow-lg range-450-767:w-3/4 cursor-pointer hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-blue-500 mx-4 md:mr-8"
          >
            <div className="h-16 w-16 bg-blue-100 text-blue-500 rounded-[0.5rem] flex items-center justify-center mb-4">
              <Printer/>
            </div>
            <h2 className="text-2xl font-normal text-gray-800 mb-2">Printing Services</h2>
            <p className="text-gray-600 mb-6">Upload your documents, customize print settings, and pick up with ease!</p>
            <span className="text-blue-600 font-semibold flex items-center">
              Get Started
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
    </div>
  )
}

export default ExploreServices