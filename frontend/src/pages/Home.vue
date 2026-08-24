<template>
  <main class="min-h-screen bg-white text-slate-950">
    <section
      class="relative isolate grid min-h-[88vh] overflow-hidden bg-[url('/images/shop-5.jpg')] bg-cover bg-center px-6 py-10 md:grid-cols-[1fr_0.9fr] md:items-center md:px-12 lg:px-20"
    >
      <div class="absolute inset-0 -z-10 bg-gradient-to-r from-emerald-950/85 via-emerald-900/60 to-slate-950/45"></div>
      <div class="absolute inset-0 -z-10 bg-black/15"></div>

      <div class="landing-copy max-w-2xl">
        <p class="mb-3 text-sm font-black uppercase text-yellow-300 drop-shadow">
          Grocery Buddy
        </p>
        <h1 class="text-5xl font-black leading-tight text-white drop-shadow-[0_4px_18px_rgba(0,0,0,0.45)] md:text-7xl">
          Welcome to <span class="text-yellow-300">My Grocery Buddy</span>
        </h1>
        <p class="mt-5 max-w-xl text-lg font-bold text-white drop-shadow-[0_3px_10px_rgba(0,0,0,0.55)] md:text-xl">
          Your smart companion for easy grocery management
        </p>

        <div class="mt-8 flex flex-wrap gap-4">
          <RouterLink
            to="/register"
            class="rounded-lg border-2 border-yellow-300 bg-yellow-300 px-7 py-3 font-bold text-emerald-950 shadow-lg shadow-black/20 transition hover:-translate-y-1 hover:bg-yellow-200"
          >
            Register
          </RouterLink>
          <RouterLink
            to="/login"
            class="rounded-lg border-2 border-white bg-white/90 px-7 py-3 font-bold text-emerald-950 shadow-lg shadow-black/15 backdrop-blur transition hover:-translate-y-1 hover:bg-white"
          >
            Login
          </RouterLink>
        </div>
      </div>

      <div class="grid gap-5 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
        <img
          v-for="image in heroImages"
          :key="image.src"
          :src="image.src"
          :alt="image.alt"
          class="landing-image-card h-72 w-full rounded-lg object-cover shadow-2xl ring-4 ring-white/80 transition hover:scale-[1.02]"
          :style="{ '--delay': image.delay }"
        />
      </div>
    </section>

    <section class="bg-white/90 px-6 py-14 backdrop-blur md:px-12 lg:px-20">
      <h2 class="text-center text-4xl font-black text-slate-950">How It Works</h2>

      <div class="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div class="grid gap-5 sm:grid-cols-2">
          <article
            v-for="step in steps"
            :key="step.title"
            class="landing-info-card rounded-lg bg-white p-6 shadow-xl shadow-slate-900/10 ring-1 ring-emerald-100 transition hover:-translate-y-1"
            :style="{ '--delay': step.delay }"
          >
            <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100 text-xl font-black text-emerald-700">
              {{ step.icon }}
            </div>
            <h3 class="text-xl font-black text-slate-950">{{ step.title }}</h3>
            <p class="mt-2 font-medium text-slate-700">{{ step.copy }}</p>
          </article>
        </div>

        <img
          src="/images/shop.jpg"
          alt="Organized grocery process"
          class="mx-auto h-[28rem] w-full max-w-xl rounded-2xl object-cover shadow-2xl ring-4 ring-emerald-100"
        />
      </div>
    </section>
  </main>
</template>

<script setup>
const heroImages = [
  { src: '/images/shop-3.jpg', alt: 'Fresh groceries', delay: '0s' },
  { src: '/images/shop-2.jpg', alt: 'Grocery shopping', delay: '1.2s' }
]

const steps = [
  { icon: '+', title: 'Add Items Quickly', copy: 'Easily add groceries to your list.', delay: '0s' },
  { icon: 'OK', title: 'Shop & Check Off', copy: 'Mark items as you shop.', delay: '0.15s' },
  { icon: '#', title: 'Manage Pantry', copy: 'Keep track of what you already have.', delay: '0.3s' },
  { icon: 'GO', title: 'Save Time', copy: 'Shop faster and reduce food waste.', delay: '0.45s' }
]
</script>

<style scoped>
.landing-copy {
  animation: landingCopyIn 0.8s ease-out both;
}

.landing-image-card {
  animation: landingImageFade 5.5s ease-in-out infinite;
  animation-delay: var(--delay);
  will-change: opacity, transform;
}

.landing-info-card {
  animation: landingCardFade 5.5s ease-in-out infinite;
  animation-delay: var(--delay);
  will-change: opacity, transform;
}

@keyframes landingCopyIn {
  from {
    opacity: 0;
    transform: translateY(18px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes landingImageFade {
  0%,
  100% {
    opacity: 0.72;
    transform: translateY(8px) scale(0.98);
  }
  45%,
  70% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes landingCardFade {
  0%,
  100% {
    opacity: 0.78;
    transform: translateY(8px);
  }
  45%,
  70% {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .landing-copy,
  .landing-image-card,
  .landing-info-card {
    animation: none;
  }
}
</style>
