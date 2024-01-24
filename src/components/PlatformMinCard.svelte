<script lang="ts">
  export let title: string;
  export let price: string;
  export let color: string = "bg-blue";
</script>

<div class="space-y-1">
  <h3 class="font-semibold">{title}</h3>
  <div class="bg-light-400 dark:bg-dark rounded-full relative h-4">
    <div
      class={`${color} rounded-full w-[50%] transition-default relative h-4`}
    ></div>
  </div>
  <div class="flex justify-between items-center text-mute text-sm">
    <p>{price}</p>
    <p>+15%</p>
  </div>
</div>
