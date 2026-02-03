import { Button, Form, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import { OrderStatusService } from "../../Services/OrderStatusService.ts";
import { UpdateOrderStatusRequestDto } from "../../Interfaces/OrderStatus/update-orderStatus-dto.ts";

interface Props {
  show: boolean;
  handleClose: () => void;
  orderStatusId: string | null;
  onOrderStatusUpdated: () => void;
}
const EditOrderStatusModal: React.FC<Props> = ({
  show,
  handleClose,
  orderStatusId,
  onOrderStatusUpdated,
}) => {
  const [formData, setFormData] = useState<UpdateOrderStatusRequestDto>({
    name: "",
    defaultStatus: false

  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!show || !orderStatusId) return;

    const fetchOrderStatus = async () => {
      try {
        const orderStatus = await OrderStatusService.GetOrderStatusById(orderStatusId);
        setFormData({
           name: orderStatus.name ?? "",
           defaultStatus: orderStatus.defaultStatus
           });
      } catch (err) {
        console.error(err);
      }
    };

    fetchOrderStatus();
  }, [show, orderStatusId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, name: e.target.value });
  };

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await OrderStatusService.UpdateOrderStatus(orderStatusId!, formData);
      onOrderStatusUpdated();
      handleClose();
    } catch (error) {
      console.error(error);
      alert("Error updating order status");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Order status</Modal.Title>
      </Modal.Header>

      <Form onSubmit={submitForm}>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={formData.name!}
              onChange={handleChange}
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
          <Button variant="success" type="submit" disabled={loading}>
            {loading ? "Saving..." : "Update"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};
export default EditOrderStatusModal;
