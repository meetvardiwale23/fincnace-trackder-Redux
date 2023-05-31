import React from "react";
import finance from "./img/finance.jpg" 
import { useNavigate } from "react-router-dom";

export const HomePage = ()=>{
  const navigate = useNavigate()
  //navigate to the form
  const navigateToForm = ()=>{
    navigate('/makePayment')
  }
    return(

      <div style={{ display:"flex", justifyContent:"center" ,marginTop : "50px"}}> 
          <div className="card" style={{width: "500px", boxShadow: "rgba(0, 0, 0, 0.1) 0px 10px 50px"}}>
              <img src={finance} class="card-img-top" alt="..."/>
              <div class="card-body">
                <h5 class="card-title">Welcome To Finance Tracker</h5>
                <p class="card-text">Keep the track of all of your transactions efficiently...</p>
                <button onClick={() => navigateToForm()} class="btn " style={{backgroundColor:"#4042E4" , color:"white"}}>Add Tansaction</button>
              </div>
            </div>

      </div>
 
    )
}