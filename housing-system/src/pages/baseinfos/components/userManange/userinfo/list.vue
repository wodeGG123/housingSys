<template>
	<view-box>
		<search v-model="searchValue" 
		 placeholder="请输入姓名" auto-scroll-to-top
		 position="relative" >
		</search>
		<userList/>
	</view-box>
</template>

<script>
import userList from './components/userList'
export default {
	components: { userList },
	data () {
		return {
			searchValue: ''
		}
	}
}
</script>