<template>
  <div id="app" class="page">
    <header class="header">
      <h1><i class="music icon-music"></i>音乐随身听</h1>
      <router-link to="/list">
        <i class="fa icon-1mulu"></i>
        列表
      </router-link>
    </header>
    <router-view/>
    <player></player>
  </div>
</template>

<script>
  import './css/download (1)/font_553440_jsj7i3n8mmx9lik9/iconfont.css'
  import './css/download (1)/font_553440_jsj7i3n8mmx9lik9/iconfont'
  import player from './components/player.vue'
export default {
  name: 'App',
  data(){
      return{

      }
  },
  components:{
      player
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
  ul{
    list-style: none;
  }
</style>
