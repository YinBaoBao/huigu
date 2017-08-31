<template>
	<div id="bankmore">
	 <div class="mainNavadd">
      <el-button type="primary" @click="addRow()">添加</el-button>
    </div>
    <div class="mainSearch">
      <!--<el-input class="mainSearchFloat" v-model="mainSearchinput" placeholder="请输入银行名称"></el-input>
      <el-button class="mainSearchFloat" type="primary" @click="mainSearch()">搜索</el-button>-->
      <el-select class="mainSearchFloat paddingButton" v-model="channelIdq" v-show="bankuserC" @change="selectChanneld" v-loading.fullscreen.lock="fullscreenLoading" placeholder="请选择评估公司">
        <el-option v-for="item in channelIdqq" :key="item.id" :label="item.channelName" :value="item.id"></el-option>
      </el-select>
    </div>

    <div class="mainNavaddB" v-show="mainAddShow">
      <div class="mainContentadd" v-show="mainContentaddC"><!--添加信息的表格-->
        <p class="Updatetitle">增加银行</p>
        <hr color="#E5E9F2" width="90%">
        <el-form ref="ruleBank" :rules="ruleBank" :model="form" label-width="125px" label-position="right">
          <el-form-item class="floatLeft" id="selectContent" label="省份">
            <el-select class="main-add-input-B" v-model="provinceId" @change="selectprovince" placeholder="请选择省份" :disabled="bankuserCC">
              <el-option v-for="item in provinceIds" :key="item.id" :label="item.provinceName" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="floatLeft" id="selectContent" label="城市">
            <el-select class="main-add-input-B" v-model="cityId" @change="selectcity" placeholder="请选择城市" :disabled="bankuserCC">
              <el-option v-for="item in cityIds" :key="item.id" :label="item.cityName" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <div class="clear"></div>
          <el-form-item class="floatLeft" id="selectContent" label="所属代理商">
            <el-select class="main-add-input-B" v-model="channelId" placeholder="请选择代理商" :disabled="bankuserCC">
              <el-option v-for="item in channelIds" :key="item.id" :label="item.channelName" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="floatLeft" id="selectContent" label="所属银行总行">
            <el-select class="main-add-input-B" v-model="bankId" @change="selectbank" placeholder="请选择银行总行">
              <el-option v-for="item in bankIds" :key="item.id" :label="item.bankName" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <div class="clear"></div>
          <el-form-item class="floatLeft" id="selectContent" label="所属银行支行">
            <el-select class="main-add-input-B" v-model="bankBranchId" placeholder="请选择银行支行">
              <el-option v-for="item in bankBranchIds" :key="item.id" :label="item.branchName" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="floatLeft" label="联系人姓名" prop="contactPerson">
            <el-input class="main-add-input" v-model="form.contactPerson"></el-input>
          </el-form-item>
          <div class="clear"></div>
          <el-form-item class="floatLeft" label="联系人手机号">
            <el-input class="main-add-input" v-model="form.phoneNumber"></el-input>
          </el-form-item>
          <el-form-item class="floatLeft" label="联系人固定电话">
            <el-input class="main-add-input" v-model="form.telNumber"></el-input>
          </el-form-item>
          <div class="clear"></div>
           <el-form-item class="floatLeft" label="联系人邮箱">
            <el-input class="main-add-input" v-model="form.email"></el-input>
          </el-form-item>
          <el-form-item class="floatLeft" label="公司详细地址">
            <el-input class="main-add-input" v-model="form.address"></el-input>
          </el-form-item>
          <div class="clear"></div>
          <el-form-item class="floatLeft description" label="备注">
            <el-input type="textarea" class="main-add-input" v-model="form.description"></el-input>
          </el-form-item>          
          

          <div class="addButtonDiv">
            <el-button type="primary" @click="onSubmit('ruleBank')">创建</el-button>
            <el-button @click="onCancel('ruleBank')">取消</el-button>
          </div>

        </el-form>
      </div>
      <div class="mainContentview" v-show="mainContentviewC">
        <p class="Updatetitle">修改银行</p>
        <hr color="#E5E9F2" width="90%">
         <el-form ref="ruleBank" :rules="ruleBank" :model="form" label-width="125px" label-position="right">
          <!--<el-form-item class="floatLeft" label="ID">
            <el-input class="main-add-input" v-model="form.id" :disabled="true"></el-input>
          </el-form-item>-->
          
          <el-form-item class="floatLeft" id="selectContent" label="省份">
            <el-select class="main-add-input-B" v-model="provinceId" @change="selectprovince" placeholder="请选择省份" :disabled="bankuserCC">
              <el-option v-for="item in provinceIds" :key="item.id" :label="item.provinceName" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="floatLeft" id="selectContent" label="城市">
            <el-select class="main-add-input-B" v-model="cityId" @change="selectcity" placeholder="请选择城市" :disabled="bankuserCC">
              <el-option v-for="item in cityIds" :key="item.id" :label="item.cityName" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <div class="clear"></div>
          <el-form-item class="floatLeft" id="selectContent" label="所属代理商">
            <el-select class="main-add-input-B" v-model="channelId" placeholder="请选择代理商" :disabled="bankuserCC"> 
              <el-option v-for="item in channelIds" :key="item.id" :label="item.channelName" :value="item.id" ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="floatLeft" id="selectContent" label="所属银行总行">
            <el-select class="main-add-input-B" v-model="bankId" @change="selectbank" placeholder="请选择银行总行">
              <el-option v-for="item in bankIds" :key="item.id" :label="item.bankName" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <div class="clear"></div>
          <el-form-item class="floatLeft" id="selectContent" label="所属银行支行">
            <el-select class="main-add-input-B" v-model="bankBranchId" placeholder="请选择银行支行">
              <el-option v-for="item in bankBranchIds" :key="item.id" :label="item.branchName" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="floatLeft" label="联系人姓名" prop="contactPerson">
            <el-input class="main-add-input" v-model="form.contactPerson"></el-input>
          </el-form-item>
          <div class="clear"></div>
          <el-form-item class="floatLeft" label="联系人手机号">
            <el-input class="main-add-input" v-model="form.phoneNumber"></el-input>
          </el-form-item>
          <el-form-item class="floatLeft" label="联系人固定电话">
            <el-input class="main-add-input" v-model="form.telNumber"></el-input>
          </el-form-item>
          <div class="clear"></div>
           <el-form-item class="floatLeft" label="联系人邮箱">
            <el-input class="main-add-input" v-model="form.email"></el-input>
          </el-form-item>
          <el-form-item class="floatLeft" label="公司详细地址">
            <el-input class="main-add-input" v-model="form.address"></el-input>
          </el-form-item>
          <div class="clear"></div>
          <el-form-item class="floatLeft description" label="备注">
            <el-input type="textarea" class="main-add-input" v-model="form.description"></el-input>
          </el-form-item>          
          

          <div class="addButtonDiv">
            <el-button type="primary" @click="onSubmitU('ruleBank')">确定</el-button>
            <el-button @click="onCancelU('ruleBank')">取消</el-button>
          </div>

        </el-form>      
      </div>

      <div class="toviewC" v-show="toviewC">                  <!--查看-->
        <p class="Updatetitle">详情</p>
        <hr color="#E5E9F2" width="90%">
        <el-form ref="form"  label-width="125px">
          <!--<el-form-item class="floatLeft" label="ID">
            <el-input class="main-add-input" v-model="form.id" :disabled="true"></el-input>
          </el-form-item>-->
          <el-form-item class="floatLeft" label="公司编号">
            <el-input class="main-add-input" v-model="form.channelId" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item class="floatLeft" label="公司名称">
            <el-input class="main-add-input" v-model="form.channelName" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item class="floatLeft" label="公司详细地址">
            <el-input class="main-add-input" v-model="form.address" :disabled="true"></el-input>
          </el-form-item>
          <div class="clear"></div>
          <el-form-item class="floatLeft" label="总行">
            <el-input class="main-add-input" v-model="form.bankName" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item class="floatLeft" label="支行">
            <el-input class="main-add-input" v-model="form.bankBranchName" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item class="floatLeft" label="省份">
            <el-input class="main-add-input" v-model="form.provinceName" :disabled="true"></el-input>
          </el-form-item>
          <div class="clear"></div>
          <el-form-item class="floatLeft" label="城市">
            <el-input class="main-add-input" v-model="form.cityName" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item class="floatLeft" label="联系人姓名">
            <el-input class="main-add-input" v-model="form.contactPerson" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item class="floatLeft" label="联系人手机号">
            <el-input class="main-add-input" v-model="form.phoneNumber" :disabled="true"></el-input>
          </el-form-item>
          <div class="clear"></div>
          <el-form-item class="floatLeft" label="联系人固定电话">
            <el-input class="main-add-input" v-model="form.telNumber" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item class="floatLeft" label="联系人邮箱">
            <el-input class="main-add-input" v-model="form.email" :disabled="true"></el-input>
          </el-form-item>
          <!--<el-form-item class="floatLeft" label="创建人">
            <el-input class="main-add-input" v-model="form.createBy" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item class="floatLeft" label="创建日期">
            <el-input class="main-add-input" v-model="form.createTime" :disabled="true"></el-input>
          </el-form-item>-->
          <el-form-item class="floatLeft" label="更新人">
            <el-input class="main-add-input" v-model="form.updateBy" :disabled="true"></el-input>
          </el-form-item>
          <div class="clear"></div>
          <el-form-item class="floatLeft" label="更新日期">
            <el-input class="main-add-input" v-model="form.updateTime" :disabled="true"></el-input>
          </el-form-item>
          <div class="clear"></div>
          <el-form-item class="floatLeft descriptionS" label="备注">
            <el-input type="textarea" class="main-add-input" v-model="form.description" :disabled="true"></el-input>
          </el-form-item>          
          <div class="clear"></div>

          <el-form-item class="viewButton">
            <el-button @click="onCancelUU()">取消</el-button>
          </el-form-item>

        </el-form>      
      </div>
    </div>


    <el-table :data="tableData" style="width: 100%" border tooltip-effect="dark">
    </el-table-column>
      <el-table-column type="index" label="序号" width="65px"></el-table-column>
      <el-table-column prop="bankBranchName" label="银行名称"></el-table-column>
      <el-table-column prop="bankName" label="所属总行"></el-table-column>
      <el-table-column prop="cityName" label="城市"></el-table-column>
      <el-table-column prop="channelName" label="所属公司"></el-table-column>
      <el-table-column prop="phoneNumber" label="电话"></el-table-column>
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
      mainAddShow:false,
      mainContentaddC:false,
      mainContentviewC:false,
      toviewC:false,
      fullscreenLoading: false,
      bankuserC:true,
      bankuserCC:false,
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
      ruleBank:{
        contactPerson:[
            { required: true, message: '请输入银行', trigger: 'blur' }
        ]
      }
    }
  },
  created:function(){
    this.getUsers();
    this.getbankUser();
  },
  methods:{
    getUsers(){
      this.$http.get(this.$store.state.api+'/channelbank/',{params:{pageNum:this.pageIndex,pageSize:this.pageSize}},{emulateJSON: true})
      .then((res)=>{
        this.tableData = res.body.dataList;
        this.total = res.body.objectotalNumber;
      });
      this.$http.get(this.$store.state.api+'/constant/channel')
      .then((res)=>{
        this.channelIdqq = res.body;
      });
    },
     getbankUser:function(){
      var authorities="";
      this.$http.get(this.$store.state.admin+'/login/user')
      .then((res)=>{
        authorities = res.body.data.authorities;
        if(authorities.indexOf("ROLE_ADMIN_CONFIG")>=0){
          this.bankuserC=true;
          this.bankuserCC=false;
        }else{
          this.bankuserC=false;
          this.bankuserCC=true;
          let userprovinceId = res.body.data.province.code;
          userprovinceId = parseInt(userprovinceId);
          let usercityId = res.body.data.city.code;
          usercityId = parseInt(usercityId);

          this.provinceId=userprovinceId;
          this.cityId=usercityId;
          this.channelId=res.body.data.department.id;
        }
      })
    },
    getselect(){
      this.$http.get(this.$store.state.api+'/constant/provinces')
      .then((res)=>{
        this.provinceIds = res.body;
      })
    },
    getchannel(){
      this.$http.get(this.$store.state.api+'/constant/channel')
      .then((res)=>{
        this.channelIds = res.body;
      })
    },
    getbank(){
      this.$http.get(this.$store.state.api+'/constant/bank')
      .then((res)=>{
        this.bankIds = res.body;
      })
    },
    getbranchbank(){
      this.$http.get(this.$store.state.api+'/constant/branch',{params:{bankId:this.bankId,provinceId:this.provinceId,cityId:this.cityId}},{emulateJSON: true})
      .then((res)=>{
        this.bankBranchIds=res.body;
      })
    },
    changeRow:function(index){      //修改
      this.mainAddShow = !this.mainAddShow;
      this.mainContentviewC = !this.mainContentviewC;
      this.$http.get(this.$store.state.api+'/channelbank/id',{params:{id:this.tableData[index].id}},{emulateJSON: true})
      .then((res)=>{
        this.form=res.body.data;
        this.provinceId=res.body.data.provinceId;
        this.cityId=res.body.data.cityId;
        this.bankId=res.body.data.bankId;
        this.bankBranchId=res.body.data.bankBranchId;
        this.channelId=res.body.data.channelId;
      });
      this.getselect();
      this.getchannel();
      this.getbank();
    },
    deleteRow:function(index){      //删除
      this.fullscreenLoading = true;
        setTimeout(() => {
          this.fullscreenLoading = false;
          this.$http.delete(this.$store.state.api+'/channelbank/id',{params:{id:this.tableData[index].id}},{emulateJSON: true})
      .then((res)=>{
        this.getUsers();
      })
        }, 1000);
    },
    addRow:function(){          //添加
      this.mainAddShow = !this.mainAddShow;
      this.mainContentaddC = !this.mainContentaddC;
      this.getselect();
      this.getchannel();
      this.getbank();
      this.getbankUser();
    },
    toView:function(index){          //查看
      this.mainAddShow=!this.mainAddShow;
      this.toviewC=!this.toviewC;
      this.$http.get(this.$store.state.api+'/channelbank/id',{params:{id:this.tableData[index].id}},{emulateJSON: true})
      .then((res)=>{
        this.form=res.body.data;
      })
    },
    onSubmit:function(formName){
    this.$refs[formName].validate((valid) => {
        if (valid) {  
          this.$http.post(this.$store.state.api+'/channelbank/insert',{phoneNumber:this.form.phoneNumber,provinceId:this.provinceId,status:this.form.status,telNumber:this.form.telNumber,address:this.form.address,bankBranchId:this.bankBranchId,bankId:this.bankId,channelId:this.channelId,cityId:this.cityId,contactPerson:this.form.contactPerson,description:this.form.description,email:this.form.email,})
          .then((res)=>{
            this.getUsers();
          })
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
            this.$http.post(this.$store.state.api+'/channelbank/update',{address:this.form.address,bankBranchId:this.bankBranchId,bankId:this.bankId,channelId:this.channelId,cityId:this.cityId,contactPerson:this.form.contactPerson,description:this.form.description,email:this.form.email,id:this.form.id,phoneNumber:this.form.phoneNumber,provinceId:this.provinceId,status:this.form.status,telNumber:this.form.telNumber})
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
    clearUp:function(){
      this.provinceId='';
      this.cityId='';
      this.bankId='';
      this.bankBranchId='';
      this.channelId='';
      this.form.contactPerson='';
      this.form.phoneNumber='';
      this.form.telNumber='';
      this.form.email='';
      this.form.address='';
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
      this.clearUp();
      this.mainAddShow = !this.mainAddShow;
      this.toviewC = !this.toviewC;
    },
    selectprovince:function(){
      this.$http.get(this.$store.state.api+'/constant/citys/provinceId',{params:{provinceId:this.provinceId}},{emulateJSON: true})
      .then((res)=>{
        this.cityIds = res.body;
      });
      this.getbranchbank();
    },
    selectcity:function(){
      this.getbranchbank();
      this.$http.get(this.$store.state.api+'/constant/channelByCity',{params:{provinceId:this.provinceId,cityId:this.cityId}},{emulateJSON: true})
      .then((res)=>{
        this.channelIds = res.body;
      });
    },
    selectbank:function(){
      this.getbranchbank();
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
      this.$http.get(this.$store.state.api+'/channelbank/',{params:{pageNum:this.pageIndex,pageSize:this.pageSize}},{emulateJSON: true})
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
      this.$http.get(this.$store.state.api+'/channelbank/',{params:{pageNum:1,pageSize:this.pageSize,channelId:this.channelIdq}},{emulateJSON: true})
      .then((res)=>{
      this.tableData = res.body.dataList;
      })
    }
  }
}
</script>

<style>
#bankmore {
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

#bankmore .mainContentadd {
  width: 650px;
  height: 570px;
  background: #fff;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  border-radius: 10px;
}

#bankmore .mainContentview {
  width: 650px;
  height: 560px;
  background: #fff;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  border-radius: 10px;
}

#bankmore .toviewC {
  width: 980px;
  height: 560px;
  background: #fff;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  border-radius: 10px;
}

.description {
  width: 715px !important;
}
.descriptionS {
  width: 1100px !important;
}

.addButton {
  margin-left: 115px;
}

.viewButton {
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

.main-add-input-B {
  width: 70% !important;
}

#selectContent .el-form-item__content {
  margin-left: 100px !important;
}

#bankmore .addButtonDiv {
  margin-left: 260px;
  position: absolute;
  bottom: 15px;
}

#bankmore .mainNavadd{
  margin-left: 185px;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>