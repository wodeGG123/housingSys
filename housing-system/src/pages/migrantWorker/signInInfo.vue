<template>
    <div id="calendar" class="calendar-wrap">
        <FullCalendar
        locale='zh-cn'
        defaultView="dayGridMonth"
        :height="450"
        :contentHeight="450"
        :plugins="calendarPlugins"
        :events="events"
        @datesRender="datesRender"
        />
    </div>
</template>
<script>
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import '@fullcalendar/core/main.css'
import '@fullcalendar/daygrid/main.css'
import { getSignInInfo } from '@/api/migrantWorker'

var moment = require('moment')
export default {
  components: {FullCalendar},
  data () {
    return {
      calendarPlugins: [ dayGridPlugin ],
      events: [
      ]
    }
  },
  created () {
    console.log(this.$refs)
    // this.getSignInInfo()
  },
  methods: {
    addDate (date, days) {
      var d = new Date(date)
      d.setDate(d.getDate() + days)
      var m = d.getMonth() + 1
      return d.getFullYear() + '-' + m + '-' + d.getDate()
    },
    datesRender (obj) {
      let start = obj.view.activeStart
      let end = obj.view.activeEnd
      let events = []
      while (new Date(start) < new Date(end)) {
        let event = {
          id: (new Date()).getTime(),
          title: '缺勤',
          start: moment(start).format('YYYY-MM-DD'),
          classNames: 'bgred'
        }
        events.push(Object.assign({}, event, { classNames: 'bgred cross-line' }))
        events.push(event)
        start = this.addDate(start, 1)
      }
      this.events = events
      this.getSignInInfo()
    },
    getSignInInfo () {
      let workerId = +this.$route.params.workerid
      getSignInInfo({
        workerId
      }).then(res => {
        let events = this.events

        if (res.data.code === 0) {
          for (let i = 0; i < res.data.data.length; i++) {
            const element = res.data.data[i]
            for (let j = 0; j < events.length; j++) {
              const event = events[j]
              if (event.start === element.date1) {
                let cp = []
                if (element.start && element.end) {
                  cp.push({
                    id: (new Date()).getTime(),
                    title: '出勤',
                    start: element.date1,
                    classNames: 'bggreen cross-line'
                  })
                  cp.push({
                    id: (new Date()).getTime(),
                    title: '出勤',
                    start: element.date1,
                    classNames: 'bggreen'
                  })
                }
                if (element.start && !element.end) {
                  cp.push({
                    id: (new Date()).getTime(),
                    title: '出勤',
                    start: element.date1,
                    classNames: 'bggreen cross-line'
                  })
                  cp.push({
                    id: (new Date()).getTime(),
                    title: '缺勤',
                    start: element.date1,
                    classNames: 'bgred'
                  })
                }
                if (!element.start && element.end) {
                  cp.push({
                    id: (new Date()).getTime(),
                    title: '出勤',
                    start: element.date1,
                    classNames: 'bggreen cross-line'
                  })
                  cp.push({
                    id: (new Date()).getTime(),
                    title: '缺勤',
                    start: element.date1,
                    classNames: 'bgred'
                  })
                }
                events.splice(j, 2, ...cp)
                j = j + 2
              }
            }
          }
        }
        this.events = events
      })
    }
  }

}
</script>
<style lang="less">
.calendar-wrap{
    .fc-day-grid-container{
        height: 400px;
    }
    .bggreen{
        background-color: transparent;
        color: green;
        border: none;
    }

    .bgred{
        background-color: transparent;
        color: red;
        border: none;
    }
     .cross-line::after{
                content: '';
                display: block;
                height: 1px;
                width: 87%;
                background-color: #999;
                transform: rotate(-34deg) translateX(3px) translateY(3px);
            }
     tbody{
        tr:first-child{
            text-align: left;

        }
        tr:last-child{
            text-align: right;
        }
    }
}

</style>
