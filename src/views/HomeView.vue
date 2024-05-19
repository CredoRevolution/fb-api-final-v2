<template>
  <div class="home">
    <div class="link-wrapper fb-wrapper">
      <router-link :to="{ name: 'Fb' }">Fb</router-link>
    </div>
    <div class="link-wrapper fb-business-wrapper">
      <router-link :to="{ name: 'FbBusiness' }">FbBusiness</router-link>
    </div>
    <div class="link-wrapper inst-wrapper">
      <router-link :to="{ name: 'Inst' }">Inst</router-link>
    </div>
    <div class="link-wrapper inst-business-wrapper">
      <router-link :to="{ name: 'InstBusiness' }">InstBusiness</router-link>
    </div>
  </div>
</template>

<script>
import FbBusiness from './FbBusiness.vue'
import FbView from './FbView.vue'
import InstBusiness from './InstBusiness.vue'
import InstView from './InstView.vue'

export default {
  name: 'HomeView',
  components: {
    FbView,
    InstView,
    FbBusiness,
    InstBusiness,
  },
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.home {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  .link-wrapper {
    width: 50%;
    height: 50vh;
    display: flex;
    justify-content: center;
    align-items: center;
    a {
      color: white;
      font-size: 30px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 3px;
      text-shadow: 1px 1px 1px black;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      text-decoration: none;
      padding: 20px;
      border-radius: 10px;

      box-shadow: 1px 1px 1px black;
      transition: all 0.3s ease-in-out;
      &:hover {
        transform: scale(1.1);
        box-shadow: 3px 3px 3px black;

        color: white;
        text-shadow: none;
        letter-spacing: 5px;
        font-size: 35px;
        font-weight: 800;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      }
    }
    border: 1px solid black;
    &.fb-wrapper {
      background: linear-gradient(to left, blueviolet, rgba(138, 43, 226, 0.8));
      a {
        background: linear-gradient(
          to right,
          blueviolet,
          rgba(138, 43, 226, 0.8)
        );
        &:hover {
          background: linear-gradient(
            to left,
            blueviolet,
            rgba(138, 43, 226, 0.8)
          );
        }
      }
    }
    &.fb-business-wrapper {
      background: linear-gradient(to right, blueviolet, rgba(57, 12, 99, 0.8));
      a {
        background: linear-gradient(to left, blueviolet, rgba(57, 12, 99, 0.8));
      }
    }
    &.inst-wrapper {
      background: linear-gradient(
        to left,
        rgb(250, 72, 0.9),
        rgba(250, 1, 1, 0.8)
      );
      a {
        background: linear-gradient(
          to right,
          rgb(250, 72, 0.9),
          rgba(250, 1, 1, 0.8)
        );
      }
    }
    &.inst-business-wrapper {
      background: linear-gradient(
        to right,
        rgb(250, 72, 0.9),
        rgba(126, 14, 14, 0.8)
      );
      a {
        background: linear-gradient(
          to left,
          rgb(250, 72, 0.9),
          rgba(126, 14, 14, 0.8)
        );
      }
    }
  }
}
</style>
