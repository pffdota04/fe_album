import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import Header from "./components/Header";
import UserPage from "./pages/UserPage";
import ScanPage from "./pages/ScanPage";
import Register from "./pages/Register";
import MyAlbum from "./pages/MyAlbum";

import userContext from "./context/userContext";
import { useContext, useEffect, useState } from "react";
import Album from "./pages/Album";
import Image from "./pages/Image";
import { get } from "./axiosCall";
import LandingPage from "./pages/LandingPage";
function App() {
  const userData = useContext(userContext);
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const email = localStorage.getItem("userAlnum");
    if (email) setUserEmail(true);
  }, []);

  const fetchData = async () => {
    try {
      const respon = await get("/user/getUserByToken");
      setUserEmail(true);
      userData.setState(respon.data);
      localStorage.setItem("userAlnum", respon.data);
      console.log(respon.data);
    } catch (error) {
      if (
        error.response &&
        error.response.data.message &&
        error.response.data.message.includes("expired")
      )
        alert("Phiên đăng nhập hết hạn");
      localStorage.removeItem("userAlnum");
      setUserEmail(false);
    }
  };

  useEffect(() => {
    if (!userEmail) {
      fetchData();
    }
    //  else if (checkToken === true) {
    // }
  }, [userData.state]);

  return (
    <BrowserRouter>
      <Header checkToken={userEmail} />
      <>
        <main className="main container">
          {userEmail !== null &&
            (userEmail ? (
              <Routes>
                <Route path="*" element={<ErrorPage error={404} />} />
                <Route path="/" element={<HomePage userEmail={userData} />} />
                <Route path="/user" element={<UserPage />} />
                <Route path="/myalbum" element={<MyAlbum />} />
                <Route path="/album/:id" element={<Album />} />
                <Route path="/image/:id" element={<Image />} />
                <Route path="/404" element={<ErrorPage error={404} />} />
              </Routes>
            ) : (
              <Routes>
                <Route path="*" element={<ErrorPage error={404} />} />
                <Route
                  path="/image/:id"
                  element={<ErrorPage error="PLEASE LOGIN" />}
                />
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/letscan" element={<ScanPage />} />
                <Route path="/register" element={<Register />} />{" "}
                <Route path="/404" element={<ErrorPage error={404} />} />
              </Routes>
            ))}
        </main>
      </>
    </BrowserRouter>
  );
}

export default App;
