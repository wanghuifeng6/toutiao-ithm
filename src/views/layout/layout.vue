<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <!-- 二级路由(添加缓存,减少性能) -->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <!-- 二级路由/ -->

    <!-- 底部tabbar -->
    <van-tabbar v-model="active" route>
      <van-tabbar-item icon="home-o" to="/home">首页</van-tabbar-item>
      <van-tabbar-item icon="chat-o" to="/wd">问答</van-tabbar-item>
      <van-tabbar-item icon="play-circle-o" to="/vidio">视频</van-tabbar-item>
      <van-tabbar-item icon="user-circle-o" to="/my">个人中心</van-tabbar-item>
    </van-tabbar>
    <!-- 底部tabbar/ -->
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: 0
    }
  }
}
</script>

<style></style>
