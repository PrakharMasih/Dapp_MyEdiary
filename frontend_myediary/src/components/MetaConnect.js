import React, { useEffect, useState } from 'react'
import {Link, useNavigate } from 'react-router-dom';

const MetaConnect = () => {

    const [haveWallet, setHaveWallet] = useState(false);
    const navigate = useNavigate();

    async function ConnectAc() {

        if (window.ethereum) {
            setHaveWallet(true);

            try {
                const account = await window.ethereum.request({
                    method: "eth_requestAccounts",
                });
                console.log('acc',account)
                if(!account){
                    alert('Error Connecting');
                }
                if(account){
                    return navigate('/home')
                }
            } catch (error) {
                console.error(error)
            }
        }
        else {
            setHaveWallet(false);
        }
    }
    useEffect(() => {
        ConnectAc();
    }, [])

    return (
        <>
            {
                haveWallet ?
                    <div className='w-full h-screen bg-bgpic bg-center bg-cover flex flex-col justify-center items-center ' >
                        <button className="relative inline-block text-lg group" onClick={() => ConnectAc()} >
                            <span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
                                <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
                                <span className="absolute left-0 w-full h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
                                <span className="relative">Connect To Metamask</span>
                            </span>
                            <span className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0" data-rounded="rounded-lg"></span>
                        </button>
                    </div>

                    :
                    <div className="w-full h-screen flex flex-col justify-center items-center ">
                        <h2 className='text-2xl text-center leading-10' >
                            <span className='text-4xl text-blue-600'>Oops!</span>
                            <br />
                            Looks Like You Don't have MetaMask
                            <br />
                            But Don't Worry
                        </h2>
                        <Link to="https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn">
                            <button className='ring-2 ring-indigo-400 ring-inset rounded-lg p-2 mt-5 hover:bg-indigo-400 hover:text-white' >Get Your Wallet Extension Here</button>
                        </Link>
                    </div>

            }
        </>
    )
}

export default MetaConnect;