// import { Link } from "react-router-dom";
import "./style.css";
import background from "./../../assets/images/Office Branding Mockup.jpg";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const userLocal = localStorage.getItem("user");

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);

  let navigate = useNavigate();
  const login = () => {
    if (email === "" && password === "") alert("Không được để trống");
    else {
      setLoading(true);
      axios
        .post("http://localhost:5000/user/login", {
          email: email,
          password: password,
        })
        .then((res) => {
          localStorage.setItem("user", JSON.stringify(res.data));
          alert(JSON.stringify(res.data));
          // if (res.data.scaned)
          navigate("/letscan", { state: res.data });
          // else navigate("/yourqr", { state: res.data });
        })
        .catch((e) => {
          setLoading(true);
          console.log(e);
          alert("Có gì đó sai...");
        });
    }
  };

  return (
    <div className="login_background">
      {loading ? (
        <form className="w-50 mx-auto my-auto">
          <div className="mb-3">
            <label
              htmlFor="exampleInputEmail1"
              className="form-label text-light"
            >
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") login();
              }}
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="exampleInputPassword1"
              className="form-label text-light"
              o
            >
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") login();
              }}
            />
          </div>
          <div className="text-center">
            <div
              onClick={() => login()}
              className={"btn btn-warning " + (loading ? "disable" : "")}
            >
              Submit
            </div>
            ...
          </div>
        </form>
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
};
export default LoginPage;
