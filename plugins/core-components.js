import Vue from 'vue'

import AppButton from "@/components/UI/AppButton.vue";
import AppControlInput from "@/components/UI/AppControlInput.vue";
import PostList from '../components/Posts/PostList.vue';
import PostPreview from "@/components/Posts/PostPreview.vue";
import AdminPost from "@/components/Admin/AdminPost.vue";




Vue.component('AppButton', AppButton)
Vue.component('AppControlInput', AppControlInput)
Vue.component('PostList', PostList)
Vue.component('PostPreview', PostPreview)
Vue.component('AdminPost', AdminPost)