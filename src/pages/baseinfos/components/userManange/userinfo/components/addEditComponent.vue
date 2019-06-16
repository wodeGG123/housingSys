<template>
	<view-box>
		<group :title="tempStatus[type] + '用户信息'">
			<x-input title="姓名" placeholder="请填写姓名" 
			 v-model="temp.name"></x-input>
			<PopupRadio title="性别" :options="genderOptions"
			 v-model="temp.gender" placeholder="请选择性别"></PopupRadio>
			<Calendar title="出生日期" placeholder="出生日期" 
				 show-popup-header v-model="temp.birthday"></Calendar>
			<x-textarea title="详细地址" v-model="temp.address"></x-textarea>	 
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
  		genderOptions: ['男', '女']
  	}
  }
}
</script>
