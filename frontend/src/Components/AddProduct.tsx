import { Button, Form, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import { ProductService } from "../Services/ProductService.ts";
import { CategoryService } from "../Services/CategoryService.ts";
import { SelectListItem } from "../Interfaces/select-list-item";
import { AddProductRequestDto } from "../Interfaces/Product/add-product-dto";

interface Props {
  show: boolean;
  handleClose: () => void;
  onCategoryAdded: () => void; 
}

const AddProduct: React.FC<Props> = ({
  show,
  handleClose,
  onCategoryAdded,
}) => {
    
     const [formData, setFormData] = useState<AddProductRequestDto>({
        images:[],
        name:"",
        description:"",
        price:0,
        categoryId:""
     } as AddProductRequestDto);

     const [categorySelectList, setCategorySelectList] = useState<SelectListItem[]>([]);
    
     const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;

      if (!files) return;

     setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...Array.from(files)]
      }));
};

      const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
         const { name, value } = e.target;

          setFormData(prev => ({
           ...prev,
         [name]: name === "price" ? Number(value) : value
      }));

     };
     
       const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
         e.preventDefault();
         try {
           await ProductService.AddProduct(formData);
           setFormData({ 
            images : [],
            name: "",
            description: "",
            price : 0,
            categoryId: ""});
           handleClose(); 
            
           if (onCategoryAdded) onCategoryAdded(); 
         } catch (error) {
           console.error(error);
           alert("Error adding product");
         }
       };

   const fetchCategory = async () => {
      try {
      const response = await CategoryService.GetSelectList(); 

      setCategorySelectList(response.map((item,i) => ({
        key: i,
        value: item.id,
        text: item.name
      } as SelectListItem)).filter(x=> x.text != '' && x.text != null));

     } catch (error) {
       console.error('Error fetching category:', error);
     }
  };

  useEffect(() =>{
     fetchCategory();
    }, []);
    return(
        <>
        <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add New Product</Modal.Title>
      </Modal.Header>

      <Form onSubmit={submitForm}>
        <Modal.Body>
          <Form.Group>
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
              placeholder="Enter name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              placeholder="Enter description"
              value={formData.description}
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
              value={formData.price}
              onChange={handleChange}
              required
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
          <Button type="submit" variant="success"> Submit
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
        </>

    );
}
export default AddProduct;