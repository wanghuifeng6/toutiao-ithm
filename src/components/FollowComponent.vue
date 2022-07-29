<template>
  <div>
    <van-button
      v-if="!ArticleList.is_followed"
      class="follow-btn"
      type="badge"
      color="#3296fa"
      round
      size="small"
      icon="plus"
      @click="onFollow"
      >关注{{ ArticleList.art_id }}</van-button
    >
    <van-button v-else class="follow-btn" round size="small" @click="onFollow"
      >已关注{{ ArticleList.art_id }}</van-button
    >
  </div>
</template>

<script>
import { addFollow, deleteFollow } from '@/API/login.js'
export default {
  props: {
    ArticleList: {
      typeof: [Object]
    }
  },
  methods: {
  // 关注用户和取消关注
    async onFollow () {
    // 开启按钮的 loading 状态
      this.isFollowLoading = true

      try {
      // 如果已关注，则取消关注
        const authorId = this.ArticleList.aut_id
        if (this.ArticleList.is_followed) {
          await deleteFollow(authorId)
        } else {
        // 否则添加关注
          await addFollow(authorId)
        }

        // 更新视图
        // eslint-disable-next-line vue/no-mutating-props
        this.ArticleList.is_followed = !this.ArticleList.is_followed
      } catch (err) {
        console.log(err)
        this.$toast.fail('操作失败')
      }

      // 关闭按钮的 loading 状态
      this.isFollowLoading = false
    }
  }

}
</script>

<style></style>
