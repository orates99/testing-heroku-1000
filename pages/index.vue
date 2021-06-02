<template>
  <div class="home-page">
    <section class="intro">
      <h1>Get the latest tech news!</h1>

    </section>
   
    <section class="featured-posts">
     <PostList :posts="loadedPosts" />
  
    </section>
  </div>
</template>

<script>


export default {


computed:{
  loadedPosts(){
    return this.$store.getters.loadedPosts
  }
},

  head: {
    title: 'Home page',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Home page description'
      }
    ],
  },
  



}
</script>

<style scoped>

.featured-posts {
  display: flex;
  padding: 20px;
  box-sizing: border-box;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}




</style>