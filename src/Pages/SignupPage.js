import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { googleSignupInfoExtraction, signUp } from "../Services/operations/Auth.js";
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { getCollegeList } from '../Services/operations/CollegeApi.jsx';
import OtpInput from 'react-otp-input';
import { verifyOTP } from '../Services/operations/Auth.js';
import { setPrimaryLoading ,setPrimaryDisable, setSecondaryLoading , setSecondaryDisable} from '../Slices/DisableFunctionality.jsx';
import toast from 'react-hot-toast';
import { authEndpoints } from '../Services/apis.js';
import { apiConnector } from '../Services/apiconnect.js';
import { useGoogleLogin } from "@react-oauth/google";
import { googleSignup } from '../Services/operations/Auth.js';
import GoogleAdditionalDetailsBox from '../components/UserSignup/GoogleAdditionalDetailsBox.jsx';
import "./otpField.css";



const ErrorMessage = ({children}) => (
  <p className="text-red-500 text-xs mt-1">{children}</p>
);

const SignupPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const primaryLoading = useSelector((state)=>(state.disable.primaryLoading));
  const primaryDisable = useSelector((state)=>(state.disable.primaryDisable));
  const [collegeData, setCollegeData] = useState([]);
  const [showOTPSection , setShowOTPSection] = useState(false);
  const [otp , setOtp] = useState("");
  const secondaryDisable = useSelector((state)=>(state.disable.secondaryDisable));
  const [timer , setTimer] = useState(30);
  const [googleSignupAdditionalDetailsDialogBox,setGoogleSignupAdditionalDetailsDialogBox] = useState(false);
  const [googleSignupData , setGoogleSignupData] = useState({});

  const {register , 
         handleSubmit ,
         watch,
         formState : {errors,isValid},
        }
        = useForm({mode:"onChange"});

  let formData = watch();

  useEffect(() => {

    const fetchCollegeData = async () => {
      try {
        await dispatch(getCollegeList(setCollegeData,setPrimaryLoading, dispatch));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchCollegeData();
    dispatch(setSecondaryDisable(true));
    dispatch(setPrimaryDisable(false));
  }, []);


  useEffect(() => {
    if(showOTPSection)
      if (timer > 0) {
        const countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
        return () => clearInterval(countdown);
      } else {
        dispatch(setSecondaryDisable(false));
      }
  }, [timer , showOTPSection]);


   const handleOTP = async(e) => {
      e.preventDefault();
      formData["role"] = "user";
      if(otp.length === 6)
      {
        await dispatch(verifyOTP(otp, formData, setPrimaryDisable , navigate));
      }
      else{
        toast.error("Otp should be of length 6.")
      }
      
    };
  
    const handleResend = async() => {
      const toastId = toast.loading("Resending the OTP ...");
      dispatch(setSecondaryDisable(true));
      try
      {
         
         const response = await apiConnector("POST" , authEndpoints?.OTP_API , {
          email : formData?.email,
          type:"signup"
         })
         
         toast.dismiss(toastId);
         toast.success("The OTP has been resent successfully.");
         setTimer(30);
      }
      catch(error)
      {
          toast.dismiss(toastId);
          dispatch(setSecondaryDisable(false));
          toast.error(error?.response?.data?.message||"Unable to resend OTP.Please try again later.")
      }

    };

  

  
  
  const SignupSubmit = async (data) => {
    try {
      
      if(data?.email?.includes(" "))
      {
          toast.error("Email cannot contain spaces.");
          return;
      }

      await dispatch(signUp(
            data?.email,
            data?.mobileNumber,
            data?.collegeCode,
            setPrimaryDisable,
            setShowOTPSection,
            navigate,
            dispatch
      ));
       
    } catch (error) {
      console.log(error);
      return ;
    }
  };

  const login = useGoogleLogin({
    onSuccess: async(response) => {
        const data = await dispatch(googleSignupInfoExtraction(response.access_token , "signup" , navigate));
        if(data?.user?.email){
          setGoogleSignupAdditionalDetailsDialogBox(true);
          setGoogleSignupData(data?.user);
        }
  },
    onError: () => {toast.error("Please try again.")},
  });

  const googleSignupWithExtraInfo = async(googleSignupData)=>
  {
      await dispatch(googleSignup(googleSignupData , navigate ,setGoogleSignupAdditionalDetailsDialogBox , "dedicated-signup"));
  }



  return (
    <div>
      {
        primaryLoading ? 
        (
          <div className="min-h-screen flex flex-col gap-2 items-center justify-center">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <div>Kindly wait for a while...</div>
          </div>
        )
        :
        (
          <div className="flex justify-center mt-[-3rem] items-center min-h-screen bg-gray-100 overflow-y-hidden cursor-default">
            <div className='flex flex-col items-center justify-center h-[100%] w-7/8 md:w-1/2'>
                <div className="flex flex-col items-center justify-center w-[85%]">

                      <div className='mt-[-30px] mb-[2rem]'>
                        <div className="text-2xl font-semibold text-center text-black">
                          <span className="text-black specialCharacter">E</span>aser
                        </div>
                        <div className='text-gray-500'>Making life peaceful and serene</div>
                      </div>
                      
    
    
                    {/* Signup with google */}
                    <button class="w-full bg-gray-800 flex items-center justify-center gap-2 rounded-sm py-3 hover:shadow-lg transition"
                            type="button"
                            onClick={() => login()}
                    >
                        <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" class="w-5 h-5"/>
                        <span class="text-white">Sign up with Google</span>
                    </button>

                    <div className='w-full flex gap-2 items-center justify-center mt-4'>
                      <div className='border-t-[1px] border-black w-[40%]'></div>
                      <div className='text-sm'>OR</div>
                      <div className='border-t-[1px] border-black w-[40%]'></div>
                    </div>
    
                    {/* Website Local Signup */}
                    <div className='w-full '>

                       <div>
                        {
                            showOTPSection ? 
                            (
                                <form className='flex flex-col items-center cursor-default'
                                      onSubmit={handleOTP}>
                                  <div className='flex flex-col items-center'>

                                  <h5 className="mt-8 text-md w-full font-normal text-gray-700 text-center">
                                    OTP has been sent to  
                                    <span className="text-blue-600 font-semibold"> {watch("email")} </span>
                                  </h5>

                                    <OtpInput
                                    value={otp}
                                    onChange={setOtp}
                                    numInputs={6}
                                    renderSeparator={<span> </span>}
                                    renderInput={(props) => <input {...props} className="otp-input" />}
                                    containerStyle = "otp-container"
                                    />
                            
                                    <button className={` px-6 mt-[-0.25rem] text-white p-3 rounded-[5px] mt-6  ${primaryDisable ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600 cursor-default hover:bg-blue-700"}`}
                                            disabled={primaryDisable}
                                            type='submit'>
                                      Verify
                                    </button>

                                    <div className='mt-[1rem]'>Didn't receive the code? 
                                      <span className='text-blue-600 hover:text-blue-700'>
                                        {
                                          secondaryDisable ?
                                           <span className='cursor-not-allowed'>&nbsp;  Wait for {timer}s</span>
                                           : 
                                            <button
                                              type='button'
                                              onClick={handleResend}
                                            >
                                              &nbsp;Resend OTP
                                            </button> 
                                        }
                                      </span> 
                                    </div>
                                </div>
                              </form>
                            )
                            :
                            (
                                <form className='flex flex-col items-center ' onSubmit={handleSubmit(SignupSubmit)}>
                                     {/* Select college field */}
                                    <div class="relative w-full mt-3" >
                                      <select 
                                        type="text" 
                                        id="collegeName"  
                                        class=" peer block w-full rounded-sm border invalid:text-gray-500 border-gray-400 bg-white px-4 pt-3 pb-3 text-base focus:border-blue-600 focus:outline-none" 
                                        required
                                        {...register("collegeCode" , {required : "Required"})}
                                      >
                                          <option value="" disabled selected>Select College</option>
                                          {collegeData?.map((element) => (
                                            <option key={element?.collegeCode} value={element?.collegeCode}>
                                              {element?.collegeName}
                                            </option>
                                          ))}

                                      </select>
                
                                      <label 
                                          htmlFor="collegeName" 
                                          class="absolute left-4 top-[-0.6rem] bg-white px-1 text-base transition-all opacity-0
                                                peer-placeholder-shown:text-base
                                                peer-focus:opacity-100 
                                                peer-focus:top-[-0.7rem]
                                                peer-focus:opacity-100 
                                                peer-focus:text-sm 
                                                peer-focus:text-blue-600">
                                          College
                                      </label>
                                      {errors.collegeName && <ErrorMessage>{errors.collegeName.message}</ErrorMessage>}
                                    </div>
                                        
                                    {/* Email field */}
                                    <div class="relative w-full mt-4">
                                        <input 
                                          type="email" 
                                          id="email"  
                                          class="peer block w-full rounded-sm border placeholder-gray-500 border-gray-400 bg-white px-4 pt-3 pb-3 text-base focus:border-blue-600 focus:outline-none" 
                                          {...register("email" , {
                                            required : "Required",
                                            pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: "Invalid email" }
                                          }) }
                                          placeholder='Email Address'
                                        />
                                        <label 
                                          htmlFor="email" 
                                          class="absolute left-4 top-[-0.6rem] bg-white px-1 text-base transition-all opacity-0
                                                peer-placeholder-shown:text-base 
                                                peer-focus:top-[-0.7rem] 
                                                peer-focus:opacity-100 
                                                peer-focus:text-sm 
                                                peer-focus:text-blue-600">
                                          Email Address
                                        </label>
                                        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
                                    </div>
                
                                    {/* Mobile Number Field */}
                                    <div class="relative w-full mt-4">

                                      <input 
                                        type="text" 
                                        id="mobileNumber"  
                                        class="peer block w-full rounded-sm border placeholder-gray-500 border-gray-400 bg-white px-4 pt-3 pb-3 text-base focus:border-blue-600 focus:outline-none" 
                                        placeholder='Mobile Number'
                                        {...register("mobileNumber" , {
                                          required : "Required",
                                          pattern :{value:/^[6-9]\d{9}$/ , message:"Invalid Number"}
                                        })}
                                      />

                                      <label 
                                        htmlFor="mobileNumber" 
                                        class="absolute left-4 top-[-0.6rem] bg-white px-1 text-gray-500 text-base transition-all opacity-0
                                              peer-placeholder-shown:text-base 
                                              peer-focus:top-[-0.7rem]
                                              peer-focus:opacity-100 
                                              peer-focus:text-sm 
                                              peer-focus:text-blue-600">
                                        Mobile Number
                                      </label>
                                      {errors.mobileNumber && <ErrorMessage>{errors.mobileNumber.message}</ErrorMessage>}
                                    </div>

                                    {
                                        isValid && 
                                        <button type="submit" className={` ${primaryDisable ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600 cursor-default hover:bg-blue-700"} text-white p-3 rounded-[5px] mt-6 `}
                                                              disabled={primaryDisable}>
                                         Create Account
                                        </button>
                                    }  

                                    <div className='mt-[1rem]'>Already have an account?&nbsp; 
                                        <span className='text-blue-600 '
                                              onClick={()=>(navigate("/login"))}
                                        >
                                          Login
                                        </span>
                                    </div>
                                </form>
                            )
                        }
                       </div>
                       
                      </div>
                      <p className="mt-4 text-sm text-gray-600 text-center">
                          By signing up, you agree to our{" "}
                          <a href="/terms-and-conditions" className="text-blue-600 hover:underline">
                            Terms & Conditions
                          </a>{" "}
                          and{" "}
                          <a href="/privacy-policy" className="text-blue-600 hover:underline">
                            Privacy Policy
                          </a>.
                      </p>

                </div>
                </div>
              </div>
              )
            }

            {
                googleSignupAdditionalDetailsDialogBox && <GoogleAdditionalDetailsBox collegeData={collegeData} 
                                                                                      setGoogleSignupData={setGoogleSignupData} 
                                                                                      googleSignupData={googleSignupData} 
                                                                                      googleSignupWithExtraInfo={googleSignupWithExtraInfo}
                                                          />
            }
          </div>
          
    
  );
};

export default SignupPage;