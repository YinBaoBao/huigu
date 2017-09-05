<template>
  <div id="branch">
    <div class="mainNavadd">
      <el-button type="primary" @click="addRow()">添加</el-button>
    </div>
    <div class="mainSearch">
      <el-input class="mainSearchFloat" v-model="mainSearchinput" placeholder="请输入银行支行"></el-input>
      <el-button class="mainSearchFloat" type="primary" @click="mainSearch()"
                 v-loading.fullscreen.lock="fullscreenLoading">搜索
      </el-button>
    </div>

    <div class="mainNavaddB" v-show="mainAddShow">
      <div class="mainContentadd" v-show="mainContentaddC"><!--添加信息的表格-->
        <p class="Updatetitle">增加银行支行</p>
        <hr color="#E5E9F2" width="90%">
        <el-form ref="ruleBranch" :rules="ruleBranch" :model="form" label-width="100px" label-position="right">
          <el-form-item label="省份" prop="province">
            <el-select v-model="form.province" class="main-add-input-S" @change="selectCity" placeholder="请选择省份">
              <el-option v-for="item in options" :key="item.id" :label="item.provinceName" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="城市">
            <el-select v-model="form.city" class="main-add-input-S" placeholder="请选择城市">
              <el-option v-for="item in optionss" :key="item.id" :label="item.cityName" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="银行总行">
            <el-select v-model="form.headoffice" class="main-add-input-S" placeholder="请选择银行总行">
              <el-option v-for="item in optionsss" :key="item.id" :label="item.bankName" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="支行">
            <el-input class="main-add-input" v-model="form.Addbranch"></el-input>
          </el-form-item>

          <el-form-item class="samllButton">
            <el-button type="primary" @click="onSubmit('ruleBranch')">提交</el-button>
            <el-button @click="onCancel('ruleBranch')">取消</el-button>
          </el-form-item>

        </el-form>
      </div>
      <div class="mainContentview" v-show="mainContentviewC">
        <p class="Updatetitle">修改银行支行</p>
        <hr color="#E5E9F2" width="90%">
        <el-form ref="ruleBranch" :rules="ruleBranch" :model="form" label-width="100px" label-position="right">
          <el-form-item label="省份" prop="province">
            <el-select v-model="form.province" class="main-add-input-S" @change="selectCity" placeholder="请选择省份">
              <el-option v-for="item in options" :key="item.id" :label="item.provinceName" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="城市">
            <el-select v-model="form.city" class="main-add-input-S" placeholder="请选择城市">
              <el-option v-for="item in optionss" :key="item.id" :label="item.cityName" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="银行总行">
            <el-select v-model="form.headoffice" class="main-add-input-S" placeholder="请选择银行总行">
              <el-option v-for="item in optionsss" :key="item.id" :label="item.bankName" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="支行">
            <el-input class="main-add-input" v-model="form.Addbranch"></el-input>
          </el-form-item>
          <el-form-item class="samllButton">
            <el-button type="primary" @click="onSubmitU('ruleBranch')">确定</el-button>
            <el-button @click="onCancelU('ruleBranch')">取消</el-button>
          </el-form-item>

        </el-form>
      </div>
    </div>


    <el-table :data="tableData" style="width: 100%" border tooltip-effect="dark">
      </el-table-column>
      <el-table-column type="index" label="序号" width="65px"></el-table-column>
      <el-table-column prop="provinceName" label="省份"></el-table-column>
      <el-table-column prop="cityName" label="城市"></el-table-column>
      <el-table-column prop="bankName" label="银行总行"></el-table-column>
      <el-table-column prop="branchName" label="银行支行"></el-table-column>
      <el-table-column label="操作">
        <template scope="scope">
          <el-button @click.native.prevent="changeRow(scope.$index,tableData)" type="text" size="small">修改</el-button>
          <el-button @click.native.prevent="deleteRow(scope.$index,tableData)" type="text" size="small"
                     v-loading.fullscreen.lock="fullscreenLoading">删除
          </el-button>
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
      return {
        tableData: [],
        multipleSelection: [],      //列表选中的
        province: [],
        city: [],
        headoffice: [],
        options: [],
        optionss: [],
        optionsss: [],
        form: {
          id: '',
          Oldupdate: '',
          Oldadd: '',
          updateID: '',
          Newadd: '',
          Newupdate: '',
          province: '',
          city: '',
          headoffice: '',
          Addbranch: '',
        },
        mainContentviewV: '',
        mainSearchinput: '',
        pageIndex: 1,
        pageSize: 10,
        total: 1,
        pageSizes: [10, 20, 50, 100],
        mainAddShow: false,
        mainContentaddC: false,
        mainContentviewC: false,
        fullscreenLoading: false,
        ruleBranch: {
          province: [
            {required: true, message: '请选择',}
          ]
        },
      }
    },
    created: function () {
      this.getUsers();
      this.selectDate();
    },
    methods: {
      getUsers(){				//查询初始数据
        this.$http.get(this.$store.state.api + '/bankbranch/', {
          params: {
            pageNum: this.pageIndex,
            pageSize: this.pageSize
          }
        }, {emulateJSON: true})
          .then((res) => {
            this.tableData = res.body.dataList;
            this.total = res.body.objectotalNumber;
          })
      },
      selectDate(){
        this.$http.get(this.$store.state.api + '/constant/provinces')
          .then((res) => {
            this.options = res.body;
          })
      },
      changeRow: function (index) {			//修改
        this.mainAddShow = !this.mainAddShow;
        this.mainContentviewC = !this.mainContentviewC;
        this.$http.get(this.$store.state.api + '/bankbranch/id', {params: {id: this.tableData[index].id}}, {emulateJSON: true})
          .then((res) => {
            this.form.province = res.body.data.provinceId;
            this.form.city = res.body.data.cityId;
            this.form.headoffice = res.body.data.bankId;
            this.form.Addbranch = res.body.data.branchName;
          });
        this.form.updateID = this.tableData[index].id;
        this.getbank();
      },
      deleteRow: function (index) {			//删除
        this.fullscreenLoading = true;
        setTimeout(() => {
          this.fullscreenLoading = false;
          this.$http.delete(this.$store.state.api + '/bankbranch/id', {params: {id: this.tableData[index].id}}, {emulateJSON: true})
            .then((res) => {
              this.getUsers();
            })
        }, 1000);
      },
      getbank(){
        this.$http.get(this.$store.state.api + '/constant/bank')
          .then((res) => {
            this.optionsss = res.body;
          })
      },
      addRow: function () {					//添加
        this.mainAddShow = !this.mainAddShow;
        this.mainContentaddC = !this.mainContentaddC;
        this.getbank();
      },
      onSubmit: function (formName) {  //获取输入框的内容向接口发送
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http.post(this.$store.state.api + '/bankbranch/insert', {
              id: this.form.id,
              bankId: this.form.headoffice,
              provinceId: this.form.province,
              cityId: this.form.city,
              branchName: this.form.Addbranch
            })
              .then((res) => {
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
      clearUp(){
        this.form.id = "";
        this.form.province = "";
        this.form.city = "";
        this.form.headoffice = "";
        this.form.Addbranch = "";
      },
      onCancel: function (formName) {				//关闭蒙层
        this.clearUp();
        this.mainAddShow = !this.mainAddShow;
        this.mainContentaddC = !this.mainContentaddC;
        this.$refs[formName].resetFields();
      },
      onSubmitU: function (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http.post(this.$store.state.api + '/bankbranch/update', {
              id: this.form.updateID,
              provinceId: this.form.province,
              cityId: this.form.city,
              bankId: this.form.headoffice,
              branchName: this.form.Addbranch
            })
              .then((res) => {
                this.getUsers();
              })
            this.onCancelU(formName);
          } else {
            this.open();
            return false;
          }
        });
      },
      onCancelU: function (formName) {
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
      fetchData: function () {
        this.$http.get(this.$store.state.api + '/bankbranch/', {
          params: {
            pageNum: this.pageIndex,
            pageSize: this.pageSize
          }
        }, {emulateJSON: true})//url 发送的值
          .then((res) => {
            this.tableData = res.body.dataList;
          })
      },
      selectCity(){
        this.$http.get(this.$store.state.api + '/constant/citys/provinceId', {params: {provinceId: this.form.province}}, {emulateJSON: true})
          .then((res) => {
            this.optionss = res.body;
          })
      },
      mainSearch: function () {    //查询
        this.fullscreenLoading = true;
        setTimeout(() => {
          this.fullscreenLoading = false;
          this.$http.get(this.$store.state.api + '/bankbranch/', {
            params: {
              pageNum: 1,
              pageSize: this.pageSize,
              bankBranchName: this.mainSearchinput
            }
          }, {emulateJSON: true})
            .then((res) => {
              this.tableData = res.body.dataList;
            })
        }, 1000);
      }
    }
  }
</script>

<style>
  #branch {
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

  #branch .mainContentadd {
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

  #branch .mainContentview {
    width: 400px;
    height: 415px;
    background: #fff;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    border-radius: 10px;
  }

  #branch .samllButton {
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
