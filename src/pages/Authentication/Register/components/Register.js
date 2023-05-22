import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { userRegister } from "../../../../app/userAuth.Duck";

import { useDispatch } from "react-redux";

//create the validation schema
const schema = yup.object().shape({
  userName: yup.string().required("user name required"),
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

export const Register = () => {
  //all the package are used here
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // start using redux register
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const handleRegiatration = (data) => {
    // create the use id on submit
    const userID = new Date().getTime();
    const registerData = { ...data, userID };

    dispatch(userRegister(registerData));
    navigate("/login");
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
                        Sign up
                      </p>

                      <form
                        className="mx-1 mx-md-4"
                        onSubmit={handleSubmit(handleRegiatration)}
                      >
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <label style={{ color: "red" }}>
                              {errors.userName?.message}
                            </label>
                            <input
                              type="text"
                              name="userName"
                              id="userName"
                              className="form-control"
                              {...register("userName")}
                            />
                            <label className="form-label" for="form3Example1c">
                              Your Name
                            </label>
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
                            <label style={{ color: "red" }}>
                              {errors.password?.message}
                            </label>
                            <input
                              type="password"
                              id="password"
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
                            Sign up
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
