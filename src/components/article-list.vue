<template>
  <van-pull-refresh
    v-model="isRefreshLoading"
    :success-text="refreshSuccessText"
    :success-duration="1500"
    @refresh="onRefresh"
  >
  <!-- 中间部分 -->
    <div class="article-list">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <!-- <van-cell
          v-for="(article, index) in list"
          :key="index"
          :title="article.title"
        /> -->
        <div class="list">
          <div class="article_item" v-for="(item, index) in list" :key="index">
            <p class="van-ellipsis">{{ item.title }}</p>
            <div class="img_box" v-if="item.cover.type === 1">
              <img :src="item.cover.images" class="w100" />
            </div>
            <div class="img_box" v-else-if="item.cover.type === 3">
              <img :src="item.cover.images[0]" class="w33" />
              <img :src="item.cover.images[1]" class="w33" />
              <img :src="item.cover.images[2]" class="w33" />
            </div>
            <div class="info_box">
              <span>{{ item.aut_name }}</span>
              <span>{{ item.comm_count }}评论</span>
              <!-- 使用定义好的过滤器来过滤时间 -->
              <span>{{ item.pubdate | relativeTime}}</span>
            </div>
          </div>
        </div>
      </van-list>
    </div>
  </van-pull-refresh>
</template>

<script>
import { ChannelNewsRecommendation } from '@/API/login.js'
export default {
  props: {
    userlist: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      list: [], // 存储列表数据的数组
      loading: false, // 控制加载中 loading 状态
      finished: false, // 控制数据加载结束的状态
      timestamp: null,
      error: false,
      isRefreshLoading: false,
      refreshSuccessText: ''
    }
  },
  mounted () {},
  methods: {
    // 初始化或滚动到底部的时候会触发调用 onLoad
    async onLoad () {
      try {
        // 1. 请求获取数据
        const { data } = await ChannelNewsRecommendation({
          channel_id: this.userlist.id, // 频道 id
          timestamp: this.timestamp || Date.now(), // 时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
          with_top: 1 // 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
        })
        // 2. 把请求结果数据放到 list 数组中
        const { results } = data.data
        this.list.push(...results)
        // 3. 本次数据加载结束之后要把加载状态设置为结束
        this.loading = false
        // 4. 判断数据是否全部加载完成(如果发来的数组里还有数据就继续添加)
        if (results.length) {
          // 更新获取下一页数据的时间戳
          this.timestamp = data.data.pre_timestamp
        } else {
          // 没有数据了，设置加载状态结束，不再触发上拉加载更多了
          this.finished = true
        }
      } catch (err) {
        this.loading = false // 关闭 loading 效果
        this.error = true // 开启错误提示
      }
    },
    // 当触发下拉刷新的时候调用该函数
    async onRefresh () {
      try {
        // 1. 请求获取数据
        const { data } = await ChannelNewsRecommendation({
          channel_id: this.userlist.id, // 频道 id
          timestamp: Date.now(), // 下拉刷新每次都应该获取最新数据
          with_top: 1 // 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
        })

        // 2. 将数据追加到列表的顶部
        const { results } = data.data
        this.list.unshift(...results)

        // 3. 关闭下拉刷新的 loading 状态
        this.isRefreshLoading = false

        // 提示成功
        this.refreshSuccessText = `刷新成功，更新了${results.length}条数据`
      } catch (err) {
        console.log(err)
        this.isRefreshLoading = false // 关闭下拉刷新的 loading 状态
        this.$toast('刷新失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.van-ellipsis {
  font-size: 0.475rem;
}
.w100 {
  height: 400px !important;
}
.w33 {
  height: 150px !important;
}
// 下拉缓存
.article-list{
  // 高度为79vh
  height: 79vh;
  // 添加滚动条
  overflow: auto;
}
</style>
