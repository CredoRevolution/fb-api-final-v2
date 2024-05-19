<template>
  <div class="about">
    <div class="home-btn">
      <router-link :to="{ name: 'Home' }">Return to Home</router-link>
    </div>
    <KeepAlive>
      <LoginFbBusines />
    </KeepAlive>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import LoginFbBusines from '../components/LoginFbBusines.vue'
export default {
  name: 'FbBusines',

  components: {
    LoginFbBusines,
  },
}
</script>
