import { useEffect, useState } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { SelectListItem } from "../../Interfaces/select-list-item";
import { PaymentMethodService } from "../../Services/PaymentMethodService.ts";
import { PaymentService } from "../../Services/PaymentService.ts";
import { AddPaymentRequestDto } from "../../Interfaces/Payment/AddPaymentRequestDto.ts";
import { useLocation } from "react-router-dom";

export default function Payment() {
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const orderId = location.state?.orderId;
  const amount = location.state?.totalAmmount;

  const [formData, setFormData] = useState<AddPaymentRequestDto>({
    paymentMethodId: "",
    orderId: orderId || "",
    cartNumber: "",
    cVV: "",
    amount: amount
  });

  const [paymentMethodSelectList, setPaymentMethodSelectList] = useState<SelectListItem[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement |  HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "amount"
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
    <>
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f8f9fa"
      }}
    >
      <div
        className="shadow rounded p-4 bg-white"
        style={{ width: "100%", maxWidth: "420px" }}
      >
        <h4 className="text-center fw-bold mb-2">Payment</h4>
        <p className="text-center text-muted mb-4">
          Enter your payment details
        </p>

        <Form onSubmit={submitForm}>

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

          <Button type="submit" className="w-100" disabled={loading}>
            {loading ? <Spinner size="sm" /> : "Pay"}
          </Button>

        </Form>
      </div>
    </div>
    </>
  );
}
