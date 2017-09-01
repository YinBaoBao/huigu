<template>
  <div>
    <el-transfer v-model="value2" :titles="['未获得权限', '已获得权限']" :props="{
      key: 'id',
      label: 'roleName'
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
        value: [],
        value2: [],
        id: '',
        userId: '',
      };
    },
    created: function () {
      //this.data=this.value;
    },
    methods: {
      chilCall(pars){
        //alert(this.$store.state.roleId);
        this.$http.post(this.$store.state.api + '/roleuser/update', {
          userId: this.$store.state.roleId,
          roleIds: this.value2
        }).then((res) => {
        });
        this.$emit('newNOdeEvents');
      },
      getUser: function () {
        this.data = [];
        this.value2 = [];
        var demo = new Array();
        this.$http.get(this.$store.state.api + '/roleuser/show', {params: {userId: this.$store.state.roleId}}, {emulateJSON: true})
          .then((res) => {
            this.data = res.body.data.roleList;
            this.id = res.body.data.id;
            this.userId = res.body.data.userId;
            if (res.body.data.hasRoleList.length) {
              for (var i = 0; i < res.body.data.hasRoleList.length; i++) {
                demo[i] = res.body.data.hasRoleList[i].id;
              }
              this.value2 = demo;
            }
          });
      }
    }
  };
</script>
<style>
  .operationSure {
    position: absolute;
    bottom: 25px;
    left: 193px;
  }
</style>
