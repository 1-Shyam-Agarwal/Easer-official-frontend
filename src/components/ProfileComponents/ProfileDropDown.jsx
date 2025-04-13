import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { clearUser } from '../../Slices/profileSlice';
import { clearToken } from '../../Slices/authSlice';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { setShowModel } from '../../Slices/LogoutSlice';
import { useLocation } from 'react-router-dom';

const ProfileDropDown = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const handleLogout = () => {
        dispatch(setShowModel(true));
    };

    return (
        <div className="relative group">
            {/* Profile Image */}
            <img 
                src={props?.image} 
                className="w-[40px] h-[40px] rounded-full cursor-pointer" 
                alt="Profile"
            />

            {/* Dropdown Menu */}
            <div className="absolute right-0 z-10 w-48 bg-white rounded-md shadow-lg  opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-200">
                <NavLink 
                    to="/dashboard/my-profile" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                    My Profile
                </NavLink>
                
                <NavLink 
                    to="/dashboard/settings" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                    Settings
                </NavLink>
                <div 
                    onClick={handleLogout} 
                    className="block px-4 py-2 text-sm text-red-600 cursor-pointer hover:bg-gray-100"
                >
                    Logout
                </div>
            </div>
        </div>
    );
};

export default ProfileDropDown;
