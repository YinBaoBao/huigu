<template>
  <div id="agency">
    <div class="agencyButton">
      <el-button @click="demo">公司<i class="el-icon-arrow-down el-icon--right"></i></el-button>
      <el-button @click="demo1">部门<i class="el-icon-arrow-down el-icon--right"></i></el-button>
      <el-button @click="demo2">人员<i class="el-icon-arrow-down el-icon--right"></i></el-button>
    </div>
    <div class="agencyComtent">
      <router-view></router-view>
    </div>

  </div>
</template>

<script>
export default{
  data(){
    return{

    }
  },
  created:function(){
    this.demo();
  },
  methods:{
    demo:function(){
      this.$router.push('/agencymore');
    },
    demo1:function(){
      this.$router.push('/department');
    },
    demo2:function(){
      this.$router.push('/user');
    }
  }
}
</script>

<style>
#agency{
  overflow: hidden;
}
#agency .agencyButton{
  margin-left: 10px;
  position: absolute;
  top: 20px;
  z-index: 1;
  width: auto;
}
#agency .agencyComtent{
  position: relative;
  left: 0px;
  top:0px;
  width: 100%;
}
</style>
