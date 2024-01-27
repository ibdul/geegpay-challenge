<script lang="ts">
  import { onMount } from "svelte";
  import Icon from "../components/Icon.svelte";
  import "./base.css";

  const pages = [
    { title: "home", href: "/" },
    { title: "trends", href: "/trends" },
    { title: "groups", href: "/groups" },
    { title: "packs", href: "/packs" },
    { title: "offers", href: "/offers" },
    { title: "info", href: "/info" },
  ];
  const extra_pages = [
    { title: "others", href: "/others" },
    { title: "settings", href: "/settings" },
  ];

  let is_dark_mode = false;
  function setDarkMode() {
    is_dark_mode = true;
    localStorage.setItem("is_dark_mode", "true");
  }
  function setLightMode() {
    is_dark_mode = false;
    localStorage.setItem("is_dark_mode", "false");
  }

  let is_sidebar_open = false;

  function toggleSidebar(e: Event) {
    e.preventDefault();
    is_sidebar_open = !is_sidebar_open;
  }

  let is_notifications_open = false;

  function openNotifications(e: Event) {
    e.preventDefault();
    is_notifications_open = true;
  }

  function closeNotifications(e: Event) {
    e.preventDefault();
    is_notifications_open = false;
  }

  onMount(() => {
    is_dark_mode = localStorage.getItem("is_dark_mode") == "true";
  });
</script>

<div class={is_dark_mode ? "dark" : ""}>
  <div
    class="font-sans bg-light-400 text-dark dark:bg-dark dark:text-light-400 transition-default min-h-screen flex stroke-[#B2ABAB] fill-[#B2ABAB]"
  >
    <button
      on:click={toggleSidebar}
      class={`bg-dark/10 z-[50] backdrop-blur fixed inset-0 transition-default ${
        is_sidebar_open ? "" : "opacity-0 pointer-events-none"
      }`}
    ></button>
    <aside
      class={`max-lg:fixed max-lg:w-1/3 z-[51] max-lg:shadow max-lg:pl-4 capitalize ${
        is_sidebar_open ? "" : "max-lg:translate-x-[-100%]"
      } bg-light-400 dark:bg-dark transition-default border-r border-color py-8 flex flex-col gap-12 justify-between lg:items-center h-screen sticky top-0`}
    >
      <div class="flex items-center justify-between max-lg:px-2">
        <a href="/" class="flex gap-2 items-center">
          <Icon title="site_icon" />
          <div class="lg:hidden">
            <h2 class="nav_item_title">The place</h2>
            <p class="text-xs">Your home for finances</p>
          </div>
        </a>
        <button on:click={toggleSidebar} class="lg:hidden text-lg p-2"
          >&times;</button
        >
      </div>
      <nav class="flex-1 w-full text-center">
        <ul class="flex flex-col gap-4">
          {#each pages as page, index}
            <li class="relative group/link">
              <a href={page.title} title={page.title} class="nav_link">
                <div class="nav_link__container">
                  <div class="flex gap-2 items-center">
                    <Icon title={page.title} />
                    <p class="nav_item_title">
                      {page.title}
                    </p>
                  </div>
                </div>
              </a>
              <div
                class="absolute inset-y-0 right-0 flex flex-col justify-center"
              >
                <span
                  class={`w-1.5 block rounded-l-md h-5  ${
                    index == 0 ? "bg-[#0D062D] dark:bg-light" : ""
                  }`}
                ></span>
              </div>
            </li>
          {/each}
          <li
            class="bg-light dark:bg-dark-400 w-min lg:p-4 px-1 max-lg:px-5 mx-2 rounded-full flex lg:flex-col gap-2 items-center fill-white stroke-none"
          >
            <button
              on:click={setLightMode}
              class="rounded-full p-2 fill-white dark:fill-[#B2ABAB] bg-primary dark:bg-transparent transition-default"
            >
              <Icon title="sun" />
            </button>
            <button
              on:click={setDarkMode}
              class="rounded-full p-2 dark:fill-white fill-[#B2ABAB] dark:bg-primary bg-transparent transition-default"
            >
              <Icon title="moon" />
            </button>
          </li>
        </ul>
      </nav>
      <nav class="w-full">
        <ul class="flex flex-col gap-4">
          {#each extra_pages as page, index}
            <li class="relative group/link">
              <a href={page.title} title={page.title} class="nav_link">
                <div class="nav_link__container">
                  <div class="flex gap-2 items-center">
                    <Icon title={page.title} />
                    <p class="nav_item_title">{page.title}</p>
                  </div>
                </div>
              </a>
              <div
                class="absolute inset-y-0 right-0 flex flex-col justify-center"
              >
                <span
                  class={`w-1.5 block rounded-l-md h-5  ${
                    false
                      ? "bg-[#0D062D] dark:bg-light"
                      : "group-hover/link:bg-dark/20 group-hover/link:dark:bg-light/20"
                  }`}
                ></span>
              </div>
            </li>
          {/each}
          <li class="lg:mx-auto">
            <button class="hover:bg-primary/20 w-full nav_link">
              <div class="flex gap-2 items-center">
                <Icon title="logout" />
                <p class="nav_item_title">Logout</p>
              </div>
            </button>
          </li>
        </ul>
      </nav>
    </aside>
    <div class="flex-1">
      <header
        class="flex bg-light-400 dark:bg-dark max-lg:shadow-md sticky top-0 z-[49] justify-between items-center py-4 px-8 border-b border-color"
      >
        <div class="flex items-center gap-2">
          <a href="/" class="lg:hidden">
            <Icon title="site_icon" />
          </a>
          <h1 class="font-semibold text-xl">Dashboard</h1>
        </div>
        <div class="flex items-center gap-4">
          <form class="max-md:hidden">
            <div
              class="focus-within:outline outline-1 outline-primary rounded-full bg-white dark:bg-dark-400 px-4 py-2 border border-[#DADDDD] dark:border-mute flex gap-2 items-center"
            >
              <Icon title="search" />
              <input
                type="text"
                placeholder="Search"
                class="bg-transparent focus:outline-none"
              />
            </div>
          </form>
          <div
            class="flex items-center gap-2 stroke-black dark:stroke-light max-lg:hidden"
          >
            <Icon title="calendar" />
            <p class="text-sm font-medium">
              {new Date().toLocaleString()}
            </p>
          </div>
          <button
            on:click={openNotifications}
            class="p-2 aspect-square w-12 grid place-items-center border border-color rounded-full"
          >
            <Icon title="bell" />
          </button>
          <button
            title="Ibrahim Abdulhameed"
            class="xl:hidden p-2 aspect-square w-12 grid place-items-center border border-color rounded-full"
          >
            <div class="rounded-full bg-primary aspect-square w-8"></div>
          </button>
          <button
            class="max-xl:hidden flex items-center p-2 rounded-full gap-2 border border-color"
          >
            <div class="rounded-full bg-primary aspect-square w-8"></div>
            <div class="flex flex-col">
              <p>Ibrahim A.</p>
              <p class="text-sm text-mute">@iAmIbdul</p>
            </div>
            <Icon title="arrow-down" />
          </button>
          <button
            on:click={toggleSidebar}
            class="lg:hidden p-2 aspect-square w-12"
          >
            <Icon title="menu" />
          </button>
        </div>
      </header>
      <main>
        <slot />
      </main>
      <div>
        <button
          on:click={closeNotifications}
          class={`bg-dark/10 z-[50] backdrop-blur fixed inset-0 transition-default ${
            is_notifications_open ? "" : "opacity-0 pointer-events-none"
          }`}
        ></button>
        <div
          class={`bg-light dark:bg-dark shadow-md z-[51] fixed right-0 w-[90vw] lg:w-1/2 2xl:w-1/4 inset-y-0 py-12 space-y-4 ${
            is_notifications_open ? "" : "translate-x-[100%]"
          }`}
        >
          <div class="flex items-center justify-between px-4">
            <h2 class="text-xl">Notifications</h2>
            <button class="w-2 rounded-full" on:click={closeNotifications}
              >&times;</button
            >
          </div>
          <ul class="divide-y divide-mute/10">
            {#each Array(10) as _}
              <li class="hover:bg-primary px-4 cursor-pointer">
                <div class="py-2">
                  <div class="flex items-start gap-2">
                    <p>&mdash;</p>
                    <h3 class="font-semibold text-lg">New Sale</h3>
                  </div>
                  <p class="italic opacity-80">There has been a new sale</p>
                </div>
              </li>
            {/each}
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>
