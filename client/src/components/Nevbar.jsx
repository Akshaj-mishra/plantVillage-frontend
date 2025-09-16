import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/Appcontext';
import { auth } from "../firebase/firebase";
import { signOut } from "firebase/auth";

export const Navbar = () => {

  const { user, setshowlogin } = useContext(AppContext);

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);            
      navigate("/");
      setshowlogin(false);                
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

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
            <div className='relative group'>
               <img src={assets.profileIcon} className='w-10 drop-shadow' alt="" />
               <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12'>
                 <ul className='list-none m-0 p-2 bg-white rounded-md text-sm'>
                    <li onClick = {handleLogout}className='py-1 px-2 cursor-pointer pr-10'> Logout </li>
                 </ul>
               </div>
            </div>
          </div>
        ) : (
          <div className='flex items-center gap-6 lg:gap-8'>
            <button  onClick={() => setshowlogin(true)} className='bg-zinc-800 text-white px-7 py-2 sm:px-10 text-sm rounded-full hover:bg-zinc-700 transition'>
               login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;