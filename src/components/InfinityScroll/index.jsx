import { useEffect, useRef } from "react";
import { useState } from "react";
import "./style.css";

const InfinityScroll = ({
  pauseFetch,
  height,
  fetchData,
  hasMore,
  step,
  children,
}) => {
  const [nowStep, setStep] = useState(step);
  const dummy = useRef();

  const handleScroll = async (e) => {
    const { offsetHeight, scrollTop, scrollHeight } = e.target;
    console.log(offsetHeight + scrollTop + " ==  " + scrollHeight);
    //
    if (hasMore && !pauseFetch)
      if (offsetHeight + scrollTop == scrollHeight) {
        console.log("ok");
        setStep((prev) => prev + step);
        await fetchData(nowStep + step);
      }
  };

  useEffect(() => {
    if (nowStep !== step && hasMore) {
      fetchData(nowStep + step);
    }
  }, [nowStep]);

  let observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setStep((prev) => prev + step);
      }
    });
  });

  useEffect(() => {
    observer.observe(dummy.current);
  }, []);

  return (
    <div
      // onScroll={handleScroll}
      style={{
        height: height,
        overflowY: "scroll",
        overflowX: "hidden",
        width: "100%",
        padding: 0,
        margin: 0,
        textAlign: "center",
      }}
    >
      {children}
      <div id="dummy" ref={dummy}></div>
      <hr></hr>
    </div>
  );
};
export default InfinityScroll;
