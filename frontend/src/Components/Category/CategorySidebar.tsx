import { CategoryResponseDto } from "../../Interfaces/Category/category-response-dto";

type Props = {
  categories: CategoryResponseDto[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
};

export default function CategorySidebar({ categories, selectedId, onSelect }: Props) {
  return (
    <div className="col-md-3 sidebar">
      <h5 className="sidebar-title">Categories</h5>

      <ul className="list-group list-group-flush">
        <li
          className={`list-group-item category-item ${selectedId === null ? "active" : ""}`}
          onClick={() => onSelect(null)}
        >
          All Products
        </li>

        {categories.map(cat => (
          <li
            key={cat.id}
            className={`list-group-item category-item ${
              selectedId === cat.id ? "active" : ""
            }`}
            onClick={() => onSelect(cat.id)}
          >
            {cat.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
