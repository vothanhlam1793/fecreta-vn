// require('dotenv').config();

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  ssr: true,
  head: {
    title: 'CRETA SHOP',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/creta.ico' },
      { rel: 'stylesheet', href: '/css/ckeditor.css' },
    ],
    script: [
        {
            src: "https://www.googletagmanager.com/gtag/js?id=G-NRK1H287KC",
            async: true,
        },
        {
            src: "/js/ga.js",
        },
        // {
        //     src: "/js/jquery-2.1.1.js",
        // },
        // {
        //     src: "/js/xzoom.min.js",
        //     // onload: "scripRunning()"
        // },
        // {
        //     src: "/js/hammer.min.js",
        // },
        // {
        //     src: "/js/foundation.min.js",
        // }
    ]
  },

  env: {
    BACKEND_URL_IMAGE: process.env.BACKEND_URL_IMAGE,
    SEARCH_HOST: process.env.SEARCH_HOST,
    SEARCH_KEY: process.env.SEARCH_KEY,
    NO_IMAGE: "/uploads/No_image_available_svg_9b79a069fa.png"
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    // '~/plugins/vue-slider.js',
    '~plugins/axios',
    '~plugins/blog',
    '~/plugins/googleMaps.js',
    '~/plugins/support.js',
    '~/plugins/product.js'

    // { src: '~/plugins/bootstrap-css.js', mode: 'client' },
    // { src: '~/plugins/bootstrap-js.js', mode: 'client' },
  ],


  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],
  // googleAnalytics: {
  //   id: 'G-NRK1H287KC'
  // },
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    '@nuxtjs/apollo',
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    // '@nuxtjs/google-analytics'
  ],
  bootstrapVue: {
    icons: true
  },
  axios: {
    baseURL: 'https://svr8.creta.vn/api',
  },
  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: process.env.BACKEND_URL || "https://svr8.creta.vn/graphql",
        ssr: true
      }
    }
  },
  strapi: {
    // Options
  },
  auth: {
    // Options
    strategies: {
      local: {
        cookie: {
          // (optional) If set, we check this cookie existence for loggedIn check
          name: 'XSRF-TOKEN',
        },
        token: {
          property: 'jwt',
        },
        refreshToken: {
          property: 'refresh_token',
          data: 'refresh_token',
          maxAge: 60 * 60 * 24 * 30
        },
        user: {
          property: false,
        },
        endpoints: {
          login: {
            url: 'auth/local',
            method: 'post',
          },
          user: {
            url: 'users/me',
            method: 'get',
          },
          logout: false,
        },
      },
    },
    redirect: {
      home: "/user/Me",
      logout: "/user/login?logout=true",
      login: "/user/login",
      callback: false
    }
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^vue2-google-maps($|\/)/], // Cần build cái này google mới chạy
  },
  server: {
    host: '0.0.0.0',
    port: 3000
  },
  router: {
    middleware: ['check-auth'],
  }
}
