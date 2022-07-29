<template>
  <div>
    <van-cell-group>
      <van-cell :title="item" v-for="(item, index) in History()" :key="index">
        <template #icon> <i class="toutiao toutiao-sousuo"></i> </template>
        <template
          ><span @click="DeleteHistoricalSearch(index)">删除</span></template
        >
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
    value: {
      typeof: toString
    }
  },
  methods: {
    ...mapState(['History']),
    // 删除搜索历史
    DeleteHistoricalSearch (index) {
      this.$store.commit('DeleteSearchHistory', index)
      this.$toast.success('删除成功')
    }
  }
}
</script>

<style></style>
