import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Protected = ({Component}) => {
    const navigation = useNavigate();
console.log('prote')
    useEffect(() => {
        checkWallet()
    },[])

    async function checkWallet(){
        try {
            const account = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            console.log(account)
            if(!account){
                alert('Error Connecting');
                navigation('/')
            }
        } catch (error) {
            console.error('error',error)
            if(error){
                navigation('/')
            }
        }
    }

  return (
    <>
        <Component/>
    </>
  )
}

export default Protected