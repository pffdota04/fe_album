import { useContext, useEffect, useRef, useState } from "react";
import "./style.css";
import { useNavigate, useParams } from "react-router-dom";
import userContext from "../../context/userContext";
import { get, post, put, remove } from "../../axiosCall";
import ImagePreview from "../../components/ImagePreview";
import axios from "axios";
import Loading from "../../components/Loading";
import { start } from "@popperjs/core";
import InfinityScroll from "../../components/InfinityScroll";

const MyImage = (props) => {
  const userData = useContext(userContext);
  const [myImage, setListImages] = useState(null);
  const [nowSelect, setNowSelect] = useState(null);
  const [emailShare, setEmailShare] = useState("");
  const [listShared, setListShared] = useState([]);
  const [newName, setNewName] = useState("");
  const [listOrigin, setListOrigin] = useState([]); // list goc tu api
  const [startAt, setStartAt] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [pauseFetct, setPauseFetct] = useState(false);

  useEffect(() => {
    if (userData.state._id) fetchAgain();
  }, [userData]);

  const fetchAgain = () => {
    get("/image/myimage").then((res) => {
      if (res.data !== "empty") {
        setListImages(res.data);
        setListOrigin(res.data);
      } else {
        alert("Không có ảnh nào");
      }
    });
  };

  const deleteImage = async () => {
    try {
      const del = await remove("/image?_id=" + nowSelect._id);
      fetchAgain();
    } catch (error) {
      console.log(error);
    }
  };

  const shareImage = async () => {
    try {
      const share = await post("/image/share", {
        _id: nowSelect._id,
        email: emailShare,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const editImage = async () => {
    const res = await put("/image?_id=" + nowSelect._id + "&to=" + newName);
    alert(res.data);
  };

  let timeout = 0;
  const search = (e) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      if (e.target.value == "") {
        setListImages(listOrigin);
        setPauseFetct(false);
      } else {
        setListImages(
          listOrigin.filter((a) => {
            return a.name.toLowerCase().includes(e.target.value.toLowerCase());
          })
        );
        setPauseFetct(true);
      }
    }, 1000);
  };

  const getListById = async () => {
    const listuser = await post("/user/listbyid", {
      list: nowSelect?.sharedTo,
    });
    setListShared(listuser.data);
  };

  const unshare = (email) => {
    post("/image/unshare", {
      _id: nowSelect._id,
      email: email,
    })
      .then((res) => console.log(res.data))
      .catch((e) => console.error(e));
  };

  const fetchMore = async (at) => {
    const data = await get("/image/myimage?startAt=" + at);
    if (data.data !== "empty") {
      setListImages((prev) => [...prev, ...data.data]);
      setListOrigin((prev) => [...prev, ...data.data]);
      if (data.data.length < 5) setHasMore(false);
    } else {
      setHasMore(false);
    }
  };

  return (
    <>
      {myImage !== null ? (
        <div>
          <h1>My Image </h1>
          <input type="text" onChange={search} placeholder="search by name" />
          <InfinityScroll
            height="400px"
            fetchData={fetchMore}
            step={5}
            hasMore={hasMore}
            pauseFetch={pauseFetct}
          >
            {myImage.map((e, i) => (
              <ImagePreview e={e} setSelect={setNowSelect} isOwner />
            ))}
          </InfinityScroll>
          {/* MODAL */}
          {/* Modal delete img */}
          <div
            className="modal fade"
            id="deleteImg"
            tabIndex="-1"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered">
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

                <div className="modal-body">Are yoy sure? </div>
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
                    onClick={deleteImage}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Modal edit img */}
          <div
            className="modal fade"
            id="editImg"
            tabIndex="-1"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered">
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
                    Old Name: <strong>{nowSelect?.name}</strong>
                  </p>
                  New name:{" "}
                  <input
                    type="text"
                    onChange={(e) => setNewName(e.target.value)}
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
                    onClick={editImage}
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Modal share img */}
          <div
            className="modal fade"
            id="shareImg"
            tabIndex="-1"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">
                    Share Image {nowSelect?.name}x
                  </h5>
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
                    onChange={(e) => setEmailShare(e.target.value)}
                  />
                  <div className="btn btn-primary ms-1" onClick={shareImage}>
                    sharex
                  </div>
                  <br /> This image has been shared with{" "}
                  {nowSelect?.sharedTo.length} people.
                  {nowSelect?.sharedTo.length ? (
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
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};
export default MyImage;
