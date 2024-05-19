<template>
  <div class="fb-wrapper">
    <div class="login-fb-btn" @click="loginFb">login facebook</div>
    <div class="fb-data" v-if="FbData && FbData.first_name">
      <p class="fb-name">{{ FbData.first_name }} {{ FbData.last_name }}</p>
      <img :src="FbData.picture.data.url" alt="profile-pic" class="fb-pic" />
      <ul class="fb-posts">
        <!-- <a :href="FbPosts."  class="post-link"></a> -->
        <li
          v-for="post in getFbPosts(FbData.id)"
          :key="post.id"
          class="post-item"
        >
          <p class="post-message">
            {{ post.message }}
          </p>
          <img :src="post.full_picture" alt="" class="post-img" />
          <span class="fb-post-date">{{ post.created_time }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'LoginFb',
  computed: {
    ...mapState(['FbData']),
  },
  methods: {
    ...mapGetters(['getFbPosts']),
    loginFb() {
      if (typeof FB !== 'undefined') {
        FB.login(
          (response) => {
            if (response.authResponse) {
              this.checkLoginState()
            } else {
              console.log('FB login failed')
            }
          },
          { scope: 'public_profile,email,user_posts' }
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
          '/me',
          {
            fields: 'id,email,first_name,last_name,picture',
          },
          (response) => {
            if (response && !response.error) {
              console.log('Profile', response)
              this.getFbUserPosts(response.id)
              this.$store.commit('setFbData', response)
            }
          }
        )
      }
    },

    getFbUserPosts(userId) {
      if (typeof FB !== 'undefined') {
        FB.api(
          `/${userId}/posts`,
          {
            fields: 'id,message,created_time,link,full_picture',
          },
          (response) => {
            if (response && !response.error) {
              console.log('Posts', response.data)
              this.$store.commit('setFbPosts', response.data)
            }
          }
        )
      }
      FB.logout()
    },
  },

  mounted() {
    window.fbAsyncInit = function () {
      FB.init({
        appId: '1125584682047920',
        cookie: true,
        xfbml: true,
        version: 'v19.0',
        status: false,
        localStorage: false,
      })

      FB.AppEvents.logPageView()
      console.log('mounted fb')
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
.fb-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  .login-fb-btn {
    cursor: pointer;
    padding: 10px;
    border-radius: 5px;
    color: white;
    background-color: #4267b2;
    transition: all 0.3s ease-in-out;
    &:hover {
      transform: scale(1.1);
      transition: all 0.3s ease-in-out;
    }
  }
  .fb-data {
    display: flex;
    flex-direction: column;
    align-items: center;
    .fb-name {
      font-size: 20px;
      font-weight: 700;
    }
    .fb-pic {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      margin-bottom: 10px;
    }
    .fb-posts {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      gap: 30px;
      justify-content: space-between;
      align-items: center;
      padding: 20px;
      .post-item {
        width: 30%;
        border: 1px solid black;
        border-radius: 5px;
        padding: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        .post-img {
          width: 100%;
          height: 300px;
          border-radius: 5px;
        }
        .post-message {
          text-align: center;
          font-size: 20px;
          font-weight: 500;
        }
        .fb-post-date {
          font-size: 14px;
          font-weight: 300;
          text-align: left;
        }
      }
    }
  }
}
</style>
