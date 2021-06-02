<template>
  <div class="admin-new-post-page">
    <section class="new-post-form">
          <AdminPost @submit="onSubmitted" />

    </section>
  </div>
</template>

<script>
export default {
  middleware:['check-auth','auth'],
  data(){
      return{
          editedPost:{
              author:'',
              title:'',
              thumbnailLink:'',
              content:''
          }
      }
  },
  methods:{
    
      onSubmitted(postData){
       this.$store.dispatch('addPost',postData)
       .then(()=>{
         this.$router.push("/admin")
       })
      }
  }
};
</script>

<style>
</style>