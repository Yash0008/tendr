import React from 'react'
import { useNavigate } from 'react-router-dom';
import logo from "../assets/logo2.png";

const NavUpper = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className="navupper flex justify-between pl-5 pr-5 pt-3 pb-3 bg-[#EBE7DE]">
                <div className="logo">
                    <img src={logo} alt="tendr logo" style={{ height: "84px" }} />
                </div>
                <div className="buttons flex gap-5 items-start pt-3">
                    <button type="button" onClick={() => { navigate("/signup") }} className='bg-[#CCAB4A] hover:bg-[#a98d3b] rounded-full pl-2.5 pr-2.5 pt-1 pb-1.5 flex items-center justify-center text-white font-bold w-[80px]'>
                        <span>Sign Up</span>
                    </button>
                    <button type="button" onClick={() => { navigate("/login") }} className='bg-white hover:ring-1 hover:ring-[#CCAB4A] rounded-full pl-2.5 pr-2.5 pt-1 pb-1.5 flex items-center justify-center font-bold w-[80px]'>
                        <span>Sign In</span>
                    </button>
                </div>
            </div>
        </>
    )
}

export default NavUpper
