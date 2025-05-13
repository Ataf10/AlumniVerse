const formatDate = (isoDate) =>
  new Date(isoDate).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });

export default formatDate;
