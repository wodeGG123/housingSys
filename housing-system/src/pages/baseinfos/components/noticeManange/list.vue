<template>
	<view-box>
		<popup-radio placeholder="请选择搜索类型" :options="searchOptions" v-model="searchType"></popup-radio>
		<search v-model="searchValue"  :auto-fixed="false"
		 placeholder="请输入搜索信息" auto-scroll-to-top @on-submit="getList"
		 position="relative" >
		</search>
		<noticeList ref="list" :listQuery="listQuery"/>
	</view-box>
</template>

<script>
import noticeList from './components/noticeList'
export default {
	components: { noticeList },
	data () {
		return {
			searchType: '',
			searchValue: '',
			searchOptions: [
			  { key: 'name', value: '姓名' },
			  { key: 'type', value: '人员类型' },
			  { key: 'phone', value: '电话' }
			],
			listQuery: {
        pageInfo: {
          iDisplayLength: 3,
          iDisplayStart: 0,
          sEcho: '',
          iColumns: '',
          iSortingCols: ''
        }
        // manager: {
        //   id: '',
        //   name: '建设单位人员2',
        //   phone: '',
        //   type: '',
        //   unitId: '',
        //   createTime: '',
        //   lastTime: ''
        // }
      }
		}
	},
	watch: {
    searchType: {
    	handler (val, old) {
    		if (val !== old) {
    			this.listQuery.manager[searchType] = this.searchValue
    		}
    	},
    	deep: true
    }
	},
	methods: {
		getList () {
			this.$refs['list'].getnoticeList()
		}
	}
}
</script>