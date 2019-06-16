<template>
  <div class="wrapper" 
    @click="$router.push({name: 'businessDetails', params: { id: detail.id}})">
    <div class="left-img">
      <img src="" alt="">
    </div>
    <div class="middle-info">
      <p><b>{{detail.name}}</b></p>
      <p>
        {{detail.principal}}<span> - </span>
        {{detail.phone}}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    detail: Object
  }
}
</script>

<style scoped>
.wrapper{
  width: 100%;
  height: 4rem;
  line-height: 4rem;
  display: flex;
  flex-direction: row;
  padding: 1rem .5rem 2rem .5rem;
  border-bottom: 1px solid #ccc;
}
.left-img{
  width: 4.5rem;
  background: orange;
  border-radius: 0
}
.middle-info{
  margin-left: 10px;
  flex: 1;
  padding: .3rem;
}
.middle-info p{
  line-height: 1.3rem
}
</style>
