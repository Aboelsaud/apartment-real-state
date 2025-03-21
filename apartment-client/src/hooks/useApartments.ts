import { useState, useEffect } from "react";
import { getApartments } from "../services/api";
import { Apartment } from "../types/apartment";

interface SearchFilters {
  name?: string;
  unitNo?: string;
  project?: string;
}

interface Props {
  searchQuery: SearchFilters;
  page: number;
}

export default function useApartments({ searchQuery, page }: Props) {
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    getApartments({ ...searchQuery, page, limit })
      .then((data) => {
        setApartments(data.apartments);
        setTotal(data.total);
        setLimit(data.limit);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [searchQuery, page]);

  return { apartments, total, limit, loading, error };
}
