<script lang="ts">
  import Icon from "./Icon.svelte";
  import { formatCurrency } from "$lib/index";

  export let difference: number;
  export let reversed = false;
  export let title = "previous month";
  export let is_currency = false;
</script>

<div class="flex items-center justify-between">
  <p
    class={`${
      (reversed ? difference * -1 : difference) > 0
        ? "bg-green-500/20 text-green-500"
        : "bg-red/20 text-red"
    } text-sm rounded-full px-4 py-2 flex gap-2 items-center`}
  >
    <span class={reversed ? "scale-y-[-100%]" : ""}>
      <Icon
        title={(reversed ? difference * -1 : difference) > 0
          ? "chart-arrow-up"
          : "chart-arrow-down"}
      />
    </span>
    {is_currency ? formatCurrency(Math.abs(difference)) : Math.abs(difference)}
  </p>
  <div class="text-mute">vs. {title}</div>
</div>
