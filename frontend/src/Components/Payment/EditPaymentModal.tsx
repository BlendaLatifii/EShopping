import { Button, Form, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import { UpdatePaymentRequestDto } from "../../Interfaces/Payment/UpdatePaymentRequestDto.ts";
import { PaymentService } from "../../Services/PaymentService.ts";
import { PaymentResponseDto } from "../../Interfaces/Payment/PaymentResponseDto.ts";
import { SelectListItem } from "../../Interfaces/select-list-item.ts";

interface Props {
  show: boolean;
  handleClose: () => void;
  paymentId: string | null;
  onPaymentUpdated: () => void;
}
const EditPaymentModal: React.FC<Props> = ({
  show,
  handleClose,
  paymentId,
  onPaymentUpdated,
}) => {
  const [formData, setFormData] = useState<UpdatePaymentRequestDto>({
        paymentMethodId: "",
        amount:0
  });
  const [loading, setLoading] = useState(false);
  const [paymentMethodSelectList, setPaymentMethodSelectList] = useState<SelectListItem[]>([]);

  useEffect(() => {
    if (!show || !paymentId) return;

    const fetchPayment = async () => {
      try {
        const payment = await PaymentService.GetPaymentById(paymentId);
        setFormData(
            { 
                paymentMethodId :payment.paymentMethodId,
                // transactionDate: payment.transactionDate,
                amount : payment.amount
            } as PaymentResponseDto);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPayment();
  }, [show, paymentId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;

  setFormData(prev => ({
    ...prev,
    [name]: name === "amount" ? Number(value) : value
  }));
};

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await PaymentService.UpdatePayment(paymentId!, formData);
      onPaymentUpdated();
      handleClose();
    } catch (error) {
      console.error(error);
      alert("Error updating payment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Payment</Modal.Title>
      </Modal.Header>

      <Form onSubmit={submitForm}>
        <Modal.Body>
         <Form.Group className="mb-3">
           <Form.Label>Amount</Form.Label>
            <Form.Control
              type="number"
              name="amount"
              value={formData.amount!}
              onChange={handleChange}
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
export default EditPaymentModal;
