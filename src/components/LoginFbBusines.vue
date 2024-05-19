<template>
  <div class="fb-busines-wrapper">
    <div class="login-fb-busines-btn" @click="loginFbBusines" v-if="!FbBusines">
      Login Fb Business
    </div>
    <div class="fb-busines-data" v-else>
      <p class="fb-busines-name">{{ FbBusines.name }}</p>
      <img :src="FbBusines.picture.data.url" alt="" />
    </div>
    <div class="fb-busines-posts" v-if="FbBusinesPosts?.length">
      <ul class="fb-busines-posts-list">
        <li
          v-for="post in FbBusinesPosts"
          :key="post.id"
          class="fb-busines-post-item"
        >
          <p class="fb-busines-post-message">
            {{ post.message }}
          </p>
          <img
            v-if="post.media_url"
            :src="post.media_url"
            alt=""
            class="fb-busines-post-img"
          />
          <span class="fb-busines-post-date">{{ post.created_time }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'LoginFbBusines',
  data() {
    return {
      authResponse: null,
    }
  },
  computed: {
    ...mapState(['FbBusines', 'FbBusinesPosts']),
  },
  methods: {
    ...mapGetters(['getFbBusinesData', 'getFbBusinesPosts']),
    loginFbBusines() {
      if (typeof FB !== 'undefined') {
        FB.login(
          (response) => {
            console.log(response)
            this.authResponse = response.authResponse
            if (response.authResponse) {
              this.checkLoginState()
            } else {
              console.log('FB login failed')
            }
          },
          {
            scope:
              'public_profile,instagram_basic,pages_show_list,instagram_content_publish',
          }
        )
      } else {
        console.warn(
          'Facebook SDK not loaded. Make sure to call FB.init() before using Facebook APIs.'
        )
      }
    },
    checkLoginState() {
      if (typeof FB !== 'undefined') {
        FB.getLoginStatus((response) => {
          if (response.status === 'connected') {
            this.getFbUserData()
          } else if (
            response.status === 'not_authorized' ||
            response.status === 'unknown'
          ) {
            console.log(
              'The user is logged into Facebook, but not into your app. Or the user is not logged into Facebook at all.'
            )
          }
        })
      }
    },
    getFbUserData() {
      if (typeof FB !== 'undefined') {
        FB.api(
          '/me/accounts',
          {
            fields: 'business',
          },
          (response) => {
            console.log(response)
            if (response && !response.error) {
              console.log('Profile', response)
              this.getFbBusinesData(response)
            } else {
              console.error('Error getting user data with FB:', response.error)
            }
          }
        )
      }
    },
    getFbBusinesData(response) {
      if (typeof FB !== 'undefined') {
        FB.api(
          `/${response.data[0].id}`,
          {
            fields: 'name,picture,access_token',
          },
          (response) => {
            console.log(response)
            if (response && !response.error) {
              console.log('Profile', response)
              this.$store.commit('setFbBusines', response)
            } else {
              console.error('Error getting user data with FB:', response.error)
            }
            this.getFbBusinesPosts(response.access_token)
          }
        )
      }
    },
    getFbBusinesPosts(access_token) {
      if (typeof FB !== 'undefined') {
        FB.api(
          `/${this.authResponse.userID}/posts`,
          {
            fields: 'message,created_time,link,full_picture',
            access_token: access_token,
          },
          (response) => {
            console.log(response)
            if (response && !response.error) {
              console.log('Profile', response)
              this.$store.commit('setFbBusinesPosts', response.data)
            } else {
              console.error('Error getting user data with FB:', response.error)
            }
          }
        )
      }
    },
  },
  mounted() {
    window.fbAsyncInit = function () {
      FB.init({
        appId: '428343743281323',
        cookie: true,
        xfbml: true,
        version: 'v19.0',
      })

      FB.AppEvents.logPageView()
      console.log('mounted fb-busines')
    }

    if (typeof FB !== 'undefined') {
      window.fbAsyncInit()
    }
    ;(function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0]
      if (d.getElementById(id)) {
        return
      }
      js = d.createElement(s)
      js.id = id
      js.src = 'https://connect.facebook.net/en_US/sdk.js'
      fjs.parentNode.insertBefore(js, fjs)
    })(document, 'script', 'facebook-jssdk')
  },
}
</script>

<style></style>
