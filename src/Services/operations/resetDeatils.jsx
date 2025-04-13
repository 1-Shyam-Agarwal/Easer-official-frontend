import { apiConnector } from "../apiconnect";
import toast from "react-hot-toast";
import { resetEndpoints } from "../apis";
import { clearRole, clearRoomcode, clearToken } from '../../Slices/authSlice';
import { clearUser } from '../../Slices/profileSlice';
import { setShowModel } from "../../Slices/LogoutSlice";

const {VALIDATE_AND_UPDATE_NAME , VALIDATE_AND_UPDATE_PASSWORD , UPDATE_DISPLAY_PICTURE_API , UPDATE_MOBILE_NUMBER , UPDATE_SHOP_DETAILS , UPDATE_FINE_DETAILS ,UPDATE_WAITING_TIME , ALTER_REFUND_STATUS , ALTER_SHOP_STATUS} = resetEndpoints;

export function resetName(firstName , lastName , token , setUser,dispatch ,navigate , socket , setSocket)
{
    return async()=>
    {
        if(socket)
        {
          const toastId = toast.loading("Loading...")
          try
          {
  
              const response = await apiConnector("POST" , VALIDATE_AND_UPDATE_NAME , {
                  firstName,
                  lastName,
              },
              {'Authorization': `Bearer ${token}`}
              )
  
              setUser((prev)=>
              {
                return{
                  ...prev ,
                  firstName: response?.data?.data?.firstName,
                  lastName : response?.data?.data?.lastName
                }
              })
  
              toast.dismiss(toastId);
              toast.success("Name is updated successfully.");
  
          }catch(error){
              toast.dismiss(toastId);
              if((error?.response?.data?.message === "You are logged in on another device.") || (error?.response?.data?.message ==="Session is expired."))
              {
                  dispatch(clearToken());
                  dispatch(clearUser());
                  dispatch(clearRole());
                  dispatch(clearRoomcode());
                  socket.disconnect();
                  setSocket(null);
                  dispatch(setShowModel(false));
                  navigate("/login" , {new : true});
              }
              toast.error(error?.response?.data?.message || "Unable to update name. Please try again.");
              console.log(error);
          }
        }
    }
}

export function resetPassword(currentPassword , newPassword , token ,dispatch ,navigate , socket , setSocket)
{
    return async()=>
    {
        if(socket)
        {
          const toastId = toast.loading("Loading...")
          try
          {
              const response = await apiConnector("POST" , VALIDATE_AND_UPDATE_PASSWORD , {
                  currentPassword,
                  newPassword,
              },
              {'Authorization': `Bearer ${token}`}
            )
  
              toast.dismiss(toastId);
              toast.success("Password is successfully Changed");
              
  
          }catch(error){
              toast.dismiss(toastId);
              if((error?.response?.data?.message === "You are logged in on another device.") || (error?.response?.data?.message ==="Session is expired."))
              {
                  dispatch(clearToken());
                  dispatch(clearUser());
                  dispatch(clearRole());
                  dispatch(clearRoomcode());
                  socket.disconnect();
                  setSocket(null);
                  dispatch(setShowModel(false));
                  navigate("/login" , {new : true});
              }
              toast.error(error?.response?.data?.message || "Unable to update password. Please try again.");
              console.log(error);
          }
        }
    }
}


export function updateDisplayPicture(token, formData , setUser,dispatch ,navigate , socket , setSocket) {
  return async (dispatch) => {
    if(socket)
    {
        const toastId = toast.loading("Loading...");
        try {
    
          // Make API call to update the display picture
          const response = await apiConnector(
            "POST",
            UPDATE_DISPLAY_PICTURE_API,
            formData,
            {'Authorization': `Bearer ${token}`}
          );
    
          // Notify user of success
          toast.success("Profile photo updated successfully");
          localStorage.setItem("user", JSON.stringify(response?.data?.profileImage));
          setUser((prev)=>
          (
            {
              ...prev , 
              profileImage: response?.data?.profileImage
            }
    
          ));
        } catch (error) {

          console.error("UPDATE_DISPLAY_PICTURE_API ERROR:", error);
          if((error?.response?.data?.message === "You are logged in on another device.") || (error?.response?.data?.message ==="Session is expired."))
          {
              dispatch(clearToken());
              dispatch(clearUser());
              dispatch(clearRole());
              dispatch(clearRoomcode());
              socket.disconnect();
              setSocket(null);
              dispatch(setShowModel(false));
              navigate("/login" , {new : true});
          }
          toast.error(error?.response?.data?.message || "Unable to update profile photo.");

        } finally {
          // Dismiss the loading toast
          toast.dismiss(toastId);
        }
    }
  };
}

export function resetMobileNumber(mobileNumber , token , setUser ,dispatch ,navigate , socket , setSocket)
{
   return async()=>
   {
        if(socket)
        {
            const toastId = toast.loading("Loading...");
            try
            {
                const response = await apiConnector("POST",UPDATE_MOBILE_NUMBER,{
                  mobileNumber
                },
                {'Authorization': `Bearer ${token}`}
                )
    
                toast.dismiss(toastId);
                setUser((prev)=>
                {
                    return {
                      ...prev,
                      mobileNumber : mobileNumber
                    }
                })
                toast.success("Mobile number is updated successfully.")
            }
            catch(error)
            {
                toast.dismiss(toastId);
                if((error?.response?.data?.message === "You are logged in on another device.") || (error?.response?.data?.message ==="Session is expired."))
                {
                    dispatch(clearToken());
                    dispatch(clearUser());
                    dispatch(clearRole());
                    dispatch(clearRoomcode());
                    socket.disconnect();
                    setSocket(null);
                    dispatch(setShowModel(false));
                    navigate("/login" , {new : true});
                }
                toast.error(error?.response?.data?.message || "Unable to update mobile number.");
            }
        }

   }

}

export function resetShopDetails(shopName , shopLandmark , token )
{
  return async()=>
  {
      const toastId = toast.loading("Loading...")
      try
      {
          const response = await apiConnector("POST",UPDATE_SHOP_DETAILS,{
            shopName,
            shopLandmark
          },
          {'Authorization': `Bearer ${token}`}
          )

          toast.success("Shop details updated successfully");

      }catch(error)
      {
        console.log(error);
        toast.error(error?.response?.data?.messgae || "Unable to update the shop details.");
      }
      toast.dismiss(toastId);
  }
}

export function resetFineDetails(fineRate , fineEnforcementTime , token)
{
  return async()=>
  {
    const toastId = toast.loading("Loading...")
    try
    {
      const response = await apiConnector("POST",UPDATE_FINE_DETAILS ,
        {
          fineRate,
          fineEnforcementTime
        },
        {'Authorization': `Bearer ${token}`}
      )
     
      toast.success("Fine details updated successfully.");

    }catch(error)
    {
        toast.error(error?.response?.data?.message || "Unable to update fine details");
    }
    toast.dismiss(toastId);
  }

}

export function resetWaitingTime(waitingTime , token)
{
  return async()=>
  {
    const toastId = toast.loading("Loading...")
    try
    {
        const response = await apiConnector("POST",UPDATE_WAITING_TIME,{
          waitingTime
        },
        {'Authorization': `Bearer ${token}`}
        );

        toast.success("Waiting time is updated successfully.")

    }catch(error)
    {
      toast.error(error?.response?.data?.message || "Unable to update waiting time.")
    }
    toast.dismiss(toastId);
  }
}

export function changeShopStatus(token)
{
    return async()=>
    {
        const toastId = toast.loading("Loading...");
        try
        {
            const response = await apiConnector("POST" , ALTER_SHOP_STATUS , undefined , {'Authorization': `Bearer ${token}`});
            toast.dismiss(toastId);
            toast.success("Shop status is updated successfully.")
            return 1;
        }
        catch(error)
        {
            toast.error(error?.response?.data?.message || "Unable to update the shop status.");
            toast.dismiss(toastId);
            return 0;
        }
    }
}

export function updateRefundStatus(token , orderId)
{
    return async()=>
    {
        const toastId = toast.loading("Loading...")
        try{
            const response =await apiConnector("POST",ALTER_REFUND_STATUS,{
              orderId : orderId
              },
              {'Authorization': `Bearer ${token}`}
            )

            toast.dismiss(toastId);
            toast.success("Refund status is updated successfully.")

        }catch(error)
        {
            toast.dismiss(toastId);
            toast.error(error?.response?.data?.message || "Unable to update refund status.")
        }
    }
}