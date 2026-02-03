import { useEffect, useState } from "react";
import Header from "../Header.tsx";
import { PaymentService } from "../../Services/PaymentService.ts";
import { PaymentResponseDto } from "../../Interfaces/Payment/PaymentResponseDto.ts";
import AddPaymentModal from "./AddPaymentModal.tsx";
import EditPaymentModal from "./EditPaymentModal.tsx";
import Footer from "../Footer.tsx";


export default function PaymentTable(){
 const [payment, setPayment] = useState<PaymentResponseDto[]>([]);
 const [openConfirm,setOpenConfirm] = useState<boolean>(false);
 const [deletePaymentId, setDeletePaymentId] = useState<string>("");
 const [showModal, setShowModal] = useState(false);
 const [showEdit, setShowEdit] = useState(false);
 const [selectedPaymentId, setSelectedPaymentId] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () =>{
    const result = await PaymentService.GetAllPayments();
    setPayment(result);
  }

async function confirmedDeletePayment(id:string)
 {
    await PaymentService.DeletePayment(id);
    setPayment(payment.filter((p) => p.id !== id))
    setOpenConfirm(false);
    setDeletePaymentId("");
 }

    return (
        <>
        <Header/>
        <div className="mt-5 d-flex justify-content-between align-items-center px-4">
         <h2>Payments</h2>

        <button
         className="btn btn-success"
         onClick={() => setShowModal(true)} 
        >
         + Add New Payment
       </button>
  </div>
    <div className="container mt-4">
    <table className="table table-striped table-hover">
      <thead className="table-light">
        <tr>
          <th>PaymentMethodName</th>
          <th>TransactionDate</th>
          <th>Ammount</th>
          <th style={{ width: "200px" }}>Actions</th>
        </tr>
      </thead>

      <tbody>
        {payment.map((item) => (
          <tr key={item.id}>
            <td>{item.paymentMethodName}</td>
            <td>{item.transactionDate.toString()}</td>
            <td>{item.amount}</td>
            <td>
              <button
                className="btn btn-outline-success btn-sm me-2"
                onClick={() => {
                  setSelectedPaymentId(item.id!);
                  setShowEdit(true);
                }}
              >
                Edit
              </button>

              <button
                className="btn btn-outline-danger btn-sm"
                onClick={() => {
                  setDeletePaymentId(item.id!);
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
     <AddPaymentModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        onPaymentAdded={fetchData}
      />
      <EditPaymentModal
       show={showEdit}
       handleClose={() => setShowEdit(false)}
       paymentId={selectedPaymentId}
       onPaymentUpdated={fetchData}
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
            <p>Are you sure you want to delete this payment?</p>
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
              onClick={() => confirmedDeletePayment(deletePaymentId)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
   )}
   <Footer/>
        </>
    );
}