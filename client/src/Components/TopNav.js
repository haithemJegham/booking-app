import { Link } from "react-router-dom";
import React, { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const TopNav = () => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => ({ ...state }));
  const history = useHistory();
  const logout = () => {
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    window.localStorage.removeItem("auth");
    history.push("/login");
  };
  return (
    <>

      
    <div className="menu">
      <ul>
        <li>
          <Link to="/">Home {/* {JSON.stringify(auth)} */}</Link>
        </li>
        <li>
          <Link to="/HotelList">Hotels</Link>
        </li>
        {auth !== null && (
          
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
           
          
        )}

        {auth != null && (
          <li>
            <a className="pointer" onClick={logout} >Logout</a>
          </li>
        )}
        {auth === null && (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </div>
   
    </>);
};

export default TopNav;
