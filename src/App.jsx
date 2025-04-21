import { Routes ,Route } from "react-router-dom";
import HomePage from "./Pages/HomePage.js";
import "./App.css";
import LoginPage from "./Pages/LoginPage.js";
import SignupPage from "./Pages/SignupPage.js";
import AboutPage from "./Pages/AboutPage.js";
import Navbar from "./components/homePageComponents/Navbar.js";
import Sponsors from "./Pages/Sponsors.js";
import ContactUs from "./Pages/ContactusPage.js";
import FAQPage from "./Pages/FAQsPage.js";
import ForgetPasswordPage from "./Pages/ForgetPassword.js";
import  { Toaster } from 'react-hot-toast';
import UpdatePasswordPage from "./Pages/UpdatePassword.js";
import OTPPage from "./Pages/OTPPage.js";
import DashboardSidebar from "./components/DashboardComponents/DashboardSidebar.jsx";
import { useSelector } from "react-redux";
import DashboardTemplate from "./components/DashboardComponents/DashboardTemplate.jsx";
import MyProfile from "./Pages/MyProfile.jsx"
import VendorSignupPage from "./Pages/VendorSignupPage.jsx";
import AddCollegeForm from "./Pages/AddCollegeForm.jsx";
import AddCollegePage from "./Pages/AddCollegeRelatedPages/addCollegePage.jsx";
import  YourShopPage from "./Pages/YourShopRelatedComponents/YourShopPage.jsx";
import PlaceOrderCollegeSelection from "./components/PlaceOrderComponent/PlaceOrderSelect.jsx";
import OrderDashboard from "./Pages/OrderDashboard.jsx";
import { useLocation } from "react-router-dom";
import OpenRoute from "./components/Core/Auth/OpenRoute.jsx";
import ProtectedRoute from "./components/Core/Auth/ProtectedRoute.jsx";
import NotFoundPage from "./Pages/NotFound.jsx";
import Settings from "./Pages/Settings.jsx";
import CancelledOrdersDashboard from "./Pages/CancelledOrdersDashboard.jsx";
import OngoingOrders from "./Pages/OngoingOrders.jsx";
import UnreceivedOrders from "./Pages/UnreceivedOrders.jsx";
import OrderHistoryDashboard from "./Pages/OrderHistoryDashboard.jsx"
import VendorSignup from "./Pages/VendorSignupPage.jsx";
import PrivacyPolicy from "./Pages/PrivacyPolicy.jsx";
import TermsAndConditions from "./Pages/TermsAndCondition.jsx";
import Disclaimer from "./Pages/Disclaimer.jsx";
import RefundAndCancellationPolicy from "./Pages/RefundAndCancellation.jsx";
import ShippingAndDeliveryPolicy from "./Pages/ShippingAndDeliveryPolicy.jsx"
import BecomeVendor from "./Pages/BecomeVendor.jsx";
import io from "socket.io-client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import SuccessPage from "./Pages/SuccessPage.jsx";
import {  getRole, getUserId } from "./Services/operations/GetUserInformation.jsx";
import { setRole, setRoomcode } from "./Slices/authSlice.js";
import { useContext } from "react";
import { socketContext } from "./ContextApi/SocketContext.js";
import { getRequiredRooms } from "./Services/operations/GetUserInformation.jsx";
import LogoutModel from "./components/LogoutComponents/LogoutModel.jsx";
import SpecificCollegeShopWithoutLogin from "./Pages/SpecificCollegeShopWithoutLogin.jsx";
import VendorPricingPage from "./Pages/Pricing.jsx";


function App() {

  const dispatch = useDispatch();
  const token = useSelector(state=>{return state.auth.token});
  const location= useLocation();
  const {setSocket} = useContext(socketContext);
  const showModel = useSelector((state)=>{return state.logout.showModel});


   useEffect(()=>{

     let socket="";
     async function fetchCollegeCode()
     {  
        if(token)
        {
         
          
          socket = io( "https://easer-official-backend-production.up.railway.app" ,{transports:["websocket"]});  
          setSocket(socket);
          const userId = await dispatch(getUserId(token));
         
          if(userId)
          { 
            dispatch(setRoomcode(userId));
            socket.emit("join-initial-self-room" , userId);
          }
        }
     }

     async function setUserRole()
     {
        let role ="";
        if(token)
        {
            role = await dispatch(getRole(token));
            dispatch(setRole(role)); 
        }

        if(token && role)
        {
            if(role ==="user")
            {
                const rooms = await dispatch(getRequiredRooms(token));
                socket.emit("user-enter-the-required-room" , rooms);
                
            }
        }
     }

     fetchCollegeCode();
     setUserRole();

   },[token])


  return (
    <div>
      {
        location.pathname.split("/")[1] === "dashboard" || location.pathname.split("/")[1]==="success"? <div></div> : <Navbar/>
      }

      {
        showModel && (
          <LogoutModel></LogoutModel>
        )
      }
      
      <Routes>

        <Route path="/" element={<HomePage/>}></Route>
      
        <Route path="/login" 
            element={<OpenRoute>
                        <LoginPage/>
                    </OpenRoute>}>
        </Route>

        <Route path="/success"
              element={<SuccessPage/>}>
        </Route>

        <Route path="/pricing"
              element={<VendorPricingPage/>}>
        </Route>




        <Route path="/about" element={<AboutPage/>}></Route>
        <Route path="/sponsors" element={<Sponsors/>}></Route>
        <Route path="/contactus" element={<ContactUs/>}></Route>
        <Route path="/FAQs" element={<FAQPage/>}></Route>


        <Route path="/forget-password" 
              element={<OpenRoute>
                          <ForgetPasswordPage/>
                      </OpenRoute>
              }>
        </Route>
        
        <Route path="/update-password/:id" 
              element={<OpenRoute>
                          <UpdatePasswordPage/>
                      </OpenRoute>}>
        </Route>


        <Route path="/otp" 
              element={
                          <OTPPage/>
                      }
        >
        </Route>

        <Route path="/privacy-policy"
               element={
                  <PrivacyPolicy/>
               }>
        </Route>

        <Route path="/shipping-and-delivery-policy"
               element={
                  <ShippingAndDeliveryPolicy/>
               }>
        </Route>

        <Route path="/disclaimer"
               element={
                  <Disclaimer/>
               }>
        </Route>

        <Route path="/become-vendor"
               element={
                  <BecomeVendor/>
               }>
        </Route>

        <Route path="/terms-and-conditions"
               element={
                  <TermsAndConditions/>
               }>
        </Route>

        <Route path="/refund-and-cancellation-policy"
               element={
                  <RefundAndCancellationPolicy/>
               }>
        </Route>


      <Route path="/signup/user" 
            element={
              <OpenRoute>
                <SignupPage />
              </OpenRoute>
            }
      >
      </Route>

      <Route path="/services/printing/select-college/:id/:id"
             element={
              <SpecificCollegeShopWithoutLogin/>
             }
      >
      </Route>


      <Route path="/signup/vendor/:id" 
            element={
              <OpenRoute>
                <VendorSignup/>
              </OpenRoute>
            }
      >
      </Route>

      <Route path="/add-college-form" 
            element={
                <AddCollegeForm />
            }
      >
      </Route>



      <Route path="/dashboard/my-profile" 
       element={
         <ProtectedRoute>
           <DashboardTemplate>
             <MyProfile />
           </DashboardTemplate>
         </ProtectedRoute>
       }
      />

      <Route path="/dashboard/ongoing-orders" 
       element={
         <ProtectedRoute>
           <DashboardTemplate>
             <OngoingOrders/>
           </DashboardTemplate>
         </ProtectedRoute>
       }
      />

      <Route path="/dashboard/cancelled-orders" 
       element={
         <ProtectedRoute>
           <DashboardTemplate>
             <CancelledOrdersDashboard/>
           </DashboardTemplate>
         </ProtectedRoute>
       }
      />

      <Route path="/dashboard/unreceived-orders" 
       element={
         <ProtectedRoute>
           <DashboardTemplate>
             <UnreceivedOrders/>
           </DashboardTemplate>
         </ProtectedRoute>
       }
      />

      <Route path="/dashboard/order-history" 
       element={
         <ProtectedRoute>
           <DashboardTemplate>
             <OrderHistoryDashboard/>
           </DashboardTemplate>
         </ProtectedRoute>
       }
      />

      <Route path="/dashboard/place-order" 
            element={
              <ProtectedRoute>
                <DashboardTemplate>
                  <PlaceOrderCollegeSelection />
                </DashboardTemplate>
              </ProtectedRoute>
            }
      />

      <Route path="/dashboard/add-college" 
            element={
              <ProtectedRoute>
                <DashboardTemplate>
                  <AddCollegePage />
                </DashboardTemplate>
              </ProtectedRoute>
            }
      />

      <Route path="/dashboard/add-vendor" 
            element={
              <ProtectedRoute>
                <DashboardTemplate>
                  {/* AddVendorPage or relevant content */}
                </DashboardTemplate>
              </ProtectedRoute>
            }
      />

      <Route path="/dashboard/settings" 
            element={
              <ProtectedRoute>
                <DashboardTemplate>
                  <Settings/>
                </DashboardTemplate>
              </ProtectedRoute>
            }
      />

      <Route path="/dashboard/college-shops" 
            element={
              <ProtectedRoute>
                <DashboardTemplate>
                  <YourShopPage />
                </DashboardTemplate>
              </ProtectedRoute>
            }
      />

      <Route path="/dashboard/place-order/shop/:id" 
            element={
              <ProtectedRoute>
                <DashboardTemplate>
                  <OrderDashboard />
                </DashboardTemplate>
              </ProtectedRoute>
            }
      />

`     <Route path="/dashboard/print-order" 
            element={
              <ProtectedRoute>
                <DashboardTemplate>
                  <OrderDashboard />
                </DashboardTemplate>
              </ProtectedRoute>
            }
      />

      <Route path="*" 
            element={<NotFoundPage/>}
      />

      </Routes>
      <Toaster/>
    </div>
  );
}

export default App;
