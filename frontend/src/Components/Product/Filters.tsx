type Props = {
  searchTerm: string;
  setSearchTerm: (v: string) => void;
  sortBy: string;
  setSortBy: (v: string) => void;
};

export default function Filters({ searchTerm, setSearchTerm, sortBy, setSortBy }: Props) {
  return (
    <div className="filters">
      <input
        className="form-control"
        placeholder="Search product..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />

      <select
        className="form-select"
        value={sortBy}
        onChange={e => setSortBy(e.target.value)}
      >
        <option value="">Sort by price</option>
        <option value="price-asc">Low → High</option>
        <option value="price-desc">High → Low</option>
      </select>
    </div>
  );
}
