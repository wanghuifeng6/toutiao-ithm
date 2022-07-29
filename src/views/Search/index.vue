<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <div>
      <form action="/">
        <van-search
          v-model="value"
          show-action
          placeholder="请输入搜索关键词"
          @search="onSearch"
          @cancel="onCancel"
          @input="Judgment"
          class="HeadSearch"
        />
      </form>
      <van-cell title="单元格" value="内容" />
      <div>
        <!-- 搜索建议 Result-->
        <SearchSuggestion v-if="Result" :value="value" @PointSearch='PointSearch'></SearchSuggestion>
        <!-- 搜索结果 Sear -->
        <SearchResults v-else-if="Sear" :value="value"></SearchResults>
        <!-- 搜索历史 -->
        <SearchHistory v-else :value="value"></SearchHistory>
      </div>
    </div>
  </div>
</template>

<script>
// 导入搜索建议,搜索结果,搜索历史
import SearchSuggestion from './SearchSuggestion.vue'
import SearchResults from './SearchResults.vue'
import SearchHistory from './SearchHistory.vue'
import { mapMutations } from 'vuex'
export default {
  components: {
    // eslint-disable-next-line vue/no-unused-components
    SearchSuggestion,
    // eslint-disable-next-line vue/no-unused-components
    SearchResults,
    // eslint-disable-next-line vue/no-unused-components
    SearchHistory
  },
  data () {
    return {
      value: '',
      Sear: false,
      Result: false
    }
  },
  methods: {
    ...mapMutations(['UpdateSearchHistory']),
    // 取消搜索
    onCancel () {
      console.log('取消搜索')
      this.$router.push({
        name: 'home'
      })
    },
    // 请求搜索列表的函数
    async onSearch () {
      this.UpdateSearchHistory(this.value)
      this.$toast.success('搜索成功')
      this.Sear = true
      this.Result = false
    },
    Judgment () {
      this.value.length > 0 ? (this.Result = true) : (this.Sear = true)
      if (this.value.length === 0) {
        this.Sear = false
        this.Result = false
      }
    },
    PointSearch (val) {
      this.value = val
      this.Result = false
      this.Sear = true
    }
  }

}
</script>

<style scoped lang="less">
/deep/.toutiao-sousuo {
  font-size: 35px;
  color: #4c97f4;
}
.HeadSearch {
  width: 100%;
  position: fixed;
  z-index: 999;
}
</style>
