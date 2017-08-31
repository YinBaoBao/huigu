<template>
    <div class="login-wrap">
        <div class="ms-title">慧估价后台管理系统</div>
        <div class="ms-login">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" placeholder="用户名"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="密码" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm()">登录</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        data: function(){
            return {
                token:'',
                userNames:'',
                authorities:'',
                ruleForm: {
                    username: '',
                    password: ''
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            submitForm(formName) {
                this.$http.post(this.$store.state.admin+'/login',{username:this.ruleForm.username,password:this.ruleForm.password},{emulateJSON: true})
                  .then((res)=>{
                    this.token = res.body.data.token_head+res.body.data.token;
                    if(this.token){
                    sessionStorage.setItem('huigujia_token',this.token);
                    this.$router.push('/main');
                    this.$http.get(this.$store.state.admin+'/login/user')
                    .then((res)=>{
                        this.userNames = res.body.data.name;
                        this.logoImg="data:image/png;base64,"+res.body.data.department.logo;
                        sessionStorage.setItem('ms_userNames',this.userNames);
                        sessionStorage.setItem('ms_logoImg',this.logoImg);
                        /*this.$store.commit('newuserNames',this.userNames);
                        this.$store.commit('newlogoImg',this.logoImg);*/
                        //sessionStorage.setItem('ms_userNames',this.userNames);
                    });
                  }else{
                    this.$message.error('用户名或密码错误！');
                    return false;
                  }
                  });
                 
                /*self.$refs[formName].validate((valid) => {
                    if (valid) {
                        sessionStorage.setItem('ms_username',this.token);
                        self.$router.push('/main');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });*/
            },
        }
    }
</script>

<style>
    .login-wrap{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: url(../../assets/background.png) no-repeat;
        z-index: -1;
    }
    .ms-title{
        position: absolute;
        top:50%;
        width:100%;
        margin-top: -230px;
        text-align: center;
        font-size:30px;
        color: #fff;
    }
    .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        width:300px;
        height:160px;
        margin:-150px 0 0 -190px;
        padding:40px;
        border-radius: 5px;
        background: #fff;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
    }
</style>