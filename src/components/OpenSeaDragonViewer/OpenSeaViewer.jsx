import OpenSeaDragon from "openseadragon";
import { useEffect, useState } from "react";

const OpenSeaDragonViewer = ({ image }) => {
  const [viewer, setViewer] = useState(null);

  // useEffect(() => {
  //   if (image && viewer) {
  //     viewer.open(image.source);
  //   }
  // }, [image]);

  const InitOpenseadragon = () => {
    viewer && viewer.destroy();
    setViewer(
      OpenSeaDragon({
        id: "openSeaDragon",
        zoomInButton: "zoom-in",
        zoomOutButton: "zoom-out",
        homeButton: "home",
        fullPageButton: "full-page",
        nextButton: "next",
        previousButton: "previous",
        animationTime: 0.5,
        blendTime: 0.1,
        constrainDuringPan: true,
        maxZoomPixelRatio: 2,
        minZoomLevel: 1,
        visibilityRatio: 1,
        zoomPerScroll: 2,
        tileSources: {
          Image: {
            xmlns: "http://schemas.microsoft.com/deepzoom/2008",
            Url: "http://localhost:5000/image/getFolderDzi/",
            Format: "png",
            Overlap: "2",
            TileSize: "256",
            Size: {
              Height: "2880",
              Width: "5120",
            },
          },
        },
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
          height: "800px",
          maxWidth: "1200px",
        }}
      ></div>
    </>
  );
};
export default OpenSeaDragonViewer;
