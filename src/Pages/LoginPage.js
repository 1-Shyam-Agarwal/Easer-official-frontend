import React, { useState , useEffect } from 'react';
import { login } from '../Services/operations/Auth';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import OtpInput from 'react-otp-input';
import { useForm } from 'react-hook-form';
import { setPrimaryDisable ,setSecondaryDisable } from '../Slices/DisableFunctionality';
import { validateEmailAtLogin } from '../Services/operations/Auth';
import { apiConnector } from '../Services/apiconnect';
import { authEndpoints } from '../Services/apis';
import { googleSignupInfoExtraction } from '../Services/operations/Auth';
import { useGoogleLogin } from '@react-oauth/google';
import { FaFacebookSquare, FaEye, FaEyeSlash } from "react-icons/fa";

const ErrorMessage = ({children}) => (
  <p className="text-red-500 text-xs mt-1">{children}</p>
);

const LoginPage = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [windowSwitch , setWindowSwitch] = useState(false);
  const primaryDisable = useSelector((state)=>(state.disable.primaryDisable));
  const secondaryDisable = useSelector((state)=>(state.disable.secondaryDisable));
  const [loginData , setLoginData] = useState({});
  const [otp , setOtp] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [timer , setTimer] = useState(30);


  const{ register, 
         handleSubmit, 
         watch,
         formState:{errors,isValid} 
       } = useForm({"mode" : "onChange"}); 

  const email = watch("email");


  useEffect(() => {
      if(loginData?.role === "user")
        if (timer > 0) {
          const countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
          return () => clearInterval(countdown);
        } else {
          dispatch(setSecondaryDisable(false));
        }
    }, [timer , loginData]);

  useEffect(()=>
  {
    dispatch(setSecondaryDisable(true));
    dispatch(setPrimaryDisable(false));
  },[])

  //Validating the email and sending response back
  async function submitEmailHandler(data) {
    if(data?.email.includes(" "))
    {
        toast.error("Email should not contain spaces.");
        return;
    }
    await dispatch(validateEmailAtLogin(data.email , setPrimaryDisable , setLoginData , setWindowSwitch));
  }

  //Validating the password and giving jwt token when admin or vendor trying to login
  async function validatePasswordHandler(data)
  {
      await dispatch(login(loginData?.email , data?.password , undefined , navigate , setPrimaryDisable  ));
  }

  //Validating the OTP and giving jwt token when user trying to login
  async function validateOTP(e)
  {
    e.preventDefault();
    if(otp.length!=6)
    {
        toast.error("OTP should be of length 6.");
        return;
    }
    await dispatch(login(email , undefined , otp , navigate , setPrimaryDisable ))
  }

  const googleLogin = useGoogleLogin({
    onSuccess: async(response) => {
        const data = await dispatch(googleSignupInfoExtraction(response.access_token , "login" ,navigate));
        if(data?.user?.role ==="vendor"  || data?.user?.role ==="admin"){
          setLoginData(data?.user);
          setWindowSwitch(true);
        }
  },
    onError: () => {toast.error("Please try again.")},
  });


  function showPasswordHandler() {
    setShowPassword(!showPassword);
  }

  const handleResend = async() => {
    const toastId = toast.loading("Resending the OTP ...");
    dispatch(setSecondaryDisable(true));
    try
    {
       
       const response = await apiConnector("POST" , authEndpoints?.OTP_API , {
        email : email,
        type:"login"
       })
       
       toast.dismiss(toastId);
       toast.success("The OTP has been resent successfully.");
       setTimer(30);
    }
    catch(error)
    {
        toast.dismiss(toastId);
        dispatch(setSecondaryDisable(false));
        toast.error("Unable to resend OTP.Please try again later.")
    }

  };

  return (
    <div>
      {
        (
          <div className="flex justify-center mt-[-3rem] items-center min-h-screen bg-gray-100 overflow-y-hidden cursor-default">
            <div className='flex flex-col items-center justify-center h-[100%] w-7/8 md:w-1/2'>
                <div className="flex flex-col items-center justify-center w-[85%]">

                      
                      {
                          !windowSwitch && 
                          <div className='w-full'>

                            {/* Easer Branding */}
                            <div className='mt-[-5rem] mb-[2rem]'>
                              <div className="text-2xl font-semibold text-center text-black">
                                <span className="text-black specialCharacter">E</span>aser
                              </div>
                              <div className='text-gray-500 text-center'>Making life peaceful and serene</div>
                            </div>

                            {/* Signup with google */}
                            <button className="w-full bg-gray-800 flex items-center justify-center gap-2 rounded-sm py-3 hover:shadow-lg transition"
                              type="button"
                              onClick={() => googleLogin()}
                            >
                                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5"/>
                                <span className="text-white">Login with Google</span>
                            </button>


                            {/* OR */}
                            <div className='w-full flex gap-2 items-center justify-center mt-4'>
                              <div className='border-t-[1px] border-black w-[40%]'></div>
                              <div className='text-sm'>OR</div>
                              <div className='border-t-[1px] border-black w-[40%]'></div>
                            </div>

                            {/* Email field */}
                            <form
                              onSubmit={handleSubmit(submitEmailHandler)}>
                                  <div className="relative w-full mt-4">
                                      <input 
                                        type="email" 
                                        id="email"  
                                        className="peer block w-full rounded-sm border placeholder-gray-500 border-gray-400 bg-white px-4 pt-3 pb-3 text-base focus:border-blue-600 focus:outline-none" 
                                        {...register("email" , {
                                          required : "Required",
                                          pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: "Invalid email" }
                                        }) }
                                        placeholder='Email Address'
                                      />
                                      <label 
                                        htmlFor="email" 
                                        className="absolute left-4 top-[-0.6rem] bg-white px-1 text-base transition-all opacity-0
                                              peer-placeholder-shown:text-base 
                                              peer-focus:top-[-0.7rem] 
                                              peer-focus:opacity-100 
                                              peer-focus:text-sm 
                                              peer-focus:text-blue-600">
                                        Email Address
                                      </label>
                                      {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
                                  </div>
                                  

                                  {/* Login button appears when everything is good */}
                                  <div className='flex justify-center'>
                                    {
                                        isValid && 
                                        (
                                          <button type="submit" className={` ${primaryDisable ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600 cursor-default hover:bg-blue-700"} text-white p-2 px-6 rounded-[5px] mt-6 `}
                                                  disabled={primaryDisable}>
                                            Login
                                          </button>
                                        )
                                    }
                                  </div>

                            </form> 
                          </div>   
                      }
                      



                      {/* When role = user and windowSwitch = true */}
                      {
                          (loginData?.role==="user" && windowSwitch) &&
                          <form className='flex flex-col items-center cursor-default'
                                onSubmit={validateOTP}
                                >
                                  {/* onSubmit={handleOTP} */}
                                <div className='flex flex-col items-center'>

                                <h5 className="mt-8 text-md w-full font-normal text-gray-700 text-center">
                                  OTP has been sent to  {email}
                                  {/* <span className="text-blue-600 font-semibold"> {watch("email")} </span> */}
                                </h5>

                                  <OtpInput
                                  value={otp}
                                  onChange={setOtp}
                                  numInputs={6}
                                  renderSeparator={<span> </span>}
                                  renderInput={(props) => <input {...props} className="otp-input" />}
                                  containerStyle = "otp-container"
                                  />
                          
                                  <button className={` px-6 mt-[-0.25rem] text-white p-3 rounded-[5px] mt-6  ${ primaryDisable ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600 cursor-default hover:bg-blue-700"}`}
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
                                            disabled={secondaryDisable}
                                            className={`${secondaryDisable ? 'cursor-not-allowed' :'cursor-default'}`}
                                          >
                                            &nbsp;Resend OTP
                                          </button> 
                                      }
                                    </span> 
                                  </div>
                              </div>
                            </form>
                      }

                      {/* When role = vendor&&admin and windowSwitch = true */}
                      {
                          ((loginData?.role==="admin" || loginData?.role==="vendor") && windowSwitch) &&
                          <form className="relative w-full mt-2"
                                onSubmit={handleSubmit(validatePasswordHandler)}>
                              <div className='flex flex-col items-center'>
                                <img
                                  src={loginData?.picture}
                                  alt="User"
                                  className="aspect-square h-[5rem] rounded-full border-2 border-gray-300"
                                />

                                <div className="text-[1.4rem] font-semibold text-gray-800 p-2 captialize">
                                  {`Hello, ${loginData?.name}!`}
                                </div>

                                <p className="text-gray-600 text-sm mt-4 text-center mb-4">
                                  Please enter your password to continue.
                                </p>
                            </div>


                            <div className='relative'>


                              <div className='flex gap-3 items-center'>

                                <input 
                                  type={`${showPassword ? "text" : "password"}`} 
                                  id="password"  
                                  className="peer block w-full rounded-sm border placeholder-gray-500 border-gray-400 bg-white px-4 pt-3 pb-3 text-base focus:border-blue-600 focus:outline-none" 
                                  placeholder='Password'
                                  {...register("password" , {
                                    required : "Required",
                                    pattern : {value : /^\S+$/ , message : "Spaces are not allowed." }
                                  })}
                                />

                                <div onClick={showPasswordHandler} className='text-[30px]'>
                                  {showPassword ? <FaEyeSlash/> : <FaEye/>}
                                </div>

                              </div>
                              
                              
                            

                            <label 
                              htmlFor="password" 
                              className="absolute left-4 top-[-0.6rem] bg-white px-1 text-gray-500 text-base transition-all opacity-0
                                    peer-placeholder-shown:text-base 
                                    peer-focus:top-[-0.7rem]
                                    peer-focus:opacity-100 
                                    peer-focus:text-sm 
                                    peer-focus:text-blue-600">
                              Password
                            </label>
                            {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}

                            <div className='flex justify-center'>
                              {
                                  isValid && 
                                  (
                                    <button type="submit" className={` ${primaryDisable ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600 cursor-default hover:bg-blue-700"} text-white p-2 px-6 rounded-[5px] mt-6 `}
                                            disabled={primaryDisable}
                                            >
                                      Login
                                    </button>
                                  )
                              }
                            </div>
                            <div className='text-blue-600 mt-[0.5rem] text-[0.85rem]'
                                 onClick={()=>(navigate("/forget-password"))}
                            >
                                Forget Password?
                            </div>
                          </div>
                            
                        </form>
                      }
                  </div>

                  <div className='mt-[1rem]'>Don't have an account?&nbsp; 
                      <span className='text-blue-600 hover:text-blue-600 focus:text-blue-500'
                            onClick={()=>(navigate("/signup/user"))}
                      >
                        Signup
                      </span>
                  </div>

                </div>
                
              </div>
          )
        }
    </div>
    
  );
};

export default LoginPage;


