import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { AddCategoryRequestDto } from '../../Interfaces/Category/add-category.ts';
import { CategoryService } from '../../Services/CategoryService.ts';

interface Props {
  show: boolean;
  handleClose: () => void;
  onCategoryAdded: () => void; 
}

const AddCategoryModal: React.FC<Props> = ({
  show,
  handleClose,
  onCategoryAdded,
}) => {
  const [formData, setFormData] = useState<AddCategoryRequestDto>({ name: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await CategoryService.AddCategory(formData);
      setFormData({ name: "" });
      handleClose(); 
      if (onCategoryAdded) onCategoryAdded(); 
    } catch (error) {
      console.error(error);
      alert("Error adding category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add New Category</Modal.Title>
      </Modal.Header>

      <Form onSubmit={submitForm}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Category Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Enter category name"
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
            {loading ? "Saving..." : "Add Category"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
export default AddCategoryModal;