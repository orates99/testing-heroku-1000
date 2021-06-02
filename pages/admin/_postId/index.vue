<template>
  <div class="admin-new-post-page">
    <section class="new-post-form">
      <AdminPost :post="loadedPost" @submit="onSubmitted"/>
    </section>
  </div>
</template>

<script>

import axios from "axios";
export default {
  middleware:['check-auth','auth'],
  asyncData(context) {
    return axios.get(process.env.baseUrl+'/posts/'+ context.params.postId +'.json')
    .then(res=>{
      return {
        loadedPost:{...res.data,id:context.params.postId}
      }
    })
    .catch(e=>context.error(e))
    
  },
  methods:{
      onSubmitted(editedPost){
       this.$store.dispatch('editPost',editedPost)
       .then(()=>{
         this.$router.push("/admin")
       })

      
      }
  }
};
</script>

<style>
</style>