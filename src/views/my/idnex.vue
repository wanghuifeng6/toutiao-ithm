<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <!-- 使用编程式式导航来跳转路由 -->
    <!-- 未登录 -->
    <div class="box" @click="$router.push({ name: 'login' })" v-if="!user">
      <div>
        <img class="mybg" src="@/assets/banner.png" alt="" />
        <img class="mydl" src="@/assets/mobile.png" alt="" />
        <span class="myspan">登录 / 注册</span>
      </div>
    </div>
    <div v-else>
      <!-- 已登陆 -->
      <div class="box1" >
        <div class="box10">
          <van-image
            round
            class="box1img"
            :src="UserSOwnData.photo"
          />
          <span class="box1img_span1">{{UserSOwnData.name}}</span>
          <span class="box1img_span2">
            <button class="box1img_span2btn">编辑资料</button>
          </span>
        </div>
        <div class="data-stats">
          <div class="data-item">
            <span class="count">5</span>
            <span class="text">头条</span>
          </div>
          <div class="data-item">
            <span class="count">{{UserSOwnData.follow_count}}</span>
            <span class="text">关注</span>
          </div>
          <div class="data-item">
            <span class="count">5</span>
            <span class="text">粉丝</span>
          </div>
          <div class="data-item">
            <span class="count">5</span>
            <span class="text">获赞</span>
          </div>
        </div>
      </div>
      <!-- 已登陆 -->
      <!-- 宫格 -->
      <van-grid clickable :column-num="3">
        <van-grid-item icon="home-o" text="收藏" to="">
          <template #icon>
            <i class="toutiao toutiao-shoucang"></i>
          </template>
        </van-grid-item>
        <van-grid-item icon="search" text="历史" url="">
          <template #icon>
            <i class="toutiao toutiao-lishi"></i>
          </template>
        </van-grid-item>
        <van-grid-item icon="search" text="作品" url="">
          <template #icon>
            <i class="toutiao toutiao-zuopin"></i>
          </template>
        </van-grid-item>
      </van-grid>
      <!-- 宫格 -->
      <div>
        <div class="cell">
          <van-cell title="消息通知" is-link />
          <van-cell title="实名认证" is-link />
        </div>
        <div>
          <van-cell title="用户反馈" is-link />
          <van-cell title="小智同学" is-link />
          <van-cell title="系统设置" is-link />
        </div>
      </div>
      <van-button type="primary" block  class="SignOut" @click="SignOut">退出登录</van-button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getuserInfo } from '@/API/login.js'
export default {
  data () {
    return {
      UserSOwnData: []
    }
  },
  mounted () {
    this.RequestYourData()
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    // 退出登录的方法
    SignOut () {
      this.$dialog.confirm({
        title: '标题',
        message: '弹窗内容'
      })
        .then(() => {
          console.log(11)
          // 点击确认退出后清除掉Vuex里的数据
          this.$store.commit('setUser', null)
        })
        .catch(() => {
          console.log('取消退出登录')
        })
    },
    // 请求用户自己数据的方法
    async RequestYourData () {
      const { data } = await getuserInfo()
      console.log(data.data)
      this.UserSOwnData = data.data
    }
  }
}
</script>

<style scoped lang="less">
.mybg {
  width: 100%;
}
.mydl {
  position: absolute;
  width: 1.65rem;
  left: 50%;
  top: 1.5rem;
  transform: translateX(-50%);
}
.myspan {
  position: absolute;
  left: 50%;
  top: 3.55rem;
  transform: translateX(-50%);
  color: aliceblue;
  font-size: 30px;
}

.box1 {
  width: 100%;
  height: 4.6rem;
  background: url("@/assets/banner.png") no-repeat;
  background-size: cover;
}
.box10 {
  padding-top: 1.2rem;
  padding-left: 0.375rem;
  padding-bottom: 0.25rem;
  display: flex;
  // 文字和图片居中
  align-items: center;
  .box1img_span1 {
    font-size: 0.475rem;
    color: aliceblue;
    flex: 8;
  }
  .box1img_span2 {
    flex: 3;
    .box1img_span2btn {
      font-size: 12px;
      border-radius: 0.3rem;
      border: 1px solid rgb(185, 185, 185);
    }
  }
}
.box1img {
  width: 1.65rem;
  height: 1.65rem;
  border: 2px solid rgb(255, 255, 255);
  margin-right: 0.225rem;
}
.data-stats {
  display: flex;

  .data-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    text-align: center;
    .count {
      font-size: 30px;
    }
    .text {
      font-size: 30px;
    }
  }
}
.toutiao-shoucang {
  color: #f08082;
  font-size: 40px;
}
.toutiao-lishi {
  color: #ffb656;
  font-size: 40px;
}
.toutiao-zuopin {
  color: #89a7ff;
  font-size: 40px;
}
.cell {
  margin-top: 0.125rem;
  margin-bottom: 0.125rem;
}
.SignOut{
  background-color: rgb(255, 255, 255);
  border: none;
  margin-top: 10px;
  color: red;
}
</style>
