import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider, useAtom } from "jotai";
import Header from "./Components/Common/Header";
import Home from "./Pages/Home";
import Room from "./Pages/Room";
import Login from "./Components/Home/Login";
import Signup from "./Components/Home/Signup";
import { useEffect } from "react";
import axios from "axios";
import { allRate } from "./Middlewares/global-state";
import Protected from "./Middlewares/Protected";
import Booking from "./Pages/Booking";
function App() {
  const [allRates, setAllRates] = useAtom(allRate);
  useEffect(()=> {
    axios.get(`${process.env.REACT_APP_API_URL}/customer/room-rates`)
    .then((response) => {
        let rates = {};
        response.data.ratesData.forEach((rate) => {
            rates[rate.r_class] = rate.price;
        })
        setAllRates(rates);
    })
    .catch((err) => {
        console.error(err)
    })
  },[])
  return (

    <div className="App">

        <BrowserRouter>
        <Header/>
          <Routes>
            <Route path="/" element={<Protected><Home/></Protected>}/>
            <Route path="/login" element={<Protected><Login/></Protected>}/>
            <Route path="/signup" element={<Protected><Signup/></Protected>}/>
            <Route path="/:id" element={<Protected><Room/></Protected>}/>
            <Route path="/booking" element={<Protected><Booking/></Protected>}/>
          </Routes>
        </BrowserRouter>

    </div>
  );
}

export default App;
