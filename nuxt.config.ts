// https://nuxt.com/docs/api/configuration/nuxt-config

// Mesma Content Security Policy que a PlataformaDCC aplica aos jogos em produção.
// Com ela, o jogo só carrega arquivos da própria pasta: nada de CDN, Google Fonts,
// fetch para outros domínios, eval, nem <script> inline. Se o navegador bloquear algo,
// o console mostra "Refused to ..." indicando o que mudar.
const GAMES_CSP = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "media-src 'self' data: blob:",
  "connect-src 'self' data: blob:",
  "worker-src 'self' blob:",
  "frame-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'"
].join('; ')

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  routeRules: {
    '/_games/**': { headers: { 'Content-Security-Policy': GAMES_CSP } }
  }
})
