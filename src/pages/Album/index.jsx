import { useContext, useEffect, useState } from "react";
import "./style.css";
import { useNavigate, useParams } from "react-router-dom";
import userContext from "../../context/userContext";
import { get, post, put, remove } from "../../axiosCall";
import ImagePreview from "../../components/ImagePreview";
import axios from "axios";
import Loading from "../../components/Loading";

const Album = (props) => {
  let { id } = useParams();

  const userData = useContext(userContext);
  const [myAlbum, setMyAlbum] = useState(null);
  const [onwer, setOnwer] = useState({});
  const [listImages, setListImages] = useState([]); // = listOrigin sau khi filter
  const [listOrigin, setListOrigin] = useState([]); // list goc tu api

  const [selectedMultiFile, setSelectedMultiFile] = useState([]);
  const [nowSelect, setNowSelect] = useState(null);
  const [listShared, setListShared] = useState([]);
  const [emailShare, setEmailShare] = useState("");
  const [newName, setNewName] = useState("");
  const [uploadpercen, setUploadPercentage] = useState(false);
  const [uploadPerTotal, setUploadPerTotal] = useState("...");
  const [imgPreUploads, setImgPreUploads] = useState([]);
  const [newNameMulti, setNewNameMulti] = useState([]);
  const [progress, setProgress] = useState([]);
  const [uploadStatus, setUploadStatus] = useState("NO"); // NO -> SELECTED -> UPLOAD -> PROGRESS -> COMPLETE

  const navitive = useNavigate();
  useEffect(() => {
    if (userData.state._id) {
      get("/album/" + id).then((res) => {
        if (res.data !== "denied") {
          setMyAlbum(res.data);
          get("/user/byid/" + res.data.uid).then((res2) => setOnwer(res2.data));
          get("/image/albumid/" + id).then((res3) => {
            const dataRever = res3.data.reverse();
            setListImages(dataRever);
            setListOrigin(dataRever);
          });
        } else {
          alert("Access denied");
          navitive("/404");
        }
      });
    }
  }, [userData]);

  // click to show modal in image
  useEffect(() => {
    if (myAlbum) {
      setListShared([]);
      document.getElementById("collapseExample").classList.remove("show");
    }
  }, [nowSelect, myAlbum]);

  const fetchAgain = () => {
    console.log("FETCH AGAIN");
    get("/album/" + id).then((res) => setMyAlbum(res.data));
    get("/image/albumid/" + id).then((res3) => {
      const dataRever = res3.data.reverse();
      setListOrigin(dataRever);
      setListImages(dataRever);
    });
  };

  function getFormattedDate(date) {
    date = new Date(date);
    var year = date.getFullYear();

    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : "0" + month;

    var day = date.getDate().toString();
    day = day.length > 1 ? day : "0" + day;

    return month + "/" + day + "/" + year;
  }

  // after choose file (and RESELECT)
  useEffect(() => {
    if (selectedMultiFile.length > 0) {
      setUploadStatus("SELECTED");

      // reset count
      setUploadPercentage(false);

      // remove url before
      for (let i = 0; i < imgPreUploads.length; i++) {
        URL.revokeObjectURL(imgPreUploads[i]);
      }

      //create new url
      const listURL = [];
      for (let i = 0; i < selectedMultiFile.length; i++) {
        listURL.push(URL.createObjectURL(selectedMultiFile[i]));
      }
      setImgPreUploads(listURL);
      setNewNameMulti(new Array(listURL.length).fill(""));
    }
  }, [selectedMultiFile]);

  // upload img with name, file and albumid
  const handleUploadMultiple = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("albumId", myAlbum?._id);
    formData.append("uploadkey", (Math.random() + 1).toString(36).substring(2));
    formData.append("name", JSON.stringify(newNameMulti));
    for (let i = 0; i < selectedMultiFile.length; i++) {
      formData.append("imgs", selectedMultiFile[i]);
    }
    try {
      setUploadStatus("UPLOAD");

      axios({
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
        method: "POST",
        data: formData,
        url: "/image/multiple", // route name
        baseURL: "http://localhost:5000", //local url
        onUploadProgress: (progress) => {
          const { total, loaded } = progress;
          const totalSizeInMB = total / 1000000;
          const loadedSizeInMB = loaded / 1000000;
          const uploadPercentage = (loadedSizeInMB / totalSizeInMB) * 100;
          const percen = Math.round(uploadPercentage);
          if (percen === 100) setUploadPercentage("Đang xử lý...");
          else setUploadPercentage(percen + "%");
          setUploadPerTotal(
            loadedSizeInMB.toFixed(1) + "MB/" + totalSizeInMB.toFixed(1) + "MB"
          );
        },
        encType: "multipart/form-data",
      })
        .then((res) => {
          setUploadStatus("PROGRESS");
          setUploadPercentage("Xong!");
          checkProgress(res.data);
        })
        .catch((e) => setUploadPercentage("Xong!"));
      fetchAgain();
    } catch (error) {
      console.log(error);
    }
  };

  // call to check progrss. End when API return false
  const checkProgress = (key) => {
    console.log(progress);
    get("/image/check?key=" + key).then((res) => {
      setProgress(res.data);
      if (res.data !== true)
        setTimeout(() => {
          checkProgress(key);
        }, 500);
      else {
        // progress completed
        clearSelectUpload();
        fetchAgain();
        setUploadStatus("NO");
      }
    });
  };

  const getListById = async () => {
    const listuser = await post("/user/listbyid", {
      list: nowSelect?.sharedTo,
    });
    setListShared(listuser.data);
  };

  const deleteImage = async () => {
    try {
      const del = await remove("/image?_id=" + nowSelect._id);
      console.log(del);
      fetchAgain();
    } catch (error) {
      console.log(error);
    }
  };

  const shareImage = async () => {
    alert("??");
    try {
      const share = await post("/image/share", {
        _id: nowSelect._id,
        email: emailShare,
      });
      console.log(share);
    } catch (error) {
      console.log(error);
    }
  };

  const editImage = async () => {
    const res = await put("/image?_id=" + nowSelect._id + "&to=" + newName);
    alert(res.data);
  };

  const removeAnUpload = (index) => {
    const files = [...selectedMultiFile];
    const urls = [...imgPreUploads];
    files.splice(index, 1);
    urls.splice(index, 1);
    setImgPreUploads(urls);
    setSelectedMultiFile(files);
  };

  const clearSelectUpload = () => {
    setProgress([]);
    setUploadPerTotal("...");
    setImgPreUploads([]);
    setNewNameMulti([]);
    setSelectedMultiFile([]);
  };

  let timeout = 0;

  const search = (e) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      if (e.target.value == "") setListImages(listOrigin);
      else
        setListImages(
          listOrigin.filter((a) => {
            return a.name.includes(e.target.value.toLowerCase());
          })
        );
    }, 1000);
  };

  const unshare = (email) => {
    post("/image/unshare", {
      _id: nowSelect._id,
      email: email,
    })
      .then((res) => console.log(res.data))
      .catch((e) => console.error(e));
  };

  return (
    <>
      {myAlbum !== null ? (
        <div className="container">
          <h1>Album name: {myAlbum?.name}</h1>
          <h1>Create by: {onwer?.email}</h1>
          {/* <h1>{JSON.stringify(myAlbum)}</h1> <Loading /> */}
          <h1>Total image: {myAlbum?.totalImage}</h1>
          <h1>Create day: {getFormattedDate(myAlbum?.createDay)}</h1>
          <h1>
            Shared to: {myAlbum?.length > 0 ? myAlbum?.sharedTo.length : 0}{" "}
            people
          </h1>
          <input type="text" onChange={search} placeholder="search by name" />
          <hr />
          <label className="btn btn-warning" htmlFor="up-multi">
            UP MUTIPLE
          </label>
          <input
            className="d-none"
            id="up-multi"
            type="file"
            accept="image/png, image/jpg, image/jpeg"
            multiple
            onChange={(event) => setSelectedMultiFile(event.target.files)}
          />
          {/* UPLOAD */}
          {selectedMultiFile.length > 0 ? (
            <>
              <div className="d-flex flex-wrap no-select noselect">
                {imgPreUploads.map((e, i) => (
                  <div className="m-3 " key={i}>
                    <div className="image-upload-preview text-center pb-3">
                      <img src={e} height="100" className="" />
                      {uploadStatus === "PROGRESS" ? (
                        <div className="on-hover-perview-upload ">
                          <div className="d-flex justify-content-center h-100 align-items-center">
                            {progress[i] ? (
                              <span className="text-danger cursor-pointer  display-6 ">
                                ✔
                              </span>
                            ) : progress[i] === false ? (
                              <span className="text-danger cursor-pointer  display-6 ">
                                ⚠
                              </span>
                            ) : (
                              <div
                                className="spinner-border"
                                role="status"
                              ></div>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="remove-image-upload-preview ">
                          <div className="d-flex justify-content-center h-100 align-items-center">
                            <span
                              className="text-danger cursor-pointer  "
                              onClick={() => removeAnUpload(i)}
                            >
                              ❌
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                    <input
                      type="text"
                      id={"name-upload-" + i}
                      placeholder="tên ảnh"
                      onChange={(e) => {
                        const copyNewName = [...newNameMulti];
                        copyNewName[i] = e.target.value;
                        setNewNameMulti(copyNewName);
                      }}
                    />
                  </div>
                ))}
              </div>
              {uploadStatus !== "PROGRESS" && (
                <button
                  className="btn btn-warning"
                  disabled={newNameMulti.includes("")}
                  onClick={handleUploadMultiple}
                  data-bs-toggle="modal"
                  data-bs-target="#upload-process"
                >
                  UPLOAD
                </button>
              )}
            </>
          ) : (
            ""
          )}
          <hr />
          {JSON.stringify(nowSelect)}
          {/* MAP ITEM */}
          <div className="d-flex flex-wrap justify-content-center">
            {/* {JSON.stringify(listImages)} */}
            {listImages.length > 0 ? (
              listImages.map((e) => (
                <ImagePreview e={e} key={e._id} setSelect={setNowSelect} />
              ))
            ) : (
              <p> This album chưa có hình ảnh nào</p>
            )}
          </div>
          <hr />
          {/* MODAL */}
          {/* MODAL UPLOAD PROCESS */}
          <div
            className="modal fade"
            data-bs-backdrop="static"
            id="upload-process"
            tabIndex="-1"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-body">
                  <h1>{uploadpercen}</h1>
                  <h6>{uploadPerTotal}</h6>
                  {/* Progress: {JSON.stringify(progress)} */}
                </div>
                <div className="modal-footer">
                  {uploadpercen === "Xong!" ? (
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                  ) : (
                    <button type="button" className="btn btn-secondary">
                      Please wait...
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* Modal delete img */}
          <div
            className="modal fade"
            id="deleteImg"
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
            <div className="modal-dialog">
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
export default Album;
