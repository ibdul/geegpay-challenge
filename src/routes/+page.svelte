<div class="p-6 grid grid-cols-5 gap-4">
  <section class="col-span-3 card">
    <h2 class="card-title">Sales Trends</h2>
  </section>
  <section class="col-span-2 grid grid-cols-2 gap-4">
    {#each "order, refund, sales, income".split(", ") as item}
      <div class="card">
        <h2 class="card-title">{item}</h2>
      </div>
    {/each}
  </section>
  <section class="col-span-3 card">
    <div class="flex justify-between items-center">
      <h2 class="card-title">Latest orders</h2>
      <a href="/orders" class="text-primary">See all</a>
    </div>
  </section>
  <section class="col-span-2 card">
    <div class="flex justify-between items-center">
      <h2 class="card-title">Top Platform</h2>
      <a href="/orders" class="text-primary">See all</a>
    </div>
  </section>
</div>

