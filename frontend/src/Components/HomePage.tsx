import { useEffect, useState } from "react";
import "./HomePage.css";
import { Link } from "react-router-dom";
import { CategoryResponseDto } from "../Interfaces/Category/category-response-dto.ts";
import { CategoryService } from "../Services/CategoryService.ts";
import { ProductResponseDto } from "../Interfaces/Product/product-response-dto.ts";
import { ProductService } from "../Services/ProductService.ts";

export default function Home() {
    const[categories, setCategories] = useState<CategoryResponseDto[]>([]); 
    const[products, setProducts] = useState<ProductResponseDto[]>([]);

    const fetchData= async () => {
     const category = await CategoryService.GetAllCategories();
     setCategories(category);
    }
    
    const fetchProducts = async() =>{
       const product = await ProductService.GetProductsByCategory();
       setProducts(product);
    }

    useEffect(() => {
      fetchData();
      fetchProducts();
    }, []);
    
  return (
    <>

      <section className="hero">
        <div className="container text-center">
          <h1>Shop Smart. Live Better.</h1>
          <p>Your favorite products, just one click away.</p>

          <Link to="/Category" className="btn btn-primary btn-lg">
            Shop Now
          </Link>
        </div>
      </section>

      <section className="container my-5">
        <h2 className="section-title">Shop by Category</h2>

        <div className="row">
          {categories.map((cat, i) => (
            <div className="col-md-3 mb-4" key={i}>
              <div className="category-card">
                <h5>{cat.name}</h5>
                <Link to="/Category" className="stretched-link" />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-light py-5">
        <div className="container">
          <h2 className="section-title">Featured Products</h2>

          <div className="row">
            {products.map((product, i) => (
              <div className="col-md-4 mb-4" key={i}>
                <div className="product-card">
                  <img
                    src={product.imageUrl
                      ? `https://localhost:7147/${product.imageUrl.split(",")[0]}`
                      : "/images/no-image.png"}
                    alt={product.name}
                  />
                  <h5>{product.name}</h5>
                  <p>{product.description}</p>
                  <button className="btn btn-outline-primary btn-sm">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container my-5">
        <div className="row text-center">
          <div className="col-md-5">
            <h5>🔒 Secure Payments</h5>
            <p>Your data is always safe</p>
          </div>
          <div className="col-md-5">
            <h5>⭐ Quality Products</h5>
            <p>Only trusted brands</p>
          </div>
        </div>
      </section>
    </>
  );
}
