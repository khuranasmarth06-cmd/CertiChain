import { useEffect, useState } from "react";
import { getApprovedInstitutes } from "../services/adminAuth";
export default function useApprovedInstitutes() {
  const [institutes, setInstitutes] =useState([]);
  const [loading, setLoading] =useState(true);
  useEffect(() => {
    const load = async () => {
      try {
        const data =await getApprovedInstitutes();
        setInstitutes(data);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);
  return {
    institutes,
    loading,
  };
}