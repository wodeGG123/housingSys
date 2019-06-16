<template>
  <div>
    <router-view></router-view>
    <tabbar class="tab-bar">
      <tabbar-item v-for="item of tabBarList" :key="item.id"
        :link="item.link" :selected="$route.path.indexOf(item.reg) > -1" >
         :badge="item.badge">
        <img slot="icon" :src="item.icon">
        <span slot="label">{{item.label}}</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
import img0 from '@/assets/image/userManange.png'
import img1 from '@/assets/image/confirmManange.png'
import img2 from '@/assets/image/empoleeManange.png'
import img3 from '@/assets/image/noticeManange.png'
import { Tabbar, TabbarItem } from 'vux'
export default {
  components: { Tabbar, TabbarItem },
  data () {
    return {
      tabBarList: [
        { id: 0, icon: img0, label: '用户管理', link: '/baseInfos/userManange', badge: '', reg: 'userManange' },
        { id: 1, icon: img1, label: '公司管理', link: '/baseInfos/confirmManange', badge: '', reg: 'confirmManange' },
        { id: 2, icon: img2, label: '员工管理', link: '/baseInfos/employeeManange', badge: '', reg: 'employeeManange' },
        { id: 3, icon: img3, label: '整改通知管理', link: '/baseInfos/noticeManange', badge: '2', reg: 'noticeManange' }
      ]
    }
  }
}
</script>

<style scoped>
.tab-bar{
  position: fixed;
  z-index: 1000
}
</style>