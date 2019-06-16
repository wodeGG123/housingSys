<template>
  <view-box>
  	<div class="list-wrapper">
      <div class="title">
	      <span>用户权限列表</span>
	      <span class="add-icon" 
	        @click="$router.push('/baseinfos/userManange/userRole/add')">
	       	<svg-icon icon-class="add"></svg-icon>
	      </span>
      </div>
      <div class="list-item" v-for="(item, index) of userRoleList" 
        :key="index">
        <div class="info">
          <p>姓名： {{item.name}}</p>
          <p>角色：{{item.role}}
          	<span class="blue role-more">更多></span>
          	<svg-icon icon-class="edit" class="blue"></svg-icon>
          </p>
          <p>状态： {{item.status|statusFilter}}</p>
        </div>
        <div class="operate">
          <span @click="$router.push('/baseinfos/userManange/userRole/edit')">编辑</span>
          <span @click="handleDelete">删除</span>
        </div>
      </div>
    </div>
  </view-box>
</template>

<script>
export default {
	data () {
		return {
			userRoleList: [
        { name: '王明', role: 'admin', status: 1 },
        { name: '吴欢', role: 'admin', status: 1 },
        { name: '柳林', role: 'admin', status: 0 },
        { name: '周海', role: 'admin', status: 1 },
        { name: '李晓', role: 'admin', status: 0 }
      ]
		}
	},
	filters: {
    statusFilter(status) {
    	const obj = {
    		0: '禁用',
    		1: '启用'
    	}
    	return obj[status]
    }
	},
	methods: {
		handleDelete () {
      const _this = this
      this.$vux.confirm.show({
        title: '操作',
        content: '是否确认删除？',
        closeOnConfirm: false,
        onConfirm () {
          _this.$vux.loading.show({
            text: '删除中...'
          })
          setTimeout(() => {
            _this.$vux.loading.hide()
            _this.$nextTick(() => {
              _this.$vux.confirm.hide()
            })
          }, 300)
        }
      })
    }
	}
}
</script>

<style scoped>
.role-more{
  padding: 0 .5rem 0 .2rem;
  text-decoration: underline;
  font-size: .9em
}
</style>
