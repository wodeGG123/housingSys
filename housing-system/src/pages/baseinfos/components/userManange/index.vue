<template>
	<view-box>
		<tab :line-width="1" active-color="#ffa736">
      <tab-item :selected="$route.path.indexOf('/baseinfos/userManange/userinfo') > -1" @on-item-click="$router.push('/baseinfos/userManange/userinfo')">用户管理</tab-item>
      <tab-item :selected="$route.path.indexOf('/baseinfos/userManange/userRole') > -1"  @on-item-click="$router.push('/baseinfos/userManange/userRole')">权限管理</tab-item>
      <tab-item :selected="$route.path.indexOf('/baseinfos/userManange/allRoles') > -1" @on-item-click="$router.push('/baseinfos/userManange/allRoles')">角色管理</tab-item>
    </tab>
		<router-view></router-view>
	</view-box>
</template>

<script>
export default {
	data () {
		return {
			activedTab: 0
		}
	}
}
</script>
