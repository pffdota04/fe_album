import { Link } from "react-router-dom";

const AlbumItem = ({ e, setSelect, controll = false }) => {
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
      <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-3 ">
        <div className="card  border border-primary">
          <div className="card-header bg-warning  ">
            Last update {getFormattedDate(e.lastUpdate)}
          </div>
          <div className="card-body">
            <h5 className="card-title three-dot">{e.name}</h5>
            <p className="card-text">
              Tolal img: {e.totalImage}
              <br />
              Share with: {e.sharedTo.length} people
              <br />
              Created at: {getFormattedDate(e.createDay)}
            </p>
            <Link
              to={"/album/" + e._id}
              className="hover-opacity-half btn btn-warning"
              data-bs-toggle="tooltip"
              title={e.name}
            >
              Xem
            </Link>
          </div>
          <ul className="list-group list-group-flush ">
            <li className="list-group-item p-0">
              {controll && (
                <div className="w-100  d-flex justify-content-evenly bg-warning">
                  <span
                    className=" noselect cursor-pointer hover-opacity-half"
                    data-bs-toggle="modal"
                    data-bs-target="#editAlbum"
                    onClick={() => setSelect(e)}
                  >
                    🖊
                  </span>
                  <span
                    className=" noselect cursor-pointer hover-opacity-half"
                    data-bs-toggle="modal"
                    data-bs-target="#deleteAlbum"
                    onClick={() => setSelect(e)}
                  >
                    🗑
                  </span>
                  <span
                    className=" noselect cursor-pointer hover-opacity-half"
                    data-bs-toggle="modal"
                    data-bs-target="#shareAlbum"
                    onClick={() => setSelect(e)}
                  >
                    🔗
                  </span>
                </div>
              )}
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default AlbumItem;
