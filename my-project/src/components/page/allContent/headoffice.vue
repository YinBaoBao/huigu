<template>
  <div id="headoffice">
  	<div class="mainNavadd">
      <el-button type="primary" @click="addRow()">添加</el-button>
    </div>
    <div class="mainSearch">
      <el-input class="mainSearchFloat" v-model="mainSearchinput" placeholder="请输入银行总行名称"></el-input>
      <el-button class="mainSearchFloat" type="primary" @click="mainSearch()" v-loading.fullscreen.lock="fullscreenLoading">搜索</el-button>
    </div>

    <div class="mainNavaddB" v-show="mainAddShow">
      <div class="mainContentadd" v-show="mainContentaddC"><!--添加信息的表格-->
        <p class="Updatetitle">添加银行总行</p>
        <hr color="#E5E9F2" width="90%">
      	<el-form ref="ruleOffice" :rules="ruleOffice" :model="form" label-width="100px" label-position="right">
          <el-form-item label="银行总行" prop="Newupdate">
            <el-input class="main-add-input" v-model="form.Newupdate"></el-input>
          </el-form-item>
          <el-form-item class="floatLeft" label="银行Logo">
            <el-upload
                class="avatar-uploader"
                :headers="{'Authorization':headersA}"
                :action="action"
                :show-file-list="false"
                :on-success="bankLogoSuccess"
                :before-upload="beforeBankLogoUpload">
                <img v-if="banklogoUrl" :src="banklogoUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            <!--<el-dialog size="tiny">
              <img width="100%" :src="dialogImageUrl" alt>
            </el-dialog>-->
          </el-form-item>

          <el-form-item class="samllButton">
            <el-button type="primary" @click="onSubmit('ruleOffice')">提交</el-button>
            <el-button @click="onCancel('ruleOffice')">取消</el-button>
          </el-form-item>

        </el-form>
      </div>
      <div class="mainContentview" v-show="mainContentviewC">
        <p class="Updatetitle">修改银行总行</p>
        <hr color="#E5E9F2" width="90%">
         <el-form ref="ruleOffice" :rules="ruleOffice" :model="form" label-width="100px" label-position="right">
          <el-form-item label="银行总行" prop="Newupdate">
            <el-input class="main-add-input" v-model="form.Newupdate"></el-input>
          </el-form-item>
          <el-form-item class="floatLeft" label="银行Logo">
            <el-upload v-show="logoUpdate2"
                class="avatar-uploader"
                :headers="{'Authorization':headersA}"
                :action="action"
                :show-file-list="false"
                :on-success="bankLogoSuccess"
                :before-upload="beforeBankLogoUpload">
                <img v-if="banklogoUrl" :src="banklogoUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <div class="logoUpdateImg" v-show="logoUpdateView2">
              <img :src="bankLogo" alt="">
              <div class="logoUpdateControl logoUpdatedisplay">
                <span class="logoUpdateControlSpan" @click="deleteLogo"><i class="el-icon-delete"></i></span>
              </div>
            </div>
            <!--<el-dialog size="tiny">
              <img width="100%" :src="dialogImageUrl" alt>
            </el-dialog>-->
          </el-form-item>
          <el-form-item class="samllButton">
            <el-button type="primary" @click="onSubmitU('ruleOffice')">确定</el-button>
            <el-button @click="onCancelU('ruleOffice')">取消</el-button>
          </el-form-item>

        </el-form>      
      </div>
    </div>


    <el-table :data="tableData" style="width: 100%" border tooltip-effect="dark">
    </el-table-column>
      <el-table-column type="index" label="序号" width="65px"></el-table-column>
      <el-table-column prop="bankName" label="银行总行"></el-table-column>
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
			  form:{
	        id:'',
          Oldupdate:'',
          Oldadd:'',
          updateID:'',
          Newadd:'',
          Newupdate:'',
	      },
        action:'',
      	mainContentviewV:'',
        mainSearchinput:'',
        banklogoUrl:'',
        headersA:'',
        bankLogo:'',
        banklogoType:'',
			  pageIndex:1,
	    	pageSize:10,
	    	total:1,
	    	pageSizes:[10,20,50,100],
	    	mainAddShow:false,
        mainContentaddC:false,
        logoUpdateView2:true,
        mainContentviewC:false,
        fullscreenLoading: false,
        logoUpdate2:false,
        ruleOffice:{
          Newupdate:[
            { required: true, message: '请输入名称', trigger: 'blur' }
          ]
        }
		}
	},
  created:function(){
    this.getUsers();
    let username = sessionStorage.getItem('huigujia_token');
    this.headersA=username;
    this.action=this.$store.state.api+"/image/upload";
  },
	methods:{
    getUsers(){				//查询初始数据
      this.$http.get(this.$store.state.api+'/bank/pages',{params:{pageNum:this.pageIndex,pageSize:this.pageSize}},{emulateJSON: true})
      .then((res)=>{
        this.tableData = res.body.dataList; 
        this.total = res.body.objectotalNumber;
      });
    },
		changeRow:function(index){			//修改
      this.logoUpdate2=false;
      this.logoUpdateView2=true;
      this.mainAddShow = !this.mainAddShow;
      this.mainContentviewC = !this.mainContentviewC;
      this.$http.get(this.$store.state.api+'/bank/id',{params:{id:this.tableData[index].id}},{emulateJSON: true})
      .then((res)=>{
        this.form.Newupdate= res.body.data.bankName;
      });
      this.form.updateID = this.tableData[index].id;
      this.$http.get(this.$store.state.api+'/image/image',{params:{module:"bank",type:"logo",id:this.tableData[index].id}},{emulateJSON: true})
      .then((res)=>{
        this.bankLogo="data:image/png;base64,"+res.body.data.image;
        this.banklogoType= res.body.data.type;
      })
		},
		deleteRow:function(index){			//删除
      this.fullscreenLoading = true;
        setTimeout(() => {
          this.fullscreenLoading = false;
          this.$http.delete(this.$store.state.api+'/bank/id',{params:{id:this.tableData[index].id}},{emulateJSON: true})
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
        			this.$http.post(this.$store.state.api+'/bank/insert',{bankName:this.form.Newupdate,logoType:this.banklogoType})
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
		onCancel:function(formName){				//关闭蒙层
      this.clearUp();
			this.mainAddShow = !this.mainAddShow;
      this.mainContentaddC = !this.mainContentaddC;
      this.$refs[formName].resetFields();
		},
    onSubmitU:function(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http.post(this.$store.state.api+'/bank/update',{id:this.form.updateID,bankName:this.form.Newupdate,logoType:this.banklogoType})
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
      this.form.id='';
      this.form.Newupdate='';
      this.banklogoUrl='';
      this.banklogoType='';
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
    deleteLogo:function(){
      this.logoUpdateView2 = !this.logoUpdateView2;
      this.logoUpdate2 = !this.logoUpdate2;
    },
    pageIndexChange: function (pageIndex) {   //第几页
      this.pageIndex = pageIndex;
      this.fetchData();
    },
    fetchData: function(){
      this.$http.get(this.$store.state.api+'/bank/pages',{params:{pageNum:this.pageIndex,pageSize:this.pageSize}},{emulateJSON: true})//url 发送的值
      .then((res)=>{
        this.tableData = res.body.dataList; 
            })
      },
     mainSearch:function(){    //查询
      this.fullscreenLoading = true;
        setTimeout(() => {
          this.fullscreenLoading = false;
          this.$http.get(this.$store.state.api+'/bank/pages',{params:{pageNum:1,pageSize:this.pageSize,bankName:this.mainSearchinput}},{emulateJSON: true})
          .then((res)=>{
          this.tableData = res.body.dataList;
          })
        }, 1000);
      },
      beforeBankLogoUpload(file) {
        const isPNG = file.type === 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isPNG) {
          this.$message.error('上传头像图片只能是 png 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isPNG && isLt2M;
      },
      bankLogoSuccess(res, file){
        this.banklogoUrl = URL.createObjectURL(file.raw);
        this.banklogoType=res;
        //alert(this.banklogoType);
      },
	}
}
</script>

<style>
#headoffice {
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

.floatLeft {
  float: left;
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

#headoffice .samllButton {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 15px;
  margin-left: -100px;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #20a0ff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 60px;
  height: 60px;
  line-height: 60px !important;
  text-align: center;
}

.avatar {
  width: 60px;
  height: 60px;
  display: block;
}

.logoUpdateImg {
  height: 60px;
  width: 60px;
  border-radius: 5px;
}

.logoUpdateImg img {
  width: 100%;
  height: 100%;
  border-radius: 5px;
}
.logoUpdateControlSpan {
  position: relative;
  top: 10px;
  left: 23px;
}
.logoUpdateControl {
  width: 100%;
  height: 100%;
  background: rgba(204,204,204, 0.66);
  z-index: 999;
  border-radius: 5px;
  position: absolute;
  top: 0px;
}

.logoUpdatedisplay {
  display: none;
}

.logoUpdateImg:hover .logoUpdatedisplay {
  display: block;
}
</style>
