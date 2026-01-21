import { useEffect, useState } from "react";
import Header from "../Components/Header.tsx";
import { CartDto } from "../Interfaces/CartDto.ts";
import { CartItemService } from "../Services/CartItemService.ts";
import { CartService } from "../Services/CartService.ts";
import { UpdateCartItemRequestDto } from "../Interfaces/CartItem/update-cartItem-request-dto.ts";

export default function Cart() {
  const [cart, setCart] = useState<CartDto | null>(null);

  const fetchCart = async () => {
    try {
      const response = await CartService.GetCartAsync();
      setCart(response);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const updateQuantity = async (id: string, qty: number) => {
    if (qty < 1) return;
    console.log(id, qty);
    await CartItemService.UpdateCartItem(id, qty);
    fetchCart();
  };

  const removeItem = async (id: string) => {
    console.log(id);
    await CartItemService.DeleteCartItem(id);
    fetchCart();
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

      <div className="container cart-container">
        <h2 className="mb-4">Shopping Cart</h2>

        <div className="table-responsive">
          <table className="table table-bordered align-middle text-center">
            <thead className="table-dark">
              <tr>
                <th>Image</th>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {cart.items.map((item) => (
                <tr key={item.id}>
                  <td>
                    <img
                      src={
                        item.imageUrl
                          ? `https://localhost:7147/${item.imageUrl}`
                          : "/images/no-image.png"
                      }
                      className="cart-image"
                      alt={item.productName}
                    />
                  </td>

                  <td>{item.productName}</td>

                  <td>${item.unitPrice.toFixed(2)}</td>

                  <td>
                    <div className="d-flex justify-content-center align-items-center">
                      <button
                        className="btn btn-sm btn-outline-secondary me-2"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                      >
                        -
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        className="btn btn-sm btn-outline-secondary ms-2"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        +
                      </button>
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

        <div className="text-end mt-4">
          <h4>
            Total Price: <span className="text-success">${cart.totalPrice.toFixed(2)}</span>
          </h4>

          <button className="btn btn-primary mt-3">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </>
  );
}
