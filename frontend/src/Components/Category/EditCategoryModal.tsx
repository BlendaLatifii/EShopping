import { Button, Form, Modal } from "react-bootstrap";
import { CategoryService } from "../../Services/CategoryService.ts";
import { useEffect, useState } from "react";
import { UpdateCategoryRequestDto } from "../../Interfaces/Category/update-category";

interface Props {
  show: boolean;
  handleClose: () => void;
  categoryId: string | null;
  onCategoryUpdated: () => void;
}
const EditCategoryModal: React.FC<Props> = ({
  show,
  handleClose,
  categoryId,
  onCategoryUpdated,
}) => {
  const [formData, setFormData] = useState<UpdateCategoryRequestDto>({
    name: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!show || !categoryId) return;

    const fetchCategory = async () => {
      try {
        const category = await CategoryService.GetCategoryById(categoryId);
        setFormData({ name: category.name });
      } catch (err) {
        console.error(err);
      }
    };

    fetchCategory();
  }, [show, categoryId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, name: e.target.value });
  };

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await CategoryService.UpdateCategory(categoryId!, formData);
      onCategoryUpdated();
      handleClose();
    } catch (error) {
      console.error(error);
      alert("Error updating category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Category</Modal.Title>
      </Modal.Header>

      <Form onSubmit={submitForm}>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Category Name</Form.Label>
            <Form.Control
              type="text"
              value={formData.name!}
              onChange={handleChange}
              required
            />
          </Form.Group>
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
export default EditCategoryModal;
