// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
    devtools: {enabled: true},
    modules: ['@nuxtjs/tailwindcss', 'nuxt-icon', '@pinia/nuxt'],
    css: [
        {src: '~/assets/css/main.scss', lang: 'scss'},
    ],
    vite: {
        build:{
            target:['edge90','chrome90','firefox90','safari15']
        }
    },
    app: {
        head: {
            title: "hown",
            meta: [
                // <meta name="viewport" content="width=device-width, initial-scale=1">
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },
                { name: 'description', content: '' },
                { name: 'keywords', content: '' },
            ],
            link: [
                { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
            ]
        }
    }
})
