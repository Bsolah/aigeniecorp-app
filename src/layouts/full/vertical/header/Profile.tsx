import { Icon } from "@iconify/react";
import { Badge, Dropdown } from "flowbite-react";
import { useDispatch } from 'react-redux';
// import { useNavigate } from "react-router";
import { AppDispatch } from '../../../../redux/store.ts';
import * as profileData from "./Data.ts";
import profileImg from "/src/assets/images/profile/user-1.jpg"
import { useSelector } from "react-redux";
import { logout } from '../../../../redux/slices/authSlice.ts';

const Profile = () => {

  const { user } = useSelector((state: any) => state.auth)
  const dispatch = useDispatch<AppDispatch>();
  // const navigate = useNavigate();

  const handleClick = (items: any) => {
    if (items.title === "Sign Out") {
      dispatch(logout());
      // navigate("/auth/login")
    }
  };

  return (
    <div className="relative ">
      <Dropdown
        label=""
        className="w-screen sm:w-[360px] pb-4 rounded-sm"
        dismissOnClick={false}
        renderTrigger={() => (
          <div className="flex items-center gap-1">
            <span className="h-10 w-10 hover:text-primary rounded-full flex justify-center items-center cursor-pointer group-hover/menu:bg-lightprimary group-hover/menu:text-primary">
              <img
                src={profileImg}
                alt="logo"
                height="35"
                width="35"
                className="rounded-full"
              />
            </span>
            <Icon
              icon="solar:alt-arrow-down-bold"
              className="hover:text-primary dark:text-primary group-hover/menu:text-primary"
              height={12}
            />
          </div>
        )}
      >
        <div className="px-6">
          <div className="flex items-center gap-6 pb-5 border-b dark:border-darkborder mt-5 mb-3">
            <img
              src={profileImg}
              alt="logo"
              height="56"
              width="56"
              className="rounded-full"
            />
            <div>
              <h5 className="text-15 font-semibold">
                {user && user.username} <span className="text-success">Pro</span>
              </h5>
              <p className="text-sm text-ld opacity-80">{user &&  user.email}</p>
            </div>
          </div>
        </div>
        <div>
          {profileData.profileDD.map((items, index) => (
            <div key={index} className="px-6 mb-2">
              <Dropdown.Item
                className="px-3 py-2 flex justify-between items-center bg-hover group/link w-full rounded-md"
                key={index}
              >
                <div className="flex items-center w-full ">
                  <div className=" flex gap-3 w-full ">
                    <h5 onClick={() => handleClick(items)} className="text-15 font-normal group-hover/link:text-primary">
                      {items.title}
                    </h5>
                    {items.url == "/apps/invoice" ? (
                      <Badge color={"lightprimary"}>4</Badge>
                    ) : null}
                  </div>
                </div>
              </Dropdown.Item>
            </div>
          ))}
        </div>
      </Dropdown>
    </div>
  );
};

export default Profile;
