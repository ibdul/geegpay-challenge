<script lang="ts">
  import { onMount } from "svelte";

  let trends_options = {
    chart: {
      type: "bar",
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
        backgroundColor: "red",
      },
      x: {
        show: false,
      },
    },
    fill: {
      colors: [
        function ({ value, seriesIndex, w }) {
          if (value < 55) {
            return "rgba(240, 242, 248, 0.85)";
          } else {
            return "#34CAA5";
          }
        },
      ],
      type: "gradient",
      gradient: {
        type: "vertical",
        gradientToColors: undefined,
        opacityTo: 0.6,
        stops: [10],
      },
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
        data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
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

  let orders_options = {
    chart: {
      type: "area",
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
        data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
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
    const chart = new ApexCharts(trends_container, trends_options);
    chart.render();

    new ApexCharts(orders_container, orders_options).render();
  });
</script>

<div class="p-6 grid grid-cols-5 gap-4">
  <section class="col-span-3 card">
    <h2 class="card-title">Sales Trends</h2>
    <div bind:this={trends_container} />
  </section>
  <section class="col-span-2 grid grid-cols-2 gap-4">
    {#each "order, refund, sales, income".split(", ") as item}
      <div class="card flex flex-col justify-between">
        <div class="flex justify-between items-center">
          <p>icon</p>
          <div bind:this={orders_container} />
        </div>
        <div>
          <h2 class="text-xl font-medium capitalize text-mute">{item}</h2>
          <p class="card-title text-4xl">250</p>
        </div>
        <div class="flex items-center justify-between">
          <p class="bg-blue text-sm rounded-full px-4 py-2">23,5%</p>
          <div class="text-mute">vs. previous month</div>
        </div>
      </div>
    {/each}
  </section>
  <section class="col-span-3 card">
    <div class="flex justify-between items-center">
      <h2 class="card-title">Latest orders</h2>
      <a href="/orders" class="text-primary">See all</a>
    </div>
  </section>
  <section class="col-span-2 card space-y-4">
    <div class="flex justify-between items-center">
      <h2 class="card-title">Top Platform</h2>
      <a href="/orders" class="text-primary">See all</a>
    </div>
    <div>
      <ul>
        <li>
          <div class="space-y-1">
            <h3 class="font-semibold">Book Bazaar</h3>
            <div class="bg-light-400 dark:bg-dark rounded-full relative h-4">
              <div
                class="bg-blue rounded-full w-[50%] transition-default relative h-4"
              ></div>
            </div>
            <div class="flex justify-between items-center text-mute text-sm">
              <p>$2,500,000</p>
              <p>+15%</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </section>
</div>

<style>
  :global(.apexcharts-tooltip) {
    transform: translateX(50%);
  }
</style>
