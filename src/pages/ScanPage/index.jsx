import { useContext, useEffect, useState } from "react";
import "./style.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import EnterCode from "../../components/EnterCode";
import userContext from "../../context/userContext";

const ScanPage = () => {
  const { state } = useLocation();
  const [imgQr, setImgQr] = useState(null);
  const [code, setCode] = useState(new Array(6).fill(0));
  let navigate = useNavigate();
  const userData = useContext(userContext);

  useEffect(() => {
    if (state.scaned) setImgQr("-1");
  });

  const check = () => {
    axios
      .post("http://localhost:5000/user/checkcode", {
        email: state.email,
        otpToken: code.join(""),
      })
      .then((res) => {
        if (res.data.token) {
          localStorage.setItem("token", res.data.token);
          userData.setState(res.data);
          navigate("/user");
        } else alert("Code Không đúng!");
      })
      .catch((e) => {
        alert("Đã xảy ra lỗi");
        console.log(e);
      });
  };

  const getQr = () => {
    axios
      .post("http://localhost:5000/user/createqrcode", {
        email: state.email,
      })
      .then((res) => {
        setImgQr(res.data);
        console.log(res.data);
      });
  };
  return (
    <div className="container text-center">
      {/* {JSON.stringify(state)} */}

      {imgQr == -1 ? (
        <>
          <p>Tài khoảng đã xác thực OPT, mở app của bạn để xem mã!</p>

          <EnterCode setCode={setCode} code={code} />
          <div className="btn btn-warning mt-2" onClick={() => check()}>
            Check
          </div>
        </>
      ) : imgQr !== null ? (
        <div>
          {" "}
          <p>Tài khoản này chưa quét mã QR xác thực TOTP!</p>
          <div dangerouslySetInnerHTML={{ __html: imgQr.QRCodeImage }}></div>
          <p>
            Hãy quét mã này trên Thiết bị tin cậy của bạn bằng Google
            Authenticator!
          </p>
          <EnterCode setCode={setCode} code={code} />
          <div className="btn btn-warning mt-2" onClick={() => check()}>
            Check
          </div>
        </div>
      ) : (
        <div className="btn btn-warning mt-3" onClick={() => getQr()}>
          Lấy mã QR
        </div>
      )}
      <hr />
    </div>
  );
};
export default ScanPage;
