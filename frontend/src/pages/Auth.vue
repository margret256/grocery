<template>
  <main class="flex h-screen items-center justify-center overflow-hidden bg-slate-300 px-4 py-2 text-slate-950 md:px-8">
    <section class="grid h-[calc(100vh-1rem)] w-full max-w-6xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-white via-emerald-50 to-yellow-100 shadow-2xl shadow-slate-900/20 lg:grid-cols-[0.82fr_1.18fr]">
      <div class="flex min-h-0 flex-col px-6 py-3 sm:px-9 lg:px-12">
        <RouterLink
          to="/"
          class="w-fit rounded-full border border-slate-400/70 bg-white/35 px-5 py-1.5 text-sm font-semibold text-slate-700 backdrop-blur transition hover:bg-white/70"
        >
          Grocery Buddy
        </RouterLink>

        <div class="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center py-2">
          <div class="mb-3 grid grid-cols-2 rounded-xl bg-white/55 p-1 shadow-inner">
            <RouterLink
              to="/login"
              class="rounded-lg px-5 py-2 text-center font-black transition"
              :class="isRegister ? 'text-slate-700 hover:bg-white/60' : 'bg-emerald-700 text-white shadow-lg shadow-emerald-800/20'"
            >
              Login
            </RouterLink>
            <RouterLink
              to="/register"
              class="rounded-lg px-5 py-2 text-center font-black transition"
              :class="isRegister ? 'bg-emerald-700 text-white shadow-lg shadow-emerald-800/20' : 'text-slate-700 hover:bg-white/60'"
            >
              Register
            </RouterLink>
          </div>

          <div class="mb-3 text-center">
            <p class="text-xs font-black uppercase tracking-[0.26em] text-emerald-900">Grocery Buddy</p>
            <h1 class="mt-1.5 text-2xl font-light tracking-tight text-slate-950">
              {{ isRegister ? 'Create an account' : 'Welcome back' }}
            </h1>
            <p class="mt-1.5 text-sm font-medium text-slate-600">
              {{ isRegister ? 'Sign up and organize your next shop' : 'Log in to manage your grocery list' }}
            </p>
          </div>

          <form v-if="isRegister" class="grid gap-2.5" @submit.prevent="register">
            <label class="auth-label">
              Username
              <input v-model.trim="registerForm.username" class="auth-input" type="text" required />
            </label>
            <label class="auth-label">
              Email
              <input v-model.trim="registerForm.email" class="auth-input" type="email" required />
            </label>
            <label class="auth-label">
              Password
              <div class="password-shell">
                <input
                  v-model="registerForm.password"
                  class="password-input"
                  :type="showRegisterPassword ? 'text' : 'password'"
                  required
                />
                <button class="password-toggle" type="button" @click="showRegisterPassword = !showRegisterPassword">
                  {{ showRegisterPassword ? 'Hide' : 'Show' }}
                </button>
              </div>
            </label>
            <label class="auth-label">
              Confirm Password
              <div class="password-shell">
                <input
                  v-model="registerForm.confirmPassword"
                  class="password-input"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  required
                />
                <button class="password-toggle" type="button" @click="showConfirmPassword = !showConfirmPassword">
                  {{ showConfirmPassword ? 'Hide' : 'Show' }}
                </button>
              </div>
            </label>

            <p v-if="message" class="rounded-xl bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-700">
              {{ message }}
            </p>
            <p v-if="error" class="rounded-xl bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
              {{ error }}
            </p>

            <button class="submit-button" type="submit" :disabled="loading">
              {{ loading ? 'Creating account...' : 'Create account' }}
            </button>
          </form>

          <form v-else class="grid gap-2.5" @submit.prevent="login">
            <label class="auth-label">
              Username or Email
              <input v-model.trim="loginForm.username" class="auth-input" type="text" required />
            </label>
            <label class="auth-label">
              Password
              <div class="password-shell">
                <input
                  v-model="loginForm.password"
                  class="password-input"
                  :type="showLoginPassword ? 'text' : 'password'"
                  required
                />
                <button class="password-toggle" type="button" @click="showLoginPassword = !showLoginPassword">
                  {{ showLoginPassword ? 'Hide' : 'Show' }}
                </button>
              </div>
            </label>

            <p v-if="message" class="rounded-xl bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-700">
              {{ message }}
            </p>
            <p v-if="error" class="rounded-xl bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
              {{ error }}
            </p>

            <button class="submit-button" type="submit" :disabled="loading">
              {{ loading ? 'Logging in...' : 'Login' }}
            </button>
          </form>
        </div>

        <div class="flex justify-between gap-4 pt-2 text-xs font-medium text-slate-600">
          <RouterLink :to="isRegister ? '/login' : '/register'" class="hover:text-emerald-800">
            {{ isRegister ? 'Have an account? Login' : "Don't have an account? Register" }}
          </RouterLink>
          <span>Terms & Conditions</span>
        </div>
      </div>

      <div class="relative hidden min-h-0 overflow-hidden p-4 lg:block">
        <img
          src="/images/shop-3.jpg"
          alt="Fresh grocery planning"
          class="h-full w-full scale-110 rounded-[1.65rem] object-cover object-center"
        />
        <div class="absolute inset-4 rounded-[1.65rem] bg-gradient-to-br from-emerald-950/25 via-transparent to-yellow-200/20"></div>

        <div class="absolute left-12 top-10 rounded-2xl bg-yellow-300 px-5 py-4 shadow-xl">
          <p class="text-xs font-black text-slate-900">Market run</p>
          <p class="mt-1 text-xs font-semibold text-slate-700">Plan, price, complete</p>
        </div>

        <div class="absolute right-9 top-9 flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-2xl font-light text-slate-700 shadow-lg">
          x
        </div>

        <div class="absolute bottom-12 left-12 rounded-2xl bg-white/92 p-4 shadow-2xl backdrop-blur">
          <p class="text-sm font-black text-slate-950">Daily Grocery List</p>
          <p class="mt-1 text-xs font-semibold text-slate-600">Fresh items, pantry, snacks</p>
          <div class="mt-4 flex -space-x-2">
            <span class="avatar bg-emerald-600">M</span>
            <span class="avatar bg-yellow-400 text-slate-950">G</span>
            <span class="avatar bg-lime-500 text-slate-950">B</span>
          </div>
        </div>

        <div class="absolute bottom-24 right-12 rounded-2xl bg-emerald-950/75 px-5 py-3 text-white shadow-2xl backdrop-blur">
          <div class="grid grid-cols-7 gap-4 text-center text-xs font-semibold">
            <span v-for="day in days" :key="day.label">
              <span class="block text-emerald-100">{{ day.label }}</span>
              <span class="mt-1 block text-lg font-light">{{ day.date }}</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { computed, reactive, ref, watch } from 'vue'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../store/auth'

const API_URL = import.meta.env.VITE_API_URL || '/api'

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()
const isRegister = computed(() => route.path === '/register')
const loading = ref(false)
const error = ref('')
const message = ref('')
const showLoginPassword = ref(false)
const showRegisterPassword = ref(false)
const showConfirmPassword = ref(false)
const loginForm = reactive({
  username: '',
  password: ''
})
const registerForm = reactive({
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
})
const days = [
  { label: 'Sun', date: '22' },
  { label: 'Mon', date: '23' },
  { label: 'Tue', date: '24' },
  { label: 'Wed', date: '25' },
  { label: 'Thu', date: '26' },
  { label: 'Fri', date: '27' },
  { label: 'Sat', date: '28' }
]

watch(isRegister, () => {
  error.value = ''
  message.value = ''
})

const login = async () => {
  error.value = ''
  message.value = ''
  loading.value = true

  try {
    await auth.login(loginForm.username, loginForm.password)
    router.push('/groceries')
  } catch (err) {
    error.value = err.response?.data?.message || 'Login failed'
  } finally {
    loading.value = false
  }
}

const register = async () => {
  error.value = ''
  message.value = ''

  if (registerForm.password !== registerForm.confirmPassword) {
    error.value = 'Passwords do not match'
    return
  }

  loading.value = true

  try {
    await axios.post(`${API_URL}/auth/register`, { ...registerForm })
    registerForm.username = ''
    registerForm.email = ''
    registerForm.password = ''
    registerForm.confirmPassword = ''
    await router.push('/login')
    message.value = 'Registration successful. You can now log in.'
  } catch (err) {
    error.value = err.response?.data?.message || 'Registration failed'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.auth-label {
  display: block;
  font-size: 0.72rem;
  font-weight: 700;
  color: rgb(100 116 139);
}

.auth-input {
  margin-top: 0.25rem;
  width: 100%;
  border-radius: 9999px;
  border: 1px solid rgb(226 232 240);
  background: rgb(255 255 255 / 0.92);
  padding: 0.56rem 1.05rem;
  font-size: 0.9rem;
  color: rgb(15 23 42);
  outline: none;
  transition: border-color 150ms ease, box-shadow 150ms ease;
}

.auth-input:focus {
  border-color: rgb(5 150 105);
  box-shadow: 0 0 0 4px rgb(167 243 208 / 0.65);
}

.password-shell {
  margin-top: 0.25rem;
  display: flex;
  align-items: center;
  overflow: hidden;
  border-radius: 9999px;
  border: 1px solid rgb(226 232 240);
  background: rgb(255 255 255 / 0.92);
  transition: border-color 150ms ease, box-shadow 150ms ease;
}

.password-shell:focus-within {
  border-color: rgb(5 150 105);
  box-shadow: 0 0 0 4px rgb(167 243 208 / 0.65);
}

.password-input {
  min-width: 0;
  flex: 1;
  background: transparent;
  padding: 0.56rem 1.05rem;
  font-size: 0.9rem;
  color: rgb(15 23 42);
  outline: none;
}

.password-toggle {
  padding: 0 1rem;
  font-size: 0.8rem;
  font-weight: 900;
  color: rgb(6 95 70);
}

.submit-button {
  margin-top: 0.35rem;
  width: 100%;
  border-radius: 9999px;
  background: rgb(250 204 21);
  padding: 0.65rem 1.25rem;
  font-weight: 900;
  color: rgb(15 23 42);
  box-shadow: 0 14px 28px rgb(202 138 4 / 0.2);
  transition: transform 150ms ease, background-color 150ms ease;
}

.submit-button:hover {
  transform: translateY(-1px);
  background: rgb(234 179 8);
}

.submit-button:disabled {
  cursor: not-allowed;
  opacity: 0.75;
}

.avatar {
  display: flex;
  height: 2rem;
  width: 2rem;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  border: 2px solid white;
  font-size: 0.75rem;
  font-weight: 900;
  color: white;
}
</style>
