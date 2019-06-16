<template>
	<view-box>
    <group :title="tempStatus[type] + '文书'">
      <x-input title="标题" v-model="paperworkDetails.title"></x-input>
		  <vue-html5-editor :content="paperworkDetails.content"@change="updateContent"></vue-html5-editor>
      <Checklist title="可见科室" :options="departOptions" 
       v-model="canLookDepart"></Checklist>
    </group>
    <x-button class="add" type="primary" plain mini
      @click.native="handleAdd" v-if="type === 'add'">确认添加</x-button>
    <x-button class="add" type="primary" plain mini
      @click.native="handleEdit" v-if="type === 'edit'">确认修改</x-button>
	</view-box>
</template>

<script>
import { mapGetters } from 'vuex'
import { addPaperwork, updatePaperwork } from '@/api/paperwork'
export default {
	props: {
    temp: Object,
    type: String
	},
  data () {
  	return {
      canLookDepart: [],
      departOptions: ['科室一', '科室二', '科室三'],
  		tempStatus: { 'add': '添加', 'edit': '修改' },
    }
  },
  computed: {
    ...mapGetters(['paperworkDetails'])
  },
  methods: {
    updateContent(data) {
      this.paperworkDetails.content = data
    },
  	handleAdd () {
      const obj = {
        wenshu: this.paperworkDetails,
        deptId: this.canLookDepart
      }
  		addPaperwork(obj).then(res => {
  			console.log(res)
  			const _this = this
  			const data = res.data
  			if (data.result) {
          this.$vux.alert.show({
            title: '成功',
            content: '文书信息添加成功',
          })
          setTimeout(() => {
            _this.$vux.alert.hide()
            _this.$router.push('/paperwork/list')
          }, 1000)
        }
  		})
  	},
    handleEdit () {
      console.log(this.paperworkDetails)
      const _this = this
      this.$vux.confirm.show({
        title: '提示',
        content: '是否确认修改信息？',
        onConfirm: () => {
          const obj = {
            wenshu: this.paperworkDetails,
            deptId: this.canLookDepart
          }
          updatePaperwork(obj).then(res => {
            console.log(res)
            const data = res.data
            if (data.result) {
              this.$vux.alert.show({
                title: '成功',
                content: '文书信息修改成功',
              })
              _this.$emit('getDetail')
            } else {
              this.$vux.alert.show({
                title: '失败',
                content: '文书信息修改失败',
              })
              setTimeout(() => {
                _this.$vux.alert.hide()
              }, 1000)
            }
          })
        }
      })
    }
  }
}
</script>
