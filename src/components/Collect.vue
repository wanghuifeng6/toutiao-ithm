<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <van-icon
      :loading="loading"
      :name="value ? 'star' : 'star-o'"
      :class="value ? 'Orange' : ''"
      @click="onCollect"
    />
    <!-- {{value}} -->
  </div>
</template>

<script>
import { addCollect, deleteCollect } from '@/API/login.js'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'collect',
  props: {
    value: {
      typeof: Boolean,
      require: true
    },
    articleId: {
      typeof: Number
    }
  },
  data () {
    return {
      loading: false
    }
  },
  methods: {
    async onCollect () {
    // 开始请求
      this.loading = true
      try {
        // 是否收藏
        if (this.value) {
          // 父组件 传递articleId
          await deleteCollect(this.articleId)
        } else {
          await addCollect(this.articleId)
        }
        // 更新视图
        this.$emit('input', !this.value)
        this.$toast.success(this.value ? '取消收藏' : '收藏成功')
      } catch (err) {
        this.$toast('操作失败，请重试')
      }
      // 请求结束
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
