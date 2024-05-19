<template>
  <div class="about">
    <div class="home-btn">
      <router-link :to="{ name: 'Home' }">Return to Home</router-link>
    </div>
    <KeepAlive>
      <LoginInstBusines />
    </KeepAlive>
  </div>
</template>

<script>
import LoginInstBusines from '../components/LoginInstBusines.vue'
export default {
  name: 'InstBusines',

  components: {
    LoginInstBusines,
  },
}
</script>
