import Institute from "../../institute/models/institute.js";
export const getPendingInstitutes = async () => {
  return await Institute.find({
    status: "Pending",
  }).select("-password");
};

export const approveInstitute = async (walletAddress) => {
  const institute = await Institute.findOneAndUpdate(
    { walletAddress },
    {
      status: "Approved",
    },
    {
      new: true,
    }
  );
  if (!institute) {
    throw new Error("Institute not found");
  }
  return institute;
};