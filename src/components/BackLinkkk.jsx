import { Link } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";

const BackLinkkk = ({ destination = "/drugs" }) => {
  return (
    <div className="">
      <Link
        to={destination}
        className="text-secondary  fs-5 backbutton text-center"
        style={{ textDecoration: "none" }}
      >
        <GoArrowLeft />
      </Link>
    </div>
  );
};

export default BackLinkkk;
