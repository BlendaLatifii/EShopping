import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header.tsx";
import { PaymentMethodResponseDto } from "../../Interfaces/PaymentMethod/paymentMethod-response-dto.ts";
import { PaymentMethodService } from "../../Services/PaymentMethodService.ts";
import AddPaymentMethodModal from "./AddPaymentMethodModal.tsx";
import EditPaymentMethodModal from "./EditPaymentMethodModal.tsx";


export default function PaymentMethodTable(){
 const [paymentMethod, setPaymentMethod] = useState<PaymentMethodResponseDto[]>([]);
 const [openConfirm,setOpenConfirm] = useState<boolean>(false);
 const [deletePaymentMethodId, setDeletePaymentMethodId] = useState<string>("");
 const [showModal, setShowModal] = useState(false);
 const [showEdit, setShowEdit] = useState(false);
 const [selectedPaymentMethodId, setSelectedPaymentMethodId] = useState<string | null>(null);

 const navigate =  useNavigate();
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () =>{
    const result = await PaymentMethodService.GetAllPaymentMethods();
    setPaymentMethod(result);
  }

async function confirmedDeletePaymentMethod(id:string)
 {
    await PaymentMethodService.DeletePaymentMethod(id);
    setPaymentMethod(paymentMethod.filter((p) => p.id !== id))
    setOpenConfirm(false);
    setDeletePaymentMethodId("");
 }

    return (
        <>
        <Header/>
         <button
        className="btn btn-success"
        onClick={() => setShowModal(true)} 
       >
        + Add New PaymentMethod
    </button>
    <div className="container mt-4">
    <table className="table table-striped table-hover">
      <thead className="table-light">
        <tr>
          <th>Name</th>
          <th style={{ width: "200px" }}>Actions</th>
        </tr>
      </thead>

      <tbody>
        {paymentMethod.map((item) => (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>
              <button
                className="btn btn-outline-success btn-sm me-2"
                onClick={() => {
                  setSelectedPaymentMethodId(item.id!);
                  setShowEdit(true);
                }}
              >
                Edit
              </button>

              <button
                className="btn btn-outline-danger btn-sm"
                onClick={() => {
                  setDeletePaymentMethodId(item.id!);
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
     <AddPaymentMethodModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        onPaymentMethodAdded={fetchData}
      />
      <EditPaymentMethodModal
       show={showEdit}
       handleClose={() => setShowEdit(false)}
       paymentMethodId={selectedPaymentMethodId}
       onPaymentMethodUpdated={fetchData}
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
            <p>Are you sure you want to delete this paymentMethod?</p>
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
              onClick={() => confirmedDeletePaymentMethod(deletePaymentMethodId)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
   )}
        </>
    );
}