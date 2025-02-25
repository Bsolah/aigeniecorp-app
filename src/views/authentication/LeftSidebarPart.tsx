
import { APP_NAME } from "src/utils/constants.ts";
import Bgimg from "/src/assets/images/logos/logo-icon.svg";
import { Button } from "flowbite-react";
import { useNavigate } from "react-router"

const LeftSidebarPart = () => {

  const navigate = useNavigate();

  return (
    <>
      <div className="circle-top"></div>
      <div>
        <img src={Bgimg} alt="materilm" className="circle-bottom" />
      </div>
      <div className="flex xl:justify-start justify-center xl:ps-80 h-screen items-center z-10 relative">
        <div className="max-w-md">
          <h2 className="text-white text-[40px] font-bold leading-[normal]">
            Welcome to
            <br></br>
            {APP_NAME}
          </h2>
          <p className="opacity-75 text-white my-4 text-base font-medium">
            Your dedicated AI for your teams.
          </p>
          <Button className="mt-6" color={"primary"} onClick={() => navigate("/")}>Learn More</Button>
        </div>
      </div>
    </>
  );
};

export default LeftSidebarPart;
