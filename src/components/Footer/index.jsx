import "./style.css";
import { Link } from "react-router-dom";
import logo from "./../../assets/images/logo.svg";

function Footer() {
  return (
    <footer className="text-center text-lg-start bg-black text-muted">
      <section>
        <div className="container text-center text-md-start pt-3">
          <div className="row mt-3 text-white">
            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                <img src={logo} />
              </h6>
              <p>
                Tạo, quản lý và chia sẻ album của bạn. Upload các hình ảnh chất
                lượng cao kết hợp OpenSeaDragon tạo nên những bức ảnh siêu zoom.
              </p>
            </div>
            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
              <p>
                <Link to="/user" href="#!" className="text-reset link-color">
                  My Account
                </Link>
              </p>
              <p>
                <Link to="/sharedtome" className="text-reset link-color">
                  Shared to me
                </Link>
              </p>{" "}
            </div>
            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4 fs-mb">
              <p>
                <Link to="/myalbum" className="text-reset link-color">
                  My Album
                </Link>
              </p>
              <p>
                <Link to="/myimage" className="text-reset link-color">
                  My Image
                </Link>
              </p>
            </div>
            <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              {/* Links */}
              <h6 className="text-uppercase fw-bold mb-4 primary-color fs-mb">
                About
              </h6>
              <p className="link-color">
                <i className="fa fa-envelope me-3" />
                kiet.t.nguyen@taptap.com.vn
              </p>
              <p className="link-color">
                <i className="fa fa-phone me-3" /> 0123456789
              </p>
            </div>
          </div>
          <p className="m-0 p-0 text-center pb-1">
            <span>
              © 2022 Copyright: &nbsp;
              <a className="primary-color fw-bold link-color">ALBUM</a>
            </span>
          </p>
        </div>
      </section>
    </footer>
  );
}

export default Footer;
