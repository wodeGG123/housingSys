<template>
  <view-box>
  	<group>
  		<datetime  v-model="listQuery.acsStat.yearMonth"
       format="YYYY-MM-DD HH:mm"
       placeholder="请选择时间"
  		 :hour-list="['09', '10', '11', '12', '13', '14', '15', '16']"
  		 :minute-list="['00', '15', '30', '45']"
  		 @on-change="change"></datetime>
    </group>
    <div class="list-wrapper">
      <div class="title">
        <span>
          门禁列表
        </span>
      </div>
      <v-touch class="list-item" v-for="item of guardList" :key="item.id"
        v-on:tap="$router.push({ name: 'workerList', params: {
         projectId: projectId, equptID: item.equptID}})" v-if="guardList.length > 0">
        <div class="left-img">
          <img :src="userImg" alt="">
        </div>
        <div class="info">
          <p><b>{{item.equptBz}}</b></p>
          <p>进出人数： {{item.cnt}}人</p>
          <p>截至时间： {{item.recordDate}}</p>
        </div>
      </v-touch>
      <div class="no-list-item" v-if="guardList.length === 0">暂无相关数据!</div>
    </div>
  </view-box>
</template>
<script>
import userImg from '@/assets/image/project-img.jpg'
import { getEntranceList } from '@/api/migrantWorker'

export default {

  data () {
    return {
      projectId: this.$route.params.projectId,
      hourListValue: '2019-4-30 11:29:30',
      userImg,
      listQuery: {
        acsStat: {
          projectId: this.$route.params.projectId,
          yearMonth: ''
        }
      },
      guardList: []
    }
  },
  created () {
    this.getGuardList(this.listQuery)
  },
  mounted () {

  },
  methods: {
    getGuardList (listQuery) {
      console.log(listQuery)
      getEntranceList(listQuery).then(res => {
        const data = res.data
        console.log(data.data)
        this.guardList = data.data
      })
    },
    change () {}
  }
}

</script>
