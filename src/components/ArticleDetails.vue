<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" left-arrow title="黑马头条">
      <template #left>
        <i class="toutiao toutiao-zuojiantou"></i>
        <span @click="$router.back()">返回</span>
      </template>
    </van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="loading">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div class="article-detail" v-else-if="ArticleList.title">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ ArticleList.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="ArticleList.aut_photo"
          />
          <div slot="title" class="user-name">{{ ArticleList.aut_name }}</div>
          <div slot="label" class="publish-date">14小时前</div>
          <!-- 封装关注按钮 -->
          <FollowComponent :ArticleList="ArticleList"></FollowComponent>
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div
          class="article-content markdown-body"
          ref="article-content"
          v-html="ArticleList.content"
        ></div>
        <van-divider>正文结束</van-divider>
        <CommentList
          :ArticleList="ArticleList"
          :article-id="ArticleList.art_id"
          @totalCount="totalCount"
        ></CommentList>
      </div>
      <!-- /加载完成-文章详情 -->
      <!-- 加载失败：404 -->
      <div class="error-wrap" v-else-if="TheArticleDoesNotExist === 404">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-else>
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>
    <!-- 底部区域 -->
    <div class="article-bottom">
      <van-button class="comment-btn" type="default" round size="small" @click="show = true"
        >写评论</van-button
      >
      <van-icon name="comment-o" :badge="total" color="#777" />
      <!-- <van-icon color="#777" name="star-o" /> -->
      <Collect
        v-model="ArticleList.is_collected"
        :article-id="ArticleList.art_id"
      ></Collect>
      <!-- <van-icon color="#777" name="good-job-o" /> -->
      <Like
        v-model="ArticleList.attitude"
        :article-id="ArticleList.art_id"
      ></Like>
      <van-icon name="share" color="#777777"></van-icon>
    </div>
    <!-- /底部区域 -->
    <van-popup v-model="show" position="bottom" :style="{ height: '20%' }" closeable>
      <PopUpLayer :articleId="articleId" @PublishAComment="show=false"></PopUpLayer>
    </van-popup>

  </div>
</template>

<script>
import { ArticleInterface } from '@/API/login.js'
import { ImagePreview } from 'vant'
import FollowComponent from '@/components/FollowComponent.vue'
import Collect from '@/components/Collect.vue'
import Like from '@/components/Like.vue'
import CommentList from '@/components/CommentList.vue'
import PopUpLayer from '@/components/PopUpLayer.vue'
export default {
  name: 'ArticleIndex',
  components: { FollowComponent, Collect, Like, CommentList, PopUpLayer },
  props: {
    // 获取到对应新闻的的id
    articleId: {
      type: [Number, String],
      required: true
    }
  },
  data () {
    return {
      ArticleList: {},
      loading: true, // 判断是否加载
      TheArticleDoesNotExist: '',
      show: false,
      total: 0
    }
  },
  methods: {
    // 发起文章列表的请求
    async GetAnArticleListRequest () {
      try {
        const { data } = await ArticleInterface(this.articleId)
        this.ArticleList = data.data
        console.log(this.ArticleList)
        // 初始化点击图片预览
        setTimeout(() => {
          this.previewImage() // 调用图片预览的方法
        }, 0)
      } catch (err) {
        this.TheArticleDoesNotExist = err.response.status
      }
      this.loading = false
    },
    // 点击图片预览
    previewImage () {
      // 得到所有的img节点
      const articleContent = this.$refs['article-content']
      const imgs = articleContent.querySelectorAll('img')
      // 获取所有img地址
      const images = []
      imgs.forEach((img, index) => {
        // 把每一项的地址给push进新数组中
        images.push(img.src)
        // 给每个img注册点击事件,再处理函数中调用预览
        img.onclick = () => {
          ImagePreview({
            // 预览的图片地址数组
            images: images,
            // 索引
            startPosition: index
          })
        }
      })
    },
    totalCount (val) {
      this.total = val
    }
  },
  created () {
    this.GetAnArticleListRequest()
  }
}
</script>

<style scoped lang="less">
// 导入适配
@import "../styles/github-markdown.css";
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      font-size: 12px;
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
