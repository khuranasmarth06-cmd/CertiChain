import { FaCheckCircle, FaBan, FaClock } from "react-icons/fa";

function StatusBadge({ status }) {
  const config = {
    Active: { className: "status active", icon: <FaCheckCircle /> },
    Revoked: { className: "status revoked", icon: <FaBan /> },
    Expired: { className: "status expired", icon: <FaClock /> },
  };
  const { className, icon } = config[status] || { className: "status", icon: null };

  return (
    <span className={className}>
      {icon}
      {status}
    </span>
  );
}
export default StatusBadge;
