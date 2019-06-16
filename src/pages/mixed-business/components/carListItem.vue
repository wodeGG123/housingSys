<template>
  <div class="item-wrapper">
    <div class="left">
      <p><b>{{simpleDetail.licenseplate}}</b></p>
      <p>型号：{{simpleDetail.brandName}}</p>
    </div>
    <div @click="openMapPage(simpleDetail.id)"
      class="right blue">位置 >></div>
  </div>
</template>

<script>
export default {
  props: {
    simpleDetail: Object
  },
  methods: {
    openMapPage (id) {
      this.$router.push({ name: 'map', params: { companyId: this.$route.params.id, id: id } })
    }
  }
}
</script>

<style scoped>
  .item-wrapper{
    height: 4rem;
    padding: .5rem .4rem;
    border-bottom: 1px solid #ccc;
    display: flex;
    flex-direction: row
  }
  .left{
    flex: 1;
  }
  .right{
    width: 4rem;
    line-height: 4rem
  }
  .right:hover{
    opacity: 0.5
  }
</style>
