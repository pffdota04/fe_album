import { useContext, useEffect, useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import userContext from "../../context/userContext";
import axios from "axios";
import { get, put } from "../../axiosCall";

const UserPage = (props) => {
  const userData = useContext(userContext);
  const [userAllData, setUserAllData] = useState({});
  const [newData, setNewData] = useState({
    name: "",
    address: "",
    password: "",
  });

  useEffect(() => {
    if (userData.state) {
      get("/user").then((res) => {
        setUserAllData(res.data);
        setNewData({
          name: res.data.name,
          address: res.data.address,
          password: "",
        });
      });
    }
  }, [userData]);

  const updateAccount = () => {
    put("/user", newData).then((res) => alert(res.data));
  };

  return (
    <div className="container">
      <div>
        <div className="row g-2   align-items-center justify-content-center">
          <div className="col-auto">
            <label htmlFor="inputPassword6" className="col-form-label ">
              Email
            </label>
          </div>
          <div className="col-auto">
            <input
              type="email"
              id="inputPassword6"
              className="form-control"
              aria-describedby="passwordHelpInline"
              value={userAllData.email}
              disabled
            />
          </div>
        </div>
        <div className="row g-2   mt-1 align-items-center justify-content-center">
          <div className="col-auto">
            <label htmlFor="inputPassword6" className="col-form-label">
              Name
            </label>
          </div>
          <div className="col-auto">
            <input
              value={newData.name}
              onChange={(e) =>
                setNewData((prev) => ({ ...prev, name: e.target.value }))
              }
              type="text"
              id="inputPassword6"
              className="form-control"
              aria-describedby="passwordHelpInline"
            />
          </div>
        </div>
        <div className="row g-2   mt-1 align-items-center justify-content-center">
          <div className="col-auto">
            <label htmlFor="inputPassword6" className="col-form-label">
              Address
            </label>
          </div>
          <div className="col-auto">
            <input
              value={newData.address}
              onChange={(e) =>
                setNewData((prev) => ({ ...prev, address: e.target.value }))
              }
              type="text"
              id="inputPassword6"
              className="form-control"
              aria-describedby="passwordHelpInline"
            />
          </div>
        </div>
        <div className="row g-2   mt-1 align-items-center justify-content-center">
          <div className="col-auto">
            <label htmlFor="inputPassword6" className="col-form-label">
              New Password
            </label>
          </div>
          <div className="col-auto">
            <input
              value={newData.password}
              onChange={(e) =>
                setNewData((prev) => ({ ...prev, password: e.target.value }))
              }
              type="password"
              id="inputPassword6"
              className="form-control"
              aria-describedby="passwordHelpInline"
              placeholder="Không đổi để trống"
            />
          </div>
        </div>
        <div className="text-center mt-3">
          <div className="btn btn-warning " onClick={updateAccount}>
            UPDATE
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserPage;
