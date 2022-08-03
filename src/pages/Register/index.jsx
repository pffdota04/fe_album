// import { Link } from "react-router-dom";
import "./style.css";
import background from "./../../assets/images/Office Branding Mockup.jpg";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const userLocal = localStorage.getItem("user");

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);

  let navigate = useNavigate();
  const register = () => {
    if (email === "" && password === "") alert("Không được để trống");
    else {
      setLoading(true);
      axios
        .post("http://localhost:5000/user", {
          info: {
            name: name,
            address: address,
            email: email,
            password: password,
          },
        })
        .then((res) => {
          alert(JSON.stringify(res.data));
          navigate("/login", { state: res.data });
        })
        .catch((e) => {
          setLoading(true);
          console.log(e);

          alert(e.response.data.message);
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
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="exampleInputEmail1"
              className="form-label text-light"
            >
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="exampleInputEmail1"
              className="form-label text-light"
            >
              Address
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={(e) => setAddress(e.target.value)}
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
                if (e.key === "Enter") register();
              }}
            />
          </div>
          <div className="text-center">
            <div
              onClick={() => register()}
              className={"btn btn-warning " + (loading ? "disable" : "")}
            >
              Submit
            </div>
          </div>
        </form>
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
};
export default Register;
