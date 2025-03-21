import { useState } from "react";

interface SearchFilters {
  name?: string;
  unitNo?: string;
  project?: string;
}

interface SearchFormProps {
  onSearch: (filters: SearchFilters) => void;
}

export default function SearchForm({ onSearch }: SearchFormProps) {
  const [filters, setFilters] = useState<SearchFilters>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(filters);
  };

  return (
    <div className="container mt-4">
      <form onSubmit={handleSubmit} className="p-3 rounded shadow-lg">
        <div className="row g-3 align-items-center">
          <div className="col-md-4">
            <input
              type="text"
              name="name"
              placeholder="Search by name"
              className="form-control rounded-pill px-3 py-2"
              onChange={handleChange}
              style={{ boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)" }}
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              name="unitNo"
              placeholder="Search by Unit No"
              className="form-control rounded-pill px-3 py-2"
              onChange={handleChange}
              style={{ boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)" }}
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              name="project"
              placeholder="Search by Project"
              className="form-control rounded-pill px-3 py-2"
              onChange={handleChange}
              style={{ boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)" }}
            />
          </div>
        </div>
        <div className="text-center mt-3">
          <button
            type="submit"
            className="btn btn-primary px-5 py-2 rounded-pill"
            style={{ transition: "0.3s", fontWeight: "bold" }}
            onMouseOver={(e) => (e.currentTarget.style.opacity = "0.8")}
            onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
}
