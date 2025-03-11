import { Link, NavLink } from "react-router-dom";
import { MdHomeFilled } from "react-icons/md";
import { TbReportMoney } from "react-icons/tb";
import { FaRegCircleUser } from "react-icons/fa6";
import { PackagePlus } from "lucide";
import { LuPackagePlus } from "react-icons/lu";
import { CiDeliveryTruck } from "react-icons/ci";

// import React from "react";
const navs = [
  {
    name: "Home",
    icon: <MdHomeFilled size={20} />,
    link: "/admin/",
  },
  {
    name: "Add Percel",
    icon: <LuPackagePlus size={20} />,
    link: "/admin/addpercel",
  },
  // {
  //   name: "Sale Report",
  //   icon: <TbReportMoney size={20} />,
  //   link: "/admin/report",
  // },
  {
    name: "Delivery",
    icon: <CiDeliveryTruck size={20} />,
    link: "/admin/delivery",
  },
  {
    name: "Account",
    icon: <FaRegCircleUser size={20} />,
    link: "/admin/acc",
  },
];

function Navbar() {
  return (
    <div>
      <div className="flex w-full md:w-2/4 mx-auto border border-gray-200 shadow-lg md:rounded-lg justify-between items-center px-5 py-3">
        {navs.map((nav, index) => (
          <NavLink
            to={nav.link}
            key={index}
            end={nav.link === "/admin/"}
            className={({ isActive }) =>
              `flex flex-col gap-2 items-center text-sm ${
                isActive ? "text-secondary" : "text-gray-400"
              }`
            }
          >
            {nav.icon}
            <p>{nav.name}</p>
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default Navbar;
