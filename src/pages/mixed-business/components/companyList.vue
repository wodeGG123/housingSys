<template>
  <div class="company-list-wrapper">
    <companyListItem v-for="item of companyList" :key="item.id" :detail="item" :showMore="true"/>
  </div>
</template>

<script>
import companyListItem from './companyListItem'
import { getCompanyList } from '@/api/business'
export default {
  components: { companyListItem },
  data () {
    return {
      companyList: [],
      showLoading: ''
    }
  },
  mounted () {
    this.getCompanyList()
  },
  methods: {
    getCompanyList () {
      const obj = {
        pageInfo: {
          iDisplayLength: 10,
          iDisplayStart: 0,
          sEcho: 0,
          iColumns: 0,
          iSortingCols: 0
        },
        mixedBusiness: {
          id: '',
          name: '',
          principal: '',
          phone: '',
          corpId: '',
          address: '',
          addPerson: ''
        }
      }
      getCompanyList(obj).then(res => {
        console.log(res)
        const data = res.data
        this.companyList = data.data
      })
    }
  }
}
</script>
