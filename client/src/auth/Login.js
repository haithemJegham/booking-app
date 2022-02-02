import React from "react";
import { useState } from "react";
import LoginForm from "../Components/LoginForm";

import { toast } from "react-toastify";
import { login } from "../actions/auth";
import { useDispatch } from "react-redux";
// import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
// import { Carousel } from 'react-responsive-carousel';

// import s1 from "../Components/video/s1.mp4";
// import s2 from "../Components/video/s2.mp4";
// import s3 from "../Components/video/s3.mp4";
// import s4 from "../Components/video/s4.mp4";



const Login = ({ history }) => {
  // const videos = [s1, s2, s3,s4];
  const [email, setEmail] = useState("haithem.jegham@gmail.com");
  const [password, setPassword] = useState("123456");

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("SEND LOGIN DATA", {email, password});

    try {
      let res = await login({
        email,
        password,
      });

      if (res.data) {
        console.log(
          "SAVE USER RESPONSE IN REDUX AND LOCAL STORAGE THEN REDIRECT ===>"
        );
        //console.log(res.data);
        //save user and token to local Storage
        window.localStorage.setItem("auth", JSON.stringify(res.data));

        //save user and token to redux
        dispatch({
          type: "LOGGED_IN_USER",
          payload: res.data,
        });
        history.push("/dashboard");
      }
    } catch (err) {
      console.log(err);
      if (err.response.status === 400) toast.error(err.response.data);
    }
  };

  return (
    <>
    {/* <Carousel  >         
         {videos.map((video, index) => (
          <video muted loop autoPlay key={index} src={video} />
        ))} 

      </Carousel> */}
      <div className="container-fluid bg-info p-4 text-center">
        <h1>Login</h1>
      </div>

      <div className="container"></div>
      <div className="row"></div>
      <div className="col-md-6 offset-md-3">
        <LoginForm
          handleSubmit={handleSubmit}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
        />
      </div>
    </>
  );
};

export default Login;
