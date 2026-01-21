import React, { useEffect, useState } from "react";
import { ProductResponseDto } from "../Interfaces/Product/product-response-dto.ts";
import { ProductService } from "../Services/ProductService.ts";
import "./Product.css";
import { useNavigate } from "react-router-dom";
import { CartService } from "../Services/CartService.ts";

const ProductCard: React.FC = () => {
  const [products, setProducts] = useState<ProductResponseDto[]>([]);
  const navigate = useNavigate();
  
  const fetchProduct = async () =>{
     try {
        const product = await ProductService.GetAllProducts();
        setProducts(product);
        console.log(product);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
   };

 useEffect(() => {
    fetchProduct();
  }, []);

  function SendToProductDetail(id:string){
    navigate(`/ProductDetail/${id}`);
  };

  const addToCart= async (productId: string) =>{
    try{
      await CartService.AddToCart(productId, 1);
    }catch (error) {
    console.error("Error adding to cart:", error);
  }
  };
  
  return (
    <div className="container d-flex justify-content-center mt-50 mb-50">
      <div className="row">
        {products.map((product) => (
          <div className="col-md-4 mt-2" key={product.id}>
            <div className="card">
              <div className="card-body">
                <div className="product-image-wrapper">
                  <img
                    src={
                    product.imageUrl
                    ? `https://localhost:7147/${product.imageUrl.split(",")[0]}`
                    : "/images/no-image.png"
                    }
                   className="product-image"
                   alt={product.name}
                    />
                  </div>
              </div>

              <div className="card-body bg-light text-center">
                <div className="mb-2">
                  <h6 className="font-weight-semibold mb-2">
                    <a href="#" className="text-default">
                      {product.name}
                    </a>
                  </h6>
                  <a href="#" className="text-muted">
                    {product.description}
                  </a>
                </div>

                <h3 className="mb-0 font-weight-semibold">
                  ${product.price.toFixed(2)}
                </h3>
                <div className="d-flex ps-3 grap-3 ">
                 <button
                  className="btn bg-cart"
                  onClick={() => SendToProductDetail(product.id)}
                >
                  <i className="fa fa-cart-plus mr-2" /> Product Detail
                </button>
                <button
                  className="btn bg-cart"
                  onClick={() => addToCart(product.id)}
                >
                  <i className="fa fa-cart-plus mr-2" /> Add to cart
                </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCard;
