// import { Link } from "react-router-dom";
import { Link } from "react-router-dom";
import "./style.css";

const LandingPage = (props) => {
  return (
    <div>
      <div className="landing-bg1"></div>
      <div className="landing-bg2"></div>
      <div className="landing-bg3"></div>
      <div className="text-center p-3">
        <Link to="login" className="btn-sign-up btn btn-warning me-1">
          SIGN-UP
        </Link>
        <Link to="register" className="btn-sign-up btn btn-warning">
          SIGN-UP
        </Link>
      </div>
      <div className="footer-landing bg-dark">
        <hr />
        <hr />
        <hr />
        <hr />
        <hr />
        <hr />
        <hr />
        <hr />
        <hr />
        <hr />
        <hr />
        <hr />
        <hr />
        <hr />
        <hr />
      </div>
    </div>
  );
};
export default LandingPage;
