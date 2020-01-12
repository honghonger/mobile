<template>
  <div class="login">
      <!-- 导航栏组件 -->
      <van-nav-bar title="登录"/>
      <!-- 表单 -->
      <van-cell-group>
        <van-field
            v-model="user.mobile"
            required
            label="手机号"
            placeholder="请输入手机号"
        />
        <van-field
            v-model="user.code"
            required
            label="验证码"
            placeholder="请输入验证码"
        />
      </van-cell-group>
      <!-- 登录 -->
      <div class="box">
          <van-button type="info" size="large" @click="onLogin">登录</van-button>
      </div>
  </div>
</template>

<script>
import { onLogin } from '@/api/user'
export default {
  name: 'LoginPage',
  components: {},
  props: {},
  data () {
    return {
      // 把数据放在user一个对象里
      user: {
        mobile: '13911111111',
        code: '246810'
      }
    }
  },
  computed: {},
  watch: {},
  created () {},
  methods: {
    // 给登录注册事件，使用async发请求
    async onLogin () {
      // 使用组件中登录提示
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: '登录中...',
        forbidClick: true
      })
      // 使用try，catch捕获异常
      try {
        // 封装了登录请求，直接调用
        const res = await onLogin(this.user)
        // request({
        //   method: 'POST',
        //   url: '/app/v1_0/authorizations',
        //   data: this.user
        // })
        console.log('登陆成功', res)
        this.$toast.success('登录成功')
      } catch (err) {
        console.log('登录失败', err)
        this.$toast.fail('登录失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
    .box{
        margin: 20px;
    }
</style>
