import {toast} from "react-hot-toast";
import {apiConnector} from "../apiconnect.js";
import { authEndpoints } from "../apis";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {setToken } from "../../Slices/authSlice.js";
import { setUser } from "../../Slices/profileSlice.js";
import {setAccount} from "../../Slices/AccountSlice.jsx";

const {
    RESETPASSTOKEN_API,
    RESETPASSWORD_API,
    SIGNUP_API,
    OTP_API,
    VERIFY_OTP_API,
    LOGIN_API,
    CREATE_ACCOUNT_API,
    VENDOR_SIGNUP,
    GOOGLE_SIGNUP_INFO_EXTRACTION,
    GOOGLE_SIGNUP,
    VALIDATE_VENDOR_INFO,
    CREATE_VENDOR_ACCOUNT_API,
    EMAIL_VALIDATION_AT_LOGIN
} = authEndpoints ;




export function getPasswordResetToken(email , setEmailSent , setLoading)
{
    
    return async() =>
    {
        setLoading(true);
        try
        {
            const response = await apiConnector("POST",RESETPASSTOKEN_API,{email,});

            if(!response?.data?.success)
            {
                throw new Error(response?.data?.message);
            }

            toast.success("Reset Email Sent");
            setEmailSent(true);
        }catch(error){

            console.log("RESET PASSWORD TOKEN Error", error);
            toast.error(error?.response?.data?.message || "Unable to send reset token. Please try again later.");
        }
        setLoading(false);
    }
}


export function updatePassword(password , confirmPassword ,setLoading ,token,navigate)
{
    return async()=>{
        setLoading(true)
        try
        {
            const response = await apiConnector("POST",RESETPASSWORD_API,{password , confirmPassword , token});
            toast.success("Password is reset successfully");
            navigate('/', { replace: true });
        }catch(error){
    
                toast.error(error?.response?.data?.message || "Unable to reset the password. Please try again later.");
        }
        setLoading(false);
    }
}


export function signUp(
  email,
  mobileNumber,
  collegeCode,
  setDisable,
  setShowOTPSection,
  navigate,
  dispatch
) {
  return async (dispatch) => {

    dispatch(setDisable(true));
    const toastId = toast.loading("Loading...");

    try {

      const userInfo={
        email,
        mobileNumber,
        collegeCode
      };

      const response = await apiConnector("POST", SIGNUP_API, userInfo)
      

      const otpresponse = await apiConnector("POST" , OTP_API , {
        email,
        type : "signup"
      })

      toast.success("OTP is sent successfully");
      setShowOTPSection(true);

    } catch (error) {
        toast.error(error?.response?.data?.message || "Please try again.");
    }

    dispatch(setDisable(false));
    toast.dismiss(toastId);
    
  }
}


export function verifyOTP(otpValue, data ,setVerifyOTPDisabled ,  navigate) {
  
  return async (dispatch) => {
    setVerifyOTPDisabled(true);
    const toastId = toast.dismiss("Verfying...");
    console.log("sdkjsjkld");

    try {
      // Make the API call to verify OTP
      const response = await apiConnector("POST", VERIFY_OTP_API , {
        otp: otpValue,
        email : data?.email,
        type:"signup"
      });


      if(data?.role === 'user')
      {
          const accountResponse = await apiConnector( "POST" , CREATE_ACCOUNT_API ,data);
          toast.dismiss(toastId);
          toast.success("Account is created Successfully");
          navigate("/login");
          
      }
      else if(data?.role ==="vendor")
      {
          const accountResponse = await apiConnector( "POST" , CREATE_VENDOR_ACCOUNT_API ,data);
          toast.dismiss(toastId);
          toast.success("Account is created Successfully");
          navigate("/login");
          dispatch(setAccount(""));
          
      }

    } catch (error) {
      toast.dismiss(toastId);
      toast.error(error?.response?.data?.message || "Unable to create account. Please try again later.");
    }

    
    dispatch(setVerifyOTPDisabled(false));
  };
}


  export function login(email, password,otp, navigate,setDisable) {
    return async (dispatch) => {

      dispatch(setDisable(true));
      const toastId = toast.loading("Loading...");
      try {

        let response;
        if(password)
        {
          response = await apiConnector("POST", LOGIN_API, {
            email,
            password,
          })
        }
        
        if(otp)
        {
          response = await apiConnector("POST", VERIFY_OTP_API, {
            otp: otp,
            email : email,
            type:"login"
          })
        }
        
        if(password || otp)
        {
            //Storing the data at the local Storage
            localStorage.setItem("user", JSON.stringify(response?.data?.profileImage));
            localStorage.setItem("token", JSON.stringify(response?.data?.easerSecurityTicket));

            dispatch(setToken(response?.data?.easerSecurityTicket));
            dispatch(setUser(response?.data?.profileImage));
            dispatch(setDisable(false));
            toast.dismiss(toastId);
            toast.success("Successfully logged in!")
          
            navigate("/dashboard/my-profile");
        }
        

      } catch (error) {

        toast.dismiss(toastId);
        toast.error(error?.response?.data?.message || "Unable to login. Please try again later.");
        dispatch(setDisable(false));
      }
      
    }
  }



export function validatingVendorInfo(
            data,
            dispatch,
            navigate,
            setCreateAccountEnabled,
            setLoading
          )
{
  return async(dispatch)=>
  {
    setLoading(true);
    setCreateAccountEnabled(false);
    try
    {

      const vendorData = {
               ...data
      }

      const response = await apiConnector("POST" , VALIDATE_VENDOR_INFO , 
          vendorData
      )

      const otpresponse = await apiConnector("POST" , OTP_API , {
        email : data?.email,
        type:"signup"
      })

      dispatch(setAccount(data));
      toast.success("OTP is sent successfully")
      setCreateAccountEnabled(true);
      navigate("/otp" , {replace:true})

    }catch(error)
    {
      toast.error(error?.response?.data?.message || "Unable to send OTP. Please try again later.");
      setCreateAccountEnabled(true);
      navigate(`/signup/vendor`)
    }
    setLoading(false);
  }
}

export function googleSignupInfoExtraction(googleToken , type , navigate) {
  return async (dispatch) => {
      const toastId = toast.loading("Loading...");
      try {
          const response = await apiConnector("POST", GOOGLE_SIGNUP_INFO_EXTRACTION, { googleToken : googleToken , type});

          if(type === "login" && response?.data?.role ==="user")
          {
            //Storing the data at the local Storage
            localStorage.setItem("user", JSON.stringify(response?.data?.profileImage));
            localStorage.setItem("token", JSON.stringify(response?.data?.easerSecurityTicket));

            dispatch(setToken(response?.data?.easerSecurityTicket));
            dispatch(setUser(response?.data?.profileImage));
            toast.dismiss(toastId);
            toast.success("Successfully logged in!")
          
            navigate("/dashboard/my-profile");
          }
          else{
            toast.dismiss(toastId);
            console.log("response?.data : ",response?.data);
            return response?.data;
          }
          

      } catch (error) {
          toast.dismiss(toastId);
          toast.error(error?.response?.data?.message || "Please try again.");
          return undefined
      }
  };
}

export function googleSignup(information , navigate , setGoogleSignupAdditionalDetailsDialogBox , type , shopCode)
{
    return async(dispatch)=>
    {
        const toastId = toast.loading("Loading...");
        information["type"] = type;
        try
        {
            const response  = await apiConnector("POST" , GOOGLE_SIGNUP , information);
            toast.dismiss(toastId);
            setGoogleSignupAdditionalDetailsDialogBox(false);

            if(type === "dedicated-signup")
            {
              toast.success("Account is created Successfully");
              navigate("/login");
            }
            else if(type === "specific-college-signup")
            {
                //Storing the data at the local Storage
                localStorage.setItem("user", JSON.stringify(response?.data?.profileImage));
                localStorage.setItem("token", JSON.stringify(response?.data?.easerSecurityTicket));

                dispatch(setToken(response?.data?.easerSecurityTicket));
                dispatch(setUser(response?.data?.profileImage));
                toast.success("Successfully logged in!")
              
                navigate(`/dashboard/place-order/shop/${shopCode}`);
            }
           

        }catch(error)
        {
          toast.dismiss(toastId);
          setGoogleSignupAdditionalDetailsDialogBox(false);
          toast.error(error?.response?.data?.message || "Unable to create account. Please try again later.");
        }
    }
}


export function validateEmailAtLogin(email , setDisable , setData , setWindowSwitch)
{
    return async(dispatch)=>
    {
        dispatch(setDisable(true));
        const toastId = toast.loading("Loading");

        try
        {
            const response = await apiConnector("POST",EMAIL_VALIDATION_AT_LOGIN , {email});
            if(response?.data?.data?.role === "user")
            {
                const otpresponse = await apiConnector("POST" , OTP_API , {
                  email ,
                  type : "login"
                })
                toast.dismiss(toastId);
                toast.success("OTP is sent successfully");
            }
            else
            {
               toast.dismiss(toastId);
            }
            setWindowSwitch(true);
            setData(response?.data?.data);
        }catch(error)
        {
            toast.dismiss(toastId);
            toast.error(error?.response?.data?.message || "Please try again later.");
        }
        dispatch(setDisable(false));
        
    }
}

