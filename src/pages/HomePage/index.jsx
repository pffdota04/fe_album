import { Link, useNavigate } from "react-router-dom";
import "./style.css";

const HomePage = ({ userEmail }) => {
  const navi = useNavigate();
  return (
    <div className="container">
      <h1>Welcome, {userEmail.state.name}!</h1>
      <div className="row position-relative p-0 m-0 text-center fw-bolder text-light noselect">
        <span className="img-mu position-absolute"></span>
        <div className="col-6 p-0 square-50 home-square home-square-1">
          <div
            onClick={() => navi("/user")}
            className="bg-secondary cursor-pointer d-block"
          >
            <div>My Account</div>
          </div>
        </div>
        <div className="col-6 p-0 square-50 home-square home-square-2">
          <div
            className="bg-danger  cursor-pointer d-block"
            onClick={() => navi("/sharedtome")}
          >
            <span>Shared To Me</span>
          </div>
        </div>
        <div className="col-6 p-0 square-50 home-square home-square-3">
          <div
            className="bg-warning  cursor-pointer d-block"
            onClick={() => navi("/myalbum")}
          >
            <span>My Album</span>
          </div>
        </div>
        <div className="col-6 p-0 square-50 home-square home-square-4">
          <div
            className="bg-primary  cursor-pointer d-block"
            onClick={() => navi("/myimage")}
          >
            <span>My Image</span>
          </div>
        </div>
      </div>
      {/* {JSON.stringify(userEmail)} */}
    </div>
  );
};
export default HomePage;
