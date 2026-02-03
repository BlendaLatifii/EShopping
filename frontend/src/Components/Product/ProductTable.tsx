import { Fragment, useEffect, useState } from "react";
import { ProductResponseDto } from "../../Interfaces/Product/product-response-dto.ts";
import { ProductService } from "../../Services/ProductService.ts";
import AddProduct from "./AddProduct.tsx";
import { useNavigate } from "react-router-dom";
import EditProductModal from "./EditProductModal.tsx";
import Header from "../Header.tsx";
import Footer from "../Footer.tsx";

export default function ProductTable(){

    const[products, setProducts] = useState<ProductResponseDto[]>([]);
    const[openConfirm, setOpenConfirm] = useState<boolean>(false);
    const[deleteProductId, setDeleteProductId] = useState<string>("");
    const [showModal, setShowModal] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

    const fetchData = async() => {
        var result = await ProductService.GetAllProducts();
        setProducts(result);
    }

    async function confirmedDeleteProduct(id:string)
    {
      await ProductService.DeleteProduct(id);
      setProducts(products.filter((product) => product.id !== id))
      setOpenConfirm(false);
      setDeleteProductId("");
    }

    useEffect(() => {
    fetchData();
    }, []);
    
    return (
       <Fragment>
        <Header/>
         <div className="mt-5 d-flex justify-content-between align-items-center px-4">
    <h2>Products</h2>

    <button
      className="btn btn-success"
      onClick={() => setShowModal(true)} 
    >
      + Add New Product
    </button>
  </div>
         <div className="container mt-4">
       <table className="table table-striped table-hover">
      <thead className="table-light">
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Price</th>
          <th>Category</th>
          <th style={{ width: "200px" }}>Actions</th>
        </tr>
      </thead>

      <tbody>
        {products.map((item) => (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>{item.description}</td>
            <td>{item.price}</td>
            <td>{item.categoryName}</td>
            <td>
              <button
                className="btn btn-outline-success btn-sm me-2"
                onClick={() => {
                  setSelectedProductId(item.id!);
                  setShowEdit(true);
                }}
              >
                Edit
              </button>

              <button
                className="btn btn-outline-danger btn-sm"
                onClick={() => {
                  setDeleteProductId(item.id!);
                  setOpenConfirm(true);
                }}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table> 
    <AddProduct
        show={showModal}
        handleClose={() => setShowModal(false)}
        onCategoryAdded={fetchData}
      />
    <EditProductModal
       show={showEdit}
       handleClose={() => setShowEdit(false)}
       productId={selectedProductId}
       onProductUpdated={fetchData}
       />
    </div>

    {openConfirm && (
    <div className="modal fade show d-block" tabIndex={-1}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Confirm Delete</h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => setOpenConfirm(false)}
            />
          </div>

          <div className="modal-body">
            <p>Are you sure you want to delete this product?</p>
          </div>

          <div className="modal-footer">
            <button
              className="btn btn-secondary"
              onClick={() => setOpenConfirm(false)}
            >
              Cancel
            </button>

            <button
              className="btn btn-danger"
              onClick={() => confirmedDeleteProduct(deleteProductId)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
    )}
    <br/>
    <br/>
    <Footer/>
        </Fragment>
    );
}