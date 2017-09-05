<template>
  <div id="userM">
    <div class="mainNavadd">
      <el-button type="primary" @click="addRow()">添加</el-button>
    </div>
    <div class="mainSearch">
      <el-select class="mainSearchFloat" v-model="channelIda" @change="selectdepartment" placeholder="请选择公司">
        <el-option v-for="item in channelIdaa" :key="item.id" :label="item.channelName" :value="item.id"></el-option>
      </el-select>
      <el-select class="mainSearchFloat paddingButton" v-model="departmenta" placeholder="请选择部门">
        <el-option v-for="item in departmentaa" :key="item.id" :label="item.departmentName"
                   :value="item.id"></el-option>
      </el-select>
      <el-input class="mainSearchFloat paddingButton" v-model="mainSearchinput" placeholder="请输入用户名称"></el-input>
      <el-button class="mainSearchFloat" type="primary" @click="mainSearch()"
                 v-loading.fullscreen.lock="fullscreenLoading">搜索
      </el-button>
    </div>

    <div class="mainNavaddB" v-show="mainAddShow">
      <div class="mainContentadd" v-show="mainContentaddC"><!--添加信息的表格-->
        <p class="Updatetitle">增加用户</p>
        <hr color="#E5E9F2" width="90%">
        <el-form ref="ruleUser" :rules="ruleUser" :model="form" label-width="125px" label-position="right">
          <el-form-item class="floatLeft" label="登录用户名" prop="loginName">
            <el-input class="main-add-input" v-model="form.loginName"></el-input>
          </el-form-item>
          <el-form-item class="floatLeft" label="登录用户密码">
            <el-input class="main-add-input" v-model="form.password"></el-input>
          </el-form-item>
          <div class="clear"></div>
          <el-form-item class="floatLeft" label="真实姓名">
            <el-input class="main-add-input" v-model="form.realName"></el-input>
          </el-form-item>
          <el-form-item class="floatLeft" label="手机号">
            <el-input class="main-add-input" v-model="form.phoneNumber"></el-input>
          </el-form-item>
          <div class="clear"></div>
          <el-form-item class="floatLeft" label="固定电话">
            <el-input class="main-add-input" v-model="form.telNumber"></el-input>
          </el-form-item>
          <el-form-item class="floatLeft" label="邮箱">
            <el-input class="main-add-input" v-model="form.email"></el-input>
          </el-form-item>
          <div class="clear"></div>
          <!--<el-form-item class="floatLeft" id="selectContent" label="用户类型">
            <el-select class="main-add-input-B" v-model="type" placeholder="用户类型">
                <el-option v-for="item in types" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>-->
          <el-form-item class="floatLeft specialchannel" id="selectContent" label="代理评估公司" prop="channelId">
            <el-select class="main-add-input-B" v-model="channelId" @change="selectChannelBank" placeholder="代理评估公司">
              <el-option v-for="item in channelIds" :key="item.id" :label="item.channelName"
                         :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <!--<el-form-item class="floatLeft" id="selectContent" label="部门">
            <el-select class="main-add-input-B" v-model="departmentId" placeholder="部门">
                <el-option v-for="item in departmentIds" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>-->
          <el-form-item class="floatLeft" id="selectContent" label="部门">
            <el-select class="main-add-input-B" v-model="departmentId" placeholder="部门">
              <el-option v-for="item in departmentIds" :key="item.id" :label="item.departmentName"
                         :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <div class="clear"></div>
          <el-form-item class="floatLeft description" label="备注">
            <el-input type="textarea" class="main-add-input" v-model="form.description"></el-input>
          </el-form-item>


          <div class="addButtonDiv">
            <el-button type="primary" @click="onSubmit('ruleUser')">提交</el-button>
            <el-button @click="onCancel('ruleUser')">取消</el-button>
          </div>

        </el-form>
      </div>
      <div class="mainContentview" v-show="mainContentviewC">
        <p class="Updatetitle">修改用户</p>
        <hr color="#E5E9F2" width="90%">
        <el-form ref="ruleUser" :rules="ruleUser" :model="form" label-width="125px" label-position="right">
          <!--<el-form-item class="floatLeft" label="ID">
            <el-input class="main-add-input" v-model="form.id" :disabled="true"></el-input>
          </el-form-item>-->
          <el-form-item class="floatLeft" label="登录用户名" prop="loginName">
            <el-input class="main-add-input" v-model="form.loginName" :disabled="true"></el-input>
          </el-form-item>
          <!--<el-form-item class="floatLeft" label="登录用户密码">
            <el-input class="main-add-input" v-model="form.password"></el-input>
          </el-form-item>-->
          <el-form-item class="floatLeft" label="真实姓名">
            <el-input class="main-add-input" v-model="form.realName"></el-input>
          </el-form-item>
          <div class="clear"></div>
          <el-form-item class="floatLeft" label="手机号">
            <el-input class="main-add-input" v-model="form.phoneNumber"></el-input>
          </el-form-item>
          <el-form-item class="floatLeft" label="固定电话">
            <el-input class="main-add-input" v-model="form.telNumber"></el-input>
          </el-form-item>
          <div class="clear"></div>
          <el-form-item class="floatLeft" label="邮箱">
            <el-input class="main-add-input" v-model="form.email"></el-input>
          </el-form-item>
          <!--<el-form-item class="floatLeft" id="selectContent" label="用户类型">
           <el-select class="main-add-input-B" v-model="type" placeholder="用户类型">
               <el-option v-for="item in types" :key="item.id" :label="item.name" :value="item.id"></el-option>
           </el-select>
         </el-form-item>-->
          <el-form-item class="floatLeft" id="selectContent" label="代理评估公司">
            <el-select class="main-add-input-B" v-model="channelId" @change="selectChannelBank" placeholder="代理评估公司">
              <el-option v-for="item in channelIds" :key="item.id" :label="item.channelName"
                         :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <div class="clear"></div>
          <!--<el-form-item class="floatLeft" id="selectContent" label="部门">
            <el-select class="main-add-input-B" v-model="departmentId" placeholder="部门">
                <el-option v-for="item in departmentIds" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <div class="clear"></div>-->
          <el-form-item class="floatLeft" id="selectContent" label="部门">
            <el-select class="main-add-input-B" v-model="departmentId" placeholder="部门">
              <el-option v-for="item in departmentIds" :key="item.id" :label="item.departmentName"
                         :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <div class="clear"></div>
          <el-form-item class="floatLeft description" label="备注">
            <el-input type="textarea" class="main-add-input" v-model="form.description"></el-input>
          </el-form-item>
          <div class="addButtonDiv">
            <el-button type="primary" @click="onSubmitU('ruleUser')">确定</el-button>
            <el-button @click="onCancelU('ruleUser')">取消</el-button>
          </div>

        </el-form>
      </div>
      <div class="toviewC" v-show="toviewC">
        <p class="Updatetitle">详情</p>
        <hr color="#E5E9F2" width="90%">
        <el-form ref="form" label-width="125px">
          <!--<el-form-item class="floatLeft" label="ID">
            <el-input class="main-add-input" v-model="form.id" :disabled="true"></el-input>
          </el-form-item>-->
          <el-form-item class="floatLeft" label="登录用户名">
            <el-input class="main-add-input" v-model="form.loginName" :disabled="true"></el-input>
          </el-form-item>
          <!--<el-form-item class="floatLeft" label="登录用户密码">
            <el-input class="main-add-input" v-model="form.password" :disabled="true"></el-input>
          </el-form-item>-->
          <el-form-item class="floatLeft" label="真实姓名">
            <el-input class="main-add-input" v-model="form.realName" :disabled="true"></el-input>
          </el-form-item>
          <div class="clear"></div>
          <el-form-item class="floatLeft" label="手机号">
            <el-input class="main-add-input" v-model="form.phoneNumber" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item class="floatLeft" label="固定电话">
            <el-input class="main-add-input" v-model="form.telNumber" :disabled="true"></el-input>
          </el-form-item>
          <div class="clear"></div>
          <el-form-item class="floatLeft" label="邮箱">
            <el-input class="main-add-input" v-model="form.email" :disabled="true"></el-input>
          </el-form-item>
          <!--<el-form-item class="floatLeft" id="selectContent" label="部门">
            <el-select class="main-add-input-B" v-model="departmentId" placeholder="部门">
                <el-option v-for="item in departmentIds" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>-->
          <el-form-item class="floatLeft" label="代理评估公司">
            <el-input class="main-add-input" v-model="form.channelName" :disabled="true"></el-input>
          </el-form-item>
          <div class="clear"></div>
          <el-form-item class="floatLeft" label="部门">
            <el-input class="main-add-input" v-model="form.departmentName" :disabled="true"></el-input>
          </el-form-item>
          <!--<el-form-item class="floatLeft" label="创建人">
            <el-input class="main-add-input" v-model="form.createBy" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item class="floatLeft" label="创建时间">
            <el-input class="main-add-input" v-model="form.createTime" :disabled="true"></el-input>
          </el-form-item>
          <div class="clear"></div>-->
          <el-form-item class="floatLeft" label="更新人">
            <el-input class="main-add-input" v-model="form.updateBy" :disabled="true"></el-input>
          </el-form-item>
          <div class="clear"></div>
          <el-form-item class="floatLeft" label="更新时间">
            <el-input class="main-add-input" v-model="form.updateTime" :disabled="true"></el-input>
          </el-form-item>
          <div class="clear"></div>
          <el-form-item class="floatLeft description" label="备注">
            <el-input type="textarea" class="main-add-input" v-model="form.description" :disabled="true"></el-input>
          </el-form-item>

          <el-form-item class="viewButton">
            <el-button @click="onCancelUU()">关闭</el-button>
          </el-form-item>

        </el-form>
      </div>

      <div class="mainAllocation" v-show="mainAllocationShow">      <!--配置用户界面-->
        <div class="toallocateLocation">
          <toUser ref="childMethod" @newNOdeEvents="parentLisen"></toUser>
        </div>
        <el-button class="userCancelButton" @click="userCancelButton" type="primary">关闭</el-button>
      </div>
    </div>


    <el-table :data="tableData" style="width: 100%" border tooltip-effect="dark">
      <el-table-column type="index" label="序号" width="65px"></el-table-column>
      <el-table-column prop="channelName" label="所属公司" width="300px"></el-table-column>
      <el-table-column prop="departmentName" label="所属部门"></el-table-column>
      <el-table-column prop="loginName" label="用户名"></el-table-column>
      <el-table-column prop="realName" label="真实名称"></el-table-column>
      <el-table-column prop="phoneNumber" label="电话"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column prop="description" label="备注"></el-table-column>
      <!--<el-table-column label="状态">
        <template scope="scope">
            <el-switch v-model="scope.row.status" @change.native.prevent="changeStatus(scope.$index,tableData)" on-value="1" off-value="0" on-text="启用" off-text="停用">
            </el-switch>
        </template>
      </el-table-column>-->
      <el-table-column label="操作">
        <template scope="scope">
          <el-button @click.native.prevent="toView(scope.$index,tableData)" type="text" size="small">查看</el-button>
          <el-button @click.native.prevent="changeRow(scope.$index,tableData)" type="text" size="small">修改</el-button>
          <el-button @click.native.prevent="deleteRow(scope.$index,tableData)" type="text" size="small"
                     v-loading.fullscreen.lock="fullscreenLoading">删除
          </el-button>
          <el-button @click.native.prevent="allocation(scope.$index,tableData)" type="text" size="small">配置角色
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
  import toUser from '../../common/toUser.vue'

  export default{
    data(){
      return {
        tableData: [],
        multipleSelection: [],      //列表选中的
        form: {},
        mainContentviewV: '',
        pageIndex: 1,
        pageSize: 10,
        total: 1,
        pageSizes: [1, 10, 20, 50, 100],
        mainSearchinput: '',
        mainAddShow: false,
        mainContentaddC: false,
        mainContentviewC: false,
        toviewC: false,
        mainAllocationShow: false,
        fullscreenLoading: false,
        channelIdaa: '',
        channelIda: '',
        departmentaa: '',
        departmenta: '',
        channelBankId: '',
        channelId: '',
        departmentId: '',
        channelIds: [],
        channelBankIds: [],
        departmentIds: [],
        ruleUser: {
          loginName: [
            {required: true, message: '请输入用户名称', trigger: 'blur'}
          ]
        },
      }
    },
    created: function () {
      this.getUsers();
    },
    methods: {
      getUsers: function () {
        this.$http.get(this.$store.state.api + '/user/pages', {
          params: {
            pageNum: this.pageIndex,
            pageSize: this.pageSize,
            type: 1, /*type 1 公司权限*/
          }
        }, {emulateJSON: true})
          .then((res) => {
            this.tableData = res.body.dataList;
            this.total = res.body.objectotalNumber;
          });
        this.$http.get(this.$store.state.api + '/constant/channel')
          .then((res) => {
            this.channelIdaa = res.body;
          })
      },
      /*changeStatus:function(index){
       alert(this.tableData[index].id);
       },*/
      /*selectUser:function(){
       this.$http.get(this.$store.state.api+'/constant/usertype')
       .then((res)=>{
       this.types=res.body;
       })
       },*/
      selectchannel: function () {
        this.$http.get(this.$store.state.api + '/constant/channel')
          .then((res) => {
            this.channelIds = res.body;
          });
      },
      changeRow: function (index) {      //修改
        this.mainAddShow = !this.mainAddShow;
        this.mainContentviewC = !this.mainContentviewC;
        this.selectchannel();
        this.$http.get(this.$store.state.api + '/user/id', {params: {id: this.tableData[index].id}}, {emulateJSON: true})
          .then((res) => {
            this.form = res.body.data;
            this.type = res.body.data.type;
            this.channelId = res.body.data.channelId;
            this.channelBankId = res.body.data.channelBankId;
            this.departmentId = res.body.data.departmentId;
          })
      },
      deleteRow: function (index) {      //删除
        this.fullscreenLoading = true;
        setTimeout(() => {
          this.fullscreenLoading = false;
          this.$http.delete(this.$store.state.api + '/user/id', {params: {id: this.tableData[index].id}}, {emulateJSON: true})
            .then((res) => {
              this.getUsers();
            })
        }, 1000);
      },
      toView: function (index) {           //查看
        this.mainAddShow = !this.mainAddShow;
        this.toviewC = !this.toviewC;
        this.$http.get(this.$store.state.api + '/user/id', {params: {id: this.tableData[index].id}}, {emulateJSON: true})
          .then((res) => {
            this.form = res.body.data;
            this.type = res.body.data.type;
            this.channelId = res.body.data.channelId;
            this.channelBankId = res.body.data.channelBankId;
          })
      },
      addRow: function () {          //添加
        this.mainAddShow = !this.mainAddShow;
        this.mainContentaddC = !this.mainContentaddC;
        this.selectchannel();
      },
      onSubmit: function (formName) {  //获取输入框的内容向接口发送
        if (this.channelId == "" || this.channelId == null) {
          this.$message('您还有必要信息未填写');
          return false;
        }
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http.post(this.$store.state.api + '/user/insert', {
              loginName: this.form.loginName,
              password: this.form.password,
              phoneNumber: this.form.phoneNumber,
              realName: this.form.realName,
              telNumber: this.form.telNumber,
              channelBankId: this.channelBankId,
              channelId: this.channelId,
              departmentId: this.departmentId,
              description: this.form.description,
              email: this.form.email,
            })
              .then((res) => {
                this.getUsers();
                if (res.body.message) {
                  this.$message(res.body.message);
                }
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
      onSubmitU: function (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http.post(this.$store.state.api + '/user/update', {
              id: this.form.id,
              loginName: this.form.loginName,
              password: this.form.password,
              phoneNumber: this.form.phoneNumber,
              realName: this.form.realName,
              telNumber: this.telNumber,
              channelBankId: this.channelBankId,
              channelId: this.channelId,
              departmentId: this.departmentId,
              description: this.form.description,
              email: this.form.email,
            })
              .then((res) => {
                this.getUsers();
              });
            this.onCancelU(formName);
          } else {
            this.open();
            return false;
          }
        });
      },
      onCancel: function (formName) {        //关闭蒙层
        this.mainAddShow = !this.mainAddShow;
        this.mainContentaddC = !this.mainContentaddC;
        this.$refs[formName].resetFields();
        this.channelId = '';
        this.channelBankId = '';
        this.form.loginName = '';
        this.form.password = '';
        this.form.realName = '';
        this.form.phoneNumber = '';
        this.form.telNumber = '';
        this.form.email = '';
        this.form.description = '';
        this.departmentId = "";
      },
      onCancelU: function (formName) {
        this.mainAddShow = !this.mainAddShow;
        this.mainContentviewC = !this.mainContentviewC;
        this.$refs[formName].resetFields();
        this.form = [{}];
        this.channelId = '';
        this.channelBankId = '';
        this.form.loginName = '';
        this.form.password = '';
        this.form.realName = '';
        this.form.phoneNumber = '';
        this.form.telNumber = '';
        this.form.email = '';
        this.form.description = '';
      },
      onCancelUU: function () {
        this.mainAddShow = !this.mainAddShow;
        this.toviewC = !this.toviewC;
        this.channelId = '';
        this.channelBankId = '';
        this.form.loginName = '';
        this.form.password = '';
        this.form.realName = '';
        this.form.phoneNumber = '';
        this.form.telNumber = '';
        this.form.email = '';
        this.form.description = '';
      },
      selectChannelBank: function () {
        this.$http.get(this.$store.state.api + '/constant/listDepartmentByChannelId', {params: {channelId: this.channelId}}, {emulateJSON: true})
          .then((res) => {
            this.departmentIds = res.body;
          })
      },
      sizeChange: function (pageSize) {   //每页显示条数
        this.pageSize = pageSize;
        this.fetchData();
      },
      selectdepartment: function () {
        this.$http.get(this.$store.state.api + '/constant/listDepartmentByChannelId', {params: {channelId: this.channelIda}}, {emulateJSON: true})
          .then((res) => {
            this.departmentaa = res.body;
          })
      },
      pageIndexChange: function (pageIndex) {   //第几页
        this.pageIndex = pageIndex;
        this.fetchData();
      },
      fetchData: function () {
        this.$http.get(this.$store.state.api + '/user/pages', {
          params: {
            pageNum: this.pageIndex,
            pageSize: this.pageSize,
            type: 1,
          }
        }, {emulateJSON: true})
          .then((res) => {
            this.tableData = res.body.dataList;
          })
      },
      mainSearch: function () {    //查询
        this.fullscreenLoading = true;
        setTimeout(() => {
          this.fullscreenLoading = false;
          this.$http.get(this.$store.state.api + '/user/pages', {
            params: {
              pageNum: 1,
              pageSize: this.pageSize,
              loginName: this.mainSearchinput,
              channelId: this.channelIda,
              departmentId: this.departmenta,
              type: 1,
            }
          }, {emulateJSON: true})
            .then((res) => {
              this.tableData = res.body.dataList;
              this.channelIda = '';
              this.departmenta = '';
            })
        }, 1000);
      },
      parentLisen: function () { //监听子组件传过来的出发事件
        this.userCancelButton();
      },
      allocation: function (index) {
        this.mainAddShow = !this.mainAddShow;
        this.mainAllocationShow = !this.mainAllocationShow;
        this.$store.commit('newuserID', this.tableData[index].id);
        this.$refs.childMethod.getUser();
      },
      userCancelButton: function () {
        this.mainAddShow = !this.mainAddShow;
        this.mainAllocationShow = !this.mainAllocationShow;
      },
    },
    components: {toUser},
  }
</script>

<style>
  #userM {
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

  #userM .mainContentadd {
    width: 650px;
    height: 550px;
    background: #fff;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    border-radius: 10px;
  }

  #userM .mainContentview {
    width: 650px;
    height: 490px;
    background: #fff;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    border-radius: 10px;
  }

  .floatLeft {
    float: left;
  }

  .addButton {
    margin-left: 115px;
    position: absolute;
    bottom: 15px;
  }

  .viewButton {
    text-align: center;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 20px;
    margin-left: -100px;
  }

  .description {
    width: 715px !important;
  }

  .userCancelButton {
    position: absolute;
    bottom: 25px;
    left: 270px;
  }

  #userM .toviewC {
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

  .paddingButton {
    margin-left: 10px;
  }

  .main-add-input-B {
    width: 70% !important;
  }

  #selectContent .el-form-item__content {
    margin-left: 100px !important;
  }

  .addButtonDiv {
    margin-left: 260px;
    position: absolute;
    bottom: 15px;
  }

  .mainAllocation {
    width: 520px;
    height: 480px;
    background: #fff;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }

  .paddingButton {
    margin-left: 10px;
  }

  .toallocateLocation {
    margin-top: 50px;
    margin-left: 32px;
  }

  #userM .mainSearch {
    width: 750px;
  }

  #userM .mainNavadd {
    margin-left: 280px;
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .specialchannel:before {
    content: "*";
    color: #ff4949;
    position: absolute;
    top: 292px;
    left: 21px;
  }
</style>
