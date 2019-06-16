<template>
	<view-box class="wrapper">
		<search v-model="searchValue" 
		 placeholder="请输入姓名" auto-scroll-to-top
		 position="relative" >
		</search>
		<userIncludeRoleList/>
	</view-box>
</template>

<script>
import userIncludeRoleList from './components/userIncludeRoleList'
export default {
	components: { userIncludeRoleList },
	data () {
		return {
			searchValue: ''
		}
	}
}
</script>

<style scoped>
	.wrapper{
		text-align: center;
		padding: 2rem 0;
	}
</style>