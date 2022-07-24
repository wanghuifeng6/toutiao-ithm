<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="登录" />
    <!-- /导航栏 -->

    <!-- 登录表单 -->
    <van-form @submit="onSubmit" ref="loginForm1">
      <!-- 在表单中，每个 Field 组件 代表一个表单项，使用 Field 的 rules 属性定义校验规则。 -->
      <van-field
        name="mobile"
        placeholder="请输入手机号"
        v-model="user.mobile"
        :rules="userFormRules.mobile"
        type="number"
        maxlength="11"
      >
        <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>
      <van-field
        type="number"
        name="code"
        placeholder="请输入验证码"
        v-model="user.code"
        :rules="userFormRules.code"
        maxlength="6"
      >
        <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
        <template #button>
          <!-- finish在倒计时结束之后会执行 -->
          <van-count-down
            :time="1000 * 5"
            v-if="Countdown"
            @finish="Countdown = false"
          />
          <van-button
            class="send-sms-btn"
            round
            size="small"
            type="default"
            @click.prevent="onSendSms"
            v-else
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button class="login-btn" block type="info" native-type="submit">
          登录
        </van-button>
      </div>
    </van-form>
    <!-- /登录表单 -->
  </div>
</template>
<script>
import { login, sendSms } from '@/API/login.js'
export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '', // 手机号
        code: ''
      },
      // 定义手机号和密码校验规则
      userFormRules: {
        mobile: [
          {
            // 是否为必选字段，当值为空字符串、空数组、undefined、null 时，校验不通过
            required: true,
            // 错误提示文案
            message: '手机号不能为空'
          },
          {
            // pattern通过正则表达式进行校验
            pattern: /^1[3|5|7|8]\d{9}$/,
            message: '手机号格式错误'
          }
        ],
        code: [
          {
            required: true,
            message: '验证码不能为空'
          },
          {
            pattern: /^\d{6}$/,
            message: '验证码格式错误'
          }
        ]
      },
      Countdown: false
    }
  },
  methods: {
    // 提交事件的请求
    async onSubmit () {
      // 1. 获取表单数据
      const user = this.user

      // 2. 表单验证
      this.$toast.loading({
        message: '登陆中.....',
        forbidClick: true, // 禁用背景点击
        duration: 0 // 持续时间,默认2000 ,0 标识持续展示不关闭
      })
      // 3. 提交表单请求登录(捕获错误:try,catch)
      try {
        const { data } = await login(user)
        this.$store.commit('setUser', data.data)
        this.$toast.success('登录成功')
        this.$router.back()
        // 登录成功,跳转回原来页面
      } catch (err) {
        // 如果错误信息为400,那么就输出手机号验证码错误
        if (err.response.status === 400) {
          this.$toast.fail('手机号或验证码错误')
        } else {
          this.$toast.fail('登录失败,请稍后重试')
        }
      }
    },
    // 发送验证码
    async onSendSms () {
      // 1.验证手机号(单独校验：validate)
      try {
        await this.$refs.loginForm1.validate('mobile')
      } catch (err) {
        return console.log('手机号验证失败')
      }
      // 验证通过,显示倒计时

      this.Countdown = true

      // 发起获取验证码请求
      try {
        await sendSms(this.user.mobile)
        this.$toast.success('发送验证码成功')
      } catch (err) {
        if (err.response.status === 429) {
          this.$toast.fail(err.response.data.message)
          console.log(err.response.data.message)
        } else {
          this.$toast.fail('未知错误')
        }
      }
    }
  }
}
</script>
<style scoped lang="less">
.login-container {
  .toutiao {
    font-size: 37px;
  }
  n-wrap {
    padding: 53px 33px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>
