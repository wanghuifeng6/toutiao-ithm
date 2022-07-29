<template>
  <div>
    <!-- 搜索建议 -->
    <van-cell-group>
      <van-cell
        :title="item"
        v-for="(item, index) in SuggestionList"
        :key="index"
        @click="PointSearch(item)"
      >
        <template #icon> <i class="toutiao toutiao-sousuo"></i> </template
      ></van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { LenovoSuggestion } from '@/API/login.js'
export default {
  props: {
    value: {
      typeof: toString
    }
  },
  data () {
    return {
      SuggestionList: []
    }
  },
  watch: {
    value: {
      async handler (val) {
        const { data } = await LenovoSuggestion(val)
        this.SuggestionList = data.data.options
      },
      immediate: true
    }
  },
  methods: {
    PointSearch (val) {
      this.$emit('PointSearch', val)
    }
  }
}
</script>

<style></style>
