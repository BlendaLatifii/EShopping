import { useEffect, useState } from "react";
import Header from "../Header.tsx";
import { OrderStatusService } from "../../Services/OrderStatusService.ts";
import { OrderStatusResponseDto } from "../../Interfaces/OrderStatus/orderStatus-response-dto.ts";
import AddOrderStatusModal from "./AddOrderStatusModal.tsx";
import EditOrderStatusModal from "./EditOrderStatusModal.tsx";
import Footer from "../Footer.tsx";


export default function OrderStatusTable(){
 const [orderStatus, setOrderStatus] = useState<OrderStatusResponseDto[]>([]);
 const [openConfirm,setOpenConfirm] = useState<boolean>(false);
 const [deleteOrderStatusId, setDeleteOrderStatusId] = useState<string>("");
 const [showModal, setShowModal] = useState(false);
 const [showEdit, setShowEdit] = useState(false);
 const [selectedOrderStatusId, setSelectedOrderStatusId] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () =>{
    const result = await OrderStatusService.GetAllOrderStatuses();
    setOrderStatus(result);
  }

async function confirmedDeleteOrderStatus(id:string)
 {
    await OrderStatusService.DeleteOrderStatus(id);
    setOrderStatus(orderStatus.filter((p) => p.id !== id))
    setOpenConfirm(false);
    setDeleteOrderStatusId("");
 }

    return (
        <>
        <div className="mt-5 d-flex justify-content-between align-items-center px-4">
          <h2>OrderStatuses</h2>

        <button
        className="btn btn-success"
        onClick={() => setShowModal(true)} 
        >
        + Add New OrderStatus
      </button>
  </div>
    <div className="container mt-4">
    <table className="table table-striped table-hover">
      <thead className="table-light">
        <tr>
          <th>Name</th>
          <th>DefaultStatus</th>
          <th style={{ width: "200px" }}>Actions</th>
        </tr>
      </thead>

      <tbody>
        {orderStatus.map((item) => (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>{item.defaultStatus == true ? "true" : "false"}</td>
            <td>
              <button
                className="btn btn-outline-success btn-sm me-2"
                onClick={() => {
                  setSelectedOrderStatusId(item.id!);
                  setShowEdit(true);
                }}
              >
                Edit
              </button>

              <button
                className="btn btn-outline-danger btn-sm"
                onClick={() => {
                  setDeleteOrderStatusId(item.id!);
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
     <AddOrderStatusModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        onOrderStatusAdded={fetchData}
      />
      <EditOrderStatusModal
       show={showEdit}
       handleClose={() => setShowEdit(false)}
       orderStatusId={selectedOrderStatusId}
       onOrderStatusUpdated={fetchData}
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
            <p>Are you sure you want to delete this order status?</p>
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
              onClick={() => confirmedDeleteOrderStatus(deleteOrderStatusId)}
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