import ClipLoader from "react-spinners/ClipLoader";

const Spinner = () => {
  return (
    <div style={{ width: "100px", margin: "auto", display: "block" }}>
      <ClipLoader color="#e31d7c" size={100} />
    </div>
  );
};

export default Spinner;
