import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Components/Header.tsx";
import { CategoryResponseDto } from "../Interfaces/Category/category-response-dto.ts";
import { CategoryService } from "../Services/CategoryService.ts";
import AddCategoryModal from "./AddCategory.tsx";


export default function CategoryTable() {
  const [category, setCategory] = useState<CategoryResponseDto[]>([]);
  const [openConfirm,setOpenConfirm] = useState<boolean>(false);
  const [deleteCategoryId, setDeleteCategoryId] = useState<string>("");
   const [showModal, setShowModal] = useState(false);

  const navigate =  useNavigate();
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
      const result = await CategoryService.GetAllCategories();
      setCategory(result);
  }

  function deleteCategory(id:string) {
    setOpenConfirm(true);
    setDeleteCategoryId(id);
  }
    async function confirmedDeleteCategory(id:string)
     {
      var result = await CategoryService.DeleteCategory(id);
      setCategory(category.filter((category) => category.id !== id))
      setOpenConfirm(false);
      setDeleteCategoryId("");
     }

  function sendToDetails(id:string ){
    navigate(`/EditCategory/${id}`)
  }

  function AddCategory(){
    navigate(`/AddCategory`)
  }

  return (
    <Fragment>
  <Header />
  <div className="mt-5 d-flex justify-content-between align-items-center px-4">
    <h2>Categories</h2>

    <button
      className="btn btn-success"
      onClick={() => setShowModal(true)} 
    >
      + Add New Category
    </button>
  </div>

  <div className="container mt-4">
    <table className="table table-striped table-hover">
      <thead className="table-light">
        <tr>
          <th>Name</th>
          <th style={{ width: "200px" }}>Actions</th>
        </tr>
      </thead>

      <tbody>
        {category.map((item) => (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>
              <button
                className="btn btn-outline-success btn-sm me-2"
                onClick={() => sendToDetails(item.id!)}
              >
                Edit
              </button>

              <button
                className="btn btn-outline-danger btn-sm"
                onClick={() => {
                  setDeleteCategoryId(item.id!);
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
     <AddCategoryModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        onCategoryAdded={fetchData}
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
            <p>Are you sure you want to delete this category?</p>
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
              onClick={() => confirmedDeleteCategory(deleteCategoryId)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  )}
</Fragment>
  );
}
