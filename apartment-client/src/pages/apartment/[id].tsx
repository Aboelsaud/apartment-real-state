import { useEffect, useState } from "react";
import { getApartmentById } from "../../services/api";
import { Apartment } from "../../types/apartment";
import Navbar from "../../components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaBuilding, FaTag, FaInfoCircle, FaHashtag } from "react-icons/fa";
import Link from "next/link";
import { GetServerSidePropsContext } from "next";

interface Props {
  id: string;
}

export default function ApartmentDetails({ id }: Props) {
  const [apartment, setApartment] = useState<Apartment | null>(null);

  useEffect(() => {
    const fetchApartment = async () => {
      try {
        const data = (await getApartmentById(id)) as Apartment;
        setApartment(data);
      } catch (err) {
        console.error("Failed to fetch apartment", err);
      }
    };

    fetchApartment();
  }, [id]);

  if (!apartment) return <div>Loading...</div>;

  return (
    <div
      className="min-vh-100 d-flex flex-column position-relative"
      style={{
        background: `linear-gradient(rgba(20, 50, 80, 0.4), rgba(10, 30, 60, 0.6)), url('/apartment.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Navbar />

      <div className="container d-flex align-items-center justify-content-center flex-grow-1">
        <div className="row justify-content-center w-100">
          <div className="col-lg-7">
            <div
              className="card shadow-lg border-0 p-4"
              style={{
                background: "rgba(255, 255, 255, 0.1)",
                borderRadius: "15px",
                backdropFilter: "blur(12px)",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
              }}
            >
              <h2
                className="text-center mb-4"
                style={{
                  color: "rgb(30, 65, 100)",
                  fontSize: "2.5rem",
                  fontWeight: "800",
                  textShadow: "4px 4px 10px rgba(0, 0, 0, 0.3)",
                }}
              >
                {apartment.name}
              </h2>

              <div className="row g-3 text-start">
                <DetailCard
                  icon={<FaHashtag style={{ color: "#17a2b8" }} />}
                  label="Unit No"
                  value={apartment.unitNo}
                />
                <DetailCard
                  icon={<FaBuilding style={{ color: "#007bff" }} />}
                  label="Project"
                  value={apartment.project}
                />
                <DetailCard
                  icon={<FaTag style={{ color: "#1E4164" }} />}
                  label="Price"
                  value={`$${apartment.price.toLocaleString()}`}
                  textColor="text-success"
                />
                <DetailCard
                  icon={<FaInfoCircle style={{ color: "#ffc107" }} />}
                  label="Description"
                  value={apartment.description}
                  isFullWidth
                />
              </div>

              <div className="text-center mt-4">
                <Link href="/" passHref>
                  <button
                    className="btn btn-lg shadow-lg"
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.2)",
                      color: "#fff",
                      fontWeight: "600",
                      backdropFilter: "blur(5px)",
                      transition: "0.3s ease-in-out",
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor =
                        "rgba(255, 255, 255, 0.4)";
                      e.currentTarget.style.boxShadow =
                        "0 0 15px rgba(255, 255, 255, 0.6)";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor =
                        "rgba(255, 255, 255, 0.2)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    ⬅ Back to Listings
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// DetailCard Component with Responsive Text
const DetailCard = ({
  icon,
  label,
  value,
  isFullWidth = false,
  textColor = "text-dark",
}: {
  icon: any;
  label: string;
  value: string;
  isFullWidth?: boolean;
  textColor?: string;
}) => {
  return (
    <div className={isFullWidth ? "col-12" : "col-md-6 col-lg-4"}>
      <div
        className="card p-3 shadow-lg text-start"
        style={{
          background: "rgba(255, 255, 255, 0.15)",
          borderRadius: "12px",
          backdropFilter: "blur(15px)",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
        }}
      >
        <div className="d-flex align-items-center">
          <div className="me-3 fs-4 text-primary">{icon}</div>
          <div style={{ maxWidth: "100%", overflow: "hidden" }}>
            <p
              className="mb-1"
              style={{
                fontSize: "1.3rem",
                fontWeight: "bold",
                color: "rgb(30, 65, 100)",
                wordWrap: "break-word", // Ensures the text doesn't overflow
                whiteSpace: "normal", // Ensures long words wrap to next line
              }}
            >
              {label}
            </p>
            <p
              className={`mb-0 ${textColor}`}
              style={{
                fontSize: "1.1rem",
                fontWeight: "500",
                wordWrap: "break-word", // Ensures the value text doesn't overflow
                whiteSpace: "normal", // Ensures long values wrap to next line
                overflow: "hidden", // Prevents overflow
                textOverflow: "ellipsis", // Truncates text with ellipsis if overflow happens
              }}
            >
              {value}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Client-side Route Params
ApartmentDetails.getInitialProps = async ({
  query,
}: GetServerSidePropsContext) => {
  return { id: query.id };
};
