<script lang="ts">
  export let title: string;
  export let data: number[];
  export let max: number;
  export let color: string = "bg-blue";

  function differentiateData(data: number[]) {
    if (data.length < 2) return data[data.length - 1];
    return data[data.length - 1] - data[data.length - 2];
  }
</script>

<div class="space-y-1">
  <h3 class="font-semibold">{title}</h3>
  <div class="bg-light-400 dark:bg-dark rounded-full relative h-4">
    <div
      class={`${color} rounded-full transition-default absolute h-4`}
      style={`width:${(100 * (data[data.length - 1] || 0)) / max}%`}
    ></div>
    <div
      class={`${color} opacity-20 rounded-full transition-default absolute h-4`}
      style={`width:${(100 * (data[data.length - 2] || 0)) / max}%`}
    ></div>
  </div>
  <div class="flex justify-between items-center text-mute text-sm">
    <p>{data[data.length - 1] || 0}</p>
    <p>{differentiateData(data)}%</p>
  </div>
</div>
