<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar">
      <van-button
        class="search-btn"
        slot="title"
        type="info"
        size="small"
        round
        icon="search"
        @click="JumpSearch"
        >搜索</van-button
      >
    </van-nav-bar>
    <!-- /导航栏 -->
    <van-tabs v-model="active" background="#fff">
      <van-tab :title="item.name" v-for="item in userlist" :key="item.id">
        <articleList :userlist="item"></articleList>
      </van-tab>
      <template #nav-right>
        <div slot="nav-right" class="toutiao-gengduobg">0</div>
        <i class="toutiao toutiao-gengduo" @click="show = true"></i>
      </template>
    </van-tabs>
    <!-- 弹出层 -->
    <van-popup
      v-model="show"
      closeable
      close-icon-position="right"
      position="right"
      :style="{ width: '100%', height: '100%' }"
    >
      <channelEdit
        :userlist="userlist"
        :active="active"
        @Switch="Switch"
      ></channelEdit>
    </van-popup>
  </div>
</template>

<script>
// 按需导入获取用户信息
import { getUserChannels } from '@/API/login.js'
// 导入新闻内容组件
import articleList from '@/components/article-list.vue'
// 导入弹出层组件
import channelEdit from '@/components/channel-edit.vue'
// 导入Vuex
import { mapState } from 'vuex'
export default {
  name: 'HomeIndex',
  components: {
    articleList,
    channelEdit
  },
  props: {},
  data () {
    return {
      active: 0,
      userlist: [],
      show: false
    }
  },
  methods: {
    // 请求数据列表
    async RequestDataListt () {
      if (this.user) {
        const { data } = await getUserChannels()
        this.userlist = data.data.channels
      } else {
        this.userlist = JSON.parse(window.localStorage.getItem('LocalList'))
      }
    },
    JumpSearch () {
      this.$router.push({
        name: 'search'
      })
    },
    Switch (val) {
      console.log(val)
      this.active = val
      this.show = false
    }
  },
  created () {
    this.RequestDataListt()
  },
  computed: {
    // 按需引入user(判断是否有token)
    ...mapState(['user'])
  }
}
</script>

<style scoped lang="less">
.home-container {
  padding-bottom: 100px;
  /deep/.van-nav-bar__title {
    max-width: unset;
  }
  .search-btn {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
    border: none;
    font-size: 28px;
    .van-icon {
      font-size: 32px;
    }
  }
}
/deep/.van-tabs__line {
  width: 40px;
  bottom: 40px;
  z-index: 0;
}
.toutiao-gengduo {
  position: fixed;
  height: 0.94rem;
  right: 0;
  font-size: 0.475rem;
  padding-top: 0.35rem;
  padding-right: 0.125rem;
}
.toutiao-gengduobg {
  width: 2.7rem;
  height: 10px;
  visibility: hidden;
  background-color: rgba(0, 0, 0, 0.1, #fff);
}
/deep/.van-tabs__content {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  overflow: scroll;
}
.van-popup--right {
  padding-top: 150px;
}
/deep/.van-icon-cross:before {
  position: fixed;
  top: 1.25rem;
  left: 0.3125rem;
}
</style>
