<template>
  <div class="min-h-screen flex justify-center items-center py-8 gap-4">
    <nuxt-link to="/photo">
      <button class="index-button">
        Edit "Photo" Textures
      </button>
    </nuxt-link>
  </div>
</template>

<style>
.index-button {
  @apply bg-slate-300 rounded shadow-lg p-4;
  @apply transition-all duration-300;
  @apply hover:bg-slate-400 shadow-2xl;
}
</style>
