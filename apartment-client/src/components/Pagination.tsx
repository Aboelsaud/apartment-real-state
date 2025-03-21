interface Props {
  total: number;
  limit: number;
  currentPage: number;
  setPage: (page: number) => void;
}

export default function Pagination({
  total,
  limit,
  currentPage,
  setPage,
}: Props) {
  const totalPages = Math.ceil(total / limit);

  return (
    <nav>
      <ul className="pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <li
            key={i}
            className={`page-item ${i === currentPage ? "active" : ""}`}
          >
            <button className="page-link" onClick={() => setPage(i)}>
              {i + 1}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
