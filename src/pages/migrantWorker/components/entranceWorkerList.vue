<template>
  <view-box>
    <div class="list-wrapper">
      <div class="title">
        <span>
          进出人员详细
        </span>
      </div>
      <v-touch class="list-item" v-for="(item, index) of workerList" :key="index">
        <div class="left-img">
          <img :src="item.avator" alt="">
        </div>
        <div class="info">
          <p><svg-icon icon-class="name"/><b class="orange">姓 名：{{item.name}}</b></p>
          <p><svg-icon icon-class="date"/>进门时间：{{item.inTime}}</p>
          <p><svg-icon icon-class="date"/>出门时间：{{item.outTime}}</p>
        </div>
      </v-touch>
    </div>
  </view-box>
</template>
<script>
import img1 from '@/assets/image/worker.jpg'
import img2 from '@/assets/image/worker2.jpg'
import img3 from '@/assets/image/worker3.jpg'
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
      img1,
      img2,
      img3,
      workerList: [
        { id: 0, name: '刘伟', inTime: '08:00', outTime: '12:30', avator: img1  },
        { id: 1, name: '吴双', inTime: '08:01', outTime: '12:30', avator: img2  },
        { id: 2, name: '李健', inTime: '08:10', outTime: '12:30', avator: img3  },
      ]
    }
  },
  mounted() {
    // this.getNoticeList()
  },
  methods: {
    getNoticeList() {
      getNoticeList().then(res => {
        console.log(res)
        const data = res.data
        console.log(data)
        console.log(data)
        if (data.result) {
          this.noticeList = data.data
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
    }
  }
}

</script>

<style scoped>
	.left-img{
		width: 9rem;
	}
</style>
