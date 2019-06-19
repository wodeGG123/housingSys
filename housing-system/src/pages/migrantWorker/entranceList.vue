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
    <div id="calendar" class="calendar-wrap">
        <FullCalendar locale='zh-cn' defaultView="dayGridMonth" :plugins="calendarPlugins" :events="events" />
    </div>
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
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import '@fullcalendar/core/main.css'
import '@fullcalendar/daygrid/main.css'
export default {
  components: {FullCalendar},
  data () {
    return {
      calendarPlugins: [ dayGridPlugin ],
      events: [
        {
          id: 'a',
          title: '出勤',
          start: '2019-06-01',
          classNames: 'bggreen'
        },
        {
          id: 'a',
          title: '缺勤',
          start: '2019-06-01',
          classNames: 'bgred'
        },
        {
          id: 'a',
          title: '出勤',
          start: '2019-06-04',
          classNames: 'bggreen'
        },
        {
          id: 'a',
          title: '缺勤',
          start: '2019-06-04',
          classNames: 'bgred'
        }

      ],
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
<style lang="less">
.bggreen{
    background-color: transparent;
    color: green;
    border: none;
}
.bggreen::after{
    content: '';
    display: block;
    height: 1px;
    width: 87%;
    background-color: #999;
    transform: rotate(-34deg) translateX(3px) translateY(3px);
}
.bgred{
     background-color: transparent;
    color: red;
     border: none;
     text-align: right;
}
</style>
