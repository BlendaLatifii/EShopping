import { useEffect, useState } from "react";
import { ProductResponseDto } from "../../Interfaces/Product/product-response-dto.ts";
import { ProductService } from "../../Services/ProductService.ts";
import "./ProductDetail.css";
import { useParams } from "react-router-dom";
import Header from "../Header.tsx";
import Footer from "../Footer.tsx";
import ProductImage from "./ProductImage.tsx";
import ProductCard from "./ProductCard.tsx";

export default function ProductDetail(){
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductResponseDto>();  
  const [recommended, setRecommended] = useState<ProductResponseDto[]>([]);

  useEffect(() => {
    const fetchProduct = async () => {
      if(id!= null){
        const data = await ProductService.GetProductById(id!);
        setProduct(data);
      }
    };

  const fetchRecommended = async () => {
    if(id){
      const recomendedData = await ProductService.GetSimilarProducts(id);
      setRecommended(recomendedData);
    }
  };
    
    fetchRecommended();
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
    <div className="product-detail-content">
    <div className="row">
    <div className="col-md-6">
      <div className="product-image-wrapper shadow-sm rounded">
        <img
          src={product.imageUrl ? `https://localhost:7147/${product.imageUrl.split(",")[0]}` : "/images/no-image.png"}
          className="img-fluid"
          alt={product!.name}
        />
      </div>
    </div>

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
<div className="row mt-5">
  <h4>Related Products</h4>

  {recommended.map(p => (
    <div key={p.id} className="col-md-3">
      <ProductCard product={p}/>
    </div>
  ))}
</div>
</div>
</>
    )
}
