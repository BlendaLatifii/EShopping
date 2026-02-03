import { Button, Form, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import { OrderStatusService } from "../../Services/OrderStatusService.ts";
import { UpdateProductRequestDto } from "../../Interfaces/Product/update-product-dto.ts";
import { ProductService } from "../../Services/ProductService.ts";
import { ProductResponseDto } from "../../Interfaces/Product/product-response-dto.ts";
import { SelectListItem } from "../../Interfaces/select-list-item.ts";

interface Props {
  show: boolean;
  handleClose: () => void;
  productId: string | null;
  onProductUpdated: () => void;
}
const EditProductModal: React.FC<Props> = ({
  show,
  handleClose,
  productId,
  onProductUpdated,
}) => {
  const [formData, setFormData] = useState<UpdateProductRequestDto>({
        images:[],
        name:"",
        description:"",
        price:0,
        categoryId:""
  });
  const [loading, setLoading] = useState(false);
  const [categorySelectList, setCategorySelectList] = useState<SelectListItem[]>([]);

  useEffect(() => {
    if (!show || !productId) return;

    const fetchProduct = async () => {
      try {
        const product = await ProductService.GetProductById(productId);
        setFormData({
          name: product.name,
          description : product.description,
          price : product.price,
          categoryId : product.categoryId,
          categoryName: product.categoryName
        });
      } catch (err) {
        console.error(err);
      }
    };

    fetchProduct();
  }, [show, productId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, name: e.target.value });
  };

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await OrderStatusService.UpdateOrderStatus(productId!, formData);
      onProductUpdated();
      handleClose();
    } catch (error) {
      console.error(error);
      alert("Error updating product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit </Modal.Title>
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
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              placeholder="Enter description"
              value={formData.description!}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              name="price"
              placeholder="Enter price"
              value={formData.price!}
              onChange={handleChange}
            />
          </Form.Group>
     
          <div className="col-md-6-w-100%">
            <select
               className="form-control"
               id="categoryId"
               name="categoryId"
               value={formData.categoryId!}
               onChange={handleChange}
               style={{ marginBottom: "15px" }}
               >
                <option value="" disabled>Select category</option>
                {categorySelectList.map((x) => (
                <option key={x.key} value={x.value}>{x.text}</option>
                ))}
           </select>
           </div>
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
export default EditProductModal;
