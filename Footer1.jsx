import React from 'react'

const Footer1 = () => {
    return (
        <>
            <div className="footer_home container mx-auto mt-10 mb-10 w-[1600px] h-[190px] bg-[#EBE7DE] rounded-2xl">

                <div className="containsfooter w-full h-full flex justify-between items-center pl-10 pr-10">

                    <div className="left flex flex-col justify-between pt-5 pb-5 h-full">
                        <div className="top flex flex-col">
                            <span className='font-bold text-3xl'>tendr</span>
                            <span className='text-[#CCAB4A] font-medium'>Simplified event planning</span>
                        </div>
                        <div className="bottom">
                            <div className='font-semibold text-lg'>tendr ©</div>
                        </div>
                    </div>

                    <div className="right pt-5 pb-5 h-full flex flex-col justify-evenly">
                        <span className='font-medium'>Support</span>
                        <span className='font-medium'>Help Center</span>
                        <span className='font-medium'>Vendor Support</span>
                        <span className='font-medium'>Vendor</span>
                        <span className='font-medium'>Get in touch</span>
                    </div>

                </div>

            </div>
        </>
    )
}

export default Footer1
