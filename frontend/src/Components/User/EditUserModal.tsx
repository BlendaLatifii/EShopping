import { Button, Form, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import { UpdateUserRequestDto } from "../../Interfaces/User/update-user-request-dto.ts";
import { AuthService } from "../../Services/AuthService.ts";
import { SelectListItem } from "../../Interfaces/select-list-item.ts";

interface Props {
  show: boolean;
  handleClose: () => void;
  userId: string | null;
  onUserUpdated: () => void;
}
const EditUserModal: React.FC<Props> = ({
  show,
  handleClose,
  userId,
  onUserUpdated,
}) => {
  const [formData, setFormData] = useState<UpdateUserRequestDto>({
    email: "",
    userName : "",
    lastName: "",
    phoneNumber : "",
    roleId: ""
  });
  const [loading, setLoading] = useState(false);
  const [roleSelectList, setRoleSelectList] = useState<SelectListItem[]>([]);

  useEffect(() => {
  if (!show || !userId) return;

  const loadRolesAndUser = async () => {
    try {
      const roles = await AuthService.GetSelectList();
      const roleItems = roles
        .map((item, i) => ({
          key: i,
          value: item.id,
          text: item.name,
        }))
        .filter(x => x.text);

      setRoleSelectList(roleItems);

      const user = await AuthService.GetUserById(userId);

      const selectedRole = roleItems.find(r => r.text === user.roleName);

      setFormData({
        email: user.email || "",
        userName: user.userName || "",
        lastName: user.lastName || "",
        phoneNumber: user.phoneNumber || "",
        roleId: selectedRole?.value || "",
      });
    } catch (error) {
      console.error("Error loading roles or user:", error);
    }
  };

  loadRolesAndUser();
}, [show, userId]);


  const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
  const { name, value } = e.target;

  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
}; 

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await AuthService.UpdateUser(userId!, formData);
      onUserUpdated();
      handleClose();
    } catch (error) {
      console.error(error);
      alert("Error updating user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit User</Modal.Title>
      </Modal.Header>

      <Form onSubmit={submitForm}>
        <Modal.Body>
          <Form.Group>
            <Form.Label>UserName</Form.Label>
            <Form.Control
              type="text"
              name="userName"
              value={formData.userName!}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>LastName</Form.Label>
            <Form.Control
              type="text"
              name="lastName" 
              value={formData.lastName!}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              name="email"
              value={formData.email!}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber ?? ""}
              onChange={handleChange}
            />
          </Form.Group>

          <div className="col-md-6-w-100%">
           <select
              className="form-control"
              id="roleId"
              name="roleId"
              value={formData.roleId ?? ""}
              onChange={handleChange}
            >
             <option value="" disabled>Select role</option>
             {roleSelectList.map((x) => (
             <option key={x.key} value={x.value}>
             {x.text}
            </option>
            ))}
          </select>

          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="success" type="submit" disabled={loading}>
            {loading ? "Saving..." : "Update"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};
export default EditUserModal;
