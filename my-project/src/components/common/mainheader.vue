<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane :label="ceshi" :disabled="demo" name="first">
      <div class="allContent">
        <div class="leftNavStyle">
          <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" unique-opened router>
            <template v-for="item in items">
              <template>
                <el-menu-item :index="item.index">
                  {{item.title}}
                </el-menu-item>
              </template>
            </template>
          </el-menu>
        </div>
        <div class="mainContent">
          <router-view></router-view>
        </div>
      </div>
    </el-tab-pane>
    <el-tab-pane label="组织机构" name="second">
      <div class="allContent">
        <div class="leftNavStyle">
          <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" unique-opened router>
            <template v-for="organization in organizations">
              <template>
                <el-menu-item :index="organization.index">
                  {{organization.title}}
                </el-menu-item>
              </template>
            </template>
          </el-menu>
        </div>
        <div class="mainContent">
          <router-view name="a"></router-view>
        </div>
      </div>
    </el-tab-pane>
    <el-tab-pane label="权限管理" :disabled="demo" name="third">
      <div class="allContent">
        <div class="leftNavStyle">
          <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" unique-opened router>
            <template v-for="management in managements">
              <template>
                <el-menu-item :index="management.index">
                  {{management.title}}
                </el-menu-item>
              </template>
            </template>
          </el-menu>
        </div>
        <div class="mainContent">
          <router-view name="b"></router-view>
        </div>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
  export default {
    data() {
      return {
        authorities: '',
        activeName: 'first',
        ceshi: '基础设置',
        items: [],
        demo: '',
        organizations: [],
        managements: []
      };
    },
    created: function () {
      this.Initialize();
    },
    beforeUpdate: function () {
      var scrollHeight = document.body.scrollHeight - 65;
      document.getElementsByClassName("leftNavStyle")[0].style.height = scrollHeight + "px";
      document.getElementsByClassName("leftNavStyle")[1].style.height = scrollHeight + "px";
      document.getElementsByClassName("leftNavStyle")[2].style.height = scrollHeight + "px";
    },
    methods: {
      handleClick() {
        this.$router.push('/main');
      },
      Initialize(){
        var authorities = "";
        let username = sessionStorage.getItem('huigujia_token');
        this.$http.get(this.$store.state.admin + '/login/user')
          .then((res) => {
            this.userNames = res.body.data.name;
            sessionStorage.setItem('ms_userNames', this.userNames);
            authorities = res.body.data.authorities;
            if (authorities.indexOf("ROLE_ADMIN") >= 0) {
            } else {
              this.$message('无访问权限');
              this.$router.push('/login');
              return false;
            }
            if (authorities.indexOf("ROLE_ADMIN_CONFIG") >= 0) {
              this.demo = false;
              this.activeName = 'first';
              this.items = [
                {index: 'province', title: '省份管理'},
                {index: 'urban', title: '城市管理'},
                {index: 'district', title: '区县管理'},
                {index: 'headoffice', title: '银行总行管理'},
                {index: 'branch', title: '银行支行管理'}
              ];
              this.organizations = [
                {index: 'agency', title: '代理评估公司管理'},
                {index: 'bank', title: '银行管理'},
                /*{index:'department',title:'部门管理'}*/
              ];
              this.managements = [
                {index: 'module', title: '模块管理'},
                {index: 'operation', title: '操作管理'},
                {index: 'role', title: '角色管理'},
                /*{index:'user',title:'用户管理'}*/
              ];
              if (username) {
                this.$router.push('/province');
              } else {
                this.$router.push('/login');
              }
            } else {
              this.demo = true;
              document.getElementsByClassName("is-disabled")[0].style.display = "none";
              document.getElementsByClassName("is-disabled")[1].style.display = "none";
              this.activeName = 'second';
              this.items = [];
              this.organizations = [{index: 'bank', title: '银行管理'}, /*{index:'department',title:'部门管理'}*/];
              this.managements = [/*{index:'module',title:'模块管理'},{index:'operation',title:'操作管理'},{index:'role',title:'角色管理'},*//*{index:'user',title:'用户管理'}*/];
              if (username) {
                this.$router.push('/bank');
              } else {
                this.$router.push('/login');
              }
            }
          });
      },
    },
    computed: {
      onRoutes(){
        return this.$route.path.replace('/', '');
      },
    }
  };
</script>
<style>
  .el-tabs__header {
    margin: 0 !important;
  }

  .leftNavStyle {
    width: 200px;
    height: 600px;
    background: #eef1f6;
    text-align: center;
    float: left;
    position: relative;
    top: 0px;
    left: 0px;
  }

  .allContent, .organization, .RightsManagement {
    width: 100%;
    height: 100%;
  }

  .mainContent {
    width: 100%;
  }

</style>
