// import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import "./style.css";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import userContext from "../../context/userContext";
import axios from "axios";
import OpenSeaDragonViewer from "./../../components/OpenSeaDragonViewer/OpenSeaViewer";
// import { parseString } from "xml2js";
const Album = (props) => {
  let { id } = useParams();

  const userData = useContext(userContext);
  const [myAlbum, setMyAlbum] = useState([]);
  const [onwer, setOnwer] = useState({});
  const [listImages, setListImages] = useState([]);

  useEffect(() => {
    if (userData.state.token) {
      axios
        .get("http://localhost:5000/album/" + id, {
          headers: { Authorization: userData.state.token },
        })
        .then((res) => {
          setMyAlbum(res.data);
          axios
            .get("http://localhost:5000/user/byid/" + res.data.uid)
            .then((res2) => setOnwer(res2.data));
          axios
            .get("http://localhost:5000/image/albumid/" + id)
            .then((res3) => setListImages(res3.data));
        });
    }
    tileSourceFromData();
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

  var tileSourceFromData = function (data, filesUrl) {
    axios.get("http://localhost:5000/image?file=output.dzi").then(
      (res) => console.log(res.data)
      // parseString(res.data, function (err, result) {
      //   console.log(result);
      // })
    );
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
      <hr />

      {listImages.length > 0 ? (
        listImages.map((e) => (
          <div className="d-inline-block m-3">
            <img
              src={
                "http://localhost:5000/image/getcustom/?format=png&h=100&file=" +
                e.filename
              }
            />
          </div>
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
      <div className="container">
        <OpenSeaDragonViewer
          image={{
            source: {
              xmlns: "http://schemas.microsoft.com/deepzoom/2008",
              Url: "http://localhost:5000/image/getFolderDzi/",
              Format: "png",
              Overlap: "0",
              TileSize: "512",
              Size: {
                Width: "6000",
                Height: "2906",
              },
            },
          }}
        ></OpenSeaDragonViewer>
      </div>
    </div>
  );
};
export default Album;
