import { useEffect, useState } from "react";
import { AuthService } from "../../Services/AuthService.ts";
import { UserResponseDto } from "../../Interfaces/User/user-response-dto.ts";
import Header from "../Header.tsx";
import AddUserModal from "./AddUserModal.tsx";
import EditUserModal from "./EditUserModal.tsx";
import Footer from "../Footer.tsx";


export default function UserTable(){
 const [user, setUser] = useState<UserResponseDto[]>([]);
 const [openConfirm,setOpenConfirm] = useState<boolean>(false);
 const [deleteUserId, setDeleteUserId] = useState<string>("");
 const [showModal, setShowModal] = useState(false);
 const [showEdit, setShowEdit] = useState(false);
 const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () =>{
    const result = await AuthService.GetAllUsers();
    setUser(result);
  } 

  async function confirmedDeleteUser(id:string)
  {
    await AuthService.DeleteUser(id);
    setUser(user.filter((u) => u.id !== id))
    setOpenConfirm(false);
    setDeleteUserId("");
  }

    return (
        <>
        <Header/>
        <div className="mt-5 d-flex justify-content-between align-items-center px-4">
          <h2>Users</h2>

        <button
         className="btn btn-success"
         onClick={() => setShowModal(true)} 
        >
         + Add New User
        </button>
      </div>

        <div className="container mt-4">
    <table className="table table-striped table-hover">
      <thead className="table-light">
        <tr>
          <th>Name</th>
          <th>LastName</th>
          <th>Email</th>
          <th>PhoneNumber</th>
          <th>Role</th>
          <th style={{ width: "200px" }}>Actions</th>
        </tr>
      </thead>

      <tbody>
        {user.map((item) => (
          <tr key={item.id}>
            <td>{item.userName}</td>
            <td>{item.lastName}</td>
            <td>{item.email}</td>
            <td>{item.phoneNumber}</td>
            <td>{item.roleName}</td>
            <td>
              <button
                className="btn btn-outline-success btn-sm me-2"
                onClick={() => {
                  setSelectedUserId(item.id!);
                  setShowEdit(true);
                }}
              >
                Edit
              </button>

              <button
                className="btn btn-outline-danger btn-sm"
                onClick={() => {
                  setDeleteUserId(item.id!);
                  setOpenConfirm(true);
                }}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
     <AddUserModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        onUserAdded={fetchData}
      />
      <EditUserModal
       show={showEdit}
       handleClose={() => setShowEdit(false)}
       userId={selectedUserId}
       onUserUpdated={fetchData}
       />
  </div>

   {openConfirm && (
    <div className="modal fade show d-block" tabIndex={-1}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Confirm Delete</h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => setOpenConfirm(false)}
            />
          </div>

          <div className="modal-body">
            <p>Are you sure you want to delete this user?</p>
          </div>

          <div className="modal-footer">
            <button
              className="btn btn-secondary"
              onClick={() => setOpenConfirm(false)}
            >
              Cancel
            </button>

            <button
              className="btn btn-danger"
              onClick={() => confirmedDeleteUser(deleteUserId)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
   )}
   <Footer/>
        </>
    );
}