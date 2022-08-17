import { Link } from "react-router-dom";

const AlbumItem = ({ e, setSelect }) => {
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
    <>
      {" "}
      <div className="col-12 col-sm-6 col-md-4 col-lg-3">
        <Link
          to={"/album/" + e._id}
          className="hover-opacity-half"
          data-bs-toggle="tooltip"
          title={e.name}
        >
          <div className="album-item p-3 bg-warning rounded rounded-3 ">
            <div className="name three-dot">{e.name}</div>
            <div className="name">
              create day: {getFormattedDate(e.createDay)}
            </div>
            <div className="name">Tolal img: {e.totalImage}</div>
            <div className="name">Share with: {e.sharedTo.length} people</div>
            <div className="name"></div>
          </div>
        </Link>
        <div className="w-100 bg-light d-flex justify-content-evenly">
          <span
            className=" noselect cursor-pointer"
            data-bs-toggle="modal"
            data-bs-target="#editAlbum"
            onClick={() => setSelect(e)}
          >
            🖊
          </span>
          <span
            className=" noselect cursor-pointer"
            data-bs-toggle="modal"
            data-bs-target="#deleteAlbum"
            onClick={() => setSelect(e)}
          >
            🗑
          </span>
          <span
            className=" noselect cursor-pointer"
            data-bs-toggle="modal"
            data-bs-target="#shareAlbum"
            onClick={() => setSelect(e)}
          >
            🔗
          </span>
        </div>
      </div>
    </>
  );
};

export default AlbumItem;
