import React, { useEffect, useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { AddPaymentMethodRequestDto } from '../../Interfaces/PaymentMethod/add-paymentMethod-dto.ts';
import { PaymentMethodService } from '../../Services/PaymentMethodService.ts';

interface Props {
  show: boolean;
  handleClose: () => void;
  onPaymentMethodAdded: () => void; 
}

const AddPaymentMethodModal: React.FC<Props> = ({
  show,
  handleClose,
  onPaymentMethodAdded,
}) => {
  const [formData, setFormData] = useState<AddPaymentMethodRequestDto>(
    {   
        name: ""
    }as AddPaymentMethodRequestDto);

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await PaymentMethodService.AddPaymentMethod(formData);
      setFormData(
        { 
         name : ""
        });
      handleClose(); 
      if (onPaymentMethodAdded) onPaymentMethodAdded(); 
    } catch (error) {
      console.error(error);
      alert("Error adding paymentMethod");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add New PaymentMethod</Modal.Title>
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
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" variant="success" disabled={loading}>
            {loading ? "Saving..." : "Add PaymentMethod"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
export default AddPaymentMethodModal;