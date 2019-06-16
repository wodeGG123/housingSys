<template>
  <div class="map">
    <XHeader :right-options="{showMore: true}" @on-click-more="$router.push({ path: '/' })" v-if="!textShow">车辆位置</XHeader>
    <XHeader :right-options="{showMore: true}" @on-click-more="$router.push({ path: '/' })" v-if="textShow">所有车辆位置</XHeader>
    <div class="l-map">
      <iframe src="/static/map/map.html" id="childFrame" frameborder="0" style="width: 100%;height:100%;"></iframe>
    </div>
  </div>
</template>

<script>
// import request from '@/utils/request.js'
import { getCartRealTimeStatus} from '@/api/business'
export default {
  data () {
    return {
      textShow: false
    }
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
      getCartRealTimeStatus({
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
        if (data.result) {
          this.cartData = data.data
          var childFrameObj = document.getElementById('childFrame')
          childFrameObj.contentWindow.paramFromParent = data.data
        }
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
  .map .l-map{
    width: 100%;
    height: 100%;
  }
</style>
