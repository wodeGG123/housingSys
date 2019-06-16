<template>
  <div class="amap-page-container">
    <el-amap 
      defaultCursor="pointer"
      vid="amap"  
      :zoom="zoom"   
      class="amap-demo" 
      :center="center"
      :plugin="plugin"
    >
    <el-amap-marker v-for="(item, index) of markers" :key="index"
     vid="amap-mark" :position="item.position"
      :label="item.label" :events="item.events">
    </el-amap-marker>
    <el-amap-text v-for="(text, index) of markers"
      vid="amap-text" :text="text.text" :offset="text.offset"
      :position="text.position" :events="text.events" >
    </el-amap-text>
    <el-amap-info-window v-for="(currentWindow, index) of markers"  :position="currentWindow.position" vid="amap-info"
    :content="currentWindow.infoContent" :visible="currentWindow.visible">
     </el-amap-info-window>
      </el-amap>
    </el-amap>
</div>
</template>

<script>
import VueAMap from 'vue-amap'
import { getCarStausList } from '@/api/business'
export default {
	data () {
    let self = this
    return {
    	companyId: this.$route.params.companyId,
    	id: this.$route.params.id,
      zoom: 16,
      center: [106.83819241719999, 28.113729600000003],
      markers: [],
      positions: [],
      labels: [],
      label:{
        content:'钦汇园',
        offset:[10,12]
      },
      plugin: [   //一些工具插件
        {
          pName: 'Geolocation',   //定位
          events: {
            // init(o) {
            //   // o 是高德地图定位插件实例
            //   o.getCurrentPosition((status, result) => {
            //     if (result && result.position) {
            //       self.lng = result.position.lng;             //设置经度
            //       self.lat = result.position.lat;             //设置维度
            //       self.center = [self.lng, self.lat];         //设置坐标
            //       self.loaded = true;                         //load
            //       self.$nextTick();                           //页面渲染好后
            //     }
            //   })
            // }
          }
        },
        {
          pName: 'ToolBar',  //工具栏
          events: {
            init(instance) {
              // console.log(instance);
            }
          }
        },
        {
          pName: 'OverView',  //鹰眼
          events: {
            init(instance) {
              // console.log(instance);
            }
          }
        },
        {
          pName: 'MapType',  //地图类型
          defaultType: 0,
          events: {
            init(instance) {
              // console.log(instance);
            }
          }
        }
      ]
    }
	},
  mounted () {
    this.getCarStausList()
  },
  methods: {
  	getCarStausList () {
      let obj = {}
      if (this.id !== '') {
        obj = {
          mixedId: this.companyId,
          id: this.id,
        }
      } else {
        obj = {
          mixedId: this.companyId,
        }
      }
      getCarStausList(obj).then(res => {
        const data = res.data.data
        console.log(data)
        data.forEach(item => {
          const center = []
          let label
          let speed
          center[0] = item.mixedCardStatus.longitude
          center[1] = item.mixedCardStatus.latitude
          label = {
            content: item.licenseplate,
            offset: [10, 12]
          }
          speed = item.mixedCardStatus.speed
          this.setMarkers(center, label, speed)
        })
      })
    },
    setMarkers(position, label, speed, id) {
      this.center = position
      this.markers.push({
        position: position,
        label: label,
        // icon: '../../../assets/image/worker.jpg',
        offset: [9, 14],
        speed: speed,
        visible: false
      })
      this.markers.forEach(item => {
        this.$set(item, 'events', {
          click: () => {
            item.visible = true
            item.infoContent = `<div">
              <p>车辆总数： ` + this.markers.length + `辆</p>
              <h4>行车速度： <span style="color: red">`+ item.speed + `km/h</span></h4>
            </div>`
          }
        })
      })
    }
  }
}
</script>
<style>
  .amap-page-container{
    width: 100%;
    height: 100vh;
  }
</style>