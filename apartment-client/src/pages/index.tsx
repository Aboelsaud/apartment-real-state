import "bootstrap/dist/css/bootstrap.min.css";

import { useState } from "react";
import useApartments from "../hooks/useApartments";
import ApartmentCard from "../components/ApartmentCard";
import Pagination from "../components/Pagination";
import SearchForm from "../components/SearchForm";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import { Apartment } from "../types/apartment";

interface SearchFilters {
  name?: string;
  unitNo?: string;
  project?: string;
}

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState<SearchFilters>({});
  const [page, setPage] = useState<number>(0);

  const { apartments, total, limit, loading, error } = useApartments({
    searchQuery,
    page,
  });

  return (
    <div
      className="min-vh-100 d-flex flex-column"
      style={{
        background:
          "linear-gradient(135deg, rgba(240, 245, 250, 0.8), rgba(220, 230, 240, 0.9))", // Light bluish-gray
      }}
    >
      <Navbar />

      <div className="container mt-5 flex-grow-1">
        {/* Modern Search Bar */}
        <div className="d-flex justify-content-center">
          <SearchForm onSearch={setSearchQuery} />
        </div>

        {error && (
          <div className="alert alert-danger text-center mt-3">{error}</div>
        )}

        {loading ? (
          <Loader />
        ) : (
          <div className="row mt-4">
            {apartments.map((apartment: Apartment) => (
              <div key={apartment.apartmentId} className="col-md-4 mb-4">
                <ApartmentCard apartment={apartment} />
              </div>
            ))}
          </div>
        )}

        {/* Centered Pagination */}
        <div className="d-flex justify-content-center mt-4">
          <Pagination
            total={total}
            limit={limit}
            currentPage={page}
            setPage={setPage}
          />
        </div>
      </div>
    </div>
  );
}
