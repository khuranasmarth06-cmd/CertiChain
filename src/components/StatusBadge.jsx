function StatusBadge({ status }) {
  const getStatusClass = () => {
    switch (status) {
      case "Active":
        return "status active";
      case "Revoked":
        return "status revoked";
      case "Expired":
        return "status expired";
      default:
        return "status";
    }
  };
  return (
    <span className={getStatusClass()}>
      {status}
    </span>
  );
}
export default StatusBadge;