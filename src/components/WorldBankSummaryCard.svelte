<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import DifferencePill from "./DifferencePill.svelte";
  import Icon from "./Icon.svelte";
  import {
    sum,
    generateSeries,
    generateRandomNumber,
    formatOutputFromAPI,
    formatCurrency,
    generateAPI,
    reduceField,
  } from "$lib/index";

  export let item: string;
  export let is_percent = false;
  export let unit = "";

  function differentiateSeries(series: number[]) {
    if (series.length < 2) return generateRandomNumber();
    return series[series.length - 1] - series[series.length - 2];
  }

  let orders_series: number[] = [];
  function generateOrdersChartSeries() {
    const generated_series = generateSeries();
    const _orders_series = orders_series;
    _orders_series.push(generated_series);
    orders_series = _orders_series;
    return generated_series;
  }
  let orders_options = {
    chart: {
      type: "area",
      height: 80,
      toolbar: {
        autoSelected: "pan",
        show: false,
      },
    },
    colors: [differentiateSeries(orders_series) > 0 ? "#66C87B" : "#ED544E"],
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.91,
        opacityTo: 0.1,
      },
    },
    brush: {
      target: "chart2",
      enabled: true,
    },
    selection: {
      enabled: true,
    },
    stroke: {
      width: 1,
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 0,
    },
    series: [
      {
        name: "sales",
        data: generateSeries(),
      },
    ],
    grid: {
      borderColor: "#FF00FF05",
    },
    xaxis: {
      categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
      labels: { show: false },
      axisTicks: { show: false },
      axisBorder: { show: false },
    },
    legend: {
      show: false,
    },
    yaxis: {
      labels: { show: false },
    },
  };

  let orders_container: any;
  let data;

  onMount(async () => {
    const ApexCharts = (await import("apexcharts")).default;
    const orders_chart = new ApexCharts(orders_container, orders_options);
    orders_chart.render();

    fetch(generateAPI(item as any))
      .then(async (response) => await response.json())
      .then((response) => {
        data = formatOutputFromAPI(response).slice(0, 10).reverse();
        orders_series = reduceField("value", data.slice(0, 10));
        orders_chart.updateOptions({
          series: [
            {
              data: reduceField("value", data),
            },
          ],
          colors: [
            differentiateSeries(reduceField("value", data)) <= 0
              ? "#66C87B"
              : "#ED544E",
          ],
          xaxis: {
            categories: reduceField("date", data),
          },
        });
      });
  });
</script>

<div class="card flex flex-col justify-between gap-2">
  <div class="flex justify-between items-start">
    <div class="p-2 aspect-square grid place-items-center">
      {data ? reduceField("date", data)[data.length - 1] : ""}
      {item.replaceAll("_", " ")}
    </div>
    <div bind:this={orders_container} class="max-h-20 !min-h-20" />
  </div>
  <div>
    <h2 class="text-xl font-medium capitalize text-mute">
      Total {item.replaceAll("_", " ")}
    </h2>
    <p class="card-title text-4xl">
      {unit}
      {"$, NGN,".split(", ").includes(unit)
        ? formatCurrency(Number(orders_series[orders_series.length - 1]))
        : Number(orders_series[orders_series.length - 1]).toFixed(2)}
      {is_percent ? "%" : ""}
    </p>
  </div>
  <DifferencePill
    reversed={true}
    title="previous year"
    is_currency={"$, NGN,".split(", ").includes(unit)}
    difference={Number(differentiateSeries(orders_series)).toFixed(2)}
  />
</div>
