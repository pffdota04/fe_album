// import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import "./style.css";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import userContext from "../../context/userContext";
import axios from "axios";
import OpenSeaDragonViewer from "./../../components/OpenSeaDragonViewer/OpenSeaViewer";
import { get } from "../../axiosCall";
// import { parseString } from "xml2js";
const Image = (props) => {
  let { id } = useParams();

  const userData = useContext(userContext);
  const [image, setImage] = useState(null);
  const [onwer, setOnwer] = useState({});
  const [listImages, setListImages] = useState([]);

  useEffect(() => {
    get("http://localhost:5000/image/info?id=" + id)
      .then((res) => {
        setImage(res.data);
      })
      .catch(() => {});
  }, [userData]);

  function getFormattedDate(date) {
    date = new Date(date);
    var year = date.getFullYear();

    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : "0" + month;

    var day = date.getDate().toString();
    day = day.length > 1 ? day : "0" + day;

    return month + "/" + day + "/" + year;
  }

  return (
    <div className="container ">
      {image && (
        <>
          <h1>Image name: {image.name}</h1>
          <h6>Upload day: {getFormattedDate(image.uploadDay)}</h6>
          {/* {JSON.stringify(image)} */}
          <hr />
        </>
      )}
      <div className="p-3">
        <OpenSeaDragonViewer
          image={{
            mpp: null,
            name: null,
            source: {
              Image: {
                Format: "png",
                Overlap: 2,
                Size: {
                  Height: image?.height,
                  Width: image?.width,
                },
                TileSize: 256,
                Url:
                  "http://localhost:5000/image/getFolderDzi/" +
                  image?.filename.split(".")[0] +
                  "/",
                xmlns: "http://schemas.microsoft.com/deepzoom/2008",
              },
            },
          }}
          // Url là api có dạng: image/getFolderDzi/:filename/:number/:image_name
          // filename tương ứng với files chứa các hình ảnh nhỏ được sin ra
          // còn number và imgae_name thì opensea tự điền vào khi zoom ảnh
          // ví dụ: localhost:5000/image/getFolderDzi/3hx-hand/12/1_1.png
          // thì chỉ cần điền localhost:5000/image/getFolderDzi/3hx-hand
          // còn 12/1_1.png thì opensea nó tự biết.
        ></OpenSeaDragonViewer>
      </div>
    </div>
  );
};
export default Image;
