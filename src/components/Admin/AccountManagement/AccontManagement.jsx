import { useEffect, useState } from "react";
import { MdGroupAdd } from "react-icons/md";
// page
import CreateAccountModal from "./CreateAccountModel";
import VertifyPassword from "./VertifyPassword";
// api
import getAllEmployees from "./../../../api/employee/getAllemployees";
import UpdatePassword from "./UpdatePassword";

function AccontManagement() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isVertifyOpen, setVertifyOpen] = useState(false);
  const [isUpdateOpen, setUpdateOpen] = useState(false);
  const [employee, setEmployee] = useState([]);
  const [id, setId] = useState("");

  const getEmployees = async () => {
    const res = await getAllEmployees();
    setEmployee(res.data.userData);
  };

  // console.log(employee);
  useEffect(() => {
    getEmployees();
  }, [isModalOpen]);

  return (
    <div className="mb-20">
      <p className="text-2xl font-medium">Account Management</p>
      {/* ____________________________________________________________________________________ */}
      <div className="flex w-full justify-between gap-2 items-center bg-gray-200 px-4 py-3 rounded-lg my-5">
        <div className="flex gap-4 items-center">
          <img
            src="https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png"
            alt="avater"
            className="w-14 h-14 rounded-full"
          />
          <div>
            <p>John Doe</p>
            <span className="text-gray-500">Admin</span>
          </div>
        </div>
        <button
          onClick={() => setVertifyOpen(true)}
          className="py-2 px-4 border-2 border-secondary rounded-lg text-secondary font-bold hover:scale-105 transition duration-300 bg-white"
        >
          Update
        </button>
      </div>
      {/* _______________________________________________________________________________________________ */}
      <div>
        <div className="flex justify-between items-center mb-5">
          <p className="text-lg font-medium ">Staff Accounts</p>
          <button
            className="button px-4 flex justify-center itmes-center gap-4"
            onClick={() => setModalOpen(true)}
          >
            <span> Add Staff</span> <MdGroupAdd size={25} />
          </button>
        </div>
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
                className="py-2 px-4 border border-black rounded-lg"
                onClick={() => {
                  setUpdateOpen(true);
                  setId(staff._id);
                  console.log(staff._id);
                }}
              >
                Update
              </button>
            </div>
          </div>
        ))}
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
    </div>
  );
}

export default AccontManagement;
