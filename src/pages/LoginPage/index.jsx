// import { Link } from "react-router-dom";
import "./style.css";
import background from "./../../assets/images/Office Branding Mockup.jpg";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { post } from "../../axiosCall";
import EnterCode from "../../components/EnterCode";
import userContext from "../../context/userContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [code, setCode] = useState(new Array(6).fill(0));
  const userData = useContext(userContext);

  let navigate = useNavigate();
  const login = () => {
    if (email === "" && password === "") alert("Không được để trống");
    else {
      setLoading(true);
      post("/user/login", {
        email: email,
        password: password,
        otpToken: code.join(""),
      })
        .then((res) => {
          // navigate("/letscan", { state: res.data });
          if (res.data.check) {
            userData.setState(res.data);
            navigate("/");
          } else alert("Code Không đúng!");
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
        <form className="mx-auto my-auto">
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
          <div className="mb-3">
            <label
              htmlFor="exampleInputPassword1"
              className="form-label text-light"
              o
            >
              2FA CODE
            </label>
            <EnterCode setCode={setCode} code={code} enter={login} />
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
