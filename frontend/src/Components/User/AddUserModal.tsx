import React, { useEffect, useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { AddUserRequestDto } from '../../Interfaces/User/add-user-request-dto.ts';
import { AuthService } from '../../Services/AuthService.ts';
import { SelectListItem } from '../../Interfaces/select-list-item';

interface Props {
  show: boolean;
  handleClose: () => void;
  onUserAdded: () => void; 
}

const AddUserModal: React.FC<Props> = ({
  show,
  handleClose,
  onUserAdded,
}) => {
  const [formData, setFormData] = useState<AddUserRequestDto>(
    {   
        userName: "",
        lastName:"",
        email: "",
        phoneNumber:"",
        password:"",
        confirmPassword:"",
        roleId:"",
    }as AddUserRequestDto);

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await AuthService.AddUser(formData);
      setFormData(
        { 
        userName: "",
        lastName:"",
        email: "",
        phoneNumber:"",
        password:"",
        confirmPassword:"",
        roleId:""
       });
      handleClose(); 
      if (onUserAdded) onUserAdded(); 
    } catch (error) {
      console.error(error);
      alert("Error adding user");
    } finally {
      setLoading(false);
    }
  };

  const [roleSelectList, setRoleSelectList] = useState<SelectListItem[]>([]);

  const fetchRole = async () => {
        try {
        const response = await AuthService.GetSelectList(); 
  
        setRoleSelectList(response.map((item,i) => ({
          key: i,
          value: item.id,
          text: item.name
        } as SelectListItem)).filter(x=> x.text != '' && x.text != null));
  
       } catch (error) {
         console.error('Error fetching user:', error);
       }
    };
  
    useEffect(() =>{
       fetchRole();
      }, []);

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add New User</Modal.Title>
      </Modal.Header>

      <Form onSubmit={submitForm}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>User Name</Form.Label>
            <Form.Control
              type="text"
              name="userName"
              placeholder="Enter userName"
              value={formData.userName}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>LastName</Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              placeholder="Enter lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>PhoneNumber</Form.Label>
            <Form.Control
              type="text"
              name="phoneNumber"
              placeholder="Enter phone number"
              value={formData.phoneNumber ?? ""}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              name="confirmPassword"
              placeholder="Enter confirm password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <div className="col-md-6-w-100%">
            <select
               className="form-control"
               id="roleId"
               name="roleId"
               value={formData.roleId!}
               onChange={handleChange}
               style={{ marginBottom: "15px" }}
               >
                <option value="" disabled>Select role</option>
                {roleSelectList.map((x) => (
                <option key={x.key} value={x.value}>{x.text}</option>
                ))}
           </select>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" variant="success" disabled={loading}>
            {loading ? "Saving..." : "Add"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
export default AddUserModal;