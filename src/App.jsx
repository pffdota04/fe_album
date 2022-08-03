import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import Header from "./components/Header";
import UserPage from "./pages/UserPage";
import ScanPage from "./pages/ScanPage";
import Register from "./pages/Register";
import axios from "axios";

import userContext from "./context/userContext";
import { useContext, useEffect, useState } from "react";
import Album from "./pages/Album";
function App() {
  const userData = useContext(userContext);
  const [checkToken, setCheckToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetchData(token);
  }, []);

  const fetchData = async (token) => {
    try {
      if (token) {
        const respon = await axios.get(
          "http://localhost:5000/user/getUserByToken",
          {
            headers: { Authorization: token },
          }
        );
        setCheckToken(true);
        userData.setState(respon.data);
        console.log(respon.data);
      } else throw 0;
    } catch (error) {
      if (
        error.response &&
        error.response.data.message &&
        error.response.data.message.includes("expired")
      )
        alert("Phiên đăng nhập hết hạn");
      localStorage.removeItem("token");
      setCheckToken(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (checkToken === false) {
      fetchData(userData.state.token);
    } else if (checkToken === true) {
    }
  }, [userData.state]);

  return (
    <BrowserRouter>
      <Header checkToken={checkToken} />
      <>
        <main className="main bg-light container">
          {checkToken !== null &&
            (checkToken ? (
              <Routes>
                <Route path="*" element={<ErrorPage error={404} />} />
                <Route path="/" element={<HomePage />} />
                <Route path="/user" element={<UserPage />} />
                <Route path="/album/:id" element={<Album />} />
                <Route path="/404" element={<ErrorPage error={404} />} />
              </Routes>
            ) : (
              <Routes>
                <Route path="*" element={<ErrorPage error={404} />} />
                <Route path="/" element={<HomePage />} />
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
