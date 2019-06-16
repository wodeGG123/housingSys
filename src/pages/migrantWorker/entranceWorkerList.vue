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
          <p><svg-icon icon-class="name"/><b class="orange">姓 名：{{item.workerName}}</b></p>
          <p><svg-icon icon-class="unit"/>所在部门：{{item.deptName}}</p>
          <p><svg-icon icon-class="date"/>进门时间：{{item.recordTime}}</p>
          <p><svg-icon icon-class="date"/>出门时间：{{item.syncTime}}</p>
        </div>
      </v-touch>
    </div>
  </view-box>
</template>
<script>
import { getWorkerList } from '@/api/migrantWorker'
export default {
  data() {
    return {
      listQuery: {
        PageInfo: {
          iDisplayLength: 3,
          iDisplayStart: 1,
          sEcho: '',
          iColumns: '',
          iSortingCols: ''
        },
        acsWorker: {
          projectId: this.$route.params.projectId,
          equptID: this.$route.params.equptID
        }
      },
      workerList: []
    }
  },
  mounted() {
    this.getWorkerList(this.listQuery)
  },
  methods: {
    getWorkerList(listQuery) {
      this.$store.commit('updateLoadingStatus', true)
      console.log(listQuery)
      getWorkerList(listQuery).then(res => {
        const data = res.data
        this.workerList = data.data.slice(0, 8)
        this.$store.commit('updateLoadingStatus', false)
      })
    },
    filterList(list) {
      this.workerList = list.filter(item => {
        return item.projectId === this.$route.params.projectId && item.equptID === this.$route.params.equptID
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
