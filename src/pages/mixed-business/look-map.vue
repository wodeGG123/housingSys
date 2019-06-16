<template>  
  <div class="map">  
    <XHeader :right-options="{showMore: true}" @on-click-more="$router.push({ path: '/' })" v-if="!textShow">车辆位置</XHeader>
    <XHeader :right-options="{showMore: true}" @on-click-more="$router.push({ path: '/' })" v-if="textShow">所有车辆位置</XHeader>
    <!-- <input type="text"> -->
    <div id="ResultPanel" style="width:150pxheight:autodisplay:none"></div>
    <div id="l-map"></div> 
    <!--container end-->  
  </div>  
</template>
  
<script>
import BMap from 'BMap'
import BMapLib from 'BMapLib'
import request from '@/utils/request.js'
// import '@/utils/map.js'
// import companyTestData from '@/utils/mixedBusinessData.json'
export default {
  // props: ['address', 'mainlist', 'maxMinLngLat'],
  data () {
    return {
      cartData: [],
      textShow: false
    }
  },
  created () {
    // 组件创建完后获取数据，这里和1.0不一样，改成了这个样子
    // this.loadMap()
    // this.ready()// 如果在此处直接调用this.ready()方法，将无法加载地图
  },
  mounted () {
    let companyId = this.$route.query.company
    let cartId = this.$route.query.cart
    if (!cartId) {
      cartId = 0
      this.textShow = true
    }
    this.searchCartDetails(companyId, cartId)
  },
  methods: {
    searchCartDetails (companyId, cartId) {
      request.getCartRealTimeStatus({
        pageInfo: {
          iDisplayLength: 1000,
          iDisplayStart: 0,
          sEcho: 0,
          iColumns: 0,
          iSortingCols: ''
        },
        mixedCard: {
          id: cartId,
          mixedId: companyId,
          vehicleId: '',
          corpId: '',
          brandName: '',
          productName: '',
          licenseplate: '',
          bindDevice: 0
        }
      }).then(({data}) => {
        if (data.result && data.ext) {
          this.cartData = data.ext
          this.ready()
        }
      })
    },
    loadMap () {
      // var map = new BMap.Map('l-map')
      // var point = new BMap.Point(116.331398, 39.897445)
      // map.centerAndZoom(point, 12)
      // var geolocation = new BMap.Geolocation()
      // geolocation.getCurrentPosition(function (r) {
      //   if (this.getStatus() === 'BMAP_STATUS_SUCCESS') {
      //     var mk = new BMap.Marker(r.point)
      //     map.addOverlay(mk)
      //     map.panTo(r.point)
      //     alert('您的位置：' + r.point.lng + ',' + r.point.lat)
      //   } else {
      //     alert('failed' + this.getStatus())
      //   }
      // }, {enableHighAccuracy: true})
    },
    ready () {
      var map = new BMap.Map('l-map')
      map.enableScrollWheelZoom(true)// 缩放
      var markers = []
      this.cartData.forEach(item => {
        // 点
        let position = item.mixedCardStatus
        var point = new BMap.Point(position.longitude, position.latitude)
        map.centerAndZoom(point, 12)
        var myIcon = new BMap.Icon('/static/icon-blue-cart.png', new BMap.Size(38, 38))
        var marker = new BMap.Marker(point, {icon: myIcon}) // 创建标注
        console.log(position.direction)
        var label = new BMap.Label(item.licenseplate, {offset: new BMap.Size(20, -20)})
        marker.setLabel(label)
        marker.setRotation(parseInt(position.direction))
        markers.push(marker)
        map.addOverlay(marker)
        // 信息窗口
        marker.addEventListener('click', function (e) {
          var p = e.target
          var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat)
          map.setCenter(point) // 设置中心点
          map.setZoom(18)
          var infoWindow = new BMap.InfoWindow('时速：' + position.speed + 'km/h', {
            width: 80, // 信息窗口宽度
            height: 60, // 信息窗口高度
            title: '车牌号：' + item.licenseplate, // 信息窗口标题
            enableMessage: false // 设置允许信息窗发送短息
          }) // 创建信息窗口对象
          map.openInfoWindow(infoWindow, point) // 开启信息窗口
        })
      })
      var markerClusterer = new BMapLib.MarkerClusterer(map, {markers: markers})
      markerClusterer.setMinClusterSize(3)
      addLabel(markers)
      var mapLabel = []
      function addLabel (dataList) {
        map.addEventListener('zoomend', function () {
          console.log(2222222222222222222222)
          managerLabel(dataList)
        })
        map.addEventListener('dragend', function () {
          managerLabel(dataList)
        })
      }
      function managerLabel (dataList) {
        console.log(dataList)
        for (var k in mapLabel) {
          map.removeOverlay(mapLabel[k])
        }
        var allOverlay = map.getOverlays()
        var inView = 0
        for (var i in allOverlay) {
          if (allOverlay[i].toString() === '[object Marker]') {
            // Find Worksite
            for (var j in dataList.sitesList) {
              if ((allOverlay[i].getPosition().lat === dataList[j]['latitude']) &&
                (allOverlay[i].getPosition().lng === dataList[j]['longitude'])) {
                var point = new BMap.Point(dataList[j]['longitude'], dataList[j]['latitude'])
                var opts = {
                  position: point, // 指定文本标注所在的地理位置
                  offset: new BMap.Size(20, -20) // 设置文本偏移量
                }
                var label = new BMap.Label(dataList[j].site_number, opts) // 创建文本标注对象
                label.setStyle({
                  border: 'none',
                  background: 'none',
                  color: 'black',
                  fontSize: '20px',
                  height: '20px',
                  lineHeight: '20px',
                  fontFamily: '微软雅黑'
                })
                mapLabel[inView] = label
                inView++
                map.addOverlay(label)
              }
            }
          }
        }
      }
      // var markerClusterer = new BMapLib.MarkerClusterer(map, {markers: markers})
      // markerClusterer.setMinClusterSize(3)
      markers.forEach(item => {
        // var myIcon = new BMap.Icon('/static/icon-blue-cart.png', new BMap.Size(38, 38))
        // var marker = new BMap.Marker(item.point, {icon: myIcon}) // 创建标注
        // console.log(item.getLabel().content)
        // let lable = item.getLabel().content
        // item.setLabel(lable)
        // map.addOverlay(item.position)
        // map.setCenter(item.point) // 设置中心点
        // map.setZoom(25)
      })
      // function addClickHandler (content, item) {
      //   item.addEventListener('click', function () {
      //     openInfo(content)
      //   })
      // }
    }
  }
}
</script>
  
<style>
  /* 去掉地图左下角的百度LOGO */
  .anchorBL {
    display:none
  }
  .map{
    /* margin-top: 3rem; */
    height: 100%;
  }
  .map input{
    border: solid #ccc 1px;
    width: 40%;
    height: 40px;
    padding: 0 2%;
  }
  .map #l-map{
    width: 100%;
    height: 100%;
  }
  .map #ResultPanel{
    z-index: 2003;
  }
  #tangram-suggestion--TANGRAM__1c-main{
    z-index: 2003;
  }
  .map #r-result>div{
    margin-bottom: 20px;
  }
  .map .address{
    display: inline-block;
    width: 40%;
    height: 40px;
    line-height: 40px;
    border: solid #ccc 1px;
  }
</style>