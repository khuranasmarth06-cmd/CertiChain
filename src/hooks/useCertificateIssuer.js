import { useEffect, useState } from "react";
import useApprovedInstitutes from "./useApprovedInstitutes";
import { findIssuingInstitute } from "../services/contractService";
export default function useCertificateIssuer(certificateId) {
  const { institutes, loading: loadingInstitutes } = useApprovedInstitutes();
  const [issuer, setIssuer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const resolve = async () => {
      if (certificateId === undefined || certificateId === null) {
        setIssuer(null);
        setLoading(false);
        return;
      }
      if (loadingInstitutes) {
        return;
      }
      setLoading(true);
      const found = await findIssuingInstitute(certificateId, institutes);
      if (!cancelled) {
        setIssuer(found);
        setLoading(false);
      }
    };

    resolve();

    return () => {
      cancelled = true;
    };
  }, [certificateId, institutes, loadingInstitutes]);

  return {
    instituteName: issuer?.instituteName || null,
    instituteAddress: issuer?.walletAddress || null,
    loading,
  };
}
