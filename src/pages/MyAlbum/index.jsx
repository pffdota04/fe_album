// import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import "./style.css";
import userContext from "../../context/userContext";
import AlbumItem from "../../components/AlbumItem";
import { get, post, put, remove } from "../../axiosCall";

const MyAlbum = () => {
  const userData = useContext(userContext);
  const [myAlbum, setMyAlbum] = useState([]);
  const [myAlbumOrigin, setMyAlbumOrigin] = useState([]);
  const [newName, setNewName] = useState("");
  const [select, setSelect] = useState({});
  const [newNameEdit, setNewNameEdit] = useState("");
  const [shareAlbumTo, setShareAlbumTo] = useState("");
  const [listShared, setListShared] = useState([]);

  useEffect(() => {
    if (userData.state) {
      fetchAgain();
    }
  }, [userData]);

  useEffect(() => {
    setShareAlbumTo("");
  }, [select]);

  const createAlbum = () => {
    post("/album/", { name: newName })
      .then((res) => {
        fetchAgain();
        setNewName("");
      })
      .catch((e) => console.log(e));
  };

  let timeout = 0;
  const search = (e) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      if (e.target.value == "") setMyAlbum(myAlbumOrigin);
      else
        setMyAlbum(
          myAlbumOrigin.filter((a) => {
            return a.name.includes(e.target.value.toLowerCase());
          })
        );
    }, 1000);
  };

  const editAlbum = () => {
    put("/album/", { _id: select._id, newName: newNameEdit })
      .then((res) => {
        fetchAgain();
        setNewNameEdit("");
        alert("ok");
      })
      .catch((e) => console.log(e));
  };

  const fetchAgain = () => {
    get("/album/")
      .then((res) => {
        setMyAlbum(res.data);
        setMyAlbumOrigin(res.data);
      })
      .catch((e) => console.log(e));
  };

  const delteAlbum = () => {
    // alert('dfasd')
    remove("/album?_id=" + select._id)
      .then(() => fetchAgain())
      .catch((e) => console.log(e));
  };

  const shareAlbum = () => {
    post("/album/share", {
      _id: select._id,
      email: shareAlbumTo,
    })
      .then(() => fetchAgain())
      .catch((e) => console.log(e));
  };

  const unShareAlbum = () => {
    post("/album/unshare", {
      _id: select._id,
      email: shareAlbumTo,
    })
      // .then(() => fetchAgain())
      .catch((e) => console.log(e));
  };

  const getListById = async () => {
    const listuser = await post("/user/listbyid", {
      list: select?.sharedTo,
    });
    setListShared(listuser.data);
  };

  const unshare = (email) => {
    post("/album/unshare", {
      _id: select._id,
      email: email,
    })
      .then(() => fetchAgain())
      .catch((e) => console.error(e));
  };

  return (
    <div className="container">
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
      <input type="text" onChange={search} placeholder="search by name" />

      {myAlbum.length === 0 ? (
        <h3>Bạn chưa có albu, nào</h3>
      ) : (
        <>
          <div className="row">
            {myAlbum.map((e, i) => (
              <AlbumItem e={e} setSelect={setSelect} key={i} />
            ))}
          </div>
        </>
      )}
      <div
        className="modal fade"
        id="createAlbum"
        tabIndex="-1"
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
                className="form-control"
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

      {/* MODAL EDIT ALBUM */}
      <div
        className="modal fade"
        id="editAlbum"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit image</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p>
                Old Name: <strong>{select?.name}</strong>
              </p>
              New name:
              <input
                type="text"
                value={newNameEdit}
                onChange={(e) => setNewNameEdit(e.target.value)}
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
                data-bs-dismiss="modal"
                onClick={editAlbum}
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* MODAL DELETE */}
      <div
        className="modal fade"
        id="deleteAlbum"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Delete image</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="modal-body">
                Are yoy sure? This thing wil delte all image ínide albumo
              </div>
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
                className="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={delteAlbum}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* MODAL SHARE */}
      <div
        className="modal fade"
        id="shareAlbum"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Shảe image</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              Enter user email to share:{" "}
              <input
                type="text"
                onChange={(e) => setShareAlbumTo(e.target.value)}
              />
              <div className="btn btn-primary ms-1" onClick={shareAlbum}>
                share
              </div>
              <br /> This Album has been shared with {select?.sharedTo?.length}{" "}
              people.
              {select?.sharedTo?.length ? (
                <button
                  onClick={getListById}
                  className="btn btn-primary ms-1"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseExample"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                  id="btnCollapseExample"
                >
                  Xem
                </button>
              ) : (
                ""
              )}
              <div className="collapse" id="collapseExample">
                <div className="card card-body mt-2">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Email</th>
                        <th scope="col">Name</th>
                        <th scope="col">Unshare</th>
                      </tr>
                    </thead>
                    <tbody>
                      {listShared.map((e, i) => (
                        <tr key={i}>
                          <th scope="row">{i}</th>
                          <td>{e.email}</td>
                          <td>{e.name}</td>
                          <td>
                            <div
                              className="btn btn-outline-danger"
                              onClick={() => unshare(e.email)}
                            >
                              ⛔
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
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
                data-bs-dismiss="modal"
                // onClick={editImage}
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MyAlbum
