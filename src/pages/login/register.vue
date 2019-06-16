<template>
  <formBox :form="registerForm" :title="'注册'"/>
</template>

<script>
import formBox from './components/formBox'
export default {
  components: { formBox },
  data () {
    return {
      registerForm: {
        user: '',
        password: ''
      }
    }
  }
}
</script>
