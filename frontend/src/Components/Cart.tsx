import { useEffect, useState } from "react";
import Header from "../Components/Header.tsx";
import { CartDto } from "../Interfaces/CartDto.ts";
import { CartItemService } from "../Services/CartItemService.ts";
import { CartService } from "../Services/CartService.ts";
import { OrderService } from "../Services/OrderService.ts";
import "./Cart.css";
import { OrderResponseDto } from "../Interfaces/Order/order-response-dto.ts";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer.tsx";

export default function Cart() {
  const [cart, setCart] = useState<CartDto | null>(null);
  const [order, setOrder] = useState<OrderResponseDto | null>(null);
  const navigate = useNavigate();

  const fetchCart = async () => {
    try {
      const response = await CartService.GetCartAsync();
      setCart(response);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  const loadOrders = async () => {
    const data = await OrderService.GetOrderOfUser();
    console.log(data);
    setOrder(data);
  };

  useEffect(() => {
    fetchCart();
    loadOrders();
  }, []);

  const updateQuantity = async (id: string, qty: number) => {
    if (qty < 1) return;
    console.log(id, qty);
    await CartItemService.UpdateCartItem(id, qty);
    fetchCart();
    loadOrders();
  };

  const removeItem = async (id: string) => {
    console.log(id);
    await CartItemService.DeleteCartItem(id);
    fetchCart();
    loadOrders();
  };

  if (!cart || cart.items.length === 0) {
    return (
      <>
        <Header />
        <div className="container mt-5 text-center">
          <h3>Your cart is empty 😕</h3>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
     <div className="page-bg">
  <div className="container cart-container">
    <div className="row">

      <div className="col-lg-8 col-md-12">
        <h3 className="mb-3">My Cart</h3>

        <div className="table-responsive">
          <table className="table table-bordered align-middle text-center">
            <thead>
              <tr>
                <th>Image</th>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {cart?.items.map(item => (
                <tr key={item.id}>
                  <td>
                    <img
                      src={
                        item.imageUrl
                          ? `https://localhost:7147/${item.imageUrl}`
                          : "/images/no-image.png"
                      }
                      className="cart-image"
                    />
                  </td>

                  <td>{item.productName}</td>
                  <td>${item.unitPrice.toFixed(2)}</td>

                  <td>
                    <div className="d-flex justify-content-center">
                      <button
                        className="btn btn-outline-secondary me-2"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >-</button>

                      <span>{item.quantity}</span>

                      <button
                        className="btn btn-outline-secondary ms-2"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >+</button>
                    </div>
                  </td>

                  <td>${item.totalPrice.toFixed(2)}</td>

                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => removeItem(item.id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="text-end mt-3">
          <h4>Total: <b>${cart?.totalPrice.toFixed(2)}</b></h4>
        </div>
      </div>

      <div className="col-lg-4 col-md-12">
        {order ? (
          <>
            <h3 className="mb-3">Order Summary</h3>

            <div className="card shadow-sm">
              <div className="card-body">
                <h6 className="text-muted">Order #{order.id}</h6>

                <ul className="list-group list-group-flush mb-3">
                  {order.items.map((item, i) => (
                    <li
                      key={i}
                      className="list-group-item d-flex justify-content-between"
                    >
                      <span>
                        {item.productName} × {item.quantity}
                      </span>
                      <span>${item.totalPrice}</span>
                    </li>
                  ))}
                </ul>

                <h5 className="text-end">
                  Total: <b>${order.totalAmmount}</b>
                </h5>
                <button onClick={() => navigate("/Payment", { state: { orderId: order.id } })}>
                  Go to Payment
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="card shadow-sm">
            <div className="card-body text-center text-muted">
              <p>No order yet</p>
              <small>Complete checkout to see order summary</small>
            </div>
          </div>
        )}
      </div>

    </div>
  </div>
</div>

<Footer/>
    </>
  );
}
