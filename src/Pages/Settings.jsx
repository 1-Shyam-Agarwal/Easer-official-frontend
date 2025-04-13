import React, { useEffect ,useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import UserSettings from '../components/Settings/UserSettings';
import VendorSettings from '../components/Settings/VendorSettings';
import { getRole } from '../Services/operations/GetUserInformation';

const Settings = () => {

    const role = useSelector(state => state.auth.role);
    const [loading , setLoading] = useState(true);
   

  return (
    <div>
        {
            loading? 
            (
                <div className="min-h-screen flex items-center justify-center">
                  <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            )
            :
            (
                <div>
                {
                    role === "user"?
                    (
                        <UserSettings/>
                    )
                    :
                    (
                        role=== "vendor" ? 
                        <VendorSettings/> :
                        (
                            <div></div>
                        )
                    )
                }
                </div>
            )
        }
    </div>
   
  )
}

export default Settings