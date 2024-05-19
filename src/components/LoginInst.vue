<template>
  <div class="inst-wrapper">
    <div class="login-inst-btn" @click="loginInst" v-if="!InstData">
      login instagram
    </div>
    <div class="inst-data" v-else>
      <p class="inst-name">
        {{ InstData.username }}
      </p>
      <ul class="inst-posts" v-if="InstPosts?.length">
        <li v-for="post in InstPosts" :key="post.id" class="post-item">
          <p class="post-message" v-if="post.caption">
            {{ post.caption }}
          </p>
          <img
            v-if="post.media_url"
            :src="post.media_url"
            alt=""
            class="post-img"
          />
          <span class="inst-post-date" v-if="post.created_time">{{
            post.created_time
          }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'LoginInst',
  data() {
    return {
      instAppId: '938567128057524',
      redirectUri: window.location.origin + '/Inst',
      userId: null,
      accessToken: null,
    }
  },
  computed: {
    ...mapState(['InstPosts']),
    ...mapState(['InstData']),
  },
  methods: {
    ...mapGetters(['getInstPosts', 'getInstData']),
    loginInst() {
      if (!window.location.search.includes('code=')) {
        window.open(
          `https://api.instagram.com/oauth/authorize/?client_id=${this.instAppId}&redirect_uri=${this.redirectUri}&scope=user_profile&response_type=code`
        )
        this.getMarker()
      } else {
        this.getMarker()
      }
    },
    getMarker() {
      const code = window.location.search.match(/code=([^&]+)/)?.[1]
      if (code) {
        fetch('https://api.instagram.com/oauth/access_token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: `client_id=${
            this.instAppId
          }&client_secret=bdfd0d3223db11d8311f8082ad0c745f&grant_type=authorization_code&redirect_uri=${encodeURIComponent(
            this.redirectUri
          )}&code=${code}`,
        })
          .then(async (res) => {
            try {
              const data = await res.json()
              if (data && data.access_token && data.user_id) {
                this.userId = data.user_id
                this.accessToken = data.access_token
                this.getUserData()
              } else {
                console.error('Invalid response from Instagram API')
              }
            } catch (err) {
              console.error(
                'Error fetching access token from Instagram API',
                err
              )
            }
          })
          .catch((error) => {
            console.error(
              'Error fetching access token from Instagram API',
              error
            )
          })
      }
    },
    getUserData() {
      axios
        .get(
          `https://graph.instagram.com/${
            this.userId ?? null
          }?fields=id,username,media{caption,media_url,created_time}&access_token=${
            this.accessToken ?? ''
          }`,
          {}
        )
        .then((res) => {
          try {
            console.log(res)
            this.getInstPosts(res.data.id)
            this.$store.commit('setInstData', res.data)
            this.$store.commit('setInstPosts', res.data.media.data)
          } catch (err) {
            console.error(err)
          }
        })
        .catch((error) => {
          console.error(error)
        })
    },
  },
  mounted() {
    try {
      if (window.location.search.includes('code=')) {
        this.getMarker()
        const searchParams = new URLSearchParams(window.location.search)
        const token = searchParams.get('code')
        if (token) {
          searchParams.set('code', null)
          window.history.pushState(
            {},
            '',
            window.location.pathname + window.location.search.split('?')[0]
          )
          this.accessToken = token
          this.getMarker()
        }
      }
    } catch (err) {
      console.error(err)
    }
  },
}
</script>

<style lang="scss">
.inst-wrapper {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .login-inst-btn {
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    color: white;
    background-color: #0095f6;
    border: none;
    cursor: pointer;
  }
  .inst-data {
    display: flex;
    flex-direction: column;
    align-items: center;
    .inst-name {
      font-size: 20px;
      font-weight: 700;
    }
    .inst-pic {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      margin-bottom: 10px;
    }
  }
  .inst-posts {
    display: flex;
    flex-direction: column;
    align-items: center;
    .post-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      .post-message {
        font-size: 20px;
        font-weight: 600;
        margin-bottom: 10px;
      }
      .post-img {
        width: 300px;
        height: 300px;
        object-fit: cover;
        margin-bottom: 10px;
      }
    }
  }
}
</style>
