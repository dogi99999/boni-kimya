import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

export default defineConfig(({ command }) => {
  return {
    base: command === 'serve' ? '/' : '/boni-kimya/',
    server: {
      port: 5175
    },
    plugins: [
      tailwindcss(),
    ],
    build: {
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
          hakkimizda: resolve(__dirname, 'hakkimizda.html'),
          is_sagligi: resolve(__dirname, 'is-sagligi-guvenligi.html'),
          ar_ge: resolve(__dirname, 'ar-ge.html'),
          kalite_politika: resolve(__dirname, 'kalite-politikamiz.html'),
          ihracat: resolve(__dirname, 'ihracat.html'),
          sertifikalar: resolve(__dirname, 'sertifikalarimiz.html'),
          kvkk: resolve(__dirname, 'kvkk.html'),
          iletisim: resolve(__dirname, 'iletisim.html'),
          makina_danismanligi: resolve(__dirname, 'makina-danismanligi.html'),
          hammadde_danismanligi: resolve(__dirname, 'hammadde-danismanligi.html'),
          private_label: resolve(__dirname, 'private-label.html'),
          haberler: resolve(__dirname, 'haberler.html'),
          urunlerimiz: resolve(__dirname, 'urunlerimiz.html'),
        },
      },
    },
  }
})
