<script lang="ts">
  import Icon from "./Icon.svelte";

  export let difference: number;
</script>

<div class="flex items-center justify-between">
  <p
    class={`${
      difference > 0 ? "bg-green-500/20 text-green-500" : "bg-red/20 text-red"
    } text-sm rounded-full px-4 py-2 flex gap-2 items-center`}
  >
    <Icon title={difference > 0 ? "chart-arrow-up" : "chart-arrow-down"} />
    {Math.abs(difference)}
  </p>
  <div class="text-mute">vs. previous month</div>
</div>
