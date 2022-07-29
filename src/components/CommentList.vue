<template>
  <div class="article-comments">
    <!-- 评论列表 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="(item, index) in list" :key="item.com_id">
        <van-image
          slot="icon"
          round
          width="30"
          height="30"
          style="margin-right: 10px"
          :src="item.aut_photo"
        />
        <span style="color: #466b9d" slot="title">{{ item.aut_name }}</span>
        <div slot="label">
          <p style="color: #363636">{{ item.content }}</p>
          <p>
            <span style="margin-right: 10px">{{ item }}</span>
            <van-button size="mini" type="default" @click="isReplyShow=true">回复</van-button>
          </p>
        </div>
        <van-icon slot="right-icon" name="like-o" @click="Like(index)" />
      </van-cell>
    </van-list>
    <!-- 评论列表 -->

    <!-- 发布评论 -->
    <van-cell-group class="publish-wrap">
      <van-field clearable placeholder="请输入评论内容">
        <van-button slot="button" size="mini" type="info">发布</van-button>
      </van-field>
    </van-cell-group>
    <!-- /发布评论 -->
    <!-- 评论回复 -->
    <van-popup v-model="isReplyShow" position="bottom" style="height: 60%">
      评论回复
    </van-popup>
    <!-- /评论回复 -->
  </div>
</template>
<script>
import { ArticleComment } from '@/API/login.js'
export default {
  props: {
    ArticleList: {
      typeof: Object
    },
    // id
    articleId: {
      typeof: [Number, String, Object],
      require: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      offset: null,
      limit: 20,
      isReplyShow: false
    }
  },
  methods: {
    async onLoad () {
      // 1. 请求获取数据
      const { data } = await ArticleComment({
        type: 'a', // 评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
        source: this.articleId, // 源id，文章id或评论id
        offset: this.offset, // 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
        limit: 10 // 每页大小
      })
      // 将获取到的数据展开push进去
      this.list.push(...data.data.results)
      this.$emit('totalCount', data.data.total_count)
      // 获取数据完成后取消加载
      this.loading = false
      // 判断是否还有数据,如果有就更新下一页数据的页码
      if (data.data.results.length) {
        this.offset = data.data.last_id // 更新获取下一页数据的页码
      } else {
        this.finished = true // 没有数据了，关闭加载更多
      }
    },
    Like (val) {
      console.log(val)
    }
  },
  created () {
    this.onLoad()
    console.log(this.list)
  }
}
</script>

<style scoped lang="less">
.red {
  color: #c70000;
}
</style>
