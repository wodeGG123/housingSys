<template>
  <view-box>
    <group :title="tempStatus[type] + '员工信息'">
      <x-input title="姓名" placeholder="请填写姓名" 
       v-model="temp.name"></x-input>
       <PopupRadio title="单位" :options="unitOptions"
       v-model="temp.unitId" placeholder="请选择所在单位"></PopupRadio>
       <x-input title="联系电话"  v-model="temp.phone"></x-input> 
    </group>
    <x-button class="add" type="primary" plain mini
      @click.native="handleAdd" v-if="type === 'add'">确认添加</x-button>
    <x-button class="add" type="primary" plain mini
      @click.native="handleEdit" v-if="type === 'edit'">确认修改</x-button>
  </view-box>
</template>

<script>
import { getAllUnitList } from '@/constant'
import { addEmployee, updateEmployee } from '@/api/baseinfos/employee'
export default {
  props: {
    temp: Object,
    type: String
  },
  data () {
    return {
      unitList: [],
      tempStatus: { 'add': '添加', 'edit': '修改' }
    }
  },
  mounted () {
    this.getUnitList()
  },
  computed: {
    unitOptions () {
      const unitOptions = []
      this.unitList.forEach(item => {
        unitOptions.push({ key: item.id, value: item.name })
      })
      console.log(unitOptions)
      return unitOptions
    }
  },
  methods: {
    getUnitList() {
      getAllUnitList().then(data => {
        this.unitList = data
      })
    },
    handleAdd () {
      addEmployee(this.temp).then(res => {
        console.log(res)
        const _this = this
        const data = res.data
        if (data.result) {
          this.$vux.alert.show({
            title: '成功',
            content: '单位信息添加成功',
          })
          setTimeout(() => {
            _this.$vux.alert.hide()
            _this.$router.push('/baseinfos/employeeManange/list')
          }, 1000)
        }
      })
    },
    handleEdit () {
      console.log(this.temp)
      const _this = this
      this.$vux.confirm.show({
        title: '提示',
        content: '是否确认修改信息？',
        onConfirm: () => {
          updateEmployee(this.temp).then(res => {
            console.log(res)
            const data = res.data
            if (data.result) {
              this.$vux.alert.show({
                title: '成功',
                content: '员工信息修改成功',
              })
              _this.$emit('getDetail')
            } else {
              this.$vux.alert.show({
                title: '失败',
                content: '员工信息修改失败',
              })
              setTimeout(() => {
                _this.$vux.alert.hide()
              }, 1000)
            }
          })
        }
      })
    }
  }
}
</script>
