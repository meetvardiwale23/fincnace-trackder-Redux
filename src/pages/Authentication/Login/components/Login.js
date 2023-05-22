import { logDOM } from "@testing-library/react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { userLoggedIn } from "../../../../app/userAuth.Duck";
import { setCredentials } from "../../../../app/userAuth.Duck";
import { useDispatch } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";


const schema = yup.object().shape({
  email: yup
    .string()
    .email("email must be in @gmail... format")
    .required("email is required"),
  password: yup
    .string()
    .required("password is required")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters.")
    .min(5, "your password lenght must be between 5-10 character length")
    .max(10, "your password lenght must be between 5-10 character length"),
});

export const Login = () => {
  //use all the packages here
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // is user logged in
  // const isUserLoggedIn = useSelector(
  //   (state) => state.userRegisterAuth.isLoggedIn
  // );

  // console.log("is user logged in", isUserLoggedIn);

  // useEffect(() => {
  //   if (isUserLoggedIn) {
      
  //   }
  // },[]);

  // const [userLogin, setUserLogin] =  useState({
  //   email : "",
  //   password : ""
  // })

  // const [userError , setUserError] = useState({
  //   email : "",
  //   password : "",
  // })

  // state for all users
  // const [allUsers,setAllUsers] = useState([])

  //state for setting alert for email dossne Exist
  // const [alerts,setAlerts] = useState()

  //get all the users on the page load
  // useEffect(()=>{
  //   const storageUsers =  JSON.parse(localStorage.getItem("RegisterData"))
  //   setAllUsers(storageUsers)
  // },[])

  // const handleFormValues = (e) =>{
  //   let setObj = {
  //     ...userLogin,
  //     [e.target.name] :  e.target.value
  //   }
  //   setUserLogin(setObj);
  // }

  // console.log("userlogin",userLogin);

  //   const handleSubmit = (e)=>{
  //   let geAllValues = {...userLogin}
  //   console.log("getAllValues",geAllValues);
  //   let   sendErrors = {...userError}

  //   Object.keys(geAllValues).map((data)=>{
  //     if(geAllValues[data] === "")
  //     {
  //        sendErrors = {...sendErrors , [data] : "Field is required *"}
  //        e.preventDefault()
  //     }
  //     else{
  //        sendErrors = {...sendErrors , [data] : ""}
  //     }
  //   })

  //   setUserError(sendErrors);

  //   //check all the errors
  //   const errorLength =  Object.values(sendErrors).filter((item)=> item !== "")
  //   if(errorLength.length === 0)
  //   {
  //      if(allUsers && userLogin)
  //      {
  //        const currentUsers = allUsers.find((data)=> data.email === userLogin.email)
  //        console.log("current user", currentUsers);

  //        if(currentUsers && currentUsers.password === userLogin.password)
  //        {
  //           localStorage.setItem("isUserLoggedIn", true)
  //           localStorage.setItem("currentUsers",JSON.stringify(currentUsers))
  //           navigate('/landing')
  //        }else{
  //         setAlerts("This Email Dosent Exist !!")

  //        }

  //      }
  //   }
  //   e.preventDefault()
  // }

  // started user logi using useform and yup validations
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  // handle on Submit event
  const handleLoginData = (data) => {
    console.log("login data", data);

    dispatch(userLoggedIn(data));
    Cookies.set("user","loggedInTrue");
    dispatch(setCredentials(true))
    navigate("/allTransaction");
  };

  return (
    <div>
      <section className="vh-100" style={{ backgroundColor: "#eee" }}>
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black" style={{ borderRadius: "25px" }}>
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        Sign in
                      </p>

                      <form
                        className="mx-1 mx-md-4"
                        onSubmit={handleSubmit(handleLoginData)}
                      >
                        <div>
                          <div className="alert alert-danger" role="alert">
                            do
                            <Link to={"/register"}>Sign up</Link>
                            first
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <label style={{ color: "red" }}>
                              {errors.email?.message}
                            </label>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              className="form-control"
                              {...register("email")}
                            />
                            <label className="form-label" for="form3Example3c">
                              Your Email
                            </label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <labe style={{ color: "red" }}>
                              {errors.password?.message}
                            </labe>
                            <input
                              type="password"
                              id="password  "
                              name="password"
                              className="form-control"
                              {...register("password")}
                            />
                            <label className="form-label" for="form3Example4c">
                              Password
                            </label>
                          </div>
                        </div>

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button
                            type="submit"
                            className="btn btn-primary btn-lg"
                          >
                            Sign in
                          </button>
                        </div>
                      </form>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                        className="img-fluid"
                        alt="Sample image"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
