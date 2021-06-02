export default {
    // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
    ssr: true,

    // Global page headers (https://go.nuxtjs.dev/config-head)
    head: {
        title: 'pages-routing',
        meta: [{
                charset: 'utf-8'
            },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1'
            },
            {
                hid: 'description',
                name: 'description',
                content: ''
            }
        ],
        link: [{
                rel: 'icon',
                type: 'image/x-icon',
                href: '/favicon.ico'
            },
            {
                rel: 'stylesheet',
                href: 'https://fonts.googleapis.com/css2?family=Open+Sans'
            }
        ]
    },
    loading: {
        color: 'blue',
        height: '5px',
        duration: 5000,
        continuous: true
    },
    loadingIndicator: {
        name: 'circle',
        color: '#3B8070',
        background: 'white'
    },

    // Global CSS (https://go.nuxtjs.dev/config-css)
    css: [
        '@assets/styles/main.css'
    ],

    // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
    plugins: [
        '@plugins/core-components.js',
        '@plugins/date-filter.js'
    ],

    // Auto import components (https://go.nuxtjs.dev/config-components)
    components: true,

    // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)


    // Modules (https://go.nuxtjs.dev/config-modules)
    modules: [],

    // Build Configuration (https://go.nuxtjs.dev/config-build)
    build: {},
    env: {
        baseUrl: process.env.BASE_URL || 'https://vue-blog-7a619-default-rtdb.firebaseio.com',
        fbAPIKey: 'AIzaSyDH8k0zS2b2vVL1BXV7bw3fAq5dXi_Sfpw'
    },
    transition: {
        name: 'fade',
        mode: 'out-in'
    },

    buildModules: [
        '@nuxtjs/color-mode'
    ]

}