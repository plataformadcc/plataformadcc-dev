<template>
  <div class="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
    <iframe
      :src="`/_games/${slug}/index.html`"
      class="h-[75vh] w-full"
      sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-pointer-lock"
      allow="fullscreen; gamepad; microphone"
      referrerpolicy="no-referrer"
      loading="lazy"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{ slug: string }>()
</script>
