<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { games } from '../../../games.config'

const route = useRoute()
const slug = computed(() => String(route.params.slug || ''))

const game = computed(() => games.find((item) => item.slug === slug.value))
</script>

<template>
  <section v-if="game" class="mx-auto max-w-5xl">
    <header class="mb-4">
      <h1 class="text-2xl font-semibold text-gray-900">{{ game.name }}</h1>
      <p class="mt-2 text-sm text-gray-600">{{ game.description }}</p>
    </header>

    <GameContainer :slug="game.slug" />
  </section>

  <section v-else class="mx-auto max-w-5xl rounded-xl border border-gray-200 bg-white p-6">
    <h1 class="text-xl font-semibold text-gray-900">Jogo nao encontrado</h1>
    <p class="mt-2 text-sm text-gray-600">Confira se o slug existe no arquivo games.config.ts.</p>
  </section>
</template>
