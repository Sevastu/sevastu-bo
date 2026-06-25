export const formatDate = (dateString?: string) => {
  if (!dateString) return "N/A";
  try {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      year: "numeric",
    }).format(new Date(dateString));
  } catch (e) {
    return "Invalid Date";
  }
};

export const getInitials = (name?: string) => {
  if (!name) return "?";
  return name.charAt(0).toUpperCase();
};

export const formatCurrency = (amount?: number) => {
  if (amount === undefined || amount === null) return "$0";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};
