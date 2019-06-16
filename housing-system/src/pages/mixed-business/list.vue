<!--<template>-->
<!--  <div>-->
<!--    <popup-radio title="搜索条件" :options="searchOptions" v-model="searchType"></popup-radio>-->
<!--    <search-->
<!--      :results="results" v-model="searchValue"-->
<!--      :auto-fixed='false' position="absolute"-->
<!--      auto-scroll-to-top top="46px"-->
<!--      @result-click="resultClick"-->
<!--      @on-change="getResult"-->
<!--      @on-submit="onSubmit"-->
<!--      ref="search">-->
<!--    </search>-->
<!--    <companyList/>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--import companyList from './components/companyList'-->
<!--export default {-->
<!--  components: { companyList },-->
<!--  data () {-->
<!--    return {-->
<!--      searchValue: '', // 搜索值-->
<!--      searchOptions: ['企业名称', '负责人', '电话', '地址'],-->
<!--      searchType: '企业名称',-->
<!--      results: []-->
<!--    }-->
<!--  },-->
<!--  methods: {-->
<!--    resultClick (val) {-->
<!--      console.log(val)-->
<!--    },-->
<!--    onSubmit () {-->

<!--    },-->
<!--    getResult () {-->

<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->
<template>
  <div class="mixed-business mixed-business-list">
    <XHeader :right-options="{showMore: true}" @on-click-more="$router.push({ path: '/' })">商混企业</XHeader>
    <main>
      <!-- <group> -->
      <popup-radio title="搜索条件" :options="options1" v-model="option1"></popup-radio>
      <!-- </group> -->
      <search
        @result-click="resultClick"
        @on-change="getResult"
        :results="results"
        v-model="value"
        position="absolute"
        auto-scroll-to-top
        :auto-fixed='false'
        top="46px"
        @on-focus="onFocus"
        @on-cancel="onCancel"
        @on-submit="onSubmit"
        ref="search"></search>
      <div class="companyList">
        <ul v-if="companyData.length !== 0">
          <li v-for="(item, index) in companyData" :key="index" @click="goToDetails(item)">
            <div><span></span></div>
            <div>
              <p>{{item.name}}</p>
              <p>{{item.principal}} - {{item.phone}}</p>
              <!-- <p>{{item.address}}</p> -->
            </div>
          </li>
        </ul>
        <load-more tip="未搜索到符合此条件的企业" :show-loading="Loading" background-color="#fbf9fe" v-else></load-more>
        <load-more tip="" :show-loading="Loading" background-color="#fbf9fe"></load-more>
      </div>
    </main>
  </div>

</template>

<script>
import { Group, PopupRadio } from 'vux'
// import companyTestData from '@/utils/mixedBusinessData.json'
import { getCompanyList } from '@/api/business'
// import './css/list.less'
export default {
  data () {
    return {
      options1: ['企业名称', '负责人', '电话', '地址'],
      option1: '企业名称',
      typeDetails: [
        {name: '企业名称', desc: 'name'},
        {name: '负责人', desc: 'principal'},
        {name: '电话', desc: 'phone'},
        {name: '地址', desc: 'address'}
      ],
      Loading: true,
      companyData: [],
      results: [],
      value: ''
    }
  },
  components: {
    Group, PopupRadio
  },
  mounted: function () {
    // this.companyData = companyTestData
    this.getCompanyList() // 获取商混企业列表
    let _that = this
    setTimeout(function () {
      console.log(1)
      _that.Loading = false
    }, 500)
  },
  methods: {
    getCompanyList (params) {
      getCompanyList(
        {
          pageInfo: {
            iDisplayLength: 10,
            iDisplayStart: 0,
            sEcho: 0,
            iColumns: 0,
            iSortingCols: 0
          },
          mixedBusiness: {
            id: 0,
            name: params !== undefined ? params.name : '',
            principal: params !== undefined ? params.principal : '',
            phone: params !== undefined ? params.phone : '',
            corpId: '',
            address: params !== undefined ? params.address : '',
            addPerson: ''
          }
        }
      ).then(({data}) => {
        console.log(data)
        if (data.result && data.data) {
          this.companyData = data.data
        }
      })
    },
    goToDetails (item) {
      this.$router.push({path: '/business/details/' + item.id})
    },
    searchDetails (item) {
      console.log(item)
      this.$nextTick(() => {
        // this.$router.push({ path: '/project/details/basic-info/?project=' + item.id })
      })
    },
    setFocus () {
      this.$refs.search.setFocus()
    },
    resultClick (item) {
      console.log(JSON.stringify(item))
      let result = JSON.stringify(item)
      this.value = result.title
      // window.alert('you click the result item: ' + JSON.stringify(item))
    },
    getResult (val) {
      console.log('on-change', val)
      this.results = val ? getResult(this.value) : []
    },
    onSubmit (val) {
      this.$refs.search.setBlur()
      // this.$vux.toast.show({
      //   type: 'text',
      //   text: 'on submit'
      // })
      console.log(val)
      let params = {
        name: '',
        principal: '',
        phone: '',
        address: ''
      }
      switch (this.option1) {
        case '企业名称':
          params.name = val
          break
        case '负责人':
          params.principal = val
          break
        case '电话':
          params.phone = val
          break
        case '地址':
          params.address = val
          break
      }
      if (val) this.getCompanyList(params)
    },
    onFocus () {
      console.log('on focus')
    },
    onCancel () {
      console.log('on cancel')
    },
    searchProjectType () {
      console.log(this.option3)
      // this.Loading = true
      // this.tableList = []
      // projectList.forEach(item => {
      //   if (item.type === this.option3) {
      //     this.tableList.push(item)
      //   }
      // })
      // setTimeout(() => {
      //   console.log(1)
      //   this.Loading = false
      // }, 500)
    }
  }
}
function getResult (val) {
  let rs = []
  for (let i = 0; i < 3; i++) {
    rs.push({
      title: `${val} - ${i + 1} `,
      other: i
    })
  }
  return rs
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
  .mixed-business-list{
    .weui-search-bar{
      background: none;
      padding-left: 0;
      padding-right: 0;
    }
    .weui-search-bar:before{
      border-top: 0;
    }
    .weui-search-bar__label{
      background: #EFEFF4;
    }
    .companyList{
      li{
        padding: 1rem 0;
        border-bottom: solid 1px #e0e0e0;
        .l-h(4rem);
        div{
          float: left;
          p{
            .l-h(1.4rem);
            font-size: 0.8rem;
            .txt-overflowed()
          }
          p:first-child{
            font-weight: bold;
            // font-size: 0.84rem;
            font-size: 0.88rem;
            // .l-h(2.2rem);
          }
        }
        div:first-child{
          .wh(4rem);
          // border-radius: 100%;
          background: #ff9e57;
          color: #fff;
          text-align: center;
          margin-right: 0.8rem;
        }
        div:last-child{
          max-width: 74%;
        }
      }
    }
  }
</style>
