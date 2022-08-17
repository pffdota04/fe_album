import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "./../../assets/images/logo.svg";
import { useContext, useEffect } from "react";
import userContext from "../../context/userContext";
import { get } from "../../axiosCall";
function Header({ checkToken }) {
  let navigate = useNavigate();
  const userData = useContext(userContext);

  const logout = async () => {
    // localStorage.removeItem("userAlnum");
    await get("/user/logout");
    window.location.pathname = "/login";
    userData.state.setState({
      _id: null,
      email: null,
      name: null,
      sharedAlbums: null,
      sharedImages: null,
      token: null,
    });
  };
  return (
    <header>
      <nav className="navbar navbar-light ">
        <Link to="/">
          <img src={logo} className="navbar-brand ps-3" />
        </Link>

        {checkToken !== null &&
          (checkToken ? (
            <form className="form-inline">
              <div onClick={() => logout()} className="btn btn-danger me-3  ">
                Logout
              </div>
            </form>
          ) : (
            <form className="form-inline">
              <Link to="login" className="btn btn-warning me-3">
                Login
              </Link>
              <Link to="register" className="btn btn-warning me-3">
                Register
              </Link>
            </form>
          ))}
      </nav>
    </header>
  );
}

export default Header;
