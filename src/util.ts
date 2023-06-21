export const orElse = (value: any, valueIfNull: any) => {
  return value === null || value === undefined ? valueIfNull : value;
};

export const isDefined = (obj?: any) => {
  return obj !== null && obj !== undefined;
};

export const round2 = (num: any) => {
  const m = Number((Math.abs(num) * 100).toPrecision(15));
  return (Math.round(m) / 100) * Math.sign(num);
};
