import React from 'react'

const Footer_Basic = () => {
    return (
        <>
            <footer className="w-full text-black text-lg py-4 px-2 text-center bg-[#FDFAF0]">
                <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-16 font-semibold">
                    <a
                        href="#"
                        className="cursor-pointer w-40 transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                    >
                        tendr ©
                    </a>
                    <span>|</span>
                    <a
                        href="#"
                        className="cursor-pointer w-40 transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                    >
                        Support
                    </a>
                    <span>|</span>
                    <a
                        href="#"
                        className="cursor-pointer w-40 transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                    >
                        Help Center
                    </a>
                    <span>|</span>
                    <a
                        href="#"
                        className="cursor-pointer w-40 transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                    >
                        Vendor Support
                    </a>
                    <span>|</span>
                    <a
                        href="#"
                        className="cursor-pointer w-40 transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                    >
                        Get in touch
                    </a>
                </div>
            </footer>
        </>
    )
}

export default Footer_Basic
