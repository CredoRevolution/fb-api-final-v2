<template>
  <div class="fb-busines-wrapper">
    <div
      class="login-fb-busines-btn"
      @click="loginInstBusines"
      v-if="!InstBusinesData"
    >
      Login Inst Business
    </div>
    <div class="fb-busines-posts" v-if="InstBusinesData?.length">
      <ul class="fb-busines-posts-list">
        <li
          v-for="post in InstBusinesData"
          :key="post.id"
          class="fb-busines-post-item"
        >
          <p class="fb-busines-post-message">
            {{ post.caption }}
          </p>
          <img
            v-if="post.media_url"
            :src="post.media_url"
            alt=""
            class="fb-busines-post-img"
          />
          <span class="fb-busines-post-date">{{ post.created_at }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'LoginInstBusines',
  data() {
    return {
      authResponse: null,
    }
  },
  computed: {
    ...mapState(['InstBusines', 'InstBusinesData']),
  },
  methods: {
    ...mapGetters(['getInstBusines', 'getInstBusinesData']),
    loginInstBusines() {
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
            scope: 'public_profile,instagram_basic,instagram_content_publish',
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
            this.getInstBusinesData()
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
    getInstBusinesData() {
      if (typeof FB !== 'undefined') {
        FB.api(
          '/me',
          'GET',
          { fields: 'accounts{connected_instagram_account}' },
          function (response) {
            if (response && !response.error) {
              console.log('Profile', response)
              this.getInstBusinesPostsFromFB(
                response.accounts.data[0].connected_instagram_account.id
              )
            } else {
              console.error('Error getting user data with FB:', response.error)
            }
          }.bind(this)
        )
      }
    },
    getInstBusinesPostsFromFB(account) {
      if (typeof FB !== 'undefined') {
        console.log(account)
        FB.api(
          `/${account}/media`, // /me/media/
          {
            fields: 'caption,created_time,like_count,media_url',
          },
          (response) => {
            console.log(response)
            if (response && !response.error) {
              console.log('Profile', response)
              this.$store.commit('setInstBusinesData', response.data)
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
      console.log('mounted inst-busines')
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

<style lang="scss">
.fb-busines-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  .login-fb-busines-btn {
    cursor: pointer;
    padding: 10px 20px;
    border-radius: 5px;
    background-color: #1877f2;
    color: #fff;
    font-size: 16px;
    transition: all 0.3s ease-in-out;
    margin: 0 auto;
    margin-bottom: 20px;
    display: inline-block;
    &:hover {
      transform: scale(1.1);
      transition: all 0.3s ease-in-out;
    }
  }
}
</style>
