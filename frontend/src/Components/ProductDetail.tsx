import { useEffect, useState } from "react";
import { ProductResponseDto } from "../Interfaces/Product/product-response-dto.ts";
import { ProductService } from "../Services/ProductService.ts";
import "./ProductDetail.css";
import { useParams } from "react-router-dom";
import Header from "./Header.tsx";
import ProductImage from "./ProductImage.tsx";

export default function ProductDetail(){
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductResponseDto>();  

  useEffect(() => {
    const fetchProduct = async () => {
      if(id!= null){
        const data = await ProductService.GetProductById(id!);
        setProduct(data);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div className="container mt-5">Loading...</div>;
  }

  const images = product.imageUrl
  ? product.imageUrl.split(",")
  : [];
    return (
        <>
        <Header/>
    <div className="product-detail-content">
    <div className="row">
    {/* Kolona e majtë: Imazhi i produktit */}
    <div className="col-md-6">
      <div className="product-image-wrapper shadow-sm rounded">
        <img
          src={product.imageUrl ? `https://localhost:7147/${product.imageUrl.split(",")[0]}` : "/images/no-image.png"}
          className="img-fluid"
          alt={product!.name}
        />
      </div>
    </div>

    {/* Kolona e djathtë: Informacioni i produktit */}
    <div className="col-md-6">
      <ProductImage images={images} />
      <h2 className="mb-3">{product.name}</h2>
      <h5 className="mb-3">{product.description}</h5>
      <h4 className="text-primary mb-3">${product.price.toFixed(2)}</h4>

      

      <button className="btn btn-primary mb-2">
        <i className="fa fa-cart-plus mr-2"/> Add to Cart
      </button>
    </div>
  </div>
  {/* Related products */}
  {/* <div className="row mt-5">
    <h4>Related Products</h4>
    <ProductCard /> {/* Mund të shfaqësh 3-4 produkte të ngjashme */}
</div>
</>
    )
}
