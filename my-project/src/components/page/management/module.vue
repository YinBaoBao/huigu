<template>
  <div id="module">
   <div class="mainNavadd">
      <el-button type="primary" @click="addRow()">添加</el-button>
    </div>
    <div class="mainSearch">
      <el-input class="mainSearchFloat" v-model="mainSearchinput" placeholder="请输入模块名称"></el-input>
      <el-button class="mainSearchFloat" type="primary" @click="mainSearch()" v-loading.fullscreen.lock="fullscreenLoading">搜索</el-button>
    </div>

    <div class="mainNavaddB" v-show="mainAddShow">
      <div class="mainContentadd" v-show="mainContentaddC"><!--添加信息的表格-->
        <p class="Updatetitle">添加模块</p>
        <hr color="#E5E9F2" width="90%">
        <el-form ref="ruleForm" :rules="rulename" :model="form" label-width="100px" label-position="right">
          <el-form-item label="模块名称" prop="moduleName">
            <el-input class="main-add-input" v-model="form.moduleName"></el-input>
          </el-form-item>
          <el-form-item label="模块URL">
            <el-input class="main-add-input" v-model="form.moduleUrl"></el-input>
          </el-form-item>
          <el-form-item label="父级关系">
            <el-select v-model="levelCode" class="main-add-input-S" placeholder="父级关系">
              <el-option v-for="item in levelCodes" :key="item.id" :label="item.moduleName" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="description" label="备注">
            <el-input type="textarea" class="main-add-input" v-model="form.description"></el-input>
          </el-form-item>

          <el-form-item class="samllButton">
            <el-button type="primary" @click="onSubmit('ruleForm')">提交</el-button>
            <el-button @click="onCancel('ruleForm')">取消</el-button>
          </el-form-item>

        </el-form>
      </div>
      <div class="mainContentview" v-show="mainContentviewC">
        <p class="Updatetitle">修改模块</p>
        <hr color="#E5E9F2" width="90%">
         <el-form ref="ruleForm" :rules="rulename" :model="form" label-width="100px" label-position="right">
         <!--<el-form-item label="ID">
            <el-input class="main-add-input" v-model="form.id" :disabled="true"></el-input>
          </el-form-item>-->
          <el-form-item label="模块名称" prop="moduleName">
            <el-input class="main-add-input" v-model="form.moduleName"></el-input>
          </el-form-item>
          <el-form-item label="模块URL">
            <el-input class="main-add-input" v-model="form.moduleUrl"></el-input>
          </el-form-item>
          <el-form-item label="父级关系">
            <el-select v-model="levelCode" class="main-add-input-S" placeholder="父级关系">
              <el-option v-for="item in levelCodes" :key="item.id" :label="item.moduleName" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="description" label="备注">
            <el-input type="textarea" class="main-add-input" v-model="form.description"></el-input>
          </el-form-item>
          <el-form-item class="samllButton">
            <el-button type="primary" @click="onSubmitU('ruleForm')">确定</el-button>
            <el-button @click="onCancelU('ruleForm')">取消</el-button>
          </el-form-item>

        </el-form>      
      </div>
      <div class="toviewC" v-show="toviewC">
          <p class="Updatetitle">详情</p>
        <hr color="#E5E9F2" width="90%">
        <el-form class="viewPadding" ref="form" label-width="125px">
            <!--<el-form-item class="floatLeft" label="ID">
              <el-input class="main-add-input" v-model="form.id" :disabled="true"></el-input>
            </el-form-item>-->
            <el-form-item class="floatLeft" label="模块名称">
              <el-input class="main-add-input" v-model="form.moduleName" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item class="floatLeft" label="模块URL">
              <el-input class="main-add-input" v-model="form.moduleUrl" :disabled="true"></el-input>
            </el-form-item>
            <div class="clear"></div>
            <el-form-item class="floatLeft" label="父级关系">
              <el-input class="main-add-input" v-model="form.parentName" :disabled="true"></el-input>
            </el-form-item>
            <!--<el-form-item class="floatLeft" label="创建人">
              <el-input class="main-add-input" v-model="form.createBy" :disabled="true"></el-input>
            </el-form-item>
            <div class="clear"></div>
            <el-form-item class="floatLeft" label="创建时间">
              <el-input class="main-add-input" v-model="form.createTime" :disabled="true"></el-input>
            </el-form-item>
            <div class="clear"></div>
            -->
            <el-form-item class="floatLeft" label="更新人">
              <el-input class="main-add-input" v-model="form.updateBy" :disabled="true"></el-input>
            </el-form-item>
            <div class="clear"></div>
            <el-form-item class="floatLeft" label="更新时间">
              <el-input class="main-add-input" v-model="form.updateTime" :disabled="true"></el-input>
            </el-form-item>
            <div class="clear"></div>
            <el-form-item class="viewDescription" label="备注">
              <el-input type="textarea" class="main-add-input" v-model="form.description" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item class="cancelButton">
              <el-button @click="onCancelUU()">关闭</el-button>
            </el-form-item>

          </el-form>      
      </div>
    </div>


    <el-table :data="tableData" style="width: 100%" border tooltip-effect="dark">
    </el-table-column>
      <el-table-column type="index" label="序号" width="65px"></el-table-column>
      <el-table-column prop="moduleName" label="模块名称"></el-table-column>
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
      form:{
        moduleName:'',
        moduleUrl:'',
        description:'',
      },
      mainContentviewV:'',
      pageIndex:1,
      pageSize:10,
      total:1,
      pageSizes:[1,10,20,50,100],
      levelCode:'',
      levelCodes:'',
      mainSearchinput:'',
      mainAddShow:false,
      mainContentaddC:false,
      mainContentviewC:false,
      toviewC:false,
      fullscreenLoading: false,
      rulename:{
        moduleName:[
        { required: true, message: '请输入模块名', trigger: 'blur' }
        ]
      },
    }
  },
  created:function(){
    this.getUsers();
  },
  methods:{
    getUsers(){
      this.$http.get(this.$store.state.api+'/module/',{params:{pageNum:this.pageIndex,pageSize:this.pageSize}},{emulateJSON: true})
      .then((res)=>{
        this.tableData = res.body.dataList;
        this.total = res.body.objectotalNumber; 
      })
    },
    module:function(){
      this.$http.get(this.$store.state.api+'/constant/module')
      .then((res)=>{
        this.levelCodes=res.body;
      })
    },
    changeRow:function(index){      //修改
      this.mainAddShow = !this.mainAddShow;
      this.mainContentviewC = !this.mainContentviewC;
      this.module();
      this.$http.get(this.$store.state.api+'/module/id',{params:{id:this.tableData[index].id}},{emulateJSON: true})
      .then((res)=>{
        this.form = res.body.data;
        this.levelCode = res.body.data.parentId;
      });
    },
    deleteRow:function(index){      //删除
      this.fullscreenLoading = true;
        setTimeout(() => {
          this.fullscreenLoading = false;
          this.$http.delete(this.$store.state.api+'/module/id',{params:{id:this.tableData[index].id}},{emulateJSON: true})
      .then((res)=>{
        this.getUsers();
      })
        }, 1000);
    },
    toView:function(index){       //查看
      this.mainAddShow = !this.mainAddShow;
      this.toviewC = !this.toviewC;
      this.$http.get(this.$store.state.api+'/module/id',{params:{id:this.tableData[index].id}},{emulateJSON: true})
      .then((res)=>{
        this.form = res.body.data;
      })
    },
    addRow:function(){          //添加
      this.mainAddShow = !this.mainAddShow;
      this.mainContentaddC = !this.mainContentaddC;
      this.module();
    },
    onSubmit:function(formName){  //增加
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http.post(this.$store.state.api+'/module/insert',{parentId:this.levelCode,moduleName:this.form.moduleName,moduleUrl:this.form.moduleUrl,description:this.form.description})
          .then((res)=>{
            this.getUsers();
          });
          this.onCancel(formName);
        } else {  
            this.open();
            return false;
          }
      });
    },
    open() {
      this.$message('您还有必要信息未填写');
    },
    onSubmitU:function(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
           this.$http.post(this.$store.state.api+'/module/update',{id:this.form.id,levelCode:this.levelCode,moduleName:this.form.moduleName,moduleUrl:this.form.moduleUrl,description:this.form.description})
          .then((res)=>{
            this.getUsers();
          });
          this.onCancelU(formName);
        } else {  
            this.open();
            return false;
          }
      });
    },
    clearUp:function(){
      this.form.moduleName='';     //清空已输入的内容
      this.form.moduleUrl='';
      this.levelCodes='';
      this.levelCode='';
      this.form.description='';
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
      this.mainAddShow = !this.mainAddShow;
      this.toviewC = !this.toviewC;
      this.clearUp();
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
      this.$http.get(this.$store.state.api+'/module/',{params:{pageNum:this.pageIndex,pageSize:this.pageSize}},{emulateJSON: true})
      .then((res)=>{
        this.tableData = res.body.dataList;
        })
    },
    mainSearch:function(){    //查询
      this.fullscreenLoading = true;
      setTimeout(() => {
        this.fullscreenLoading = false;
        this.$http.get(this.$store.state.api+'/module/',{params:{pageNum:1,pageSize:this.pageSize,moduleName:this.mainSearchinput}},{emulateJSON: true})
        .then((res)=>{
        this.tableData = res.body.dataList;
        })
      }, 1000);
    },
  }
}
</script>

<style>
#module {
  overflow: hidden;
  padding-left: 10px;
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

#module .mainContentadd {
  width: 400px;
  height: 380px;
  background: #fff;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  border-radius: 10px;
}

#module .mainContentview {
  width: 400px;
  height: 420px;
  background: #fff;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  border-radius: 10px;
}

#module .toviewC {
  width: 650px;
  height: 440px;
  background: #fff;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  border-radius: 10px;
}

.toviewC .viewPadding {
  margin-top: 20px;
}

.floatLeft {
  float: left;
}

#module .description {
  width: 400px !important;
}

#module .cancelButton {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 15px;
  margin-left: -100px;
}

.viewDescription {
  width: 700px !important;
}
.main-add-input-S{
  width: 80% !important;
}

#module .samllButton {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 15px;
  margin-left: -100px;
}
</style>