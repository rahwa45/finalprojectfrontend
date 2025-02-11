import { Link } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";

const Back = ({ destination = "/login" }) => {
  return (
    <div className="">
      <Link
        to={destination}
        className="text-black  fs-5 backbutton text-center"
      >
        <GoArrowLeft />
      </Link>
    </div>
  );
};

export default Back;
