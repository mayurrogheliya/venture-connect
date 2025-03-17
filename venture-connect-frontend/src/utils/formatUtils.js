export const formatAmount = (value) => {
  const numValue = Number(value);
  if (numValue >= 10000000) {
    return `${(numValue / 10000000).toFixed(2)}Cr`;
  } else if (numValue >= 100000) {
    return `${(numValue / 100000).toFixed(2)}L`;
  } else if (numValue >= 1000) {
    return `${(numValue / 1000).toFixed(0)}K`;
  }
  return `${numValue}`;
};
