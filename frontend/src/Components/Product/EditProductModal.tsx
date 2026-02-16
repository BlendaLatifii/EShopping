import { Button, Form, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import { UpdateProductRequestDto } from "../../Interfaces/Product/update-product-dto.ts";
import { ProductService } from "../../Services/ProductService.ts";
import { SelectListItem } from "../../Interfaces/select-list-item.ts";
import { CategoryService } from "../../Services/CategoryService.ts";

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
    images: [],
    name: "",
    description: "",
    price: 0,
    categoryId: ""
  });

  const [loading, setLoading] = useState(false);
  const [categorySelectList, setCategorySelectList] = useState<SelectListItem[]>([]);

  const fetchCategory = async () => {
    const response = await CategoryService.GetSelectList();

    setCategorySelectList(
      response.map((item, i) => ({
        key: i,
        value: item.id,
        text: item.name
      }))
    );
  };

  const fetchProduct = async () => {
    if (!productId) return;

    const product = await ProductService.GetProductById(productId);

    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      categoryId: product.categoryId, 
      images: []
    });
  };


  useEffect(() => {
    if (show) {
      fetchCategory();
      fetchProduct();
    }
  }, [show, productId]);


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value
    }));
  };


  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setFormData(prev => ({
      ...prev,
      images: [...(prev.images ?? []), ...Array.from(files)]
    }));
  };

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await ProductService.UpdateProduct(productId!, formData);
      onProductUpdated();
      handleClose();
    } catch {
      alert("Error updating product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Product</Modal.Title>
      </Modal.Header>

      <Form onSubmit={submitForm}>
        <Modal.Body>

          <Form.Group className="mb-3">
            <Form.Label>Product Image</Form.Label>
            <Form.Control
              type="file"
              multiple
              onChange={handleImageChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name!}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              value={formData.description!}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={formData.price!}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <select
              className="form-control"
              name="categoryId"
              value={formData.categoryId!}
              onChange={handleChange}
            >
              <option value="">Select category</option>
              {categorySelectList.map(x => (
                <option key={x.key} value={x.value}>
                  {x.text}
                </option>
              ))}
            </select>
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

export default EditProductModal;
