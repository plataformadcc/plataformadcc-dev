<template>
  <div class="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
    <!--
      Mesmos atributos da PlataformaDCC em produção: sem popups, sem tela cheia, gamepad ou
      microfone. Se o jogo funciona aqui, funciona lá.
    -->
    <iframe
      :src="`/_games/${slug}/index.html`"
      class="h-[75vh] w-full"
      sandbox="allow-scripts allow-pointer-lock allow-same-origin allow-forms"
      referrerpolicy="no-referrer"
      loading="lazy"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{ slug: string }>()
</script>
