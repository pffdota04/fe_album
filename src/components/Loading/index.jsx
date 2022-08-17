import "./style.css";

const Loading = () => {
  return (
    <div class="loading d-flex justify-content-center align-items-center">
      <div class="spinner-border text-warning" role="status">
        <span class="sr-only"></span>
      </div>
    </div>
  );
};
export default Loading;
