import React from 'react';
import { useNavigate } from 'react-router-dom';

const InitialSignup = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center pt-12 cursor-default">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-normal text-gray-800">Create Account</h1>
          <p className="text-gray-600 text-base mt-2">Select your account type to get started</p>
          <div className="h-[4px] w-16 bg-blue-500 mx-auto rounded-full mt-4" />
        </div>

        <div className="grid md:grid-cols-2 gap-6 range-450-767:justify-items-center range-450-767:items-center">

          <div 
            onClick={() => navigate('/signup/user')}
            className="bg-white p-8 rounded-[8px] shadow-lg range-450-767:w-3/4 cursor-pointer hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-blue-500 mx-4 md:ml-8"
          >
            <div className="h-16 w-16 bg-blue-100 rounded-[0.5rem] flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h2 className="text-2xl font-normal text-gray-800 mb-2">User Account</h2>
            <p className="text-gray-600 mb-6">Access services, make bookings, and manage your preferences</p>
            <span className="text-blue-600 font-semibold flex items-center">
              Get Started
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>

          <div 
            onClick={() => navigate('/signup/vendor')}
            className="bg-white p-8 rounded-[8px] shadow-lg range-450-767:w-3/4 cursor-pointer hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-green-500 mx-4 md:mr-8"
          >
            <div className="h-16 w-16 bg-green-100 rounded-[0.5rem] flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h2 className="text-2xl font-normal text-gray-800 mb-2">Vendor Account</h2>
            <p className="text-gray-600 mb-6">List your services, manage bookings, and grow your business</p>
            <span className="text-green-600 font-semibold flex items-center">
              Get Started
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>

        <div className="text-center mt-12 mb-8">
          <p className="text-gray-600">
            Already have an account?
            <button onClick={() => navigate('/login')} className="text-blue-600 font-semibold ml-2 hover:text-blue-700">
              Login
            </button>
          </p>
        </div>

      </div>
    </div>
  );
};

export default InitialSignup;