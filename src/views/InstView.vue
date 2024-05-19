<template>
  <div class="about">
    <div class="home-btn">
      <router-link :to="{ name: 'Home' }">Return to Home</router-link>
    </div>
    <KeepAlive>
      <LogingInst />
    </KeepAlive>
  </div>
</template>

<script>
import LogingInst from '../components/LoginInst.vue'

export default {
  name: 'InstBusiness',
  components: {
    LogingInst,
  },
}
</script>
