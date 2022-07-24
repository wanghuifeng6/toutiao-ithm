<!-- eslint-disable no-constant-condition -->
<template>
  <div>
    <!-- 弹出层模块 -->
    <!-- 我的频道 -->
    <van-cell-group>
      <van-cell title="我的频道" value="内容" center>
        <van-button type="danger" size="mini" plain round @click="isshown">{{
          vtext
        }}</van-button>
      </van-cell>
    </van-cell-group>
    <!-- 宫格 -->
    <van-grid :gutter="10">
      <van-grid-item v-for="(item, index) in userlist" :key="item.id">
        <template #icon>
          <!-- 当isshow为true,并且index不等于0的时候 -->
          <i
            class="toutiao toutiao-guanbi"
            v-if="isshow && index !== 0"
            @click="DeleteChannel(item.id, index)"
          ></i>
        </template>
        <template #text>
          <p
            class="Channel"
            :class="{ red: index === active }"
            @click="ChannelJump(index)"
          >
            {{ item.name }}
          </p>
        </template>
      </van-grid-item>
    </van-grid>
    <!-- 频道推荐 -->
    <van-cell-group>
      <van-cell title="频道推荐"></van-cell>
    </van-cell-group>
    <!-- 宫格 -->
    <van-grid :gutter="10">
      <van-grid-item
        v-for="value in RecommendedChannel"
        :key="value.id"
        :text="value.name"
        icon="plus"
        class="recommend-grid"
        @click="onAddChannel(value)"
      >
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
// 按需引入(获取全部频道列表,添加用户频道,删除频道列表)
import {
  RecommendedChannelRecommendation,
  addUserchannel,
  deleteuserChannlId
} from '@/API/login.js'
import { mapState } from 'vuex'
export default {
  props: {
    userlist: {
      typeof: Array
    },
    active: {
      typeof: Number
    }
  },
  data () {
    return {
      AllChannelLists: [],
      isshow: false,
      vtext: '编辑'
    }
  },
  created () {
    this.RequestChannelList()
  },
  methods: {
    async RequestChannelList () {
      const { data } = await RecommendedChannelRecommendation()
      this.AllChannelLists = data.data.channels
    },
    async onAddChannel (val) {
      try {
        // eslint-disable-next-line vue/no-mutating-props
        this.userlist.push(val)
        // 添加到线上
        // 判断是否有token,如果有的话就添加到线上,如果没有就保存在本地
        if (this.user) {
          await addUserchannel({
            id: val.id, // 添加的id
            seq: this.userlist.length // 当前列表长度
          })
        } else {
          window.localStorage.setItem(
            'LocalList',
            JSON.stringify(this.userlist)
          )
        }
      } catch (err) {
        console.log(err)
      }
    },
    isshown () {
      this.isshow = !this.isshow
      this.isshow === true ? (this.vtext = '取消') : (this.vtext = '编辑')
    },
    async DeleteChannel (val, index) {
      try {
      // eslint-disable-next-line vue/no-mutating-props
        this.userlist.splice(index, 1)
        // 删除(传入当前点击的id)
        if (this.user) {
          const data = await deleteuserChannlId(val)
          console.log(data)
        } else {
          window.localStorage.setItem('LocalList', JSON.stringify(this.userlist))
        }
        console.log('删除成功', val)
      } catch (err) {
        console.log(err)
      }
    },
    // 点击切换
    ChannelJump (val) {
      if (this.isshow) {
        return
      }
      this.$emit('Switch', val)
    }
  },
  computed: {
    RecommendedChannel () {
      // eslint-disable-next-line array-callback-return
      return this.AllChannelLists.filter((item) => {
        // eslint-disable-next-line array-callback-return
        return !this.userlist.find((val) => {
          return item.id === val.id
        })
      })
    },
    ...mapState(['user'])
  }
}
</script>

<style scoped lang="less">
/deep/.recommend-grid {
  .van-grid-item__content {
    flex-direction: row;
    height: 1rem;
    .van-icon {
      font-size: 30px;
    }
    .van-grid-item__text {
      margin-top: 0;
      margin-left: 0.1rem;
    }
  }
}

/deep/.my-grid {
  .van-icon-close {
    font-size: 0.625rem;
    position: absolute;
    top: --0.125rem;
    right: --0.125rem;
    z-index: 999;
  }
  .van-grid-item__text {
    margin-top: 0;
  }
}
.red {
  color: red;
}
.Channel {
  font-size: 0.25rem;
}
.toutiao-guanbi {
  position: absolute;
  right: -90px;
  top: -10px;
  font-size: 0.375rem;
  background-color: rgb(255, 255, 255);
  border-radius: 50%;
  width: 35px;
  height: 35px;
  text-align: center;
  line-height: 35px;
  z-index: 9999;
  color: rgb(232, 232, 232);
  border: 1px solid rgb(160, 160, 160);
}
/deep/.van-grid-item__content--center {
  height: 0.5rem;
}
</style>
