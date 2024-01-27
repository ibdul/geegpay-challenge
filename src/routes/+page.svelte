<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import PlatformMinCard from "../components/PlatformMinCard.svelte";
  import Icon from "../components/Icon.svelte";
  import SummaryCard from "../components/SummaryCard.svelte";
  import {
    viewTransition,
    generateSeries,
    generateRandomNumber,
    CHART_MAX,
  } from "../lib/index";

  function getRandomFromArray(arr: any[]) {
    return arr.sort(() => 0.5 - Math.random())[0];
  }

  const names =
    "Ibrahim Abdulhameed, Micheal Jordan, Alen Turing, David Opeyemi, Mullan Green, Feltz Watson, Jonah Johnson".split(
      ", ",
    );

  let order_count = 0;
  function createOrder() {
    order_count += 1;
    return {
      id: order_count - 1,
      name: names[Math.floor(Math.random() * names.length)],
      date: new Date(),
      amount: (Math.random() * (14000 - 1200) + 1200).toFixed(2),
      is_paid: Math.random() > 0.5,
      avatar: getAvatar(),
    };
  }

  let orders = Array.from({ length: 4 }, createOrder);

  function updateOrders() {
    const _orders = orders;
    _orders.unshift(createOrder());
    _orders.pop();
    orders = _orders;
  }

  function getAvatar() {
    const API_URL = new URL("https://api.dicebear.com/7.x/personas/svg");
    const params = [
      {
        title: "hair",
        options:
          "bald, balding, beanie, buzzcut, cap, curlyHighTop, shortCombover, fade, mohawk".split(
            ", ",
          ),
      },
      { title: "hairColor", options: "6dbb58, 54d7c7, 456dff".split(", ") },
      { title: "clothingColor", options: "6dbb58, 54d7c7, 456dff".split(", ") },
      {
        title: "eyes",
        options: "glasses, happy, open, sleep, sunglasses, wink".split(", "),
      },
      {
        title: "facialHair",
        options:
          "beardMustache, goatee, pyramid, shadow, soulPatch, walrus".split(
            ", ",
          ),
      },
    ];

    params.map((param, index) => {
      API_URL.searchParams.set(param.title, getRandomFromArray(param.options));
    });

    return API_URL.toString();
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

      //@ts-ignore
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

  let top_platforms_colors = "bg-dark_blue, bg-blue, bg-yellow, bg-red".split(
    ", ",
  );

  let interval: number;
  onMount(async () => {
    const ApexCharts = (await import("apexcharts")).default;
    const _chart = new ApexCharts(trends_container, trends_options);
    _chart.render();

    top_platform_names.map((platform, index) => {
      generateTopPlatformData(platform);
    });

    interval = setInterval(() => {
      _chart.updateSeries([{ data: generateSeries() }]);

      viewTransition(() => {
        updateOrders();
      });

      top_platform_names.map((platform, index) => {
        generateTopPlatformData(platform);
      });
    }, 5000);
  });
  onDestroy(() => {
    if (interval) {
      clearInterval(interval);
    }
  });
</script>

<div class="p-6 xl:grid max-xl:space-y-4 xl:grid-cols-5 gap-4">
  <section class="col-span-3 card space-y-4">
    <h2 class="card-title px-4">Sales Trends</h2>
    <div bind:this={trends_container} />
  </section>
  <section
    class="col-span-2 md:grid max-md:space-y-4 grid-cols-2 gap-4 grid-rows-2"
  >
    {#each "orders, refunds, sales, income".split(", ") as item, index}
      <SummaryCard {item} />
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
      {#each orders.slice(0, 4) as order}
        <li
          class={`grid grid-cols-6 py-2 items-center`}
          style={`view-transition-name:order-${order.id};`}
        >
          <div
            class="col-span-2 text-black dark:text-light font-medium flex items-center gap-2"
          >
            <img width={50} src={order.avatar} alt="avatar" />
            <p>{order.name}</p>
          </div>
          <p class="text-mute dark:text-light-400/80">
            {order.date.toLocaleString()}
          </p>
          <p class="font-semibold">${order.amount}</p>
          <p class={order.is_paid ? "text-primary" : "text-red"}>
            {order.is_paid ? "Paid" : "Not paid"}
          </p>
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
