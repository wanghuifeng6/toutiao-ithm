<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <van-icon
    :loading="loading"
      :name="value===1 ? 'good-job' : 'good-job-o'"
      :class="value===1 ? 'Orange' : ''"
      @click="onCollect"
    >
    </van-icon>
  </div>
</template>

<script>
// 点赞和取消点赞的请求
import { Likenuw, Cancel } from '@/API/login.js'
export default {
  props: {
    // -1
    value: {
      typeof: Number,
      require: true
    },
    // id
    articleId: {
      typeof: [Number, String, Object],
      require: true
    }
  },
  data () {
    return {
      loading: false
    }
  },
  methods: {
    async onCollect () {
      this.loading = true
      try {
        let status = -1
        // 如果已经点赞，则取消点赞
        console.log(this.value)
        if (this.value === 1) {
          await Cancel(this.articleId)
        } else {
          // 否则添加点赞
          await Likenuw(this.articleId)
          // eslint-disable-next-line no-unused-vars
          status = 1
        }
        this.$emit('input', status)
        this.$toast.success(status === 1 ? '已点赞' : '已取消')
      } catch (err) {
        console.log(err)
        this.$toast.fail('操作失败')
      }
      this.loading = false
    }
  }
}
</script>

<style scoped lang="less">
.Orange {
  color: #fba62b;
}
</style>
