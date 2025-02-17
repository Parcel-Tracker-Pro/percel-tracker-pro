import { Link } from "react-router-dom";
import { MdHomeFilled } from "react-icons/md";
import { TbReportMoney } from "react-icons/tb";
import { FaRegCircleUser } from "react-icons/fa6";
import { PackagePlus } from "lucide";
import { LuPackagePlus } from "react-icons/lu";

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
  {
    name: "Sale Report",
    icon: <TbReportMoney size={20} />,
    link: "/admin/report",
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
      <div className="flex justify-between items-center px-5 py-3">
        {navs.map((nav, index) => (
          <Link
            to={nav.link}
            key={index}
            className="flex flex-col gap-2 items-center"
          >
            {nav.icon}
            <p>{nav.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Navbar;
