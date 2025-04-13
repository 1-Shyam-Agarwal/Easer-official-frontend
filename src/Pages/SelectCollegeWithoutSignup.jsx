import React from 'react';
import { useEffect ,useState} from 'react';
import { useDispatch } from 'react-redux';
import { getCollegeList } from '../Services/operations/CollegeApi';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';

const SelectCollegeWithoutSignup = () => {

  const dispatch = useDispatch();
  const[collegeData , setCollegeData]  =useState([]);
  const[loading , setLoading] =useState(false);
  const[selectValue , setSelectValue]  =useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
  
      const fetchCollegeData = async () => {
        try {
          dispatch(getCollegeList(setCollegeData,setLoading));
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchCollegeData();
  }, []);

  return (

    <div>
    {
        loading?(
            <div>
            </div>
        )
        :(
            <div className="w-full h-screen flex flex-col items-center justify-start bg-gray-50 p-6">
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-normal text-gray-800 mt-[2rem]">Select College</h1>
                    <p className="text-gray-600 text-base mt-2">Select your account type to get started</p>
                    <div className="h-[4px] w-16 bg-blue-500 mx-auto rounded-full mt-4"></div>
                </div>
                
                <div className="w-full max-w-md bg-white shadow-lg rounded-sm p-6 border border-blue-100">
                    <label htmlFor="college-select" className="block text-sm font-semibold text-gray-700 mb-2">
                    Select your institution
                    </label>
                    
                    <div className="relative">
                    <select 
                        id="college-select"
                        className="w-full h-12 px-4 text-lg text-gray-700 bg-white border border-gray-300 rounded-sm shadow-sm appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none cursor-pointer"
                        onChange={((e)=>{setSelectValue(e.target.value)})}
                        value={selectValue}
                    >
                        <option value="">Select college</option>
                        {collegeData?.map((element) => (
                            <option key={element?.collegeCode} value={element?.collegeCode}>
                            {element?.collegeName}
                            </option>
                        ))}
                    </select>
                    
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </div>
                    </div>
                    
                    <button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-sm transition duration-150 ease-in-out shadow-md hover:shadow-lg"
                            onClick={()=>{selectValue==="" ? toast.error("Please select a college") : navigate(`${location.pathname}/${selectValue}`)}}>
                    Continue
                    </button>
                </div>
                
                <p className="mt-12 text-sm text-gray-500">
                <span className='font-medium text-red-500 text-center'>Can't find your college?</span> Ask your college's vendor to register on our platform, and it will be available soon!
                </p>
            </div>
        )
    }
    </div>

  )
}

export default SelectCollegeWithoutSignup;