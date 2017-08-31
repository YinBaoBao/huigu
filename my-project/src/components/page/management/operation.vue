<template>
	<div id="operation">
	 <div class="mainNavadd">
      <el-button type="primary" @click="addRow()">添加</el-button>
    </div>
    <div class="mainSearch">
      <el-input class="mainSearchFloat" v-model="mainSearchinput" placeholder="请输入操作名称"></el-input>
      <el-button class="mainSearchFloat" type="primary" @click="mainSearch()" v-loading.fullscreen.lock="fullscreenLoading">搜索</el-button>
    </div>

    <div class="mainNavaddB" v-show="mainAddShow">
      <div class="mainContentadd" v-show="mainContentaddC"><!--添加信息的表格-->
      <p class="Updatetitle">增加操作</p>
      <hr color="#E5E9F2" width="90%">
        <el-form ref="ruleOperation" :rules="ruleOperation" :model="form" label-width="100px" label-position="right">
          <el-form-item label="操作名称" prop="operationName">
            <el-input class="main-add-input" v-model="form.operationName"></el-input>
          </el-form-item>
          <el-form-item label="操作URL">
              <el-input class="main-add-input" v-model="form.operationUrl"></el-input>
            </el-form-item>
          <el-form-item label="父级关系">
            <el-select class="main-add-input" v-model="moduleId" placeholder="请选择模块">
                <el-option v-for="item in module" :key="item.id" :label="item.moduleName" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="description" label="备注">
            <el-input type="textarea" class="main-add-input" v-model="form.description"></el-input>
          </el-form-item>

          <el-form-item class="samllButton">
            <el-button type="primary" @click="onSubmit('ruleOperation')">提交</el-button>
            <el-button @click="onCancel('ruleOperation')">取消</el-button>
          </el-form-item>

        </el-form>
      </div>
      <div class="mainContentview" v-show="mainContentviewC">
        <p class="Updatetitle">修改操作模块</p>
        <hr color="#E5E9F2" width="90%">
          <el-form ref="ruleOperation" :rules="ruleOperation" :model="form" label-width="100px" label-position="right">
            <el-form-item label="ID">
              <el-input class="main-add-input" v-model="form.id" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="操作名称" prop="operationName">
              <el-input class="main-add-input" v-model="form.operationName"></el-input>
            </el-form-item>
            <el-form-item label="操作URL">
              <el-input class="main-add-input" v-model="form.operationUrl"></el-input>
            </el-form-item>
            <el-form-item label="父级关系">
              <el-select class="main-add-input" v-model="moduleId" placeholder="请选择模块">
                <el-option v-for="item in module" :key="item.id" :label="item.moduleName" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="description" label="备注">
              <el-input type="textarea" class="main-add-input" v-model="form.description"></el-input>
            </el-form-item>
            <el-form-item class="samllButton">
              <el-button type="primary" @click="onSubmitU('ruleOperation')">确定</el-button>
              <el-button @click="onCancelU('ruleOperation')">取消</el-button>
            </el-form-item>

          </el-form>      
      </div>
      <div class="toviewC" v-show="toviewC"> 
          <p class="Updatetitle">详情</p>
        <hr color="#E5E9F2" width="90%">
          <el-form ref="form" class="viewPadding"  label-width="100px">
            <el-form-item class="floatLeft" label="ID">
              <el-input class="main-add-input" v-model="form.id" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item class="floatLeft" label="操作名称">
              <el-input class="main-add-input" v-model="form.operationName" :disabled="true"></el-input>
            </el-form-item>
            <div class="clear"></div>
            <el-form-item class="floatLeft" label="操作URL">
              <el-input class="main-add-input" v-model="form.operationUrl" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item class="floatLeft" label="父级关系">
              <el-input class="main-add-input" v-model="form.moduleName" :disabled="true"></el-input>
            </el-form-item>
            <div class="clear"></div>
            <!--<el-form-item class="floatLeft" label="创建人">
              <el-input class="main-add-input" v-model="form.createBy" :disabled="true"></el-input>
            </el-form-item>
            <div class="clear"></div>
            <el-form-item class="floatLeft" label="创建时间">
              <el-input class="main-add-input" v-model="form.createTime" :disabled="true"></el-input>
            </el-form-item>-->
            <el-form-item class="floatLeft" label="更新人">
              <el-input class="main-add-input" v-model="form.updateBy" :disabled="true"></el-input>
            </el-form-item>
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
      <el-table-column prop="moduleName" label="父级关系"></el-table-column>
      <el-table-column prop="operationName" label="操作名称"></el-table-column>
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
      mainSearchinput:'',
      mainAddShow:false,
      mainContentaddC:false,
      mainContentviewC:false,
      toviewC:false,
      fullscreenLoading: false,
      module:[],
      moduleId:'',
      ruleOperation:{
        operationName:[
        { required: true, message: '请输入操作名称', trigger: 'blur' }
        ]
      },
    }
  },
  created:function(){
    this.getUsers();
  },
  methods:{
    getUsers(){
      this.$http.get(this.$store.state.api+'/operation/',{params:{pageNum:this.pageIndex,pageSize:this.pageSize}},{emulateJSON: true})
      .then((res)=>{
        this.tableData = res.body.dataList;
        this.total = res.body.objectotalNumber; 
      })
    },
    changeRow:function(index){      //修改
      this.mainAddShow = !this.mainAddShow;
      this.mainContentviewC = !this.mainContentviewC;
      this.selectmodule();
      this.$http.get(this.$store.state.api+'/operation/id',{params:{id:this.tableData[index].id}},{emulateJSON: true})
      .then((res)=>{
        this.form = res.body.data;
        this.moduleId = res.body.data.moduleId;
      })
    },
    deleteRow:function(index){      //删除
      this.fullscreenLoading = true;
        setTimeout(() => {
          this.fullscreenLoading = false;
          this.$http.delete(this.$store.state.api+'/operation/id',{params:{id:this.tableData[index].id}},{emulateJSON: true})
      .then((res)=>{
        this.getUsers();
      })
      }, 1000);
    },
    toView:function(index){       //查看
      this.mainAddShow = !this.mainAddShow;
      this.toviewC = !this.toviewC;
      this.$http.get(this.$store.state.api+'/operation/id',{params:{id:this.tableData[index].id}},{emulateJSON: true})
      .then((res)=>{
        this.form = res.body.data;
        this.moduleId = res.body.data.moduleId;
      })
    },
    addRow:function(){          //添加
      this.mainAddShow = !this.mainAddShow;
      this.mainContentaddC = !this.mainContentaddC;
      this.selectmodule();
    },
    onSubmit:function(formName){  //获取输入框的内容向接口发送
      this.form.description='';
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http.post(this.$store.state.api+'/operation/insert',{moduleId:this.moduleId,operationName:this.form.operationName,operationUrl:this.form.operationUrl,description:this.form.description})
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
          this.$http.post(this.$store.state.api+'/operation/update',{id:this.form.id,moduleId:this.moduleId,operationName:this.form.operationName,operationUrl:this.form.operationUrl,description:this.form.description})
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
    onCancel:function(formName){        //关闭蒙层
      this.form.operationName='';
      this.form.description='';
      this.moduleId='';
      this.module='';
      this.form.operationUrl='';
      this.mainAddShow = !this.mainAddShow;
      this.mainContentaddC = !this.mainContentaddC;
      this.$refs[formName].resetFields();
    },
    selectmodule:function(){
      this.$http.get(this.$store.state.api+'/constant/module')
      .then((res)=>{
        this.module = res.body;
      });
    },
    onCancelU:function(formName){
      this.form.operationName='';
      this.form.description='';
      this.moduleId='';
      this.module='';
      this.form.operationUrl='';
      this.mainAddShow = !this.mainAddShow;
      this.mainContentviewC = !this.mainContentviewC;
      this.$refs[formName].resetFields();
    },
    onCancelUU:function(){
      this.form.operationName='';
      this.form.description='';
      this.moduleId='';
      this.module='';
      this.form.operationUrl='';
      this.mainAddShow = !this.mainAddShow;
      this.toviewC = !this.toviewC;
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
      this.$http.get(this.$store.state.api+'/operation/',{params:{pageNum:this.pageIndex,pageSize:this.pageSize}},{emulateJSON: true})
      .then((res)=>{
        this.tableData = res.body.dataList;
        })
    },
    mainSearch:function(){    //查询
      this.fullscreenLoading = true;
        setTimeout(() => {
          this.fullscreenLoading = false;
          this.$http.get(this.$store.state.api+'/operation/',{params:{pageNum:1,pageSize:this.pageSize,operationName:this.mainSearchinput}},{emulateJSON: true})
          .then((res)=>{
          this.tableData = res.body.dataList;
          })
        }, 1000);
    }
  }
}
</script>

<style>
#operation {
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

#operation .toviewC {
  width: 650px;
  height: 500px;
  background: #fff;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  border-radius: 10px;
}

.mainContentadd {
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

#operation .mainContentview {
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

.cancelButton {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 15px;
  margin-left: -100px;
}

.floatLeft {
  float: left;
}

.toviewC .viewPadding {
  margin-top: 20px;
}

#operation .description {
  width: 400px !important;
}

.main-add-input-B {
  width: 70% !important;
}

#selectContents .el-form-item__content {
  margin-left: 73px !important;
}

.viewDescription {
  width: 700px !important;
}

#operation .samllButton {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 15px;
  margin-left: -100px;
}
</style>