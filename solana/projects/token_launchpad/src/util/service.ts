const convertRawAmountIntoHumanReadableForm = (
  amount: number,
  decimals: number
) => {
  return amount / 10 ** decimals;
};

const convertAmountIntoRaw = (amount: number, decimals: number) => {
  return amount * 10 ** decimals;
};

export { convertRawAmountIntoHumanReadableForm, convertAmountIntoRaw };
