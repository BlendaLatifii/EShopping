import { ProductResponseDto } from "../../Interfaces/Product/product-response-dto";
import ProductCard from "./ProductCard.tsx";

export default function ProductGrid({ products }: { products: ProductResponseDto[] }) {
  if (products.length === 0) {
    return <p className="text-muted mt-4">No products found.</p>;
  }

  return (
    <div className="row mt-4">
      {products.map(p => (
        <div key={p.id} className="col-md-4">
          <ProductCard product={p} />
        </div>
      ))}
    </div>
  );
}
