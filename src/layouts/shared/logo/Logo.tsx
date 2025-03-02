
import LogoIcon from '/src/assets/images/logos/aigenie_logo.svg';
import { Link } from "react-router";

const Logo = () => {
  return (
   <Link to={'/'}>
      <img src={LogoIcon} width="100px" alt="logo" />
    </Link>
  )
}

export default Logo
