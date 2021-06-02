<template>
  <div class="posts-page">
    
     <PostList :posts="loadedPosts" />

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
    title: 'Posts page',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Posts page description'
      }
    ],
  }


}
</script>

<style scoped>
.posts-page{
    display:flex;
    justify-content: center;
    align-items:center;
}

</style>