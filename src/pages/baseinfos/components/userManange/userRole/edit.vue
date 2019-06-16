<template>
  <addEditComponent :temp="temp" :type="'edit'"/>
</template>

<script>
import addEditComponent from './components/addEditComponent'
export default {
  components: { addEditComponent },
  data () {
    return {
      temp: {
        name: '刘娜',
        roleCode: '管理员',
        status: '启用',
        rank: '',
        createTime: '2019-01-13',
        roleDesc: '拥有系统最高权限，能使用系统所有功能'
      }
    }
  }
}
</script>