<template>
  <view-box class="wrapper">
    <group class="title" title="基本信息">
      <x-input title="项目名称" placeholder="请输入项目名称" text-align="right" v-model="temp.name" v-if="temp.name !== null"></x-input>
      <PopupRadio title="项目类型" placeholder="请输入项目类型" :options="projectTypeOptions" v-model="temp.type"></PopupRadio>
      <x-input title="项目地址" placeholder="请输入项目地址" text-align="right" v-model="temp.address"></x-input>
      <x-input title="负责人" placeholder="请输入负责人" text-align="right" v-model="temp.principal"></x-input>
      <x-input title="负责人电话" placeholder="请输入负责人电话" text-align="right" v-model="temp.phone"></x-input>
      <x-input title="办公室电话" placeholder="请输入办公室电话" text-align="right" v-model="temp.landline"></x-input>
    </group>
    <group title="建设单位">
      <selector title="单位名称" placeholder="请输入单位名称" :options="jiansheOptions.unit"
        :value-map=" ['value', 'label']" direction="rtl"
        @on-change="val => selectUnit('jiansheUnit', val)"
        :value="temp.jiansheUnit.id"></selector>
      <selector title="负责人" placeholder="请输入负责人" direction="rtl" :options="jiansheOptions.employee"
        :value-map=" ['value', 'label']"
        @on-change="val => selectUnit('jiansheManager', val)"
        :value="temp.jiansheManager">
      </selector>
    </group>
    <group title="施工单位">
      <selector title="单位名称" placeholder="请输入单位名称" direction="rtl" :options="shigongOptions.unit"
        :value-map=" ['value', 'label']"
        @on-change="val => selectUnit('shigongUnit', val)"
        :value="temp.shigongUnit.id">
      </selector>
      <selector title="负责人" placeholder="请输入负责人" direction="rtl" :options="shigongOptions.employee"
        :value-map=" ['value', 'label']"
        @on-change="val => selectUnit('shigongManager', val)"
        :value="temp.shigongManager">
      </selector>
    </group>
    <group title="监理单位" >
      <selector title="单位名称称" placeholder="请输入单位名称" direction="rtl" :options="jianliOptions.unit"
        :value-map=" ['value', 'label']"
        @on-change="val => selectUnit('jianliUnit', val)"
        :value="temp.jianliUnit.id"></selector>
      <selector title="负责人" placeholder="请输入负责人" direction="rtl" :options="jianliOptions.employee"
        :value-map=" ['value', 'label']"
        @on-change="val => selectUnit('jianliManager', val)"
        :value="temp.jianliManager"></selector>
    </group>
    <group title="勘察单位">
      <selector title="单位名称" placeholder="请输入单位名称" direction="rtl" :options="kanchaOptions.unit"
        :value-map=" ['value', 'label']"
        @on-change="val => selectUnit('kanchaUnit', val)"
        :value="temp.kanchaUnit.id">
      </selector>
      <selector title="负责人" placeholder="请输入负责人" direction="rtl" :options="kanchaOptions.employee"
        :value-map=" ['value', 'label']"
        @on-change="val => selectUnit('kanchaManager', val)"
        :value="temp.kanchaManager">
      </selector>
    </group>
    <group title="设计单位">
      <selector title="设计单位" placeholder="请输入单位名称" direction="rtl" :options="shejiOptions.unit"
        :value-map=" ['value', 'label']"
        @on-change="val => selectUnit('shejiUnit', val)"
        :value="temp.shejiUnit.id">
      </selector>
      <selector title="负责人" placeholder="请输入负责人" direction="rtl" :options="shejiOptions.employee"
       :value-map=" ['value', 'label']"
       @on-change="val => selectUnit('shejiManager', val)"
       :value="temp.shejiManager">
     </selector>
    </group>
    <div class="bt-wrap">

    <x-button class="add" type="primary" plain mini
      v-if="type === 'add'" @click.native="handleAdd">确认添加
    </x-button>
    <x-button class="add" type="primary" plain mini
      v-if="type === 'edit'" @click.native="handleEdit">确认修改
    </x-button>
    </div>
  </view-box>
</template>

<script>
import { getEmployeeList } from '@/api/baseinfos/employee'
import { getUnitList } from '@/api/baseinfos/unit'
import { addProject, updateProject } from '@/api/project/government'
export default {
  props: {
    temp: Object,
    type: String
  },
  data () {
    return {
      tempType: ['value', 'label'],
      unitList: [],
      employeeList: [],
      jiansheOptions: {
        unit: [],
        employee: []
      },
      shigongOptions: {
        unit: [],
        employee: []
      },
      jianliOptions: {
        unit: [],
        employee: []
      },
      kanchaOptions: {
        unit: [],
        employee: []
      },
      shejiOptions: {
        unit: [],
        employee: []
      },
      projectTypeOptions: [
        { key: 0, value: '其他' },
        { key: 1, value: '棚改'},
        { key: 2, value: '公租房'}
      ]
    }
  },
  mounted () {
    this.getUnitOptions()
    this.getEmloyeeOptions()
  },
  filters: {
    unitFilter (val, unitList) {
      const arr = unitList.filter(item => item.id === val)
      if (arr !== [] && arr !== null) {
        return arr[0].name
      } else {
        return ''
      }
    },
    ManagerFilter (val, employeeList) {
      const arr = employeeList.filter(item => item.id === val)
      if (arr !== [] && arr !== null) {
        return arr[0].name
      } else {
        return ''
      }
    }
  },
  methods: {
    selectUnit (key, val) {
      if (key.indexOf('Unit') > -1) {
        this.temp[key] = {
          id: val
        }
      } else {
        this.temp[key] = val
      }
    },
    // 获取可选择的单位列表
    getUnitOptions () {
      getUnitList().then(res => {
        const data = res.data
        if (data.result) {
          const unitList = data.data
          this.unitList = data.data
          const arr = ['jiansheOptions', 'shigongOptions', 'jianliOptions', 'kanchaOptions', 'shejiOptions']
          unitList.forEach(item => {
            this[arr[item.type]].unit.push({
              value: item.id,
              label: item.name
            })
          })
        }
      })
    },
    // 获取可选择的人员列表
    getEmloyeeOptions () {
      getEmployeeList().then(res => {
        const data = res.data
        if (data.result) {
          const employeeList = data.data
          this.employeeList = employeeList
          const arr = ['jiansheOptions', 'shigongOptions', 'jianliOptions', 'kanchaOptions', 'shejiOptions']
          employeeList.forEach(item => {
            this[arr[item.unit.type]].employee.push({
              value: item.id,
              label: item.name
            })
          })
        }
      })
    },
    saveProcess () {
      for (const key in this.temp) {
        if (key.indexOf('Unit') > -1) {
          if (this.temp[key] === '') {
            this.temp[key] = {
              id: ''
            }
          }
        }
      }
    },
    handleAdd () {
      this.saveProcess()
      addProject(this.temp).then(res => {
        const data = res.data
        if (data.result) {
          this.$vux.alert.show({
            title: '成功',
            content: '项目信息添加成功'
          })
          setTimeout(() => {
            this.$vux.alert.hide()
            this.$router.push('/government/list')
          }, 1000).bind(this)
        }
      })
    },
    handleEdit () {
      this.saveProcess()
      const _this = this
      this.$vux.confirm.show({
        title: '提示',
        content: '是否确认修改信息？',
        onConfirm: () => {
          updateProject(this.temp).then(res => {
            console.log(res)
            const data = res.data
            if (data.result) {
              this.$vux.alert.show({
                title: '成功',
                content: '项目信息修改成功'
              })
              _this.$emit('getDetail')
            } else {
              this.$vux.alert.show({
                title: '失败',
                content: '项目信息修改失败'
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

<style ang="less" scoped>
.wrapper{
  background: #f5f5f5;
}
  .wrapper /deep/ .weui-cells__title {
    color: #999;
    font-weight: bold;
    background: #f5f5f5;
    line-height: 40px;
    padding: 0 10px;
    margin: 0;
  }
  .wrapper /deep/ .weui-cells::before {
    display: none;
  }
  .wrapper /deep/ .weui-cells .weui-cell::before{
    left: 0;
  }
  .add{
    width:calc(100% - 20px)!important;
    height:50px;
    background:linear-gradient(90deg,rgba(62,180,250,1),rgba(59,13,217,1));
    border-radius:5px;
    color: #fff;
  }
  .bt-wrap{
    padding-top: 15px;
  }
</style>
