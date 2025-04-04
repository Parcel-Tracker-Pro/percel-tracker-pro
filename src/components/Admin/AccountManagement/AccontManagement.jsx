import { useEffect, useState } from "react";
import { MdGroupAdd, MdOutlineLogout } from "react-icons/md";
// page
import CreateAccountModal from "./CreateAccountModel";
import VertifyPassword from "./VertifyPassword";
// api
import getAllEmployees from "./../../../api/employee/getAllemployees";
import UpdatePassword from "./UpdatePassword";
import { MoveLeft } from "lucide-react";
import Loading from "../../Loading";
import { useNavigate } from "react-router-dom";
import LogoutModel from "../../Model/LogoutModel";

function AccontManagement() {
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isVertifyOpen, setVertifyOpen] = useState(false);
  const [isUpdateOpen, setUpdateOpen] = useState(false);
  const [employee, setEmployee] = useState([]);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState("");
  const [owner, setOwner] = useState(null);
  const ownerName = localStorage.getItem("percelUsername");
  const [showLogout, setShowLogout] = useState(false);
  // console.log(ownerName);

  const getEmployees = async () => {
    setLoading(true);
    const res = await getAllEmployees();
    // console.log(res);
    if (res.code === 200) {
      setLoading(false);
      setEmployee(res.data.userData.filter((e) => e.username !== ownerName));
      if (ownerName) {
        setOwner(res.data.userData.find((e) => e.username === ownerName));
      }
    }
  };

  const handleLogout = () => {
    setShowLogout(false);
    localStorage.clear();
    navigate("/");
  };

  // console.log(employee);

  // console.log(employee);
  useEffect(() => {
    getEmployees();
  }, [isModalOpen]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="">
      <div className="bg-white mb-6 flex flex-col justify-between gap-4 px-4 py-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <MoveLeft
              className="mr-4 text-color"
              size={23}
              onClick={() => navigate(-1)}
            />
            <div>
              <p className="header-text">Account Management</p>
            </div>
          </div>

          <button
            className="button button-color text-color border border-primary "
            onClick={() => setShowLogout(!showLogout)}
          >
            <MdOutlineLogout size={18} className="text-color" />
          </button>
        </div>

        <div className="flex w-full justify-between gap-2 items-center px-4 py-3 rounded-lg my-5">
          <div className="flex gap-4 items-center">
            <img
              src="https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png"
              alt="avater"
              className="w-14 h-14 rounded-full"
            />
            <div>
              <p>{owner?.username}</p>
              <span className="text-gray-500">{owner?.role}</span>
            </div>
          </div>
          <button
            onClick={() => setVertifyOpen(true)}
            className="button bg-primary"
          >
            Update
          </button>
        </div>
      </div>
      {/* ____________________________________________________________________________________ */}

      {/* _______________________________________________________________________________________________ */}
      <div className="px-3">
        <div className="flex justify-between items-center mb-5">
          <p className="text-lg font-medium ">Staff Accounts</p>
          <button
            className="button button-color"
            onClick={() => setModalOpen(true)}
          >
            <MdGroupAdd size={25} />
            <span> Add Staff</span>
          </button>
        </div>
        <div div className="pb-20">
          {employee.map((staff, index) => (
            <div
              key={index}
              className="flex w-full justify-between gap-2 bg-white items-center px-4 py-3 rounded-lg my-2"
            >
              <div className="flex gap-2 items-center">
                <img
                  src="https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png"
                  alt="avater"
                  className="w-14 h-14 rounded-full"
                />
                <div>
                  <p className="text-[16px">{staff.username}</p>
                  <span className="text-sm text-gray-500">{staff.role}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  className="button border border-gray-500"
                  onClick={() => {
                    setUpdateOpen(true);
                    setId(staff._id);
                    // console.log(staff._id);
                  }}
                >
                  Update
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <CreateAccountModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
      />
      {/* _______________________________________________________________________________________________ */}
      <VertifyPassword
        isOpen={isVertifyOpen}
        onClose={() => setVertifyOpen(false)}
      />
      <UpdatePassword
        isOpen={isUpdateOpen}
        onClose={() => setUpdateOpen(false)}
        id={id}
      />

      <LogoutModel
        isOpen={showLogout}
        onClose={() => setShowLogout(false)}
        submit={handleLogout}
        text="Are you sure you want to logout?"
      />
    </div>
  );
}

export default AccontManagement;
