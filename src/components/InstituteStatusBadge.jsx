import { FaCheckCircle, FaTimesCircle, FaHourglassHalf } from "react-icons/fa";

function InstituteStatusBadge({ status }) {
  const config = {
    Approved: { className: "status approved", icon: <FaCheckCircle /> },
    Rejected: { className: "status rejected", icon: <FaTimesCircle /> },
    Pending: { className: "status pending", icon: <FaHourglassHalf /> },
  };
  const { className, icon } = config[status] || {
    className: "status pending",
    icon: <FaHourglassHalf />,
  };

  return (
    <span className={className}>
      {icon}
      {status}
    </span>
  );
}

export default InstituteStatusBadge;
