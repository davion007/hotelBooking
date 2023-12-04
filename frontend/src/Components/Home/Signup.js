import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [cardNo, setCardNo] = useState(31233213124);
  const [cardType, setCardType] = useState("");
  const [exp, setExp] = useState("");
  const [isLoading, setIsLoading] = useState();

  const navigate = useNavigate();

  const handleSubmit= async(e) => {
    e.preventDefault();
    await axios.post(`${process.env.REACT_APP_API_URL}/customer/sign-up`,{
        c_name:name,
        c_email:email,
        password:password,
        c_address:address,
        c_cardno:cardNo,
        c_cardtype:cardType,
        c_cardexp: exp
    })
    .then((res) => {
        console.log(res.data);
        Cookies.set("authToken", res.data.token);
        navigate("/", { replace: true });
      })
      .catch((err) => {
        console.error(err);
      })
  }

  return (
    <div className='w-full min-w-full flex justify-center'>
        <div className='max-w-7xl w-full min-h-[70vh] flex justify-center items-center text-blackk'>
          <form onSubmit={handleSubmit} className="w-full max-w-[700px] p-8 shadow-xl">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-blackk mb-4">
                  Signup
                </h3>
                <label htmlFor="name" className="flex flex-col">
                  <span className="text-xl">Name</span>
                  <input
                    type="name"
                    id="name"
                    placeholder="Name"
                    className="border-[1px] rounded-md px-3 py-1 border-blackk text-xl"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </label>
                
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
                <label htmlFor="address" className="flex flex-col">
                  <span className="text-xl">Address</span>
                  <input
                    type="text"
                    id="address"
                    placeholder="Address"
                    className="border-[1px] rounded-md px-3 py-1 border-blackk text-xl"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </label>
                <label htmlFor="cardNo" className="flex flex-col">
                  <span className="text-xl">Card No</span>
                  <input
                    type="number"
                    id="cardNo"
                    placeholder="Password"
                    className="border-[1px] rounded-md px-3 py-1 border-blackk text-xl"
                    value={cardNo}
                    onChange={(e) => setCardNo(e.target.value)}
                  />
                </label>
                <label htmlFor="cardExp" className="flex flex-col">
                  <span className="text-xl">Card Expiry</span>
                  <input
                    type="number"
                    id="cardExp"
                    placeholder="Card Expiry"
                    className="border-[1px] rounded-md px-3 py-1 border-blackk text-xl"
                    value={exp}
                    onChange={(e) => setExp(e.target.value)}
                  />
                </label>
                <label htmlFor="cardType" className="flex flex-col">
                  <span className="text-xl">Card Type</span>
                  <select onChange={(e)=> setCardType(e.target.value)} className='border-[1px] rounded-md px-3 py-1 border-blackk text-xl'>
                    <option value="V">Visa</option>
                    <option value="MC">MasterCard</option>
                    <option value="A">American</option>
                  </select>
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
                  Already have an account?
                  <span
                    className="text-primary cursor-pointer mr-2"
                    onClick={(e) => navigate(`/login`)}
                  >
                    Login Here
                  </span>
                </p>
              </div>
            </form>
        </div>
    </div>
  )
}

export default Signup