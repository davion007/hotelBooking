import { useAtom } from "jotai";
import React, { useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { user } from "./global-state";

const Protected = ({ children }) => {
  const [currentUser, setCurrentUser] = useAtom(user);
  const navigate = useNavigate();
  const location = useLocation();
  let headers;
  const token = Cookies.get("authToken");
  useEffect(() => {
    headers = { Authorization: `Bearer ${token}` };
    if (token) {
      if(location.pathname === "/login" || location.pathname === "/signup") {
        console.log("Dsada")
        navigate("/");
      }
      axios
        .get(`${process.env.REACT_APP_API_URL}/customer/me`, { headers })
        .then((res) => {
          setCurrentUser(res.data);
        })
        .catch((err) => {
          console.error(err);
          navigate("/login", { replace: true });
        });
    } else {
      navigate("/login", { replace: true });
    }
    console.log(token);
  }, [token]);

  return <>{children}</>;
};

export default Protected;