<template>
  <view-box>
    <div class="list-wrapper">
      <div class="title">
        <span>
          项目列表
        </span>
      </div>
      <v-touch class="list-item" v-for="(item, index) of projectList" :key="index" 
        v-on:tap="$router.push({ name: 'entranceList', params: { projectId: item.id } })">
        <div class="left-img">
          <img :src="userImg" alt="">
        </div>
        <div class="info">
          <p><svg-icon icon-class="project"/><b>{{item.name}}</b></p>
          <p><svg-icon icon-class="name"/>{{item.principal}}</p>
          <p><svg-icon icon-class="phone"/>{{item.phone}}</p>
        </div>
      </v-touch>
    </div>
  </view-box>
</template>
<script>
import userImg from '@/assets/image/project-img.jpg'
import { getProjectList } from '@/api/project/government'
export default {
  data() {
    return {
      // listQuery: {
      //   PageInfo: {
      //     iDisplayLength: 3,
      //     iDisplayStart: 1,
      //     sEcho: '',
      //     iColumns: '',
      //     iSortingCols: ''
      //   },
      //   Unit: {
      //     type: '',
      //     name: '',
      //     principal: '',
      //     phone: '',
      //     createTime: '',
      //     lastTime: ''
      //   }
      // },
      userImg,
      projectList: []
    }
  },
  mounted() {
    this.getProjectList()
  },
  methods: {
    getProjectList () {
      getProjectList().then(res => {
        const data = res.data
        console.log(data)
        console.log(data)
        if (data.result) {
          this.projectList = data.data
        } else {
          this.$vux.alert.show({
            title: '请求失败',
            content: '列表获取失败'
          })
        }
      }).catch(() => {
        this.$vux.alert.show({
          title: '请求失败',
          content: '列表获取失败'
        })
      })
    },
  }
}

</script>
