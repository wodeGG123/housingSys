<template>
<ViewBox class="wrapper">
  <Group class="login-group">
    <XInput title="用户名" v-model="form.user"/>
    <XInput title="新密码" v-model="form.password"/>
    <XInput title="确认密码" v-model="form.rePassword"/>
    <slot/>
    <XButton text="确认" class="blue-btn" link="/"/>
  </Group>
</ViewBox>
</template>

<script>
export default {
  data () {
    return {
      form: {
        user: '',
        password: '',
        rePassword: ''
      }
    }
  }
}
</script>
