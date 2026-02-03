import React, { useEffect, useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { AddPaymentRequestDto } from '../../Interfaces/Payment/AddPaymentRequestDto.ts';
import { PaymentService } from '../../Services/PaymentService.ts';
import { SelectListItem } from '../../Interfaces/select-list-item.ts';
import { PaymentMethodService } from '../../Services/PaymentMethodService.ts';

interface Props {
  show: boolean;
  handleClose: () => void;
  onPaymentAdded: () => void; 
}

const AddPaymentModal: React.FC<Props> = ({
  show,
  handleClose,
  onPaymentAdded,
}) => {
  const [formData, setFormData] = useState<AddPaymentRequestDto>(
    {   
        paymentMethodId: "",
        orderId:"",
        cartNumber:"",
        cVV:"",
        expirationDate:"",
        amount:0
    }as AddPaymentRequestDto);

  const [loading, setLoading] = useState(false);
  const [paymentMethodSelectList, setPaymentMethodSelectList] = useState<SelectListItem[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement |  HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]:  name === "amount"
        ? Number(value)
        : value
    }));
  };
const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await PaymentService.AddPayment(formData);
      alert("Payment added successfully ✅");
      setFormData({
        paymentMethodId: "",
        orderId: "",
        cartNumber: "",
        cVV: "",
        amount: 0
      });
    } catch (error) {
      console.error(error);
      alert("Error adding payment ❌");
    } finally {
      setLoading(false);
    }
  };

  const fetchPaymentMethod = async () => {
    try {
      const response = await PaymentMethodService.GetSelectList();
      setPaymentMethodSelectList(
        response.filter(x => x.name).map((item, i) => ({
          key: i,
          value: item.id,
          text: item.name
        }))
      );
    } catch (error) {
      console.error("Error fetching payment methods", error);
    }
  };

  useEffect(() => {
    fetchPaymentMethod();
  }, []);

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add New PaymentMethod</Modal.Title>
      </Modal.Header>

      <Form onSubmit={submitForm}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Payment Method</Form.Label>
            <Form.Select
              name="paymentMethodId"
              value={formData.paymentMethodId}
              onChange={handleChange}
              required
            >
              <option value="">Select payment method</option>
              {paymentMethodSelectList.map(x => (
                <option key={x.key} value={x.value}>{x.text}</option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Card Number</Form.Label>
            <Form.Control
              type="text"
              name="cartNumber"
              value={formData.cartNumber}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>CVV</Form.Label>
            <Form.Control
              type="text"
              name="cVV"
              value={formData.cVV}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              type="number"
              name="amount"
              value={formData.amount}
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
            {loading ? "Saving..." : "Add Payment"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
export default AddPaymentModal;