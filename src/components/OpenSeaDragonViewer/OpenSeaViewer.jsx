import OpenSeaDragon from "openseadragon";
import { useEffect, useState } from "react";

const OpenSeaDragonViewer = ({ image }) => {
  const [viewer, setViewer] = useState(null);
  useEffect(() => {
    if (image && viewer) {
      viewer.open(image.source);
    }
  }, [image]);
  const InitOpenseadragon = () => {
    viewer && viewer.destroy();
    setViewer(
      OpenSeaDragon({
        id: "openSeaDragon",
        prefixUrl: "openseadragon-images/",
        animationTime: 0.5,
        blendTime: 0.1,
        constrainDuringPan: true,
        maxZoomPixelRatio: 2,
        minZoomLevel: 1,
        visibilityRatio: 1,
        zoomPerScroll: 2,
        showNavigationControl: false,
      })
    );
  };
  useEffect(() => {
    InitOpenseadragon();
    return () => {
      viewer && viewer.destroy();
    };
  }, []);

  return (
    <>
      {image.source.Image.Size.Height}
      {image.source.Image.Size.Width}
      Zoom in
      <span id="zoom-in" className=" bg-danger p-3">
        +
      </span>
      Zoom out
      <span id="zoom-out" className=" bg-danger p-3">
        -
      </span>
      <div
        id="openSeaDragon"
        className="mx-auto"
        style={{
          height:
            image.source.Image.Size.Height /
              (image.source.Image.Size.Width / 1000) +
            "px",
          width: "1000px",
          maxWidth: "100%",
        }}
      ></div>
    </>
  );
};
export default OpenSeaDragonViewer;
