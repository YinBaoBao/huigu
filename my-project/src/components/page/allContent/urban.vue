<template>
  <div id="urban">
  	<div class="mainNavadd">
      <el-button type="primary" @click="addRow()">添加</el-button>
    </div>
    <div class="mainSearch">
      <el-input class="mainSearchFloat" v-model="mainSearchinput" placeholder="请输入城市名称"></el-input>
      <el-button class="mainSearchFloat" type="primary" @click="mainSearch()" v-loading.fullscreen.lock="fullscreenLoading">搜索</el-button>
    </div>

     <div class="mainNavaddB" v-show="mainAddShow">
      <div class="mainContentadd" v-show="mainContentaddC">       <!--添加-->
        <p class="Updatetitle">增加城市</p>
        <hr color="#E5E9F2" width="90%">
        <el-form ref="ruleUrban" :rules="ruleUrban" :model="form" label-width="100px" label-position="right">
          <el-form-item label="编号" prop="id">
            <el-input class="main-add-input" v-model="form.id"></el-input>
          </el-form-item>
          <el-form-item label="省份">
            <el-select v-model="value" class="main-add-input-S" placeholder="请选择活动区域">
              <el-option v-for="item in options" :key="item.id" :label="item.provinceName" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="城市" prop="cityupdate">
            <el-input class="main-add-input" v-model="form.cityupdate"></el-input>
          </el-form-item>

          <el-form-item class="samllButton">
            <el-button type="primary" @click="onSubmit('ruleUrban')">提交</el-button>
            <el-button @click="onCancel('ruleUrban')">取消</el-button>
          </el-form-item>

        </el-form>
      </div>
      <div class="mainContentview" v-show="mainContentviewC">
        <p class="Updatetitle">修改城市</p>
        <hr color="#E5E9F2" width="90%">
         <el-form ref="ruleUrban" :rules="ruleUrban" :model="form" label-width="100px" label-position="right">
         <el-form-item label="编号">
            <el-input class="main-add-input" v-model="form.cityupdateID" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="省份">
            <el-select v-model="value" class="main-add-input-S" placeholder="请选择活动区域">
              <el-option v-for="item in options" :key="item.id" :label="item.provinceName" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="城市" prop="cityupdate">
            <el-input class="main-add-input" v-model="form.cityupdate"></el-input>
          </el-form-item>

          <el-form-item class="samllButton">
            <el-button type="primary" @click="onSubmitU('ruleUrban')">确定</el-button>
            <el-button @click="onCancelU('ruleUrban')">取消</el-button>
          </el-form-item>

        </el-form>  
      </div>
    </div>      


    <el-table :data="tableData" style="width: 100%" border tooltip-effect="dark">
    </el-table-column>
      <el-table-column type="index" label="序号" width="65px"></el-table-column>
      <el-table-column prop="provinceName" label="省份"></el-table-column>
      <el-table-column prop="cityName" label="城市"></el-table-column>
      <el-table-column label="操作">
         <template scope="scope">
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
      fullscreenLoading: false,
      form:{
            id:'',
            provinceadd: '',
            provinceupdate:'',
            cityupdateID:'',
            cityupdate:'',
            cityadd:'',
          },
      mainContentviewV:'',
      pageIndex:1,
      pageSize:10,
      total:1,
      pageSizes:[10,20,50,100],
      mainSearchinput:'',
      mainAddShow:false,
      mainContentaddC:false,
      mainContentviewC:false,
      options: [],
      value: '',
      ruleUrban:{
        cityupdate:[
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        id:[
          { required: true, message: '请输入编码', trigger: 'blur' }
        ]
      }
		}
	},
  created:function(){
    this.getUsers();
    this.selectDate();
  },
  computed:{
    provinceInformation(){
      return this.$store.state.provinceInformation;
    },
  },
	methods:{
    getUsers(){				//查询初始数据
      this.$http.get(this.$store.state.api+'/city/pages',{params:{pageNum:this.pageIndex,pageSize:this.pageSize}},{emulateJSON: true})
      .then((res)=>{
        this.tableData = res.body.dataList; 
        this.total = res.body.objectotalNumber;
      })
    },
    selectDate(){
      this.$http.get(this.$store.state.api+'/constant/provinces')
      .then((res)=>{
        this.options = res.body;
      })
    },
		changeRow:function(index){			//修改
      this.mainAddShow = !this.mainAddShow;
      this.mainContentviewC = !this.mainContentviewC;
      this.$http.get(this.$store.state.api+'/city/id',{params:{id:this.tableData[index].id,}},{emulateJSON: true})
      .then((res)=>{
        this.value = res.body.data.provinceId;
        this.form.cityupdate = res.body.data.cityName;
      })
      this.form.cityupdateID = this.tableData[index].id;
		},
		deleteRow:function(index){			//删除
      this.fullscreenLoading = true;
        setTimeout(() => {
          this.fullscreenLoading = false;
          this.$http.delete(this.$store.state.api+'/city/delete/id',{params:{id:this.tableData[index].id}},{emulateJSON: true})
          .then((res)=>{
            this.getUsers();
          })
        }, 1000);
		},
		addRow:function(){					//添加
			this.mainAddShow = !this.mainAddShow;
      this.mainContentaddC = !this.mainContentaddC;
		},
		onSubmit:function(formName){  //获取输入框的内容向接口发送
      this.$refs[formName].validate((valid) => {
        if (valid) {
    			this.$http.post(this.$store.state.api+'/city/insert/',{id:this.form.id,provinceId:this.value,cityName:this.form.cityupdate})
          .then((res)=>{
            this.getUsers();
            this.form.id=addId;
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
    clearUp:function(){
      this.form.id="";
      this.form.cityupdate="";
      this.value="";
    },
		onCancel:function(formName){				//关闭蒙层
      this.clearUp();
			this.mainAddShow = !this.mainAddShow;
      this.mainContentaddC = !this.mainContentaddC;
      this.$refs[formName].resetFields();
		},
    onSubmitU:function(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http.post(this.$store.state.api+'/city/update/',{id:this.form.cityupdateID,provinceId:this.value,cityName:this.form.cityupdate})
          .then((res)=>{
            this.getUsers();
          })
          this.onCancelU(formName);
        } else {  
            this.open();
            return false;
          }
      });
    },
    onCancelU:function(formName){
      this.clearUp();
      this.mainAddShow = !this.mainAddShow;
      this.mainContentviewC = !this.mainContentviewC;
      this.$refs[formName].resetFields();
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
      this.$http.get(this.$store.state.api+'/city/pages',{params:{pageNum:this.pageIndex,pageSize:this.pageSize}},{emulateJSON: true})//url 发送的值
      .then((res)=>{
        this.tableData = res.body.dataList;
          })
        },
    mainSearch:function(){    //查询
      this.fullscreenLoading = true;
      setTimeout(() => {
      this.fullscreenLoading = false;
      this.$http.get(this.$store.state.api+'/city/pages',{params:{pageNum:1,pageSize:this.pageSize,cityName:this.mainSearchinput}},{emulateJSON: true})
      .then((res)=>{
      this.tableData = res.body.dataList;
      })
      }, 1000);
    }
	}
}
</script>

<style>
#urban {
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

.mainContentadd {
  width: 400px;
  height: 300px;
  background: #fff;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  border-radius: 10px;
}

.mainContentview {
  width: 400px;
  height: 300px;
  background: #fff;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  border-radius: 10px;
}

#urban .samllButton {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 15px;
  margin-left: -100px;
}

.main-add-input-S {
  width: 80% !important;
}
</style>
