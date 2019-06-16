<template>
  <view-box>
    <popup-radio placeholder="请选择搜索类型" :options="searchOptions" v-model="searchType"></popup-radio>
    <search v-model="searchValue" :auto-fixed="false" ref="search" placeholder="请输入搜索信息" auto-scroll-to-top @on-submit="getList(listQuery)" position="relative" @on-clear="reset">
    </search>
    <employeeList ref="list" :listQuery="listQuery" />
  </view-box>
</template>
<script>
import employeeList from './components/employeeList'
export default {
  components: { employeeList },
  data() {
    return {
      searchType: 'name',
      searchValue: '',
      searchOptions: [
        { key: 'name', value: '姓名' },
        { key: 'type', value: '人员类型' },
        { key: 'phone', value: '电话' }
      ],
    }
  },
  computed: {
    listQuery: {
      get() {
        return {
          [this.searchType]: this.searchValue
        }
      },
      set(val) {
        this.searchType = val.searchType
        this.searchValue = val.searchValue
      }
    }
  },
  methods: {
    reset() {
      this.searchValue = ''
      this.listQuery = { searchType: this.searchType, searchValue: this.searchValue }
      this.getList(this.listQuery)
    },
    getList(listQuery) {
      this.$refs['list'].getEmployeeList(listQuery)
    }
  }
}

</script>
