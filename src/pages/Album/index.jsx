// import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import "./style.css";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import userContext from "../../context/userContext";
import OpenSeaDragonViewer from "./../../components/OpenSeaDragonViewer/OpenSeaViewer";
import { get, post } from "../../axiosCall";
// import { parseString } from "xml2js";
const Album = (props) => {
  let { id } = useParams();

  const userData = useContext(userContext);
  const [myAlbum, setMyAlbum] = useState([]);
  const [onwer, setOnwer] = useState({});
  const [listImages, setListImages] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [nameImage, setNameImage] = useState("");
  useEffect(() => {
    if (userData.state.token) {
      get("http://localhost:5000/album/" + id).then((res) => {
        setMyAlbum(res.data);
        get("http://localhost:5000/user/byid/" + res.data.uid).then((res2) =>
          setOnwer(res2.data)
        );
        get("http://localhost:5000/image/albumid/" + id).then((res3) =>
          setListImages(res3.data)
        );
      });
    }
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

  const handleUpload = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("imgs", selectedFile);
    formData.append("albumId", myAlbum._id);
    formData.append("name", nameImage);
    formData.append("createBy", userData.state._id);
    formData.append("sharedTo", "[]");
    try {
      const response = await post(
        "http://localhost:5000/image/upload",
        formData
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <h1>Album name: {myAlbum.name}</h1>
      <h1>Create by: {onwer.email}</h1>
      <h1>Total image: {myAlbum.totalImage}</h1>
      <h1>Create day: {getFormattedDate(myAlbum.createDay)}</h1>
      <h1>
        Shared to: {myAlbum.length > 0 ? myAlbum.sharedTo.length : 0} people
      </h1>
      <input
        type="file"
        onChange={(event) => setSelectedFile(event.target.files[0])}
      />
      <input
        type="text"
        placeholder="name of image"
        onChange={(event) => setNameImage(event.target.value)}
      />
      <div className="btn btn-warning" onClick={handleUpload}>
        UPLOAD
      </div>
      <hr />

      {listImages.length > 0 ? (
        listImages.map((e) => (
          <Link to={"/image/" + e._id} className="d-inline-block m-3">
            <img
              src={
                "http://localhost:5000/image/getcustom/?format=png&h=100&file=" +
                e.filename
              }
            />
          </Link>
        ))
      ) : (
        <p> This album chưa có hình ảnh nào</p>
      )}
      <hr />
      {/* <OpenSeaDragonViewer
        image={{
          // source: {
          //   type: "image",
          //   url: "http://localhost:5000/image?file=output.dzi",
          // },
          tileSources: tileSourceFromData(
            "http://localhost:5000/image?file=output.dzi",
            "//localhost:5000/image/getFolderDzi/"
            // "http://localhost:5000/image?file=output-QTUEQ1\\output_files"
          ),
        }}
      /> */}
    </div>
  );
};
export default Album;
