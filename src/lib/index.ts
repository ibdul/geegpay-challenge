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

