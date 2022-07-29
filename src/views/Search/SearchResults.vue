<template>
  <div>
    <!-- 列表数据 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell-group>
        <van-cell v-for="(item, index) in ListOfSearchResults" :key="index">
          <template #icon> <i class="toutiao toutiao-sousuo"></i> </template>
          <template #title>
            <p v-html="highlight(item.title)"></p>
          </template>
        </van-cell>
      </van-cell-group>
    </van-list>
  </div>
</template>

<script>
// 导入搜索列表请求
import { SearchResults } from '@/API/login.js'
export default {
  props: {
    value: {
      typeof: toString
    }
  },
  data () {
    return {
      ListOfSearchResults: [],
      htmlStr: 'Hello<span style="color:red"></span>',
      loading: false,
      finished: false,
      page: 1,
      per_page: 20
    }
  },
  methods: {
    // 对搜索到的内容进行部分高亮
    highlight (text) {
      const highlinhtStr = `Hello<span class="active">${this.value}</span>`
      // g代表全局匹配,i代表忽略大小写(RegExp是正则表达式的构造函数)
      const reg = new RegExp(this.value, 'gi')
      // 使用replace(替换)
      return text.replace(reg, highlinhtStr)
    },
    async onLoad () {
      // 异步更新数据
      try {
        const { data } = await SearchResults({
          page: this.page,
          per_page: this.per_page,
          q: this.value
        })
        this.ListOfSearchResults.push(...data.data.results)
        this.page++
        this.loading = false
        // 数据全部加载完毕
        if (data.data.results.length === 0) {
          this.finished = true
        }
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style scoped lang="less">
/deep/.active {
  color: #1d82fe !important;
}
</style>
