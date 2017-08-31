<template>
  <div id="bankdepartment">
   <div class="mainNavadd">
      <el-button type="primary" @click="addRow()">添加</el-button>
    </div>
    <div class="mainSearch">
      <el-select class="mainSearchFloat" v-model="banka" placeholder="请选择总行">
        <el-option v-for="item in bankdaa" :key="item.id" :label="item.channelName" :value="item.id"></el-option>
      </el-select>
      <el-select class="mainSearchFloat paddingButton" v-model="brancha" placeholder="请选择支行">
        <el-option v-for="item in branchdaa" :key="item.id" :label="item.channelName" :value="item.id"></el-option>
      </el-select>
      <el-input class="mainSearchFloat paddingButton" v-model="mainSearchinput" placeholder="请输入部门名称"></el-input>
      <el-button class="mainSearchFloat" type="primary" @click="mainSearch()">搜索</el-button>
      <!--<el-select class="mainSearchFloat paddingButton" v-model="channelIdq" @change="selectChanneld" v-loading.fullscreen.lock="fullscreenLoading" placeholder="请选择评估公司">
        <el-option v-for="item in channelIdqq" :key="item.id" :label="item.channelName" :value="item.id"></el-option>
      </el-select>-->
    </div>

    <div class="mainNavaddB" v-show="mainAddShow">
      <div class="mainContentadd" v-show="mainContentaddC"><!--添加信息的表格-->
        <p class="Updatetitle">增加部门</p>
        <hr color="#E5E9F2" width="90%">
        <el-form :model="form" label-width="100px" label-position="right">
          <el-form-item id="selectContent" label="评估公司">
            <el-select class="main-add-input-S" v-model="channelId" @change="selectChannelBank" placeholder="代理评估公司">
                <el-option v-for="item in channelIds" :key="item.id" :label="item.channelName" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item id="selectContent" label="银行">
            <el-select class="main-add-input-S" v-model="channelBankId" placeholder="银行">
                <el-option v-for="item in channelBankIds" :key="item.id" :label="item.bankBranchName" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="部门负责人">
            <el-input class="main-add-input" v-model="form.leaderName"></el-input>
          </el-form-item>
          <el-form-item label="部门名称">
            <el-input class="main-add-input" v-model="form.departmentName"></el-input>
          </el-form-item>
          <el-form-item class="description" label="备注">
            <el-input type="textarea" class="main-add-input" v-model="form.description"></el-input>
          </el-form-item>
          

          <div class="samllButton">
            <el-button type="primary" @click="onSubmit('ruleBank')">创建</el-button>
            <el-button @click="onCancel('ruleBank')">取消</el-button>
          </div>

        </el-form>
      </div>
      <div class="mainContentview" v-show="mainContentviewC">
        <p class="Updatetitle">修改部门</p>
        <hr color="#E5E9F2" width="90%">
         <el-form :model="form" label-width="100px" label-position="right">
          <el-form-item id="selectContent" label="评估公司">
            <el-select class="main-add-input-S" v-model="channelId" @change="selectChannelBank" placeholder="代理评估公司">
                <el-option v-for="item in channelIds" :key="item.id" :label="item.channelName" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item id="selectContent" label="银行">
            <el-select class="main-add-input-S" v-model="channelBankId" placeholder="银行">
                <el-option v-for="item in channelBankIds" :key="item.id" :label="item.bankBranchName" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="部门负责人">
            <el-input class="main-add-input" v-model="form.leaderName"></el-input>
          </el-form-item>
          <el-form-item label="部门名称">
            <el-input class="main-add-input" v-model="form.departmentName"></el-input>
          </el-form-item>
          <el-form-item class="description" label="备注">
            <el-input type="textarea" class="main-add-input" v-model="form.description"></el-input>
          </el-form-item>
          

          <div class="samllButton">
            <el-button type="primary" @click="onSubmitU('ruleBank')">创建</el-button>
            <el-button @click="onCancelU('ruleBank')">取消</el-button>
          </div>

        </el-form>
      </div>

      <div class="toviewC" v-show="toviewC">                  <!--查看-->
        <p class="Updatetitle">详情</p>
        <hr color="#E5E9F2" width="90%">
       <el-form :model="form" label-width="100px" class="viewDepartment" label-position="right">
          <el-form-item id="selectContent" label="评估公司">
            <el-input class="main-add-input" v-model="form.channelName" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item id="selectContent" label="银行">
            <el-input class="main-add-input" v-model="form.channelBankName" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="部门负责人">
            <el-input class="main-add-input" v-model="form.leaderName" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="部门名称">
            <el-input class="main-add-input" v-model="form.departmentName" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="更新人">
            <el-input class="main-add-input" v-model="form.updateBy" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="更新时间">
            <el-input class="main-add-input" v-model="form.updateTime" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item class="description" label="备注">
            <el-input type="textarea" class="main-add-input" v-model="form.description" :disabled="true"></el-input>
          </el-form-item>

          <el-form-item class="viewButton">
            <el-button @click="onCancelUU()">取消</el-button>
          </el-form-item>

        </el-form>      
      </div>
    </div>


    <el-table :data="tableData" style="width: 100%" border tooltip-effect="dark">
    </el-table-column>
      <el-table-column type="index" label="序号" width="65px"></el-table-column>
      <el-table-column prop="leaderName" label="部门负责人"></el-table-column>
      <el-table-column prop="departmentName" label="部门名称"></el-table-column>
      <el-table-column prop="channelName" label="评估公司"></el-table-column>
      <el-table-column prop="channelBankName" label="评估银行"></el-table-column>
      <el-table-column label="操作">
         <template scope="scope">
            <el-button @click.native.prevent="toView(scope.$index,tableData)" type="text" size="small">查看</el-button>
            <el-button @click.native.prevent="changeRow(scope.$index,tableData)" type="text" size="small">修改</el-button>
            <el-button @click.native.prevent="deleteRow(scope.$index,tableData)" type="text" size="small" v-loading.fullscreen.lock="fullscreenLoading">删除</el-button>
          </template>  
       </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination v-bind:current-Page="pageIndex" v-bind:page-size="pageSize" :total="total"
        layout="sizes,prev,pager,next,jumper" v-bind:page-sizes="pageSizes"
        v-on:size-change="sizeChange" v-on:current-change="pageIndexChange"></el-pagination>
  </div>
  </div>
</template>
<script>
export default{
  data(){
    return{
      tableData:[],
      multipleSelection: [],      //列表选中的
      form:{},
      mainContentviewV:'',
      pageIndex:1,
      pageSize:10,
      total:1,
      pageSizes:[1,10,20,50,100],
      channelIdq:'',
      channelIdqq:'',
      mainSearchinput:'',
      banka:'',
      bankaa:'',
      brancha:'',
      branchaa:'',
      mainAddShow:false,
      mainContentaddC:false,
      mainContentviewC:false,
      toviewC:false,
      fullscreenLoading: false,
      channelBankId:[],
      channelBankIds:[],
      provinceId:[],
      cityId:[],
      bankId:[],
      bankBranchId:[],
      channelId:[],
      provinceIds:[],
      cityIds:[],
      bankIds:[],
      bankBranchIds:[],
      channelIds:[],
    }
  },
  created:function(){
    this.getUsers();
  },
  methods:{
    getUsers(){
      this.$http.get(this.$store.state.api+'/department/',{params:{pageNum:this.pageIndex,pageSize:this.pageSize}},{emulateJSON: true})
      .then((res)=>{
        this.tableData = res.body.dataList;
        this.total = res.body.objectotalNumber; 
      });
    },
    getchannel(){
      this.$http.get(this.$store.state.api+'/constant/channel')
      .then((res)=>{
        this.channelIds = res.body;
      })
    },  
    changeRow:function(index){      //修改
      this.mainAddShow = !this.mainAddShow;
      this.mainContentviewC = !this.mainContentviewC;
      this.getchannel();
      this.$http.get(this.$store.state.api+'/department/update',{params:{id:this.tableData[index].id}},{emulateJSON: true})
      .then((res)=>{
        this.form=res.body.data;
        this.channelBankId = res.body.data.channelBankId;
        this.channelId = res.body.data.channelId;
      });
    },
    deleteRow:function(index){      //删除
      this.fullscreenLoading = true;
        setTimeout(() => {
          this.fullscreenLoading = false;
          this.$http.delete(this.$store.state.api+'/department/id',{params:{id:this.tableData[index].id}},{emulateJSON: true})
      .then((res)=>{
        this.getUsers();
      })
        }, 1000);
    },
    addRow:function(){          //添加
      this.mainAddShow = !this.mainAddShow;
      this.mainContentaddC = !this.mainContentaddC;
      this.getchannel();
    },
    toView:function(index){          //查看
      this.mainAddShow=!this.mainAddShow;
      this.toviewC=!this.toviewC;
      this.$http.get(this.$store.state.api+'/department/update',{params:{id:this.tableData[index].id}},{emulateJSON: true})
      .then((res)=>{
        this.form=res.body.data;
      });
    },
    onSubmit:function(formName){
          this.$http.post(this.$store.state.api+'/department/insert',{channelBankId:this.channelBankId,channelId:this.channelId,departmentName:this.form.departmentName,description:this.form.description,leaderName:this.form.leaderName,})
          .then((res)=>{
            this.getUsers();
          })
          this.onCancel(formName);
    },
    open() {
      this.$message('您还有必要信息未填写');
    },
    onSubmitU:function(formName){
            this.$http.post(this.$store.state.api+'/department/update',{id:this.form.id,channelBankId:this.channelBankId,channelId:this.channelId,departmentName:this.form.departmentName,description:this.form.description,leaderName:this.form.leaderName,})
            .then((res)=>{
              this.getUsers();
            })
            this.onCancelU(formName);
    },
    clearUp:function(){
      this.channelBankId='';
      this.channelId='';
      this.form.departmentName='';
      this.form.description='';
      this.form.leaderName='';
    },
    onCancel:function(formName){        //关闭蒙层
      this.clearUp();
      this.mainAddShow = !this.mainAddShow;
      this.mainContentaddC = !this.mainContentaddC;
      this.$refs[formName].resetFields();
    },
    onCancelU:function(formName){
      this.clearUp();
      this.mainAddShow = !this.mainAddShow;
      this.mainContentviewC = !this.mainContentviewC;
      this.$refs[formName].resetFields();
    },
    onCancelUU:function(){
      this.clearUp();
      this.mainAddShow = !this.mainAddShow;
      this.toviewC = !this.toviewC;
    },
    selectChannelBank:function(){
      this.$http.get(this.$store.state.api+'/constant/channelBank',{params:{channelId:this.channelId}},{emulateJSON: true})
      .then((res)=>{
        this.channelBankIds=res.body;
      })
    },
    sizeChange: function (pageSize) {   //每页显示条数
      this.pageSize = pageSize;
      this.fetchData();
    },
    pageIndexChange: function (pageIndex) {   //第几页
      this.pageIndex = pageIndex;
      this.fetchData();
    },
    fetchData: function(){
      this.$http.get(this.$store.state.api+'/department/',{params:{pageNum:this.pageIndex,pageSize:this.pageSize}},{emulateJSON: true})
      .then((res)=>{
        this.tableData = res.body.dataList;
        })
    },
    selectChanneld:function(){
      this.fullscreenLoading = true;
      setTimeout(() => {
        this.fullscreenLoading = false;
        this.mainSearch();
      }, 1000);
    },
    mainSearch:function(){    //查询
      this.$http.get(this.$store.state.api+'/department/',{params:{pageNum:1,pageSize:this.pageSize,departmentName:this.mainSearchinput}},{emulateJSON: true})
      .then((res)=>{
      this.tableData = res.body.dataList;
      })
    }
  }
}
</script>

<style>
#bankdepartment {
  overflow: hidden;
  padding-left: 10px;
  width: 100%;
}

.mainNavaddB {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 99;
}

#bankdepartment .mainContentadd {
  width: 400px;
  height: 430px;
  background: #fff;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  border-radius: 10px;
}

#bankdepartment .mainContentview {
  width: 400px;
  height: 430px;
  background: #fff;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  border-radius: 10px;
}

#bankdepartment .toviewC {
  width: 400px;
  height: 530px;
  background: #fff;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  border-radius: 10px;
}

.addButton {
  margin-left: 115px;
}

.viewButton {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 10px;
  margin-left: -100px;
}

.floatLeft {
  float: left;
}

.paddingButton {
  margin-left: 10px;
}

.main-add-input-B {
  width: 70% !important;
}

#selectContent .el-form-item__content {
  margin-left: 100px !important;
}

#bankdepartment .description {
  width: 400px !important;
}

.main-add-input-S{
  width: 80% !important;
}
#bankdepartment .samllButton {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 15px;
}
#bankdepartment .viewDepartment{
  margin-top: 35px;
}
#bankdepartment .mainSearch{
  width: 750px;
}

#bankdepartment .mainNavadd{
  margin-left: 280px;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>