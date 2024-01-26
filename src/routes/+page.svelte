<script lang="ts" setup>
  import { onMount } from "svelte";
  import PlatformMinCard from "../components/PlatformMinCard.svelte";
  import Icon from "../components/Icon.svelte";
  import DifferencePill from "../components/DifferencePill.svelte";

  const CHART_MAX = 100;
  const CHART_MIN = 12;

  function generateRandomNumber() {
    return Math.floor(Math.random() * (CHART_MAX - CHART_MIN) + CHART_MIN);
  }

  function generateSeries() {
    return Array.from({ length: 7 }, () => generateRandomNumber());
  }

  const top_platform_names =
    "Nescafe, GTBank, Astro, Midland services, Pst LLC, Milo, MTN, Airtel"
      .split(", ")
      .sort(() => 0.5 - Math.random())
      .slice(0, 4);

  let top_platforms: Record<string, number[]> = {};

  function initiateTopPlatforms() {
    top_platform_names.map((platform) => {
      const _top_platforms = top_platforms;
      _top_platforms[platform] = [generateRandomNumber()];
      top_platforms = _top_platforms;
    });
  }

  initiateTopPlatforms();

  function generateTopPlatformData(platform_name: string) {
    const _top_platforms = top_platforms;
    _top_platforms[platform_name].push(generateRandomNumber());
    top_platforms = _top_platforms;
  }

  function sum(series: number[]) {
    if (!series) return generateRandomNumber();
    return series.reduce((cur, acc) => acc + cur);
  }

  function differentiateSeries(series: number[][]) {
    if (series.length < 2) return generateRandomNumber();
    return sum(series[series.length - 1]) - sum(series[series.length - 2]);
  }

  let trends_options = {
    chart: {
      type: "bar",
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      enabled: true,
      followCursor: false,
      custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        return (
          '<div class="arrow_box bg-dark mx-auto text-center text-light rounded-md border-none px-4">' +
          "<span>" +
          series[seriesIndex][dataPointIndex] +
          "</span>" +
          "</div>"
        );
      },
      style: {
        fontSize: "12px",
      },
      x: {
        show: false,
      },
    },
    fill: {
      colors: ["#EBFAF6", "#39cba7"],
    },
    legend: { show: false },
    plotOptions: {
      bar: {
        distributed: true,
        borderRadius: 30,
        borderRadiusApplication: "end",
      },
    },
    series: [
      {
        name: "sales",
        data: generateSeries(),
      },
    ],
    states: {
      hover: { filter: { type: "darken", value: 0.1 } },
      active: { filter: { type: "none" } },
    },
    xaxis: {
      categories: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      tickPlacement: "on",
    },
    yaxis: {
      show: true,
      tickAmount: 4,
    },
    grid: {
      show: true,
      borderColor: "#90A4AE",
      strokeDashArray: 2,
      position: "back",
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
  };
  let trends_container: any;

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
    colors: ["#008FFB"],
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

  let top_platforms_colors = "bg-primary, bg-red".split(", ");

  onMount(async () => {
    const ApexCharts = (await import("apexcharts")).default;
    const _chart = new ApexCharts(trends_container, trends_options);
    _chart.render();
    const orders_chart = new ApexCharts(orders_container, orders_options);
    orders_chart.render();

    top_platform_names.map((platform, index) => {
      generateTopPlatformData(platform);
    });

    setInterval(() => {
      _chart.updateSeries([{ data: generateSeries() }]);
      orders_chart.updateSeries([{ data: generateOrdersChartSeries() }]);

      top_platform_names.map((platform, index) => {
        generateTopPlatformData(platform);
      });
    }, 5000);
  });
</script>

<div class="p-6 grid grid-cols-5 gap-4">
  <section class="col-span-3 card space-y-4">
    <h2 class="card-title px-4">Sales Trends</h2>
    <div bind:this={trends_container} />
  </section>
  <section class="col-span-2 grid grid-cols-2 gap-4 grid-rows-2">
    {#each "orders, refunds, sales, income".split(", ") as item}
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
    {/each}
  </section>
  <section class="col-span-3 card space-y-4">
    <div class="flex justify-between items-center">
      <h2 class="card-title">Latest orders</h2>
      <a href="/orders" class="text-primary">See all</a>
    </div>
    <ul class="divide-y divide-mute/20 space-y-2">
      <div class="grid grid-cols-6 text-mute py-2">
        <p class="col-span-2">Name</p>
        <p>Date</p>
        <p>Amount</p>
        <p>Status</p>
        <p>Invoice</p>
      </div>
      {#each Array(5) as item}
        <li class="grid grid-cols-6 py-2 items-center">
          <div
            class="col-span-2 text-black dark:text-light font-medium flex items-center gap-2"
          >
            <div class="aspect-square w-8 rounded-full bg-primary"></div>
            <p>Ibrahim Abdulhameed</p>
          </div>
          <p class="text-mute dark:text-light-400/80">
            {new Date().toLocaleString()}
          </p>
          <p class="font-semibold">$80,000</p>
          <p class="text-primary">Paid</p>
          <p
            class="flex gap-2 text-black items-center stroke-black/40 dark:text-light dark:stroke-light/40"
          >
            <Icon title="doc-download" /> View
          </p>
        </li>
      {/each}
    </ul>
  </section>
  <div class="col-span-2">
    <section class="card space-y-4">
      <div class="flex justify-between items-center">
        <h2 class="card-title">Top Platform</h2>
        <a href="/orders" class="text-primary">See all</a>
      </div>
      <div>
        <ul class="space-y-4">
          {#each Object.entries(top_platforms) as [platform_name, data], index}
            <li>
              <PlatformMinCard
                title={platform_name}
                max={CHART_MAX}
                {data}
                color={top_platforms_colors[
                  index % top_platforms_colors.length
                ]}
              />
            </li>
          {/each}
        </ul>
      </div>
    </section>
  </div>
</div>

<style>
  :global(.apexcharts-tooltip) {
    transform: translateX(50%);
  }
</style>
