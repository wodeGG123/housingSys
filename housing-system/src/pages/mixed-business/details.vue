<!--<template>-->
<!--  <ViewBox>-->
<!--    <companyListItem :detail="detail" :showMore="false"/>-->
<!--    <carList/>-->
<!--  </ViewBox>-->
<!--</template>-->

<!--<script>-->
<!--import companyListItem from './components/companyListItem'-->
<!--import carList from './businessCar/list'-->
<!--import { getCompanyList } from '@/api/business'-->
<!--export default {-->
<!--  components: { companyListItem, carList },-->
<!--  data () {-->
<!--    return {-->
<!--      id: this.$route.params.id,-->
<!--      detail: {}-->
<!--    }-->
<!--  },-->
<!--  created () {-->
<!--    this.getDetais()-->
<!--  },-->
<!--  methods: {-->
<!--    getDetais () {-->
<!--      const obj = {-->
<!--        id: this.id-->
<!--      }-->
<!--      getCompanyList(obj).then(res => {-->
<!--        console.log(res)-->
<!--        const data = res.data-->
<!--        this.detail = data.data[0]-->
<!--      })-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->


<template>
  <div class="mixed-business mixed-business-details">
    <XHeader :right-options="{showMore: true}" @on-click-more="$router.push({ path: '/' })">企业详情</XHeader>
    <main>
      <div class="company">
        <div><span></span></div>
        <div v-for="item in companyData">
          <p>{{item.name}}</p>
          <p>{{item.principal}} - {{item.phone}}</p>
          <p>{{item.address}}</p>
        </div>
        <!-- <ul>
          <li>公司名称：{{companyData.companyName}}</li>
          <li>联系人：{{companyData.contacts}} - {{companyData.contactsNumber}}</li>
          <li>公司地址：{{companyData.address}}</li>

        </ul> -->
      </div>
      <div class="cart-list">
        <div class="title"><span></span>车辆列表 <b @click="openMapPage()">查看所有车辆位置>></b></div>
        <div class="content">
          <ul>
            <li v-for="(item, index) in cartData" :key="index"> <!--  @click="searchCartDetails(item)" -->
              <div>{{item.licenseplate}}</div><!--  <span> - (型号：{{item.productName}})</span> -->
              <!-- <div>品牌：{{item.brandName}} - sim：{{item.sim}}</div> -->
              <div>型号：{{item.productName}}</div>
              <!-- <div>发动机号：{{item.engineNumber}}</div> -->
              <div @click="openMapPage(item)">位置 >></div>
            </li>
          </ul>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
  // import companyTestData from '@/utils/mixedBusinessData.json'
  import { getCompanyList , getCartDetails} from '@/api/business'
  // import './css/details.less'
  export default {
    data () {
      return {
        companyData: [],
        cartData: []
      }
    },
    components: {
      Map
    },
    mounted: function () {
      let companyId = this.$route.params.id
      // this.searchCompanyData()
      this.getCompanyData(companyId)
      this.getCartList(companyId)
    },
    methods: {
      getCompanyData (companyId) {
        getCompanyList({
          pageInfo: {
            iDisplayLength: 10,
            iDisplayStart: 0,
            sEcho: 0,
            iColumns: 0,
            iSortingCols: 0
          },
          mixedBusiness: {
            id: companyId,
            name: '',
            principal: '',
            phone: '',
            corpId: '',
            address: '',
            addPerson: ''
          }
        }).then(({data}) => {
          if (data.result) {
            this.companyData = data.data
          }
        })
      },
      getCartList (companyId) {
        getCartDetails({
          'pageInfo': {
            'iDisplayLength': 10,
            'iDisplayStart': 0,
            'sEcho': 0,
            'iColumns': 0,
            'iSortingCols': 0
          },
          'mixedCard': {
            'id': 0,
            'mixedId': companyId,
            'vehicleId': '',
            'corpId': '',
            'brandName': '',
            'productName': '',
            'licenseplate': '',
            'bindDevice': 0
          }
        }).then(({data}) => {
          if (data.result) {
            console.log("cartData" ,data.data)
            this.cartData = data.data
          }
        })
      },
      searchCompanyData () {
        // this.companyId = this.$route.query.company
        // companyTestData.forEach(item => {
        //   if (item.companyId === this.$route.query.company) {
        //     this.companyData = item
        //   }
        // })
      },
      openMapPage (item) {
        let url = ''
        if (item) {
          // url = 'company=' + item.mixedId + '&cart=' + item.id
          this.$router.push({path: '/business/iframeMap/'+item.mixedId + '/'+item.id})
        } else {
          this.$router.push({path: '/business/iframeMap/'+this.$route.params.id})
          // url = 'companng=' + this.$route.query.id
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .vux-header{
    background: #3252B3;
    .vux-header-back{
      color: #fff;
    }
    .vux-header-left{
      color: #fff;
    }
    .vux-header-left .left-arrow:before{
      border: 1px solid #fff;
      border-width: 1px 0 0 1px;
    }
  }
  main{
    padding: 3rem 3% 1rem;
    background: #fff;
    font-size: 0.84rem;
    padding-top: 0;
    box-sizing: border-box
  }
  ul{
    list-style: none;
  }
  @import '../../assets/css/common.less';
  .title{
    &::before{
      display: none;
    }
  }
  .mixed-business-details{
    .company{
      // height: 4rem;
      overflow: hidden;
      padding: 1rem 0;
      border-bottom: solid 1px #e0e0e0;
      div{
        float: left;
        p{
          width: 100%;
          display: block;
          font-size: 0.8rem;
        }
        p:first-child{
          font-weight: bold;
          font-size: 1rem;
          line-height: 1.2rem;
          margin-bottom: 0.5rem;
          font-size: 0.9rem;
        }
      }
      div:first-child{
        .wh(4rem);
        background: #ff9e57;
        margin-right: 0.8rem;
      }
      div:last-child{
        max-width: 74%;
      }
    }

    .cart-list{
      .title{
        .l-h(2.5rem);
        font-weight: bold;
        position: relative;
        padding-left: 0.8rem;
        font-size: 0.86rem;
        span{
          display: inline-block;
          .maxBody(0.4rem, 40%);
          border-radius: 0.2rem;
          background: #77b5ff;
          position: absolute;
          left: 0;
          top: 26%;
        }
        b{
          font-weight: normal;
          float: right;
          .l-h(2.5rem);
          color: #77b5ff;
        }
      }
      .content{
        li{
          // height: 4rem;
          height: 2.5rem;
          padding: 1rem 0;
          border-bottom: solid 1px #e0e0e0;
          position: relative;
          div{
            font-size: 0.8rem;
            .l-h(1.3rem);
          }
          div:first-child{
            font-size: 0.86rem;
            font-weight: bold;
            margin-bottom: 0.2rem;
            span{
              font-size: 0.8rem;
              font-weight: normal;
            }
          }
          div:last-child{
            // bac
            color: #77b5ff;
            text-decoration: underline;
            position: absolute;
            right: 0;
            bottom: 0.9rem;
          }
        }
      }
    }
  }

</style>
