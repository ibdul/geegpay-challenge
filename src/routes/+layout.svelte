<script>
  import { onMount } from "svelte";
  import Icon from "../components/Icon.svelte";
  import "./base.css";

  const pages = [
    { title: "home", href: "/" },
    { title: "trends", href: "/trends" },
    { title: "groups", href: "/groups" },
    { title: "packages", href: "/packages" },
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
  onMount(() => {
    is_dark_mode = localStorage.getItem("is_dark_mode") == "true";
  });
</script>

<div class={is_dark_mode ? "dark" : ""}>
  <div
    class="font-sans bg-light-400 text-dark dark:bg-dark dark:text-light-400 transition-default min-h-screen flex stroke-[#B2ABAB] fill-[#B2ABAB]"
  >
    <aside
      class="border-r border-color py-8 flex flex-col gap-12 justify-between items-center max-h-screen sticky top-0"
    >
      <a href="/">
        <!-- site icon -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M20 40C31.0457 40 40 31.0457 40 20C40 8.95431 31.0457 0 20 0C8.95429 0 0 8.95431 0 20C0 31.0457 8.95429 40 20 40ZM26.2393 9.31684C26.543 8.23805 25.4961 7.60013 24.54 8.2813L11.1931 17.7896C10.1562 18.5283 10.3193 20 11.4381 20H14.9527V19.9728H21.8025L16.2212 21.9421L13.7607 30.6832C13.457 31.762 14.5038 32.3999 15.46 31.7187L28.8069 22.2105C29.8438 21.4718 29.6806 20 28.5619 20H23.2321L26.2393 9.31684Z"
            fill="#34CAA5"
          />
        </svg>
      </a>
      <nav class="flex-1">
        <ul class="flex flex-col gap-4">
          {#each pages as page, index}
            <li class="relative group/link">
              <a
                href={page.title}
                title={page.title}
                class="flex justify-center px-2 group-hover/link:stroke-primary"
              >
                <div
                  class="aspect-square w-12 grid place-items-center rounded-full group-hover/link:bg-primary/20"
                >
                  <Icon title={page.title} />
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
            class="bg-light dark:bg-dark-400 p-4 px-1 mx-2 rounded-full flex flex-col gap-2 items-center fill-white stroke-none"
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
              <a
                href={page.title}
                title={page.title}
                class="flex justify-center px-2 group-hover/link:stroke-primary"
              >
                <div
                  class="aspect-square w-12 grid place-items-center rounded-full group-hover/link:bg-primary/20"
                >
                  <Icon title={page.title} />
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
          <li class="mx-auto">
            <button>
              <Icon title="logout" />
            </button>
          </li>
        </ul>
      </nav>
    </aside>
    <div class="flex-1">
      <header
        class="flex justify-between items-center py-4 px-8 border-b border-color"
      >
        <h1 class="font-semibold text-xl">Dashboard</h1>
        <div class="flex items-center gap-4">
          <form>
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
          <div class="flex items-center gap-2 stroke-black dark:stroke-light">
            <Icon title="calendar" />
            <p class="text-sm font-medium">{new Date().toLocaleString()}</p>
          </div>
          <div
            class="p-2 aspect-square w-12 grid place-items-center border border-color rounded-full"
          >
            <Icon title="bell" />
          </div>
          <div
            class="flex items-center p-2 rounded-full gap-2 border border-color"
          >
            <div class="rounded-full bg-primary aspect-square w-8"></div>
            <div class="flex flex-col">
              <p>Ibrahim A.</p>
              <p class="text-sm text-mute">@iAmIbdul</p>
            </div>
            <Icon title="arrow-down" />
          </div>
        </div>
      </header>
      <main>
        <slot />
      </main>
    </div>
  </div>
</div>
