import { useEffect, useState } from "react";
import { getPendingInstitutes } from "../services/adminAuth";
export default function usePendingInstitutes() {
  const [institutes, setInstitutes] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchInstitutes = async () => {
      try {
        const data=await getPendingInstitutes();
        setInstitutes(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchInstitutes();
  }, []);
  return {institutes,loading,};
}