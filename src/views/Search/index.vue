<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <form action="/">
      <van-search
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        @input="onSearch"
        @cancel="onCancel"
      />
    </form>
    <van-cell-group>
      <van-cell
        :title="item.title"
        v-for="item in SearchList"
        :key="item.art_id"
      >
        <template #icon>
          <i class="toutiao toutiao-sousuo"></i>
        </template></van-cell
      >
    </van-cell-group>
  </div>
</template>

<script>
// 导入搜索列表请求
import { SearchResults } from '@/API/login.js'
export default {
  data () {
    return {
      value: '',
      SearchList: [],
      timer: null
    }
  },
  methods: {
    // 请求搜索列表的函数
    async onSearch () {
      // 加个防抖
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(async () => {
        try {
          if (this.value.length > 0) {
            const { data } = await SearchResults(this.value)
            this.SearchList = data.data.results
            console.log(this.SearchList)
          } else {
            this.SearchList = []
          }
        } catch (err) {
          console.log(err)
        }
      }, 500)
    },
    onCancel () {
      console.log('取消搜索')
      this.$router.push({
        name: 'home'
      })
    }
  }
}
</script>

<style scoped lang="less">
  /deep/.toutiao-sousuo{
    font-size: 35px;
    color: #4C97F4;
  }
</style>
