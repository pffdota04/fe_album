// import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import "./style.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import userContext from "../../context/userContext";
import axios from "axios";
import AlbumItem from "../../components/AlbumItem";
import { get, post } from "../../axiosCall";

const UserPage = (props) => {
  let navigate = useNavigate();
  const userData = useContext(userContext);
  const [myAlbum, setMyAlbum] = useState([]);
  const [newName, setNewName] = useState("");

  useEffect(() => {
    if (userData.state.token) {
      get("http://localhost:5000/album/").then((res) => setMyAlbum(res.data));
    }
  }, [userData]);

  const createAlbum = () => {
    post("http://localhost:5000/album/", { name: newName })
      .then((res) => alert(res.data))
      .catch((e) => console.log(e));
  };

  return (
    <div className="container">
      <p> IF YOU Sê this line, yuou was Authenticator successed!!</p>
      <hr />
      {/* {JSON.stringify(userData.state)} */}
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#createAlbum"
      >
        create album
      </button>

      <h1>My album:</h1>
      {myAlbum.length === 0 ? (
        <h3>Bạn chưa có albu, nào</h3>
      ) : (
        <>
          <div className="row">
            {myAlbum.map((e) => (
              <AlbumItem e={e} />
            ))}
          </div>
        </>
      )}
      <div
        className="modal fade"
        id="createAlbum"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                create album
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <input
                class="form-control"
                type="text"
                placeholder="Name album"
                aria-label="default input example"
                onChange={(e) => setNewName(e.target.value)}
                value={newName}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => createAlbum()}
                data-bs-dismiss="modal"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserPage;
