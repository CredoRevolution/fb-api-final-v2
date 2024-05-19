<template>
  <div class="Fb">
    <div class="home-btn">
      <router-link :to="{ name: 'Home' }">Return to Home</router-link>
    </div>
    <KeepAlive>
      <LogingFb />
    </KeepAlive>
  </div>
</template>

<script>
import LogingFb from '../components/LoginFb.vue'

export default {
  name: 'FbView',
  components: {
    LogingFb,
  },
}
</script>

<style lang="scss">
.Fb {
  background: linear-gradient(to right, #3b5998, #4b6296);
  min-height: 100vh;
}
.home-btn {
  border-radius: 0.5rem;
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  text-decoration: none;
  color: #333;
  display: inline-block;
  margin-bottom: 1rem;
  transition: all 0.3s ease-in-out;
  position: sticky;
  top: 0;
  right: 0;
  &:hover {
    background-color: #eee;
    border-color: #999;
    color: #333;
  }
  a {
    text-decoration: none;
    color: #333;
    font-weight: 700;
    font-size: 30px;
    text-transform: uppercase;
    letter-spacing: 3px;
    text-shadow: 1px 1px 1px black;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    text-decoration: none;
    padding: 20px;
  }
}
</style>
