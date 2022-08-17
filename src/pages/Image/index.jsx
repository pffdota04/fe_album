// import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import "./style.css";
import {
  Link,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import userContext from "../../context/userContext";
import axios from "axios";
import OpenSeaDragonViewer from "./../../components/OpenSeaDragonViewer/OpenSeaViewer";
import { get } from "../../axiosCall";
import Loading from "../../components/Loading";
// import { parseString } from "xml2js";
const Image = (props) => {
  let { id } = useParams();

  let navigate = useNavigate();
  const userData = useContext(userContext);
  const [image, setImage] = useState(null);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    get("/image/info?id=" + id)
      .then((res) => {
        setImage(res.data);
        if (res.data.createBy && res.data.createBy == userData?.state._id)
          setIsOwner(true);
        else setIsOwner(false);
        // if (res.data.status == false) navigate("404");
      })
      .catch((e) => {
        navigate("404");
        console.log(e);
      });
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
      {!image ? (
        <Loading />
      ) : (
        <>
          <h1>Image name: {image.name}</h1>
          <h6>Upload day: {getFormattedDate(image.uploadDay)}</h6>
          {/* {JSON.stringify(image)} */}
          {isOwner ? <div className="btn btn-danger">Remove this img</div> : ""}
          <hr />
          <div className="p-3">
            {image.status ? (
              <OpenSeaDragonViewer
                image={{
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
                        image?._id +
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
            ) : (
              <h3 className="text-danger">
                You do not have permission to view this image
              </h3>
            )}
          </div>
        </>
      )}
    </div>
  );
};
export default Image;
