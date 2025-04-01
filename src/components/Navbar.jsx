import { NavLink } from "react-router-dom";
import { MdHomeFilled } from "react-icons/md";
import { TbReportMoney } from "react-icons/tb";
import { IoIosListBox } from "react-icons/io";
import { LuPackagePlus } from "react-icons/lu";
import { FaTruck } from "react-icons/fa6";
const navs = [
  {
    name: "Home",
    icon: <MdHomeFilled size={20} />,
    link: "/admin/",
  },
  {
    name: "Add Parcel",
    icon: <LuPackagePlus size={20} />,
    link: "/admin/addpercel",
  },
  {
    name: "Delivery",
    icon: <FaTruck size={20} />,
    link: "/admin/delivery",
  },
  {
    name: "Delivery List",
    icon: <IoIosListBox size={20} />,
    link: "/admin/check",
  },
  {
    name: "Sale Report",
    icon: <TbReportMoney size={20} />,
    link: "/admin/report",
  },
];

const staffnavs = [
  {
    name: "Home",
    icon: <MdHomeFilled size={20} />,
    link: "/employee/",
  },
  {
    name: "Add Parcel",
    icon: <LuPackagePlus size={20} />,
    link: "/employee/addpercel",
  },
];

function Navbar() {
  const role = localStorage.getItem("parcelRole");
  // console.log(role);
  if (role !== "owner") {
    return (
      <div>
        <div className="flex w-full md:w-2/4 mx-auto border border-gray-200 shadow-lg md:rounded-lg justify-center gap-20 items-center px-5 py-3">
          {staffnavs.map((nav, index) => (
            <NavLink
              to={nav.link}
              key={index}
              end={nav.link === "/employee/"}
              className={({ isActive }) =>
                `flex flex-col gap-2 items-center text-sm ${
                  isActive ? "text-[#6B5201]" : "text-gray-400"
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

  return (
    <div>
      <div className="flex w-full md:w-2/4 mx-auto border border-gray-200 shadow-lg md:rounded-lg justify-between items-center px-5 py-3">
        {navs.map((nav, index) => (
          <NavLink
            to={nav.link}
            key={index}
            end={nav.link === "/admin/"}
            className={({ isActive }) =>
              `flex flex-col gap-2 items-center text-sm cursor-pointer transition-all duration-300 ${
                isActive ? "text-[#6B5201]" : "text-gray-400"
              }`
            }
          >
            {nav.icon}
            <p className="text-xs sm:text-sm">{nav.name}</p>
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default Navbar;
