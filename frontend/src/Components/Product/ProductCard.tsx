import { ProductResponseDto } from "../../Interfaces/Product/product-response-dto";
import { useNavigate } from "react-router-dom";
import { CartItemService } from "../../Services/CartItemService.ts";

export default function ProductCard({ product }: { product: ProductResponseDto}) {
  const navigate = useNavigate();
  const addToCart = async (productId: string) => { 
    try { 
      const model = { productId: productId, quantity: 1 }; 
      await CartItemService.AddCartItem(model); 
      console.log("Product added to cart"); 
    } catch (error) 
    { 
      console.error("Error adding to cart:", error); 
    } };

  return (
    <div className="product-card">
      <img
        src={product.imageUrl
          ? `https://localhost:7147/${product.imageUrl.split(",")[0]}`
          : "/images/no-image.png"}
        alt={product.name}
      />

      <div className="product-info">
        <h6>{product.name}</h6>
        <p>{product.description}</p>
        <span>${product.price.toFixed(2)}</span>

        <button
          className="btn btn-outline-primary me-2"
          onClick={() => navigate(`/ProductDetail/${product.id}`)}
        >
          View Details
        </button>
        <button
          className="btn btn-primary"
          onClick={() => addToCart(product.id)}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
