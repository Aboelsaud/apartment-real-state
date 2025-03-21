import { useState } from "react";
import { useRouter } from "next/router";
import { createApartment } from "../services/api";
import Navbar from "@/components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";

export default function CreateApartment() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    unitNo: "",
    project: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<any>({});
  const router = useRouter();

  const FIELD_LIMITS = {
    name: 20,
    description: 200,
    unitNo: 20,
    project: 20,
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });

    // Real-time validation for field lengths
    let errors: Record<string, string> = { ...fieldErrors }; // Update type
    if (value.length > FIELD_LIMITS[name as keyof typeof FIELD_LIMITS]) {
      errors[name] = `${
        name.charAt(0).toUpperCase() + name.slice(1)
      } must not exceed ${
        FIELD_LIMITS[name as keyof typeof FIELD_LIMITS]
      } characters`;
    } else {
      // Clear the error if the input length is within the limit
      delete errors[name];
    }

    setFieldErrors(errors);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null); // Reset error before request

    // Validate all fields before submitting
    if (Object.keys(fieldErrors).length > 0) {
      setLoading(false);
      return;
    }

    try {
      await createApartment({ ...form, price: parseFloat(form.price) });
      router.push("/");
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-vh-100 d-flex flex-column"
      style={{
        background: `linear-gradient(rgba(20, 50, 80, 0.4), rgba(10, 30, 60, 0.6)), url('/apartment.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Navbar />

      <div className="container d-flex align-items-center justify-content-center flex-grow-1">
        <div className="row justify-content-center w-100">
          <div className="col-lg-6">
            <div
              className="card shadow-lg border-0 p-4"
              style={{
                background: "rgba(255, 255, 255, 0.2)", // Glassy effect
                backdropFilter: "blur(12px)",
                borderRadius: "15px",
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
                Add New Apartment
              </h2>

              {/* Error Message Display */}
              {error && <div className="alert alert-danger">{error}</div>}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                  {fieldErrors.name && (
                    <div className="text-danger">{fieldErrors.name}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    required
                  />
                  {fieldErrors.description && (
                    <div className="text-danger">{fieldErrors.description}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label">Price</label>
                  <input
                    type="number"
                    className="form-control"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Unit No</label>
                  <input
                    type="text"
                    className="form-control"
                    name="unitNo"
                    value={form.unitNo}
                    onChange={handleChange}
                    required
                  />
                  {fieldErrors.unitNo && (
                    <div className="text-danger">{fieldErrors.unitNo}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label">Project</label>
                  <input
                    type="text"
                    className="form-control"
                    name="project"
                    value={form.project}
                    onChange={handleChange}
                    required
                  />
                  {fieldErrors.project && (
                    <div className="text-danger">{fieldErrors.project}</div>
                  )}
                </div>

                {/* Submit Button */}
                <div className="text-center mt-4">
                  <button
                    type="submit"
                    className="btn btn-lg shadow-lg"
                    disabled={loading || Object.keys(fieldErrors).length > 0}
                    style={{
                      backgroundColor: "rgba(0, 123, 255, 0.7)",
                      color: "#fff",
                      fontWeight: "600",
                      backdropFilter: "blur(5px)",
                      transition: "0.3s ease-in-out",
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor =
                        "rgba(0, 123, 255, 0.9)";
                      e.currentTarget.style.boxShadow =
                        "0 0 15px rgba(0, 123, 255, 0.6)";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor =
                        "rgba(0, 123, 255, 0.7)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    {loading ? "Adding..." : "Add Apartment"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
