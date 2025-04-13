import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import States from '../Data/IndianStates';
import { addCollegeInfoValidation } from "../Services/operations/AddCollege.jsx";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AddCollegeForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm({
    mode: 'onBlur'
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        mobileNumber: '',
        email: "",
        collegeName: '',
        campusType: '',
        streetAddress: '',
        city: '',
        state: '',
        postalCode: "",
        country: "",
        locality: ''
      });
    }
  }, [reset, isSubmitSuccessful]);

  async function submitHandler(data) {
    try {
      await dispatch(addCollegeInfoValidation(data, navigate, dispatch));
    } catch (error) {
      console.error('Form submission error:', error);
    }
  }

  // Common input class for consistent styling
  const inputClass = `w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`;

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 py-8 cursor-default">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="px-4 sm:px-6 md:px-8 py-6">
          <h2 className="text-xl sm:text-2xl font-normal text-gray-800 mb-6 text-center">
            Add College Form
          </h2>

          <form 
            className="space-y-6"
            onSubmit={handleSubmit(submitHandler)}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
              {/* Mobile Number */}
              <div className="flex flex-col">
                <label htmlFor="mobileNumber" className="font-normal text-gray-700 mb-1">
                  Mobile Number<span className="text-red-500"> *</span>
                </label>
                <input
                  type="text"
                  id="mobileNumber"
                  placeholder="Enter your Mobile Number"
                  className={`${inputClass} ${errors.mobileNumber ? 'border-red-500' : 'border-gray-300'}`}
                  {...register('mobileNumber', { 
                    required: 'Mobile Number is mandatory',
                    pattern: {
                      value: /^[6-9]\d{9}$/,
                      message: 'Enter valid Mobile number'
                    }
                  })}
                />
                {errors.mobileNumber && (
                  <p className="text-red-500 text-sm mt-1">{errors.mobileNumber.message}</p>
                )}
              </div>

              {/* EMAIL */}
              <div className="flex flex-col">
                <label htmlFor="email" className="font-normal text-gray-700 mb-1">
                  Email<span className="text-red-500"> *</span>
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your Email"
                  className={`${inputClass} ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                  {...register('email', { 
                    required: 'Email is mandatory',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  })}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              {/* College Name */}
              <div className="flex flex-col">
                <label htmlFor="collegeName" className="font-normal text-gray-700 mb-1">
                  College Name<span className="text-red-500"> *</span>
                </label>
                <input
                  type="text"
                  id="collegeName"
                  placeholder="Enter your College Name"
                  className={`${inputClass} ${errors.collegeName ? 'border-red-500' : 'border-gray-300'}`}
                  {...register('collegeName', { 
                    required: 'College Name is mandatory',
                    minLength: { value: 2, message: 'Minimum 2 characters required' }
                  })}
                />
                {errors.collegeName && (
                  <p className="text-red-500 text-sm mt-1">{errors.collegeName.message}</p>
                )}
              </div>

              {/* Campus Type */}
              <div className="flex flex-col">
                <label htmlFor="campusType" className="font-normal text-gray-700 mb-1">
                  Campus Type (If Any)
                </label>
                <input
                  type="text"
                  id="campusType"
                  defaultValue=""
                  placeholder="Enter your Campus Type"
                  className={`${inputClass}`}
                  {...register('campusType')}
                />
              </div>

              {/* Street Address */}
              <div className="flex flex-col">
                <label htmlFor="streetAddress" className="font-normal text-gray-700 mb-1">
                  Street Address<span className="text-red-500"> *</span>
                </label>
                <input
                  type="text"
                  id="streetAddress"
                  placeholder="Enter your Street Address"
                  className={`${inputClass} ${errors.streetAddress ? 'border-red-500' : 'border-gray-300'}`}
                  {...register('streetAddress', { 
                    required: 'Street Address is mandatory'
                  })}
                />
                {errors.streetAddress && (
                  <p className="text-red-500 text-sm mt-1">{errors.streetAddress.message}</p>
                )}
              </div>

              {/* Locality */}
              <div className="flex flex-col">
                <label htmlFor="locality" className="font-normal text-gray-700 mb-1">
                  Locality<span className="text-red-500"> *</span>
                </label>
                <input
                  type="text"
                  id="locality"
                  placeholder="Enter your Locality"
                  className={`${inputClass} ${errors.locality ? 'border-red-500' : 'border-gray-300'}`}
                  {...register('locality', { 
                    required: 'Locality is mandatory'
                  })}
                />
                {errors.locality && (
                  <p className="text-red-500 text-sm mt-1">{errors.locality.message}</p>
                )}
              </div>

              {/* City */}
              <div className="flex flex-col">
                <label htmlFor="city" className="font-normal text-gray-700 mb-1">
                  City<span className="text-red-500"> *</span>
                </label>
                <input
                  type="text"
                  id="city"
                  placeholder="Enter your City"
                  className={`${inputClass} ${errors.city ? 'border-red-500' : 'border-gray-300'}`}
                  {...register('city', { 
                    required: 'City is mandatory'
                  })}
                />
                {errors.city && (
                  <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
                )}
              </div>

              {/* State */}
              <div className="flex flex-col">
                <label htmlFor="state" className="font-normal text-gray-700 mb-1">
                  State<span className="text-red-500"> *</span>
                </label>
                <select
                  {...register('state', { required: 'State is required' })}
                  className={`${inputClass} ${errors.state ? 'border-red-500' : 'border-gray-300'}`}
                >
                  <option value="">Select State</option>
                  {States?.map((element, index) => {
                    const [key, value] = Object.entries(element)[0];
                    return (
                      <option key={index} value={key}>{value}</option>
                    );
                  })}
                </select>
                {errors.state && (
                  <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>
                )}
              </div>

              {/* PostalCode */}
              <div className="flex flex-col">
                <label htmlFor="postalCode" className="font-normal text-gray-700 mb-1">
                  Postal Code / ZIP Code<span className="text-red-500"> *</span>
                </label>
                <input
                  type="text"
                  id="postalCode"
                  placeholder="Enter your Postal Code"
                  className={`${inputClass} ${errors.postalCode ? 'border-red-500' : 'border-gray-300'}`}
                  {...register('postalCode', { 
                    required: 'Postal Code is mandatory',
                    pattern: {
                      value: /^[1-9][0-9]{5}$/,
                      message: 'Enter valid 6-digit postal code'
                    }
                  })}
                />
                {errors.postalCode && (
                  <p className="text-red-500 text-sm mt-1">{errors.postalCode.message}</p>
                )}
              </div>

              {/* Country */}
              <div className="flex flex-col">
                <label htmlFor="country" className="font-normal text-gray-700 mb-1">
                  Country<span className="text-red-500"> *</span>
                </label>
                <input
                  type="text"
                  id="country"
                  placeholder="Enter your Country"
                  defaultValue="India"
                  className={`${inputClass} ${errors.country ? 'border-red-500' : 'border-gray-300'}`}
                  {...register('country', { 
                    required: 'Country is mandatory',
                    pattern: {
                      value: /^[A-Za-z\s]{2,}$/,
                      message: 'Enter valid country name'
                    }
                  })}
                />
                {errors.country && (
                  <p className="text-red-500 text-sm mt-1">{errors.country.message}</p>
                )}
              </div>
            </div>

            <div className="flex justify-center mt-8">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full sm:w-auto px-6 py-3 bg-blue-600 text-white font-normal rounded-lg shadow-md 
                  ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'} 
                  transition-all duration-200`}
              >
                {isSubmitting ? 'Sending Request...' : 'Send Add College Request'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCollegeForm;