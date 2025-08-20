import { cn } from "@/lib/utils";
import "./loader.css";

const Loader = () => {
  return (
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
  );
};

export const EntireScreenLoader: React.FC<{ className?: string }> = ({
  className,
}) => {
  return (
    <div
      className={cn(
        "fixed top-0 left-0 flex bg-white/60 backdrop-blur-md items-center justify-center z-10 w-full h-full",
        className
      )}
    >
      <Loader />
    </div>
  );
};

export default Loader;
