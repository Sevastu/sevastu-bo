export const formatDate = (dateString: string | Date | undefined, locale = 'en-US'): string => {
  if (!dateString) return 'N/A';
  
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return 'Invalid Date';

  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(date);
};

export const formatCurrency = (amount: number | undefined, currency = 'USD', locale = 'en-US'): string => {
  if (amount === undefined || isNaN(amount)) return 'N/A';

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount);
};

export const formatPhone = (phone: string | undefined): string => {
  if (!phone) return 'N/A';
  // simple formatting, e.g., mapping to a generic format if necessary
  return phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
};
