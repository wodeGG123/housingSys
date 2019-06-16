<template>
<ViewBox class="wrapper">
  <div v-transfer-dom>
    <!-- <Alert v-model="show" :title="登陆成功" @on-show="onShow" @on-hide="onHide"> {{ $t('Your Message is sent successfully~') }}</Alert> -->
  </div>
  <!-- <XHeader :left-options="{ showBack: title === '注册'? true: false }">{{title}}</XHeader> -->
  <Group class="login-group">
    <XInput title="用户名" v-model="form.username"/>
    <XInput title="密码" v-model="form.password" type="password"/>
    <slot/>
    <XButton class="blue-btn" :text="title" @click.native="handleLogin"/>
  </Group>
</ViewBox>
</template>

<script>
import { login } from '@/api/login'
export default {
  name: 'formBox',
  props: {
    form: Object,
    title: String
  },
  methods: {
    handleLogin () {
      console.log(this.form)
      login(this.form).then(res => {
        console.log(res)
        // const data = res.data
        // if (data.result) {
        //   this.$router.push('/')
        // } else {

        // }
      })
    }
  }
}
</script>

<style scoped>
.wrapper{
  height: 100vh;
  background: #dcdcdc
}
.login-group{
  width: 96%;
  margin: 15% auto;
}
.login-group  .vux-x-input, .weui-cell{
  width: 90%;
  margin: 0 auto;
}
.login-group  .vux-x-input:nth-last-of-type(1){
  width: 90%;
  border-bottom: 1px solid #eee;
}
.login-group .weui-btn{
  width: 90%;
  margin: 1rem auto
}
</style>
