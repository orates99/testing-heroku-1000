import Vuex from 'vuex'
import axios from 'axios'
import Cookie from 'js-cookie'

const createStore = () => {
    return new Vuex.Store({
        state: {
            loadedPosts: [],
            token: null
        },
        mutations: {
            setPosts(state, posts) {
                state.loadedPosts = posts
            },
            addPost(state, post) {
                state.loadedPosts.push(post)
            },
            editPost(state, editedPost) {
                const postIndex = state.loadedPosts.findIndex(post => post.id === editedPost.id)
                state.loadedPosts[postIndex] = editedPost
            },
            setToken(state, token) {
                state.token = token
            },
            clearToken(state) {
                state.token = null
            }
        },
        actions: {
            nuxtServerInit(vuexContext, context) {

                return axios.get(process.env.baseUrl + '/posts.json')
                    .then(res => {
                        const postsArray = []
                        for (const key in res.data) {
                            postsArray.push({
                                ...res.data[key],
                                id: key
                            })
                        }
                        vuexContext.commit('setPosts', postsArray)
                    })

            },
            setPosts(vuexContext, posts) {
                vuexContext.commit('setPosts', posts)
            },
            addPost(vuexContext, post) {
                const createPost = {
                    ...post,
                    updatedDate: new Date()
                }
                return axios.post(process.env.baseUrl + '/posts.json?auth=' + vuexContext.state.token, createPost)
                    .then(res => {
                        console.log(res.data)
                        vuexContext.commit('addPost', {
                            ...createPost,
                            id: res.data.name
                        })
                        this.$router.push("/admin")
                    })
                    .catch(e => console.log(e))
            },
            editPost(vuexContext, editedPost) {
                const fixedPost = {
                    ...editedPost,
                    updatedDate: new Date()
                }
                return axios.put(process.env.baseUrl + '/posts/' + fixedPost.id + '.json?auth=' + vuexContext.state.token, fixedPost)
                    .then(() => {
                        vuexContext.commit("editPost", fixedPost)


                    })
                    .catch(e => console.log(e))

            },
            authenticateUser(vuexContext, authData) {
                let authURL = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + process.env.fbAPIKey;
                if (!authData.isLogin) {
                    authURL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + process.env.fbAPIKey;
                } else {


                }
                return axios.post(authURL, {
                    email: authData.email,
                    password: authData.password,
                    returnSecureToken: true
                }).then(result => {
                    vuexContext.commit('setToken', result.data.idToken)

                    localStorage.setItem('token', result.data.idToken)
                    localStorage.setItem('tokenExpiration',
                        new Date().getTime() + Number.parseInt(result.data.expiresIn) * 10000000)

                    Cookie.set('jwt', result.data.idToken)
                    Cookie.set("expirationDate",
                        new Date().getTime() + Number.parseInt(result.data.expiresIn) * 10000000
                    )

                    vuexContext.dispatch('setLogoutTimer', Number.parseInt(result.data.expiresIn) * 10000000)
                    console.log(result)

                }).catch(e => console.log(e))
            },
            setLogoutTimer(vuexContext, duration) {
                setTimeout(() => {
                    vuexContext.commit('clearToken')
                }, duration)
            },
            initAuth(vuexContext, req) {
                let token;
                let jwtCookie;
                let expirationDate;
                if (req) {
                    if (!req.headers.cookie) {
                        return;
                    }
                    jwtCookie = req.headers.cookie
                        .split(";")
                        .find(c => c.trim().startsWith("jwt="));
                    if (!jwtCookie) {
                        return;
                    }
                    expirationDate = req.headers.cookie
                        .split(";")
                        .find(c => c.trim().startsWith("expirationDate="));
                    token = jwtCookie.split('=')[1];
                    expirationDate = expirationDate.split('=')[1];
                } else {
                    token = localStorage.getItem('token');
                    expirationDate = localStorage.getItem('tokenExpiration');

                }
                if (new Date().getTime() > +expirationDate || !token) {
                    vuexContext.dispatch("logOut")
                    console.log("Token Bitti")
                    return
                }
                console.log("Token Devam")
                console.log(new Date().getTime(), +expirationDate)
                vuexContext.commit('setToken', token);

            },
            logOut(vuexContext) {
                vuexContext.commit('clearToken');
                Cookie.remove('jwt');
                Cookie.remove('expirationDate');
                if (process.client) {
                    localStorage.removeItem('token');
                    localStorage.removeItem('tokenExpiration');
                }


            }
        },
        getters: {
            loadedPosts(state) {
                return state.loadedPosts
            },
            isAuthenticated(state) {
                return state.token != null
            }
        }
    })
}

export default createStore