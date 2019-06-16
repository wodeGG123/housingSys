<template>
	<view-box>
		<popup-radio placeholder="请选择搜索类型" :options="searchOptions" v-model="searchType"></popup-radio>
		<search v-model="searchValue":auto-fixed="false" ref="search"
     placeholder="请输入搜索信息" auto-scroll-to-top @on-submit="getList(listQuery)"
     position="relative" @on-clear="reset">
		</search>
		<unitList :listQuery="listQuery" ref="list"/>
	</view-box>
</template>

<script>
import unitList from './components/unitList'
export default {
	components: { unitList },
	data () {
		return {
			searchType: 'name',
			searchValue: '',
			searchOptions: [
        { key: 'name', value: '公司名' },
        { key: 'type', value: '公司类型' }
      ]
		}
	},
	computed: {
    listQuery: {
      get () {
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
    reset () {
      this.searchValue = ''
      this.listQuery = { searchType: this.searchType, searchValue: this.searchValue }
      this.getList(this.listQuery)
    },
    getList (listQuery) {
      this.$refs['list'].getUnitList(listQuery)
    }
  }
}
</script>