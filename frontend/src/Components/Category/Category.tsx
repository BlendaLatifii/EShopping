import { useEffect, useState } from "react";
import { CategoryResponseDto } from "../../Interfaces/Category/category-response-dto.ts";
import { CategoryService } from "../../Services/CategoryService.ts";
import Header from "../Header.tsx";
import "./Category.css"; 
import Filters from "../Product/Filters.tsx";
import { ProductService } from "../../Services/ProductService.ts";
import { ProductResponseDto } from "../../Interfaces/Product/product-response-dto.ts";
import CategorySidebar from "./CategorySidebar.tsx";
import ProductGrid from "../Product/ProductGrid.tsx";
import Footer from "../Footer.tsx";

export default function Category() {
  const [categories, setCategories] = useState<CategoryResponseDto[]>([]);
  const [allProducts, setAllProducts] = useState<ProductResponseDto[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductResponseDto[]>([]);

  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
  const fetchData = async () => {
    const cats = await CategoryService.GetAllCategories();
    const products = await ProductService.GetAllProducts();

    setCategories(cats);
    setAllProducts(products);
    setFilteredProducts(products); 
  };

  fetchData();
}, []);
 useEffect(() => {
  let result = [...allProducts];

  if (selectedCategoryId) {
    result = result.filter(p => p.categoryId === selectedCategoryId);
  }

  if (searchTerm.trim() !== "") {
    result = result.filter(p =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  if (sortBy === "price-asc") {
    result.sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-desc") {
    result.sort((a, b) => b.price - a.price);
  }

  setFilteredProducts(result);
}, [selectedCategoryId, searchTerm, sortBy, allProducts]);
 
  return (
    <>
      <div className="page-bg">
        <div className="page-card container-fluid">
          <div className="row">
            <CategorySidebar
              categories={categories}
              selectedId={selectedCategoryId}
              onSelect={setSelectedCategoryId}
            />

            <div className="col-md-9">
              <Filters
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                sortBy={sortBy}
                setSortBy={setSortBy}
              />

              <ProductGrid products={filteredProducts} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
