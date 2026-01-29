import { Button, Form, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import { UpdatePaymentMethodRequestDto } from "../../Interfaces/PaymentMethod/update-paymentMethod-dto.ts";
import { PaymentMethodService } from "../../Services/PaymentMethodService.ts";

interface Props {
  show: boolean;
  handleClose: () => void;
  paymentMethodId: string | null;
  onPaymentMethodUpdated: () => void;
}
const EditPaymentMethodModal: React.FC<Props> = ({
  show,
  handleClose,
  paymentMethodId,
  onPaymentMethodUpdated,
}) => {
  const [formData, setFormData] = useState<UpdatePaymentMethodRequestDto>({
    name: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!show || !paymentMethodId) return;

    const fetchPaymentMethod = async () => {
      try {
        const paymentMethod = await PaymentMethodService.GetPaymentMethodById(paymentMethodId);
        setFormData({ name: paymentMethod.name });
      } catch (err) {
        console.error(err);
      }
    };

    fetchPaymentMethod();
  }, [show, paymentMethodId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, name: e.target.value });
  };

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await PaymentMethodService.UpdatePaymentMethod(paymentMethodId!, formData);
      onPaymentMethodUpdated();
      handleClose();
    } catch (error) {
      console.error(error);
      alert("Error updating payment method");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit PaymentMethod</Modal.Title>
      </Modal.Header>

      <Form onSubmit={submitForm}>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Name</Form.Label>
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
export default EditPaymentMethodModal;
