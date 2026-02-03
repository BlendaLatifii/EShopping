import { useEffect, useState } from "react";
import Header from "./Header.tsx";
import "./HomePage.css";
import { Link } from "react-router-dom";
import { CategoryResponseDto } from "../Interfaces/Category/category-response-dto.ts";
import { CategoryService } from "../Services/CategoryService.ts";
import Footer from "./Footer.tsx";

export default function Home() {
    const[categories, setCategories] = useState<CategoryResponseDto[]>([]); 

    const fetchData= async () => {
     const category = await CategoryService.GetAllCategories();
     setCategories(category);
    }

    useEffect(() => {
      fetchData();
    }, []);
    
  return (
    <>
      <Header />

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

      {/* FEATURED PRODUCTS */}
      <section className="bg-light py-5">
        <div className="container">
          <h2 className="section-title">Featured Products</h2>

          <div className="row">
            {[1, 2, 3].map((_, i) => (
              <div className="col-md-4 mb-4" key={i}>
                <div className="product-card">
                  <img
                    src="/images/no-image.png"
                    alt="product"
                  />
                  <h5>Product Name</h5>
                  <p>$99.99</p>
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
          <div className="col-md-4">
            <h5>🚚 Fast Delivery</h5>
            <p>Quick and reliable shipping</p>
          </div>
          <div className="col-md-4">
            <h5>🔒 Secure Payments</h5>
            <p>Your data is always safe</p>
          </div>
          <div className="col-md-4">
            <h5>⭐ Quality Products</h5>
            <p>Only trusted brands</p>
          </div>
        </div>
      </section>
      <Footer/>
    </>
  );
}
