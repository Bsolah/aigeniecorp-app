

import Logo from "../../../../assets/images/logos/AI_Genie_Corp.svg";
import { Link } from "react-router";
const FullLogo = () => {
  return (
    <Link to={"/"}>
      <img src={Logo} alt="logo" width={50} className="block" />
    </Link>
  );
};

export default FullLogo;
