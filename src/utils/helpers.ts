const months = [
  'ledna',
  'února',
  'března',
  'dubna',
  'května',
  'června',
  'července',
  'srpna',
  'září',
  'řijna',
  'listopadu',
  'prosince',
];

export const getFormatedDate = (date: Date) => {
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const dateStr = `${day}. ${months[month]} ${year}`;

  return dateStr;
};
