import { addCollegeEndpoints } from "../apis";
import { apiConnector } from "../apiconnect";
import toast from "react-hot-toast";

const { ADD_COLLEGE_VALIDATION_API, CREATE_ADD_COLLEGE_API,GET_ADD_COLLEGES } = addCollegeEndpoints;

export function addCollegeInfoValidation(data, navigate, dispatch) {
  return async(dispatch) =>
  {
    const toastId = toast.loading("Loading...");
    try {
      // Validate College Info
      const response = await apiConnector("POST", ADD_COLLEGE_VALIDATION_API, data);

      // If validation is successful, proceed to create the college info
      const createResponse = await apiConnector("POST", CREATE_ADD_COLLEGE_API, data);
      
      toast.dismiss(toastId);
      toast.success("Request is successfully sent to the Concerned Authority.");
      toast.success("Thank you so much for your help!");
      
      // Dispatch any necessary actions after the API response
      // Example: dispatch(someAction(response.data));

    } catch (e) {
      toast.dismiss(toastId);
      console.error(e?.message);
      toast.error(e?.response?.data?.message || "An error occurred");
    }
  };
}

export function getAddCollegeList(setAddCollegeData)
{
    return async(dispatch)=>
    {
        try
        {
            const response = await apiConnector("GET" , GET_ADD_COLLEGES);
            setAddCollegeData(response?.data?.response);

        }catch(error)
        {
            toast.error(error?.message);
            console.log(error);
        }
    }
    
}
