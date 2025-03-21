import { FaTag, FaBuilding } from "react-icons/fa";
import { Apartment } from "../types/apartment";

interface Props {
  apartment: Apartment;
  style?: React.CSSProperties;
}

export default function ApartmentCard({ apartment, style }: Props) {
  return (
    <div
      className="position-relative"
      style={{
        borderRadius: "15px",
        overflow: "hidden",
      }}
    >
      {/* Background Glass Effect */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          background: "rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(12px)",
          borderRadius: "15px",
          zIndex: 0,
        }}
      ></div>

      {/* Main Card */}
      <div
        className="card shadow-lg border-0 p-3 position-relative"
        style={{
          background: "rgba(220, 230, 245, 0.7)", // Softer blue-gray for elegance
          borderRadius: "15px",
          boxShadow: "0 6px 16px rgba(0, 0, 0, 0.2)",
          transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          ...style,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-4px) scale(1.02)";
          e.currentTarget.style.boxShadow = "0 10px 20px rgba(0, 0, 0, 0.25)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0) scale(1)";
          e.currentTarget.style.boxShadow = "0 6px 16px rgba(0, 0, 0, 0.2)";
        }}
      >
        <div className="card-body text-center">
          {/* Apartment Name */}
          <h5
            style={{
              fontSize: "1.6rem",
              fontWeight: "bold",
              color: "#1E4164", // Deep navy blue
              textShadow: "2px 2px 6px rgba(0, 0, 0, 0.2)",
            }}
          >
            {apartment.name}
          </h5>

          {/* Price Section */}
          <div className="d-flex align-items-center justify-content-center mt-3">
            <FaTag className="me-2" size={20} style={{ color: "#17a2b8" }} />
            <h6 className="mb-0 me-2" style={{ color: "#1E4164" }}>
              Price:
            </h6>
            <span
              style={{
                fontSize: "1.3rem",
                fontWeight: "700",
                color: "#17a2b8",
                textShadow: "0 0 8px rgba(23, 162, 184, 0.6)", // Soft glow effect
              }}
            >
              ${apartment.price}
            </span>
          </div>

          {/* Project Section */}
          <div className="d-flex align-items-center justify-content-center mt-2">
            <FaBuilding
              className="me-2"
              size={20}
              style={{ color: "#007bff" }}
            />
            <h6 className="mb-0 me-2" style={{ color: "#1E4164" }}>
              Project:
            </h6>
            <span
              style={{
                fontSize: "1.1rem",
                fontWeight: "500",
                opacity: "0.9",
                color: "#1E4164",
              }}
            >
              {apartment.project}
            </span>
          </div>

          {/* View Details Button */}
          <div className="mt-3">
            <a
              href={`/apartment/${apartment.apartmentId}`}
              className="btn"
              style={{
                fontWeight: "bold",
                border: "2px solid rgba(30, 65, 100, 0.6)",
                color: "#1E4164",
                transition: "0.3s ease-in-out",
                backgroundColor: "rgba(30, 65, 100, 0.1)",
                borderRadius: "8px",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor =
                  "rgba(30, 65, 100, 0.2)";
                e.currentTarget.style.boxShadow =
                  "0 0 12px rgba(30, 65, 100, 0.4)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor =
                  "rgba(30, 65, 100, 0.1)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              View Details
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
