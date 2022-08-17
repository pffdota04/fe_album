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
        prefixUrl: "//openseadragon.github.io/openseadragon/images/",
        animationTime: 1,
        blendTime: 0.2,
        constrainDuringPan: true,
        minZoomImageRatio: 1,
        maxZoomPixelRatio: 5,
        minZoomLevel: 1,
        visibilityRatio: 0,
        zoomPerScroll: 2,
        zoomInButton: "zoom-in",
        zoomOutButton: "zoom-out",
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
      ({image.source.Image.Size.Height} x {image.source.Image.Size.Width})
      <span
        id="zoom-in"
        title="Zoom in"
        className="text-danger cursor-pointer noselect"
      >
        Zoom In
      </span>
      <span
        id="zoom-out"
        title="Zoom out"
        className="text-danger cursor-pointer noselect"
      >
        Zoom out
      </span>
      <div
        id="openSeaDragon"
        className="mx-auto mt-5"
        style={{
          height:
            image.source.Image.Size.Height /
              (image.source.Image.Size.Width / 1000) +
            "px",
          width: "1000px",
          maxWidth: "100%",
          backgroundColor: "black",
        }}
      ></div>
    </>
  );
};
export default OpenSeaDragonViewer;
