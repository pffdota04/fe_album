import { Link } from "react-router-dom";
import "./style.css";
import headGif from "./../../assets/images/head.gif";
const ErrorPage = (props) => {
  const { error } = props;
  return (
    <div className="text-center primary-color container-background">
      <div>
        {error === 404 ? (
          <section className="collage-404">
            <h3 className="mt-3">Không tìm thấy trang</h3>
            <h1>404</h1>
            <div className="collage-404-images">
              {Array(52)
                .fill(1)
                .map((el, i) => (
                  <Link to="/" className="loaded introduced">
                    <img src={headGif} />
                  </Link>
                ))}
            </div>
          </section>
        ) : (
          <section>
            <h1>{error}</h1>
          </section>
        )}
      </div>
    </div>
  );
};
export default ErrorPage;
