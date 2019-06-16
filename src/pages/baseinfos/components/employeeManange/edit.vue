<template>
  <addEditComponent :temp="temp" :type="'edit'" @getDetail="getDetails"/>
</template>

<script>
import { getEmployeeDetails } from '@/api/baseinfos/employee'
import addEditComponent from './components/addEditComponent'
export default {
  components: { addEditComponent },
  data () {
    return {
      temp: null,
      id: this.$route.params.id
    }
  },
  mounted () {
    this.getDetails()
    console.log(this.$route.params.id)
  },
  methods: {
    getDetails () {
      const obj = {
        id: this.id
      }
      console.log(obj)
      getEmployeeDetails(obj).then(res => {
        console.log(res)
        const data = res.data
        if (data.result) {
          this.$delete(data.data, 'unit')
          this.temp = data.data
        } else {
          this.$vux.alert.show({
            title: '员工详情获取失败'
          })
        }
      })
    }
  }
}
</script>