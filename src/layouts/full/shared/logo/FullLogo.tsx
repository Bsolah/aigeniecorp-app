

import Logo from "../../../../assets/images/logos/ai_genie_logo.svg";
import { Link } from "react-router";
const FullLogo = () => {
  return (
    <Link to={"/"}>
      <img src={Logo} alt="logo" width={50} className="block" />
    </Link>
  );
};

export default FullLogo;
