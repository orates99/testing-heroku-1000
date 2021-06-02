<template>
 <div>
    <h1>Color mode: {{ $colorMode.value }}</h1>
    <select v-model="$colorMode.preference">
      <option value="system">System</option>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
      <option value="sepia">Sepia</option>
    </select>
  
  <Nuxt />
  </div>
</template>

<script>
export default {
name:'admin',
middleware:'log',
colorMode: 'dark'
}
</script>

<style>
body {
  background-color: #fff!important;
  color: rgba(0,0,0,0.8)!important;
  margin: 0;
}
.dark-mode body {
  background-color: #091a28!important;
  color: #ebf4f1!important;
}
.sepia-mode body {
  background-color: #f1e7d0!important;
  color: #433422!important;
}
</style>