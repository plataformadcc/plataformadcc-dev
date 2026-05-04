<template>
  <article class="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
    <h2 class="text-lg font-semibold text-gray-900">{{ game.name }}</h2>
    <p class="mt-2 text-sm text-gray-600">{{ game.description }}</p>
    <NuxtLink
      :to="`/games/${game.slug}`"
      class="mt-4 inline-flex rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
    >
      Jogar
    </NuxtLink>
  </article>
</template>

<script setup lang="ts">
import type { GameConfig } from '../../games.config'

defineProps<{ game: GameConfig }>()
</script>
