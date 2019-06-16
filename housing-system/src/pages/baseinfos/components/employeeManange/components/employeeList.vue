<template>
  <div>
    <div class="title">
       <span>员工列表</span>
       <span class="add-icon" 
         @click="$router.push('/baseinfos/employeeManange/add')">
         <svg-icon icon-class="add"></svg-icon>
       </span>
     </div>
    <scroll class="wrapper" :data="employeeList">
      <div>
        <div class="list-wrapper">
          <v-touch class="list-item"  v-if="employeeList.length > 0"
            :class="{'will-delete-item': showDeleteIndexArr.indexOf(index) > -1}"
            v-for="(item, index) of employeeList" :key="index"
            v-on:swipeleft="showDelete(index)" 
            v-on:swiperight="cancelDelete(index)" 
            v-on:tap="$router.push({ name: 'employeeManangeEdit', params: { id: item.id } })">
            <div class="info">
              <p class="circle"></p>
              <p class="orange"><svg-icon icon-class="name"/>{{item.name}}</p>
              <!-- <p><svg-icon icon-class="unitType"/>员工类型： {{item.type|employeeTypeFilter}}</p> -->
              <p class="blue"><svg-icon icon-class="phone"/>{{item.phone}}</p>
              <p><svg-icon icon-class="unitType"/>单位类型：{{item.unit.type|typeFilter}}</p>
              <p><svg-icon icon-class="belongUnit"/>{{item.unitId|unitFilter(unitList)}}</p>
            </div>
            <v-touch class="operate red" v-on:tap="handleDelete(item.id)"
              v-if="showDeleteIndexArr.indexOf(index) > -1">
              <svg-icon icon-class="delete"/>
            </v-touch>
          </v-touch>
          <div class="no-list-item" v-if="employeeList.length === 0">暂无相关数据！</div>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
import scroll from '@/components/scroll'
import { getAllUnitList } from '@/constant'
import { getEmployeeList, deleteEmployee } from '@/api/baseinfos/employee'
export default {
  props: {
    listQuery: Object
  },
  components: { scroll },
  data () {
    return {
      employeeList: [],
      unitList: [],
      showDeleteIndexArr: []
    }
  },
  mounted () {
    this.getUnitList()
    this.getEmployeeList(this.listQuery)
  },
  filters: {
    employeeTypeFilter (val) {
      const obj = {
        1: '项目负责人'
      }
      return obj[val]
    },
    unitFilter(val, unitList) {
      return unitList.filter(item => item.id === val)[0].name
    },
    typeFilter (val) {
      const obj = {
        0: '建设',
        1: '施工',
        2: '监理',
        3: '勘察',
        4: '设计'
      }
      return obj[val]
    }
  },
  methods: {
    getUnitList() {
      getAllUnitList().then(data => {
        this.unitList = data
      })
    },
    getEmployeeList (listQuery) {
      console.log(listQuery)
      getEmployeeList(listQuery).then(res => {
        console.log(res)
        const data = res.data
        if (data.result && data.data) {
          this.employeeList = data.data
        }
      })
    },
    showDelete (index) {
      this.showDeleteIndexArr.push(index)
    },
    cancelDelete (index) {
      this.showDeleteIndexArr = this.showDeleteIndexArr.filter(item => item !== index)
    },
    handleDelete (id) {
      const obj = {
        'ids[]': id
      } 
      const _this = this
      this.$vux.confirm.show({
        title: '操作',
        content: '是否确认删除？',
        closeOnConfirm: false,
        onConfirm () {
          deleteEmployee(obj).then(res => {
            console.log(res)
            const data = res.data
            if (data.result) {
              _this.$vux.confirm.hide()
              _this.$vux.alert.show({
                title: '删除成功'
              })
              _this.getEmployeeList()
              _this.showDeleteIndex = ''
            }
          })
        }
      })
    }
  }
}
</script>
