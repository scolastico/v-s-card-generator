<template>
  <div class="min-h-screen flex gap-4 justify-center items-center py-8">
    <div class="border-black border-2">
      <div
        :style="{
          height: cSize.w + 'px',
          width: cSize.h + 'px',
          fontSize: cSize.w / 86 * 1.8 + 'px',
          padding: cSize.w / 86 * 2 + 'px',
          backgroundImage: `url(${baseUrl}bg.png)`,
        }"
        ref="container"
        class="from-slate-500 to-slate-700 bg-gradient-to-br font-bold text-white flex flex-col font-v font-thin bg-cover bg-center"
      >
        <div class="flex items-center justify-center">
          <div class="bg-white p-[3%] pb-0 -rotate-12 scale-75 w-[90%]">
            <img :src="data.img" alt="" class="w-full aspect-square object-cover" />
            <p
              class="text-right text-sky-300 mt-4 -mb-2"
              :style="{fontSize: cSize.w / 86 * 5 + 'px'}"
            >{{ ' *'.repeat(data.stars) }}</p>
          </div>
        </div>
        <p
          class="text-center"
          :style="{fontSize: cSize.w / 86 * 3 + 'px'}"
        >
          {{ data.title }}
        </p>
        <div class="border-t-2 border-white my-2" />
        <div class="flex">
          <p>Top Speed:</p>
          <p class="flex-grow text-right">{{ data.speed }}</p>
        </div>
        <div class="flex">
          <p>Horsepower:</p>
          <p class="flex-grow text-right">{{ data.hp }}</p>
        </div>
        <div class="flex">
          <p>Engine:</p>
          <p class="flex-grow text-right">{{ data.engine }}</p>
        </div>
        <div class="flex">
          <p>Drivetrain:</p>
          <p class="flex-grow text-right">{{ data.drivetrain }}</p>
        </div>
        <div class="flex">
          <p>Acceleration:</p>
          <p class="flex-grow text-right">{{ data.acceleration }}</p>
        </div>
        <div class="flex">
          <p>Weight:</p>
          <p class="flex-grow text-right">{{ data.weight }}</p>
        </div>
      </div>
    </div>
    <div class="shadow-lg bg-slate-300 rounded p-4">
      <h1 class="text-xl font-bold mb-4">Photo Card</h1>
      <div class="grid grid-cols-[1fr,3fr] gap-x-4 gap-y-2 items-center mt-2">
        <label for="scale">Scale:</label>
        <input
          type="number"
          id="scale"
          v-model.number="scale"
          min="0.05"
          max="1"
          step="0.05"
          class="input-box"
        >
        <label for="title">Title:</label>
        <input
          type="text"
          id="title"
          v-model="data.title"
          class="input-box"
        >
        <label for="stars">Stars:</label>
        <input
          type="number"
          id="stars"
          v-model.number="data.stars"
          class="input-box"
        >
        <label for="speed">Top Speed:</label>
        <input
          type="number"
          id="speed"
          v-model.number="data.speed"
          class="input-box"
        >
        <label for="hp">Horsepower:</label>
        <input
          type="number"
          id="hp"
          v-model.number="data.hp"
          class="input-box"
        >
        <label for="engine">Engine:</label>
        <input
          type="number"
          id="engine"
          v-model.number="data.engine"
          class="input-box"
        >
        <label for="drivetrain">Drivetrain:</label>
        <input
          type="number"
          id="drivetrain"
          v-model.number="data.drivetrain"
          class="input-box"
        >
        <label for="acceleration">Acceleration:</label>
        <input
          type="number"
          id="acceleration"
          v-model.number="data.acceleration"
          class="input-box"
        >
        <label for="weight">Weight:</label>
        <input
          type="number"
          id="weight"
          v-model.number="data.weight"
          class="input-box"
        >
        <label for="img">Image:</label>
        <input
          type="file"
          id="img"
          @change="changeImg"
          accept="image/*"
        />
      </div>
      <button class="bg-white rounded w-full hover:bg-slate-200 hover:shadow-inner transition-colors mt-2 py-2 px-4 underline" @click="saveObj">
        Save
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { toPng } from 'html-to-image';
import { addMetadataFromBase64DataURI } from 'meta-png';

const config = useRuntimeConfig();
const baseUrl = config.public.NUXT_APP_BASE_URL;

onMounted(() => {
  const style = document.createElement('style');
  style.textContent = `
    @font-face {
      font-family: 'CustomFont';
      src: url('${baseUrl}v-font.ttf') format('truetype');
      font-weight: normal;
      font-style: normal;
    }`;
  document.head.appendChild(style);
});

const container = ref(null) as any as Ref<HTMLElement>;
const data = ref<any>({
  stars: 5,
  speed: 0,
  hp: 0,
  engine: 0,
  drivetrain: 0,
  acceleration: 0,
  weight: 0,
  title: 'Car Name',
  img: `${baseUrl}example.png`,
});
const cSize = ref({w: 0, h: 0});
const scale = ref(0.20);
watch(scale, (newVal) => {
  cSize.value = {
    w: 86 * 40 * newVal,
    h: 58 * 40 * newVal,
  }
}, {immediate: true});

async function changeImg(event) {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (!file) return;
  data.value.img = URL.createObjectURL(file);
}

async function saveObj() {
  const sleep = () => new Promise((resolve) => setTimeout(resolve, 100));
  const originalScale = scale.value;
  if (originalScale !== 1) {
    scale.value = 1;
    await sleep();
  }
  const img = addMetadataFromBase64DataURI(
    await toPng(container.value),
    'x-scolastico-v-photo',
    JSON.stringify(data.value),
  );
  const a = document.createElement('a');
  a.href = img;
  a.download = 'v-photo-card.png';
  a.click();
  await sleep();
  if (originalScale !== 1) {
    scale.value = originalScale;
  }
  a.remove();
}
</script>

<style>
.input-box {
  @apply rounded-s px-2 py-1;
}

.font-v {
  font-family: 'CustomFont';
}
</style>
