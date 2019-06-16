<template>
  <view-box>
    <group :title="tempStatus[type] + '单位'">
      <PopupRadio title="类型" :options="unitTypeOptions" 
       v-model="temp.type" placeholder="请选择单位类型"></PopupRadio>
       <x-input title="单位名称" v-model="temp.name"></x-input>
       <x-input title="联系人" v-model="temp.principal"></x-input>
       <x-input title="联系电话" v-model="temp.phone"></x-input>   
    </group>
    <x-button class="add" type="primary" plain mini v-if="type === 'add'"
      @click.native="handleAdd">确认添加</x-button>
    <x-button class="add" type="primary" plain mini v-if="type === 'edit'"
      @click.native="handleEdit">确认修改</x-button>
  </view-box>
</template>

<script>
import { addUnit, updateUnit } from '@/api/baseinfos/unit'
export default {
  props: {
    temp: Object,
    type: String
  },
  data () {
    return {
      tempStatus: { 'add': '添加', 'edit': '修改' },
      unitTypeOptions: [
        { key: 0, value: '建设' },
        { key: 1, value: '施工' },
        { key: 2, value: '监理' },
        { key: 3, value: '勘察' },
        { key: 4, value: '设计' }
      ]
    }
  },
  methods: {
    // 添加
    handleAdd () {
      this.temp.createTime = new Date()
      const _this = this
      addUnit(this.temp).then(res => {
        const data = res.data
        if (data.result) {
          this.$vux.alert.show({
            title: '成功',
            content: '单位信息添加成功',
          })
          setTimeout(() => {
            _this.$vux.alert.hide()
            _this.$router.push('/baseinfos/confirmManange/list')
          }, 1000)
        }
      })
    },
    // 修改
    handleEdit () {
      const _this = this
      this.$vux.confirm.show({
        title: '提示',
        content: '是否确认修改信息？',
        onConfirm: () => {
          updateUnit(this.temp).then(res => {
            const data = res.data
            if (data.result) {
              this.$vux.alert.show({
                title: '成功',
                content: '单位信息修改成功',
              })
              _this.$emit('getDetail')
            } else {
              this.$vux.alert.show({
                title: '失败',
                content: '单位信息修改失败',
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
