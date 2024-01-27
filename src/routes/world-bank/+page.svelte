<script lang="ts">
  import { onMount } from "svelte";
  import {
    generateSeries,
    formatOutputFromAPI,
    generateAPI,
    reduceField,
  } from "$lib/index";
  import WorldBankSummaryCard from "../../components/WorldBankSummaryCard.svelte";

  let data: any;
  let interval: number;

  let gdp_trends_options = {
    chart: {
      type: "bar",
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      enabled: true,
      followCursor: false,

      //@ts-ignore
      custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        return (
          '<div class="arrow_box bg-dark mx-auto text-center text-light rounded-md border-none px-4">' +
          "<span> $" +
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
  let gdp_trends_container: any;

  onMount(async () => {
    const ApexCharts = (await import("apexcharts")).default;
    const gdp_trends_chart = new ApexCharts(
      gdp_trends_container,
      gdp_trends_options,
    );
    gdp_trends_chart.render();

    fetch(generateAPI("gdp"))
      .then(async (response) => await response.json())
      .then((response) => {
        const data = formatOutputFromAPI(response);
        gdp_trends_chart.updateOptions({
          series: [
            {
              data: reduceField("value", data.slice(0, 10)),
            },
          ],
          xaxis: {
            categories: reduceField("date", data.slice(0, 10)),
          },
        });
      });
  });
</script>

<div class="p-2 sm:p-6 xl:grid max-xl:space-y-4 xl:grid-cols-5 gap-4">
  <section class="col-span-3 card space-y-4">
    <h2 class="card-title px-4">GDP Trends</h2>
    <div bind:this={gdp_trends_container} />
  </section>
  <section class="col-span-2 space-y-4">
    <WorldBankSummaryCard item="inflation" is_percent={true} />
    <WorldBankSummaryCard item="debt_stock" unit="$" />
  </section>
</div>
