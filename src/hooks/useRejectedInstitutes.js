import { useState, useEffect, useCallback } from "react";
import { getRejectedInstitutes } from "../services/adminAuth";

// Mirrors useApprovedInstitutes.js
function useRejectedInstitutes() {
  const [institutes, setInstitutes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchInstitutes = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getRejectedInstitutes();
      setInstitutes(data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInstitutes();
  }, [fetchInstitutes]);

  return { institutes, loading, refetch: fetchInstitutes };
}

export default useRejectedInstitutes;
