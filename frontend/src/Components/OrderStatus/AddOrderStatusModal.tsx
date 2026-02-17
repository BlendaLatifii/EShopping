import React, { useEffect, useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { AddOrderStatusRequestDto } from '../../Interfaces/OrderStatus/add-orderStatus-dto.ts';
import { OrderStatusService } from '../../Services/OrderStatusService.ts';

interface Props {
  show: boolean;
  handleClose: () => void;
  onOrderStatusAdded: () => void; 
}

const AddOrderStatusModal: React.FC<Props> = ({
  show,
  handleClose,
  onOrderStatusAdded,
}) => {
  const [formData, setFormData] = useState<AddOrderStatusRequestDto>(
    {   
        name: "",
        defaultStatus:false
    }as AddOrderStatusRequestDto);

  const [loading, setLoading] = useState(false);

 const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, type, value, checked } = e.target;

  setFormData({
    ...formData,
    [name]: type === "checkbox" ? checked : value
  });
};

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await OrderStatusService.AddOrderStatus(formData);
      setFormData(
        { 
         name : "", 
         defaultStatus : false
        });
      handleClose(); 
      if (onOrderStatusAdded)  onOrderStatusAdded(); 
    } catch (error) {
      console.error(error);
      alert("Error adding orderStatus");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add New Order Status</Modal.Title>
      </Modal.Header>

      <Form onSubmit={submitForm}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Enter name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              label="Default Status"
              name="defaultStatus"
              checked={formData.defaultStatus}
              onChange={handleChange}
          />
         </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" variant="success" disabled={loading}>
            {loading ? "Saving..." : "Add OrderStatus"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
export default AddOrderStatusModal;