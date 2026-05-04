<template>
  <section class="mx-auto max-w-5xl">
    <h1 class="text-3xl font-bold text-gray-900">Catalogo local de jogos</h1>
    <p class="mt-2 text-sm text-gray-600">
      Adicione o seu jogo em public/_games e registre no arquivo games.config.ts.
    </p>

    <div class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <GameCard
        v-for="game in games"
        :key="game.slug"
        :game="game"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { games } from '../../games.config'
</script>
