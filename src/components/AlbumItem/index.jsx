import { Link } from "react-router-dom";

const AlbumItem = ({ e }) => {
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
      <Link className="col-6 col-md-4  " to={"/album/" + e._id}>
        <div className="album-item p-3 bg-warning rounded rounded-3 ">
          <div className="name">album name: {e.name}</div>
          <div className="name">
            create day: {getFormattedDate(e.createDay)}
          </div>
          <div className="name">Tolal img: {e.totalImage}</div>
          <div className="name">Share with: {e.sharedTo.length} people</div>
          <div className="name"></div>
        </div>
      </Link>
    </>
  );
};

export default AlbumItem;
