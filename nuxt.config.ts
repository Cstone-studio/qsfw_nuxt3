// https://nuxt.com/docs/api/configuration/nuxt-config
const load = require("./env");
load();

export default defineNuxtConfig({
  ssr: false,

  devtools: { enabled: true },

  modules: ["@element-plus/nuxt", "@pinia/nuxt", "@sidebase/nuxt-auth"],

  // elementPlus: { /** Options */ }
  plugins: [
    {
      src: "~/plugins/element-plus",
    },
  ],

  runtimeConfig: {
    // apiSecret: process.env.API_SECRET,
    public: {
      apiBase: process.env.BASE_URL,
    },
  },

  nitro: {
    devProxy: {
      "/api/": {
        target: process.env.API_URL,
        changeOrigin: true,
      },
    },
  },

  build: {
    transpile: ["echarts", "zrender", "tslib"],
  },

  auth: {
    globalAppMiddleware: true,
    baseURL: "/api",
    session: {
      enableRefreshOnWindowFocus: false,
    },
    provider: {
      type: "local",
      endpoints: {
        signIn: { path: "/login", method: "post" },
        // signOut: { path: "/logout", method: "post" },
        // signUp: { path: "/register", method: "post" },
        getSession: { path: "/getUserInfo", method: "post" },
      },
      pages: {
        login: "/demo/auth",
      },
      token: { signInResponseTokenPointer: "/result/token" },
    },
  },
});
