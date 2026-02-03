import { useEffect, useState } from "react";
import { OrderService } from "../Services/OrderService.ts";
import { OrderResponseDto } from "../Interfaces/Order/order-response-dto";
import Header from "./Header.tsx";

const Order= () => {
  const [order, setOrder] = useState<OrderResponseDto | null>(null);

  const loadOrders = async () => {
    const data = await OrderService.GetOrderOfUser();
    console.log(data);
    setOrder(data);
  };

   useEffect(() => {
    loadOrders();
  }, []);

   if (!order) return <div>No order</div>;

  return (
    <>
     <Header/>
    <div className="container mt-4">
      <h3>My Order</h3>

        <div key={order.id} className="card mb-3">
          <div className="card-body">
            <h5>Order #{order.id }</h5>
             <p>Status: <b>{order.orderStatus}</b></p>

            <ul className="list-group">
              {order.items?.map((item, id) => (
                <li key={id} className="list-group-item d-flex justify-content-between">
                  <div>
                    {item.productName} × {item.quantity}
                  </div>
                  <span>${item.totalPrice}</span>
                </li>
              ))}
            </ul>
            <p>Total: <b>${order.totalAmmount}</b></p>
          </div>
        </div>
    </div>
    </>
  );
};

export default Order;
