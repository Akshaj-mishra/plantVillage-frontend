import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/Appcontext';
import { auth } from "../firebase/firebase";
import { signOut } from "firebase/auth";

export const Navbar = () => {
  const { user, setshowlogin } = useContext(AppContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);            
      navigate("/");
      setshowlogin(false);
      setShowDropdown(false);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Close dropdown when clicking outside
  const handleClickOutside = (e) => {
    if (e.target.closest('.profile-dropdown') === null) {
      setShowDropdown(false);
    }
  };

  // Add event listener when dropdown is open
  React.useEffect(() => {
    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [showDropdown]);

  return (
    <div className='flex items-center justify-between py-4'>
      <div className='flex items-center py-4'>
        <div className='flex items-center gap-2'>
          <Link to="/">
            <img src={assets.logo} alt="Logo" className='w-8 sm:w-10 lg:w-14 h-auto' />
          </Link>
          <h1 className='text-black text-3xl font-semibold'>plantVillage</h1>
        </div>
      </div>

      <div>
        {user ? (
          <div className='flex items-center gap-2 sm:gap-3'>
            <p className='text-black font-medium text-sm sm:text-base max-sm:hidden pl-2'> Hi, {user.displayName}</p>
            <div className='relative profile-dropdown'>
              <img 
                src={assets.profileIcon} 
                className='w-10 drop-shadow' 
                alt="Profile" 
                onClick={() => setShowDropdown(!showDropdown)}
                style={{ cursor: 'pointer' }}
              />
              {showDropdown && (
                <div className='absolute top-full right-0 z-10 text-black rounded mt-2 shadow-lg'>
                  <ul className='list-none m-0 p-2 bg-white rounded-md text-sm w-32'>
                    <li 
                      onClick={handleLogout}
                      className='py-2 px-3 cursor-pointer hover:bg-gray-100 rounded-md'
                    > 
                      Logout 
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className='flex items-center gap-6 lg:gap-8'>
            <button  
              onClick={() => setshowlogin(true)} 
              className='bg-zinc-800 text-white px-7 py-2 sm:px-10 text-sm rounded-full hover:bg-zinc-700 transition'
            >
               login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;