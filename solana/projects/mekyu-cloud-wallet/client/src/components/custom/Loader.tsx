import "./loader.css";

const Loader = () => {
  return (
    <div className="fixed top-0 left-0 flex bg-white/60 backdrop-blur-md items-center justify-center z-10 w-screen h-screen">
      <div className="spinner center">
        <div className="spinner-blade"></div>
        <div className="spinner-blade"></div>
        <div className="spinner-blade"></div>
        <div className="spinner-blade"></div>
        <div className="spinner-blade"></div>
        <div className="spinner-blade"></div>
        <div className="spinner-blade"></div>
        <div className="spinner-blade"></div>
        <div className="spinner-blade"></div>
        <div className="spinner-blade"></div>
        <div className="spinner-blade"></div>
        <div className="spinner-blade"></div>
      </div>
    </div>
  );
};

export default Loader;
