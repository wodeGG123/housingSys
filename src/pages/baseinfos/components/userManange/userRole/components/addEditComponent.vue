<template>
	<view-box>
		<group :title="tempStatus[type] + '用户角色'">
			<x-input title="姓名" placeholder="请填写姓名" 
			 v-model="temp.name"></x-input>
			<PopupRadio title="权限" :options="roleCodeOptions"
			 v-model="temp.roleCode" placeholder="请选择用户权限"></PopupRadio>
			 <PopupRadio title="状态" :options="statusOptions"
			 v-model="temp.status" placeholder="请选择用户状态"></PopupRadio>
			<Calendar title="创建日期" placeholder="创建日期" 
				 show-popup-header v-model="temp.createTime"></Calendar>
			<x-textarea title="用户角色说明" v-model="temp.roleDesc"></x-textarea>	 
		</group>
		<x-button class="add" type="primary" plain mini>{{tempStatus[type]}}</x-button>
	</view-box>
</template>

<script>
export default {
	props: {
    temp: Object,
    type: String
	},
  data () {
  	return {
  		tempStatus: { 'add': '添加', 'edit': '修改' },
  		roleCodeOptions: ['管理员', '普通用户'],
  		statusOptions: ['启用', '禁用']
  	}
  }
}
</script>
