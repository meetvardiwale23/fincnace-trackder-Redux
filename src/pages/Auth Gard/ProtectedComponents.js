
import React, { useEffect } from "react";
import { Routes, useNavigate } from "react-router-dom";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
  } from "react-router-dom";
import { PaymentForm } from "../Transactions/components/PaymentForm";
import { ViewAllTable } from "../View-All-Transactions/components/ViewAllTable";
import { useSelector } from "react-redux";

export const ProtectedComponents = (props) =>{
    
    const navigate = useNavigate();

         let userLoggedIn =  false;
        
        const checkUserLoggedIn = useSelector(state => state.userRegisterAuth.LoggedIn)

        if(checkUserLoggedIn)
        {
            userLoggedIn = true
        }

        useEffect(()=>{
            if(!userLoggedIn)
            {
                navigate('/login')
            }
            
        },[])
    console.log("log of the protected componentsd", props);

   


    return(
        
        
        <div>
        {userLoggedIn && 
        
        <Routes>
            <Route path="/makePayment" element={<PaymentForm />} />
            <Route path="/allTransaction" element={<ViewAllTable />} />
            
        </Routes>}
    </div>
    )

}
