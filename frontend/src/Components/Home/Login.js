import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState();

  const navigate = useNavigate();

  const handleSubmit= async() => {
    setIsLoading(true);
      await axios.post(`${process.env.API_URL}/api/customer/login`, {email, password})
      .then((res) => {
          console.log(res.data);
          Cookies.set("authToken", res.data.token);
          navigate("/room", { replace: true });
        })
        .catch((err) => {
          console.error(err);
        })
    setIsLoading(false);
  }

  return (
    <div className='w-full min-w-full flex justify-center'>
        <div className='max-w-7xl w-full min-h-[70vh] flex justify-center items-center text-blackk'>
          <form onSubmit={handleSubmit} className="w-full max-w-[700px] p-8 shadow-xl">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-blackk mb-4">
                  Login
                </h3>
                <label htmlFor="email" className="flex flex-col">
                  <span className="text-xl">Email</span>
                  <input
                    type="email"
                    id="email"
                    placeholder="Email"
                    className="border-[1px] rounded-md px-3 py-1 border-blackk text-xl"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </label>
                <label htmlFor="password" className="flex flex-col">
                  <span className="text-xl">Password</span>
                  <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    className="border-[1px] rounded-md px-3 py-1 border-blackk text-xl"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </label>
              </div>
              <div className="my-6 space-y-6">
                <button
                  type="submit"
                  className={`w-full py-2 bg-primary rounded-md text-white font-bold ${
                    isLoading ? "opacity-60" : ""
                  }`}
                  disabled={isLoading}
                >
                  {!isLoading ? "Log in" : "Submiting..."}
                </button>
                <p className="font-bold text-center">
                  Create an account?
                  <span
                    className="text-primary cursor-pointer"
                    onClick={(e) => navigate(`/signup`)}
                  >
                    Signup Here
                  </span>
                </p>
              </div>
            </form>
        </div>
    </div>
  )
}

export default Login