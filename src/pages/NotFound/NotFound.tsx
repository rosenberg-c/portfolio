import { Link } from "react-router";
import { paths } from "../../routes";

export const NotFound = () => {
  return (
    <div>
      <p>Not found</p>
      <Link to={paths.home}>Home</Link>
    </div>
  );
};
