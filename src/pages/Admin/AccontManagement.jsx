import { useEffect, useState } from "react";
import CreateAccountModal from "../../components/accmanagement/CreateAccountModel";
import getAllEmployees from "../../api/employee/getAllemployees";
import VertifyPassword from "../../components/accmanagement/VertifyPassword";

function AccontManagement() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isVertifyOpen, setVertifyOpen] = useState(false);
  const [employee, setEmployee] = useState([]);

  const getEmployees = async () => {
    const res = await getAllEmployees();
    setEmployee(res.data.userData);
  };

  // console.log(employee);
  useEffect(() => {
    getEmployees();
  }, [isModalOpen]);

  return (
    <div>
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
          className="py-2 px-4 border border-black rounded-lg"
        >
          Update
        </button>
      </div>
      {/* _______________________________________________________________________________________________ */}
      <div>
        <div className="flex justify-between items-center mb-5">
          <p className="text-lg font-medium ">Staff Accounts</p>
          <button
            className="bg-primary text-white py-2 px-4 font-medium rounded-md"
            onClick={() => setModalOpen(true)}
          >
            Add Account
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
              <button className="py-2 px-4 border border-black rounded-lg">
                Update
              </button>
              {/* <button className="p-3 border border-black rounded-lg">
                <FaRegTrashAlt size={15} />
              </button> */}
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
    </div>
  );
}

export default AccontManagement;
