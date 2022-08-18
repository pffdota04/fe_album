import "./style.css";
import { Link } from "react-router-dom";
import { useState } from "react";

function ImagePreview({ e, setSelect, isOwner = false }) {
  const [hover, setHover] = useState(false);
  const onHover = () => {
    setHover(true);
  };

  const leaveHover = () => {
    setHover(false);
  };

  return (
    <div
      className="position-relative d-inline-block m-3 "
      onMouseOver={() => onHover()}
      onMouseOut={() => leaveHover()}
    >
      <div
        className={
          "hover-img position-absolute " + (hover ? "d-block" : "d-none")
        }
      >
        <div className="p-3 w-100 h-100 d-flex flex-wrap justify-content-center align-items-center">
          <div className="text-light w-100 text-center">
            <strong>{e.name}</strong>
            <br />
          </div>{" "}
          <Link
            to={"/image/" + e._id}
            className="item-img-action p-1"
            target={"_blank"}
          >
            <span data-bs-toggle="tooltip" data-bs-placement="top" title="View">
              👁
            </span>
          </Link>
          {isOwner && (
            <>
              <div
                className="item-img-action text-center noselect cursor-pointer p-1"
                data-bs-toggle="modal"
                data-bs-target="#editImg"
                onClick={() => setSelect(e)}
              >
                <span
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title="Edit"
                  onClick={() => setSelect(e)}
                >
                  🖊
                </span>
              </div>
              <div
                className="item-img-action text-center noselect cursor-pointer p-1"
                data-bs-toggle="modal"
                data-bs-target="#deleteImg"
                onClick={() => setSelect(e)}
              >
                <span
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title="Delete"
                  onClick={() => setSelect(e)}
                >
                  🗑
                </span>
              </div>
              <div
                className="item-img-action text-center noselect cursor-pointer p-1"
                data-bs-toggle="modal"
                data-bs-target="#shareImg"
              >
                <span
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title="Share"
                  onClick={() => setSelect(e)}
                >
                  🔗
                </span>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="height-width text-light fw-bolder ">
        {e.height}x{e.width}
      </div>
      <img
        src={"http://localhost:5000/image/getcustom/?file=" + e._id + ".png"}
        loading="lazy"
        style={{ maxWidth: "350px", objectFit: "cover" }}
        height="200"
        alt="dsfrefsdgdseg"
        className="img-preview rounded rounded-3"
      />
    </div>
  );
}

export default ImagePreview;
