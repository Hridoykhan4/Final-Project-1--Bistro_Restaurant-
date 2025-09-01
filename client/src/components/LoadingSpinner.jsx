import spin from "../assets/others/loader3.gif";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <img 
        src={spin} 
        alt="Loading..." 
        className="w-28 h-28 "
      />
    </div>
  );
};

export default LoadingSpinner;
