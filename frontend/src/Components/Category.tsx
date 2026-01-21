import { useEffect, useState } from "react";
import { CategoryResponseDto } from "../Interfaces/Category/category-response-dto.ts";
import { CategoryService } from "../Services/CategoryService.ts";
import Header from "../Components/Header.tsx";
import ProductCard from "../Components/ProductCard.tsx";
import "./Category.css"; 

export default function Category() {
  const [category, setCategory] = useState<CategoryResponseDto[]>([]);

  const fetchCategory = async () => {
    try {
      const categories = await CategoryService.GetAllCategories();
      setCategory(categories);
    } catch (error) {
      console.error("Error fetching category:", error);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <>
      <Header />
      <div className="container-fluid mt-4">
        <div className="row">
          {/* Sidebar për kategori */}
          <div className="col-md-3 col-lg-2 sidebar bg-light p-3 shadow-sm rounded">
            <h5 className="mb-3 text-primary">Categories</h5>
            <ul className="list-group list-group-flush">
              {category.map((cat) => (
                <li
                  className="list-group-item list-group-item-action category-item"
                  style={{ cursor: "pointer" }}
                  key={cat.name}
                >
                  {cat.name}
                </li>
              ))}
            </ul>
          </div>

          <div className="col-md-9 col-lg-10">
            <ProductCard />
          </div>
        </div>
      </div>
    </>
  );
}
