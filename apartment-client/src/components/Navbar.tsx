import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Navbar() {
  return (
    <nav
      className="navbar navbar-expand-lg fixed-top shadow-sm"
      style={{
        background: "rgba(30, 55, 90, 0.5)", // Semi-transparent dark blue
        backdropFilter: "blur(12px)", // Glass effect
        borderBottom: "1px solid rgba(255, 255, 255, 0.2)", // Subtle border
      }}
    >
      <div className="container">
        {/* Brand Logo */}
        <Link href="/" className="navbar-brand fw-bold fs-4 text-light">
          🏡 Real Estate
        </Link>

        {/* Toggle Button for Mobile */}
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link
                href="/create"
                className="nav-link"
                style={{
                  color: "#fff",
                  fontWeight: "600",
                  padding: "10px 16px",
                  borderRadius: "8px",
                  background: "rgba(255, 255, 255, 0.2)",
                  transition: "all 0.3s ease-in-out",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background =
                    "rgba(255, 255, 255, 0.3)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background =
                    "rgba(255, 255, 255, 0.2)")
                }
              >
                ➕ Add Apartment
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
