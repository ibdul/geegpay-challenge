<script>
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
  function toogleDarkMode() {
    is_dark_mode = !is_dark_mode;
  }
</script>

<div class={is_dark_mode ? "dark" : ""}>
  <div
    class="font-sans bg-red-400 text-dark dark:bg-dark dark:text-light-400 transition-default min-h-screen flex"
  >
    <aside
      class="border-r border-color p-2 flex flex-col gap-6 justify-between items-center"
    >
      <img src="" alt="logo" />
      <nav class="flex-1">
        <ul class="flex flex-col gap-4">
          {#each pages as page}
            <li>
              <a href={page.title}>page.title</a>
            </li>
          {/each}
          <li>
            <button on:click={toogleDarkMode}>theme</button>
          </li>
        </ul>
      </nav>
      <nav>
        <ul class="flex flex-col gap-4">
          {#each extra_pages as page}
            <li>
              <a href={page.title}>page.title</a>
            </li>
          {/each}
          <li>logout</li>
        </ul>
      </nav>
    </aside>
    <div class="flex-1">
      <header
        class="flex justify-between items-center p-4 border-b border-color"
      >
        <h1>Dashboard</h1>
        <div>
          <p>search</p>
        </div>
      </header>
      <main>
        <slot />
      </main>
    </div>
  </div>
</div>
