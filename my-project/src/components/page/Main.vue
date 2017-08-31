<template>
<header class="header">
    <div class="navButton">
        <div class="logo">
          <img class="logoP" :src="logoImg" width="50px" height="50px">
        </div>
        <div class="mainheader">
        <mainheader></mainheader>
        </div>
        <div class="navMore">
          <el-dropdown class="userLocation" trigger="click" @command="handleCommand">
            <span class="el-dropdown-link">
              {{userNames}}
              <i class="el-icon-setting"></i>
            </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="personalCenter">个人中心</el-dropdown-item>
                <el-dropdown-item command="updateout">修改密码</el-dropdown-item>
                <el-dropdown-item command="loginout">退出</el-dropdown-item>
              </el-dropdown-menu>
          </el-dropdown>
        </div>
    </div>
    <div class="clear"></div>
  <div class="background" v-show="updatepassword">
  <div class="ms-update">
     <h2>修改密码</h2>
     <hr color="#E5E9F2" width="90%">
      <el-form :model="form" :rules="rules2" ref="form" label-width="100px" class="updateTable">
        <el-form-item label="用户名">
          <el-input v-model="form.user" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="原密码">
          <el-input type="password" v-model="form.oldpassword"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newpassword">
          <el-input type="password" v-model="form.newpassword"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="morepassword">
          <el-input type="password" v-model="form.morepassword"></el-input>
        </el-form-item>
      </el-form>
      <div class="buttonpostion">
        <el-button type="primary" @click="onsuer('form')">确定</el-button>
        <el-button @click="oncancel">取消</el-button>
      </div>
  </div>
  </div>
  <div class="backgroundS" v-show="updatepasswordS">
  <div class="ms-updateS">
     <h2>个人中心</h2>
     <hr color="#E5E9F2" width="90%">
      <el-form :model="use" label-width="100px" class="updateTable">
        <el-form-item label="用户名">
          <el-input v-model="use.name" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="所在省份">
          <el-input v-model="use.province" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="所在城市">
          <el-input v-model="use.city" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="use.phone" :disabled="true"></el-input>
        </el-form-item>
      </el-form>
      <div class="buttonpostion">
        <el-button @click="oncancelS">取消</el-button>
      </div>
  </div>
  </div>
</header>
</template>

<script>
import mainheader from '../common/mainheader.vue'
export default{
    data(){
        var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.form.morepassword !== '') {
            this.$refs.form.validateField('morepassword');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.form.newpassword) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
        return{
          userNames:'',
          name:'',
          logoImg:'',
          updatepassword:false,
          updatepasswordS:false,
          newtoken:'',
          form:{
            user:'',
            oldpassword:'',
            newpassword:'',
            morepassword:'',
          },
          use:{
            name:'',
            province:'',
            city:'',
            phone:'',
          },
          rules2:{
          newpassword: [
            { validator: validatePass, trigger: 'blur' }
          ],
          morepassword: [
            { validator: validatePass2, trigger: 'blur' }
          ],
        },
      }
    },
    created:function(){
      this.tekoncontent();
      this.setInterval();
      this.vueLock();
    },
    computed:{
      username(){         //获取内存中的用户名并赋值给到header
        let username = sessionStorage.getItem('huigujia_token');
        return username ? username : this.name;
      },
    },
    methods:{
      setInterval:function(){
        setInterval(()=>{         //每隔一定时间更新token
        this.$http.get(this.$store.state.admin+'/refresh')
        .then((res)=>{
            this.newtoken = res.body.data.token_head+res.body.data.token;
            if(this.newtoken){
              sessionStorage.setItem('huigujia_token',this.newtoken);
              this.$store.commit('newDemo',this.newtoken);
            }else{
              this.$message('网络异常请重新登录');
              this.$router.push('/login');
            }
          });
        },900000);
      },
      vueLock:function(){
        let username = sessionStorage.getItem('huigujia_token');
//        username = username.replace(/\"/g, "");
        this.$store.commit('newDemo',username);
        sessionStorage.setItem('huigujia_token',username);
        if(username){
          this.$http.get(this.$store.state.admin+'/login/user')
            .then((res)=>{
              this.logoImg="data:image/png;base64,"+res.body.data.department.logo;
              this.userNames = res.body.data.name;
              sessionStorage.setItem('ms_userNames',this.userNames);
              sessionStorage.setItem('ms_logoImg',this.logoImg);
              this.$store.commit('newuserNames',this.userNames);
              this.$store.commit('newlogoImg',this.this.logoImg);
          });
          this.$router.push('/main');
        }else{
          this.$message('网络异常请重新登录');
          this.$router.push('/login');
        };
        this.$http.get(this.$store.state.admin+'/refresh')
        .then((res)=>{
          if(res.body.data==null||res.body.data==""){
          sessionStorage.removeItem('huigujia_token');
          sessionStorage.removeItem('ms_userNames');
          sessionStorage.removeItem('ms_logoImg');
          this.$http.get(this.$store.state.admin+'/logout')
          .then((res)=>{});
            this.$router.push('/login');
          }
        })
      },
      oncancel:function(){
        this.updatepassword=!this.updatepassword;
        this.clearUp();
      },
      oncancelS:function(){
        this.updatepasswordS=!this.updatepasswordS;
      },
      onsuer:function(formName){
        this.$refs[formName].validate((valid) => {
        if (valid) {
          var data = new FormData();
          data.append("loginName",this.form.user);
          data.append("oldPassword",this.form.oldpassword);
          data.append("newPassword",this.form.newpassword);
          data.append("reNewPassword",this.form.morepassword);
        this.$http.post(this.$store.state.api+'/user/updatePassword',data)
        .then((res)=>{
          if(res.body.code=="1"){
            this.$message('修改密码失败');
            return false;
          };
          this.$message('修改密码成功');
        });
        this.clearUp();
        this.updatepassword=!this.updatepassword;
        } else {
          this.$message.error('两次输入密码不一致');
          return false;
          }
        });
      },
      clearUp:function(){
        this.form.oldpassword='';
        this.form.newpassword='';
        this.form.morepassword='';
      },
      tekoncontent:function(){    //获取内存中的信息
        let username = sessionStorage.getItem('huigujia_token');
        this.$store.commit('newDemo',username);
        let userNames = sessionStorage.getItem('ms_userNames');
        let logoImg = sessionStorage.getItem('ms_logoImg');
        this.logoImg=logoImg;
        this.userNames=userNames;
        if(this.logoImg== undefined|| this.logoImg== ""){
          this.$http.get(this.$store.state.admin+'/login/user')
            .then((res)=>{
              this.logoImg="data:image/png;base64,"+res.body.data.department.logo;
            })
        }
        if(this.userNames== undefined|| this.userNames== ""){
          this.$http.get(this.$store.state.admin+'/login/user')
            .then((res)=>{
              this.userNames = res.body.data.name;
            })
        }
      },
      handleCommand(command){     //清除内存中的用户名并到登录界面
        if(command == 'loginout'){
          sessionStorage.removeItem('huigujia_token');
          sessionStorage.removeItem('ms_userNames');
          sessionStorage.removeItem('ms_logoImg');
          this.$http.get(this.$store.state.admin+'/logout')
          .then((res)=>{});
            this.$router.push('/login');
        }
        if(command == 'personalCenter'){
          this.updatepasswordS=!this.updatepasswordS;
          this.$http.get(this.$store.state.admin+'/login/user')
          .then((res)=>{
            this.use.name=res.body.data.name;
            this.use.province = res.body.data.province.name;
            this.use.city = res.body.data.city.name;
            this.use.phone = res.body.data.cellphone;
          })
        }
        if (command == 'updateout'){
          this.clearUp();
          this.$http.get(this.$store.state.admin+'/login/user')
          .then((res)=>{
            this.form.user=res.body.data.account;
          });
          this.updatepassword=!this.updatepassword;
        }
      },
    },
    components:{
        mainheader
    }
}
</script>
<style>
.logo{
  width: 200px;
  height: 65px;
  background: #E5E9F2;
  float: left;
}
.logoP{
  margin-left: 75px;
  margin-top: 7px;
}
.navButton{
  width: 100%;
  float: left;
}
.navMore{
  width: 200px;
  height: 65px;
  position: absolute;
  right: 0px;
  top:0px;
}
.userLocation{
  margin-top: 25px;
  margin-left: 20px;
}
.clear{
  clear: both;
}
.block{
  margin-top: 20px;
  margin-bottom: 20px;
  margin-right: 20px;
  float: right;
}
.el-table{
  width: auto !important;
}
    .mainNavadd{
      margin-left: 40px;
      margin-top: 20px;
      margin-bottom: 20px;
    }
    .main-add-input{
      width: 80% !important;
    }
    .el-form-item{
      margin-top: 14px;
      margin-bottom:20px !important;
    }
    .mainContentview p{
      font-size: 16px;
    }
    .mainContentViewVV{
      text-align: center;
      margin:0 auto;
      margin-top: 100px;
    }
    .newColorB{
      color: #20a0ff;
    }
    .mainSearch{
      width: 270px;
      position: absolute;
      top:20px;
      right:20px;
    }
    .mainSearchFloat{
      float: left;
    }
    .mainSearch .el-input{
      width: auto!important;
    }
    .Updatetitle{
      text-align: center;
      margin-top: 20px;
      font-size: 16px;
    }
    .el-tabs__nav-wrap{
      background: #E5E9F2;
    }
.el-tabs__nav-wrap{
  height: 65px !important;
}
.el-tabs__nav-scroll{
  margin-top: 22px !important;
}
.ms-update{
        width: 400px;
        height: 360px;
        background: #fff;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -250px;
        margin-left: -200px;
        z-index: 9999;
        border-radius: 10px;
    }
.background{
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 99;
}
.backgroundS{
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 99;
}
.ms-updateS{
  width: 400px;
  height: 360px;
  background: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -250px;
  margin-left: -200px;
  z-index: 9999;
  border-radius: 10px;
}
.ms-updateS h2{
  text-align: center;
  margin-top: 20px;
}
.ms-update h2{
  text-align: center;
  margin-top: 20px;
}
.updateTable{
  width: 80%;
  margin-top: 20px;
}
.buttonpostion{
  text-align: center;
}
.el-dropdown-menu{
  top:60px !important;
}
.el-textarea__inner{
  max-height: 90px;
}
.mainheader{
  margin-left: 0px;
}
</style>
