<script lang="ts">
  import { onMount } from "svelte";
  import DifferencePill from "./DifferencePill.svelte";
  import Icon from "./Icon.svelte";
  import { sum, generateRandomNumber, generateSeries } from "../lib/index";

  export let item: string;

  function differentiateSeries(series: number[][]) {
    if (series.length < 2) return generateRandomNumber();
    return sum(series[series.length - 1]) - sum(series[series.length - 2]);
  }

  let orders_series: number[][] = [];
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

  onMount(async () => {
    const ApexCharts = (await import("apexcharts")).default;
    const orders_chart = new ApexCharts(orders_container, orders_options);
    orders_chart.render();

    setInterval(() => {
      orders_chart.updateOptions({
        series: [{ data: generateOrdersChartSeries() }],
        colors: [
          differentiateSeries(orders_series) >= 0 ? "#66C87B" : "#ED544E",
        ],
      });
    }, 5000);
  });
</script>

<div class="card flex flex-col justify-between">
  <div class="flex justify-between items-start">
    <div
      class="p-2 aspect-square w-12 grid place-items-center border border-color rounded-full"
    >
      <Icon title={item} />
    </div>
    <div bind:this={orders_container} class="max-h-20 !min-h-20" />
  </div>
  <div>
    <h2 class="text-xl font-medium capitalize text-mute">Total {item}</h2>
    <p class="card-title text-4xl">
      {sum(orders_series[orders_series.length - 1])}
    </p>
  </div>
  <DifferencePill difference={differentiateSeries(orders_series)} />
</div>
