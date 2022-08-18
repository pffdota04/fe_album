// import { Link } from "react-router-dom";
import "./style.css";
import background from "./../../assets/images/Office Branding Mockup.jpg";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { post } from "../../axiosCall";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [qrimg, setQrimg] = useState(null);

  let navigate = useNavigate();

  const register = () => {
    if (email === "" && password === "") alert("Không được để trống");
    else {
      setLoading(true);
      post("/user", {
        info: {
          name: name,
          address: address,
          email: email,
          password: password,
        },
      })
        .then((res) => {
          setLoading(false);
          setQrimg(res.data.qr);
          // navigate("/login", { state: res.data });
        })
        .catch((e) => {
          setLoading(false);
          console.log(e);
          alert(e.response.data.message);
        });
    }
  };

  return (
    <div className="login_background">
      {qrimg ? (
        <div className="text-center text-warning mx-auto bg-secondary p-3">
          <h3>Xác thực 2 yếu tố</h3>
          <button
            className="btn btn-primary m-3  text-warning "
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseExample"
            aria-expanded="false"
            aria-controls="collapseExample"
          >
            Xem mã QR
          </button>
          <div className="collapse" id="collapseExample">
            <div className="card card-body">
              <div dangerouslySetInnerHTML={{ __html: qrimg }} />
            </div>
          </div>
          <h6>Scan mã qr trên thiết bị tin cậy của bạn.</h6>
          <div className="text-danger bg-light p-1">
            <p className="m-0">Cảnh báo: Mã QR này chỉ sinh ra 1 lần!</p>
            <p className="m-0">Hãy scan mã trước khi rời khỏi trang này</p>
          </div>
          <Link
            to="/login"
            className="text-warning hover-opacity-half text-decoration-underline"
          >
            Đến trang đăng nhập
          </Link>
        </div>
      ) : loading ? (
        <p>Loading</p>
      ) : (
        <form className="w-50 mx-auto my-auto">
          <div className="mb-3">
            <label
              htmlFor="exampleInputEmail1"
              className="form-label text-light"
            >
              Email
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
          <div className="text-center mb-2">
            <div
              onClick={() => register()}
              className={"btn btn-warning " + (loading ? "disable" : "")}
            >
              Submit
            </div>
          </div>
          <div className="text-center text-warning">
            Đã có tài khoản?{" "}
            <Link
              to="/login"
              className="text-warning hover-opacity-half text-decoration-underline"
            >
              Đến trang đăng nhập
            </Link>
          </div>
        </form>
      )}
    </div>
  );
};
export default Register;
