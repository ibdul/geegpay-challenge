export const CHART_MAX = 100;
export const CHART_MIN = 12;

export function generateRandomNumber() {
  return Math.floor(Math.random() * (CHART_MAX - CHART_MIN) + CHART_MIN);
}

export function generateSeries() {
  return Array.from({ length: 7 }, () => generateRandomNumber());
}

export function sum(series: number[]) {
  if (!series) return generateRandomNumber();
  return series.reduce((cur, acc) => acc + cur);
}

export function viewTransition(action:()=>void){
  //@ts-ignore
  if (!document.startViewTransition) {
    action();
    return;
  }
  //@ts-ignore
  document.startViewTransition(action);
}

export function reduceField(field: string, data: Record<string, any>) {
  return data.reduce((acc, curr) => {
    acc.push(curr[field]);
    return acc;
  }, []);
}

export const indicators = {
  inflation: "FP.CPI.TOTL.ZG",
  gdp: "NY.GDP.MKTP.CD",
  debt_stock: "DT.DOD.DECT.CD",
  /* revenue: "GC.REV.XGRT.GD.ZS", */
  /* expenditure: "GC.XPN.TOTL.GD.ZS", */
};

const country = "ng";

export function generateAPI(indicator_title: keyof typeof indicators) {
  const url = new URL(
    `http://api.worldbank.org/v2/country/${country}/indicator/${indicators[indicator_title]}`,
  );
  url.searchParams.set("date", "2024:2020");
  url.searchParams.set("format", "JSON");
  return url.toString();
}

export function formatOutputFromAPI(response: any) {
  return response[1];
}


export function formatCurrency(value, x = 3, s = ",", c = ".") {
  if (!isNaN(value)) {
    const formattedNumber = value.toFixed(2);
    const [wholePart, decimalPart] = formattedNumber.split(".");

    return `${Number(wholePart).toLocaleString()}${c}${decimalPart}`;
  }
  return undefined;
}
