<template>
  <div class="map">
    <XHeader :right-options="{showMore: true}" @on-click-more="$router.push({ path: '/' })">所有车辆位置</XHeader>
    <!-- <input type="text"> -->
    <div id="ResultPanel" style="width:150pxheight:autodisplay:none"></div>
    <div id="l-map"></div>
    <!--container end-->
  </div>
</template>

<script>
import BMap from 'BMap'
import { getCartRealTimeStatus} from '@/api/business'
// import request from '@/utils/request.js'
// import companyTestData from '@/utils/mixedBusinessData.json'
export default {
  // props: ['address', 'mainlist', 'maxMinLngLat'],
  data: () => ({
    cartData: [
      [106.985257, 28.553709, '川A·N24098'],
      [106.368948, 28.293472, '川A·N24098'],
      [106.900062, 27.947902, '川A·N24098'],
      [106.841996, 28.098796, '川A·N24098']
    ]
  }),
  created () {},
  mounted () {
    this.searchCartDetails()
    // this.ready()
  },
  methods: {
    searchCartDetails (companyId, cartId) {
      getCartRealTimeStatus({
        pageInfo: {
          iDisplayLength: 10,
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
          let position = data.ext[0].mixedCardStatus
          this.address = [position.latitude, position.longitude]
          this.lat = position.latitude
          this.lng = position.longitude
          this.ready()
          // console.log(position)
          // var map = new BMap.Map('l-map')
          // var point = new BMap.Point(position.latitude, position.longitude)
          // map.centerAndZoom(point, 8)
          // map.enableScrollWheelZoom(true)// 缩放
          // var marker = new BMap.Marker(point) // 创建标注
          // map.addOverlay(marker) // 将标注添加到地图中
          var map = new BMap.Map('l-map')
          var point = new BMap.Point(106.985257, 28.553709)
          map.centerAndZoom(point, 12)
          map.enableScrollWheelZoom(true)// 缩放
          data.ext.forEach((item, index) => {
            // 点
            var point = new BMap.Point(item[0], item[1])
            var myIcon = new BMap.Icon('/static/icon-cart3.png', new BMap.Size(50, 37))
            var marker = new BMap.Marker(point, {icon: myIcon}) // 创建标注
            map.addOverlay(marker) // 将标注添加到地图中
            // var marker = new BMap.Marker(point)
            // map.addOverlay(marker)
            // 信息窗口
            marker.addEventListener('click', function (e) {
              var p = e.target
              var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat)
              var infoWindow = new BMap.InfoWindow(item[2], {
                width: 80, // 信息窗口宽度
                height: 60, // 信息窗口高度
                title: '车牌号：', // 信息窗口标题
                enableMessage: true // 设置允许信息窗发送短息
              }) // 创建信息窗口对象
              map.openInfoWindow(infoWindow, point) // 开启信息窗口
            })
          })
        }
      })
    },
    ready: function () {
      var map = new BMap.Map('l-map')
      var point = new BMap.Point(106.985257, 28.553709)
      map.centerAndZoom(point, 12)
      map.enableScrollWheelZoom(true)// 缩放
      this.cartData.forEach(item => {
        // 点
        var point = new BMap.Point(item[0], item[1])
        var myIcon = new BMap.Icon('/static/icon-cart3.png', new BMap.Size(50, 37))
        var marker = new BMap.Marker(point, {icon: myIcon}) // 创建标注
        map.addOverlay(marker) // 将标注添加到地图中
        // var marker = new BMap.Marker(point)
        // map.addOverlay(marker)
        // 信息窗口
        marker.addEventListener('click', function (e) {
          var p = e.target
          var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat)
          var infoWindow = new BMap.InfoWindow(item[2], {
            width: 80, // 信息窗口宽度
            height: 60, // 信息窗口高度
            title: '车牌号：', // 信息窗口标题
            enableMessage: true // 设置允许信息窗发送短息
          }) // 创建信息窗口对象
          map.openInfoWindow(infoWindow, point) // 开启信息窗口
        })
      })
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
