import { Link } from "react-router-dom";
import logo from '../../assets/images/logo.jpg';

const NotFound: React.FC = (): JSX.Element => {
  return (
    <div className="flex flex-col justify-center items-center">
      <img src={logo} alt="logo" width="260" />
      <p>Page Not Found :(</p>
      <Link to="/">Back To Home</Link>
    </div>
  );
};

export default NotFound;
