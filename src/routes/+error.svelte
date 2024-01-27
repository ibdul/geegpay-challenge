<script>
  import { page } from "$app/stores";
  import image from "$lib/404.jpg";
</script>

<div class="grid place-items-center p-12 min-h-screen text-center">
  <div class="space-y-4">
    <img class="max-w-[300px] aspect-square" src={image} alt="404 error" />
    <div>
      <h2 class="text-4xl font-medium">
        {$page.status}
      </h2>
      <p>
        {$page?.error?.message}
      </p>
    </div>
  </div>
</div>
