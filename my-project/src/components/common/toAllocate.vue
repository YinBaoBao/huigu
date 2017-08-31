<template>
<div>
  <el-transfer v-model="value1" :titles="['未获得权限', '已获得权限']" :props="{
      key: 'id',
      label: 'operationName'
    }" :data="data"></el-transfer>
  <el-button class="operationSure" type="primary" @click="chilCall()">确定</el-button> 
</div>
</template>

<script>
  export default {
    data() {
      const generateData = _ => {
        const data = [];
        return data;
      };
      return {
        data: generateData(),
        value1:[],
        id:'',
        roleId:''
      };
    },
    created:function(){
      //this.data=this.value;
    },
    methods:{
    	chilCall(pars){
        this.$http.post(this.$store.state.api+'/roleoperation/update',{id:this.id,roleId:this.$store.state.roleId,operationIds:this.value1})
          .then((res)=>{
          });
        this.$emit('newNOdeEvent');
    	},
      getUser:function(){
        this.data=[];
        this.value1=[];
        var demo = new Array();
        this.$http.get(this.$store.state.api+'/roleoperation/show',{params:{roleId:this.$store.state.roleId}},{emulateJSON: true})
      .then((res)=>{
        this.data=res.body.data.allOperationList;
        this.id=res.body.data.id;
        this.roleId=res.body.data.roleId;
        if(res.body.data.hasOperationList.length){
          for(var i=0;i<res.body.data.hasOperationList.length;i++){
            demo[i]=res.body.data.hasOperationList[i].id;
          }
        this.value1=demo;
        };
      });
      }
    }
  };
</script>
<style>
.operationSure{
  position: absolute;
  bottom: 25px;
  left: 193px;
}
</style>