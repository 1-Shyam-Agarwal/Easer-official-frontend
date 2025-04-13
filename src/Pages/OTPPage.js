import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { verifyOTP } from '../Services/operations/Auth';
import { KeyRound, ArrowRight, RotateCcw } from 'lucide-react';
import { authEndpoints } from '../Services/apis';
import { apiConnector } from '../Services/apiconnect';
import toast from 'react-hot-toast';

const OTPPage = () => {
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const [timer, setTimer] = useState(30);
  const [resendEnabled, setResendEnabled] = useState(false);
  const [activeInput, setActiveInput] = useState(0);
  const [verifyOTPDisabled , setVerifyOTPDisabled] = useState(false);
  const [resendOTPDisabled , setResendOTPDisabled] = useState(false);
  const data = useSelector((state) => state.account.account);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(countdown);
    } else {
      setResendEnabled(true);
    }
  }, [timer]);

  const handleChange = (e, index) => {
    const value = e.target?.value?.slice(-1);
    
    // Allow only numbers
    if (value && !/^\d+$/.test(value)) return;

    setOtp(prev => {
      const newOtp = [...prev];
      newOtp[index] = value;
      return newOtp;
    });

    if (value && index < 5) {
      setActiveInput(index + 1);
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      setActiveInput(index - 1);
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData?.getData('text')?.slice(0, 6);
    const numbers = pastedData.replace(/\D/g, '').split('');
    
    setOtp(prev => {
      const newOtp = [...prev];
      numbers?.forEach((num, index) => {
        if (index < 6) newOtp[index] = num;
      });
      return newOtp;
    });

    if (numbers?.length > 0) {
      const lastIndex = Math.min(numbers?.length - 1, 5);
      setActiveInput(lastIndex);
      document.getElementById(`otp-${lastIndex}`).focus();
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const otpValue = otp.join('');
    if (otpValue?.length === 6) {
      await dispatch(verifyOTP(otpValue, data, setVerifyOTPDisabled , navigate));
    }
  };

  const handleResend = async() => {
    const toastId = toast.loading("Resending the OTP ...")
    setResendEnabled(false);
    setResendOTPDisabled(true);
    try
    {
       
       const response = await apiConnector("POST" , authEndpoints?.OTP_API , {
        email : data?.email
       })
       
       setResendOTPDisabled(false);
       setResendEnabled(true);
       toast.dismiss(toastId);
       toast.success("The OTP has been resent successfully.");
       setOtp(new Array(6).fill(''));
       setTimer(30);
       setActiveInput(0);
       document.getElementById('otp-0').focus();
       
    }
    catch(error)
    {
        toast.dismiss(toastId);
        console.log(error);
        setResendEnabled(true);
        setResendOTPDisabled(false);
        toast.error("Unable to resend the OTP. Please try again after sometime")
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 from-blue-50 via-white to-purple-50 p-4">
      <div className="w-full max-w-md transform rounded-[5px] mt-[-20px] bg-white p-6 shadow-xl transition-all duration-300 hover:shadow-2xl sm:p-8">
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-blue-50">
            <KeyRound className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="mb-2 text-2xl font-normal text-gray-900 sm:text-3xl">Verify Your Account</h1>
          <p className="text-sm text-gray-600 sm:text-base">
            We've sent a verification code to your email
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center gap-2 sm:gap-3">
            {otp?.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={handlePaste}
                className={`h-12 w-12 max-390:h-10 max-390:w-10 rounded-lg border text-center text-lg font-semibold outline-none transition-all duration-300 sm:h-14 sm:w-14 sm:text-xl
                  ${activeInput === index 
                    ? 'border-blue-600 bg-blue-50 shadow-sm' 
                    : 'border-gray-200 bg-gray-50'
                  } 
                  focus:border-blue-600 focus:bg-blue-50 focus:shadow-sm`}
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={otp?.join('')?.length !== 6 || verifyOTPDisabled || resendOTPDisabled}
            className={`group relative flex w-full items-center justify-center rounded-lg bg-blue-600 px-4 py-3 text-white transition-all duration-300 hover:bg-blue-700 disabled:bg-gray-400`}
          >
            <span className="font-medium">Verify Account</span>
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </button>

          <div className="flex items-center justify-center space-x-2 text-sm sm:text-base">
            <span className="text-gray-600">Didn't receive the code?</span>
            <button
              type="button"
              onClick={handleResend}
              disabled={!resendEnabled || verifyOTPDisabled}
              className="inline-flex items-center text-blue-600 transition-all duration-300 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <RotateCcw className={`mr-1 h-4 w-4 ${!resendEnabled && timer > 0 ? 'animate-spin' : ''}`} />
              {resendEnabled ? 'Resend Code' : `Wait ${timer}s`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OTPPage;

