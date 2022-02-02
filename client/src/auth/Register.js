import React from "react";
import { useState } from "react";
import RegisterForm from "../Components/RegisterForm";

import { toast } from "react-toastify";
import { register } from "../actions/auth";

const Register = ({ history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // console.log("history",history); //

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.table({ name, email, password });
    try {
      const res = await register({
        name,
        email,
        password,
      });

      console.log("REGISTER USER ===>", res);
      toast.success("Register Success! Please login!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      history.push("/login");
    } catch (err) {
      console.log(err);
      if (err.response.status === 400)
        toast.error(err.response.data, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
    }
  };

  return (
    <>
    
      
      <div className="container-fluid bg-info p-4 text-center">
        <h1>Register</h1>
      </div>

      <div className="container"></div>
      <div className="row"></div>
      <div className="col-md-6 offset-md-3">
        <RegisterForm
          handleSubmit={handleSubmit}
          name={name}
          setName={setName}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
        />
      </div>
    </>
  );
};

export default Register;
