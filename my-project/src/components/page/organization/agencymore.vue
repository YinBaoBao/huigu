<template>
  <div id="agencymore">
    <div class="mainNavadd">
      <el-button type="primary" @click="addRow()">添加</el-button>
    </div>
    <div class="mainSearch">
      <el-select class="mainSearchFloat" v-model="areaProvinceId" @change="selectCity" placeholder="请选择省份">
        <el-option v-for="item in areaProvinceIds" :key="item.id" :label="item.provinceName" :value="item.id"></el-option>
      </el-select>
      <el-select class="mainSearchFloat paddingButton" v-model="areaCityId" placeholder="请选择城市">
        <el-option v-for="item in areaCityIds" :key="item.id" :label="item.cityName" :value="item.id"></el-option>
      </el-select>
      <el-input class="mainSearchFloat paddingButton" v-model="mainSearchinput" placeholder="请输入公司名称"></el-input>
      <el-button class="mainSearchFloat" type="primary" @click="mainSearch()" v-loading.fullscreen.lock="fullscreenLoading">搜索</el-button>
    </div>

    <div class="mainNavaddB" v-show="mainAddShow">
      <div class="mainContentadd" v-show="mainContentaddC"><!--添加信息的表格-->
      <p class="Updatetitle">增加代理公司</p>
      <hr color="#E5E9F2" width="90%">
        <el-form ref="ruleAgency" :rules="ruleAgency" :model="form" label-width="125px" label-position="right">
          <el-form-item class="floatLeft" label="公司名称" prop="channelName">
            <el-input class="main-add-input" v-model="form.channelName"></el-input>
          </el-form-item>
          <el-form-item class="floatLeft" label="公司详细地址" prop="address">
            <el-input class="main-add-input" v-model="form.address"></el-input>
          </el-form-item>
          <div class="clear"></div>
          <el-form-item class="floatLeft specialProvince" id="selectContent" label="业务地址省份">
            <el-select class="main-add-input-B" v-model="areaProvinceId" @change="selectCity" placeholder="请选择省份">
              <el-option v-for="item in areaProvinceIds" :key="item.id" :label="item.provinceName" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="floatLeft specialCity" id="selectContent" label="业务地址城市">
            <el-select class="main-add-input-B" v-model="areaCityId" placeholder="请选择城市">
              <el-option v-for="item in areaCityIds" :key="item.id" :label="item.cityName" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <div class="clear"></div>
          <el-form-item class="floatLeft" label="联系人姓名" prop="contactPerson">
            <el-input class="main-add-input" v-model="form.contactPerson"></el-input>
          </el-form-item>
          <el-form-item class="floatLeft" label="联系人手机号" prop="phoneNumber">
            <el-input class="main-add-input" v-model="form.phoneNumber"></el-input>
          </el-form-item>
          <div class="clear"></div>
          <el-form-item class="floatLeft telNumber" label="联系人固定电话">
            <el-input class="main-add-input" v-model="form.telNumber"></el-input>
          </el-form-item>
          <el-form-item class="floatLeft" label="联系人邮箱">
            <el-input class="main-add-input" v-model="form.email"></el-input>
          </el-form-item>
          <div class="clear"></div>
          <el-form-item id="Updatefile" class="floatLeft" label="Logo">
            <el-upload
                class="avatar-uploader"
                :headers="{'Authorization':headersA}"
                :action="action"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="logoUrl" :src="logoUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            <!--<el-dialog size="tiny">
              <img width="100%" :src="dialogImageUrl" alt>
            </el-dialog>-->
          </el-form-item>
          <el-form-item id="Updatefile" class="floatLeft" label="图标">
            <el-upload
                class="avatar-uploader"
                :headers="{'Authorization':headersA}"
                :action="action"
                :show-file-list="false"
                :on-success="handleAvatarSuccess3"
                :before-upload="beforeAvatarUpload3">
                <img v-if="wechatUrl" :src="wechatUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            <!--<el-dialog size="tiny">
              <img width="100%" :src="dialogImageUrl" alt>
            </el-dialog>-->
          </el-form-item>
          <el-form-item id="Updatefile" class="floatLeft" label="公章">
            <el-upload
                class="avatar-uploader"
                :headers="{'Authorization':headersA}"
                :action="action"
                :show-file-list="false"
                :on-success="handleAvatarSuccess1"
                :before-upload="beforeAvatarUpload1">
                <img v-if="stampUrl" :src="stampUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            <!--<el-dialog size="tiny">
              <img width="100%" :src="dialogImageUrl" alt>
            </el-dialog>-->
          </el-form-item>
          <el-form-item id="Updatefile" class="floatLeft" label="水印文件">
            <el-upload
                class="avatar-uploader"
                :headers="{'Authorization':headersA}"
                :action="action"
                :show-file-list="false"
                :on-success="handleAvatarSuccess2"
                :before-upload="beforeAvatarUpload2">
                <img v-if="watermarkUrl" :src="watermarkUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            <!--<el-dialog size="tiny">
              <img width="100%" :src="dialogImageUrl" alt>
            </el-dialog>-->
          </el-form-item>
          <div class="clear"></div>
          <el-form-item class="floatLeft description" label="备注">
            <el-input type="textarea" class="main-add-input" v-model="form.description"></el-input>
          </el-form-item>          
          

          <div class="addButtonDiv">
            <el-button type="primary" @click="onSubmit('ruleAgency')">创建</el-button>
            <el-button @click="onCancel('ruleAgency')">取消</el-button>
          </div>

        </el-form>
      </div>
      <div class="mainContentview" v-show="mainContentviewC">
        <p class="Updatetitle">修改代理公司</p>
        <hr color="#E5E9F2" width="90%">
         <el-form ref="ruleAgency" :rules="ruleAgency" :model="form" label-width="125px" label-position="right">
          <!--<el-form-item class="floatLeft" label="ID">
            <el-input class="main-add-input" v-model="form.id" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item class="floatLeft" label="公司编号">
            <el-input class="main-add-input" v-model="form.channelCode" :disabled="true"></el-input>
          </el-form-item>-->
          <el-form-item class="floatLeft" id="selectContent" label="业务地址省份">
            <el-select class="main-add-input-B" v-model="areaProvinceId" @change="selectCity" placeholder="请选择省份">
              <el-option v-for="item in areaProvinceIds" :key="item.id" :label="item.provinceName" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="floatLeft" id="selectContent" label="业务地址城市">
            <el-select class="main-add-input-B" v-model="areaCityId" placeholder="请选择城市">
              <el-option v-for="item in areaCityIds" :key="item.id" :label="item.cityName" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <div class="clear"></div>
          <el-form-item class="floatLeft" label="公司名称" prop="channelName">
            <el-input class="main-add-input" v-model="form.channelName"></el-input>
          </el-form-item>
          <el-form-item class="floatLeft" label="公司详细地址" prop="address">
            <el-input class="main-add-input" v-model="form.address"></el-input>
          </el-form-item>
          <div class="clear"></div>
          <el-form-item class="floatLeft" label="联系人姓名" prop="contactPerson">
            <el-input class="main-add-input" v-model="form.contactPerson"></el-input>
          </el-form-item>
          <el-form-item class="floatLeft" label="联系人手机号" prop="phoneNumber">
            <el-input class="main-add-input" v-model="form.phoneNumber"></el-input>
          </el-form-item>
          <div class="clear"></div>
          <el-form-item class="floatLeft telNumber" label="联系人固定电话">
            <el-input class="main-add-input" v-model="form.telNumber"></el-input>
          </el-form-item>
          <el-form-item class="floatLeft" label="联系人邮箱">
            <el-input class="main-add-input" v-model="form.email"></el-input>
          </el-form-item>
          <div class="clear"></div>
          <el-form-item id="Updatefile" class="floatLeft" label="Logo">
            <el-upload v-show="logoUpdate"
                class="avatar-uploader"
                :headers="{'Authorization':headersA}"
                :action="action"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="logoUrl" :src="logoUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            <div class="logoUpdateImg" v-show="logoUpdateView">
              <img :src="channelLogo" alt="">
              <div class="logoUpdateControl logoUpdatedisplay">
                <span class="logoUpdateControlSpan" @click="deleteLogo"><i class="el-icon-delete"></i></span>
              </div>
            </div>
            <!--<el-dialog size="tiny">
              <img width="100%" :src="dialogImageUrl" alt>
            </el-dialog>-->
          </el-form-item>
          <el-form-item id="Updatefile" class="floatLeft" label="图标">
            <el-upload v-show="logoUpdate3"
                class="avatar-uploader"
                :headers="{'Authorization':headersA}"
                :action="action"
                :show-file-list="false"
                :on-success="handleAvatarSuccess3"
                :before-upload="beforeAvatarUpload3">
                <img v-if="wechatUrl" :src="wechatUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            <div class="logoUpdateImg" v-show="logoUpdateView3">
              <img :src="wechatLogo" alt="">
              <div class="logoUpdateControl logoUpdatedisplay">
                <span class="logoUpdateControlSpan" @click="deleteLogo3"><i class="el-icon-delete"></i></span>
              </div>
            </div>
            <!--<el-dialog size="tiny">
              <img width="100%" :src="dialogImageUrl" alt>
            </el-dialog>-->
          </el-form-item>
          <el-form-item id="Updatefile" class="floatLeft" label="公章">
            <el-upload v-show="logoUpdate1"
                class="avatar-uploader"
                :headers="{'Authorization':headersA}"
                :action="action"
                :show-file-list="false"
                :on-success="handleAvatarSuccess1"
                :before-upload="beforeAvatarUpload1">
                <img v-if="stampUrl" :src="stampUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            <div class="logoUpdateImg" v-show="logoUpdateView1">
              <img :src="channelStamp" alt="">
              <div class="logoUpdateControl logoUpdatedisplay">
                <span class="logoUpdateControlSpan" @click="deleteLogo1"><i class="el-icon-delete"></i></span>
              </div>
            </div>
            <!--<el-dialog size="tiny">
              <img width="100%" :src="dialogImageUrl" alt>
            </el-dialog>-->
          </el-form-item>
          <el-form-item id="Updatefile" class="floatLeft" label="水印文件">
            <el-upload v-show="logoUpdate2"
                class="avatar-uploader"
                :headers="{'Authorization':headersA}"
                :action="action"
                :show-file-list="false"
                :on-success="handleAvatarSuccess2"
                :before-upload="beforeAvatarUpload2">
                <img v-if="watermarkUrl" :src="watermarkUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            <div class="logoUpdateImg" v-show="logoUpdateView2">
              <img :src="channelWatermark" alt="">
              <div class="logoUpdateControl logoUpdatedisplay">
                <span class="logoUpdateControlSpan" @click="deleteLogo2"><i class="el-icon-delete"></i></span>
              </div>
            </div>
            <!--<el-dialog size="tiny">
              <img width="100%" :src="dialogImageUrl" alt>
            </el-dialog>-->
          </el-form-item>
          <div class="clear"></div>
          <el-form-item class="floatLeft description" label="备注">
            <el-input type="textarea" class="main-add-input" v-model="form.description"></el-input>
          </el-form-item>          
          <div class="clear"></div>

          <div class="addButtonDiv">
            <el-button type="primary" @click="onSubmitU('ruleAgency')">确定</el-button>
            <el-button @click="onCancelU('ruleAgency')">取消</el-button>
          </div>

        </el-form>      
      </div>
      <div class="toviewC" v-show="toviewC">
        <p class="Updatetitle">详情</p>
        <hr color="#E5E9F2" width="90%">
        <el-form ref="form"  label-width="125px">
          <!--<el-form-item class="floatLeft" label="ID">
            <el-input class="main-add-input" v-model="form.id" :disabled="true"></el-input>
          </el-form-item>-->
          <el-form-item class="floatLeft" label="公司名称">
            <el-input class="main-add-input" v-model="form.channelName" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item class="floatLeft" label="公司详细地址">
            <el-input class="main-add-input" v-model="form.address" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item class="floatLeft" label="业务地址省份">
            <el-input class="main-add-input" v-model="form.provinceName" :disabled="true"></el-input>
          </el-form-item>
          <div class="clear"></div>
          <el-form-item class="floatLeft" label="业务地址城市">
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
      <el-table-column type="index" label="序号" width="65px"></el-table-column>
      <el-table-column prop="channelName" label="公司名称"></el-table-column>
      <el-table-column prop="provinceName" label="业务地址省份"></el-table-column>
      <el-table-column prop="cityName" label="业务地址城市"></el-table-column>
      <!--<el-table-column prop="contactPerson" label="联系人姓名"></el-table-column>
      <el-table-column prop="phoneNumber" label="联系人手机号"></el-table-column>
      <el-table-column prop="telNumber" label="联系人固定电话"></el-table-column>
      <el-table-column prop="email" label="联系人邮箱"></el-table-column>
      <el-table-column prop="createBy" label="创建人"></el-table-column>
      <el-table-column prop="createTime" label="创建日期"></el-table-column>
      <el-table-column prop="updateBy" label="更新人"></el-table-column>
      <el-table-column prop="updateTime" label="更新日期"></el-table-column>-->
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
      logoUpdate:false,
      logoUpdateView:true,
      logoUpdate3:false,
      logoUpdateView3:true,
      logoUpdate1:false,
      logoUpdateView1:true,
      logoUpdate2:false,
      logoUpdateView2:true,
      fullscreenLoading: false,
      action:'',
      channelLogo:'',
      channelWatermark:'',
      channelStamp:'',
      logoUrl: '',
      headersA:'',
      logoType:'',
      stampUrl: '',
      stampType:'',
      watermarkUrl: '',
      watermarkType:'',
      wechatLogo:'',
      wechatUrl:'',
      wechatType:'',
      areaProvinceId:'',
      areaCityId:'',
      areaProvinceIds:[],
      areaCityIds:[],
      logoUrlAdress:'',
      ruleAgency:{
        channelName:[
          { required: true, message: '请输入公司名', trigger: 'blur' }
        ],
        address:[
          { required: true, message: '请输入地址', trigger: 'blur' }
        ],
        contactPerson:[
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        phoneNumber:[
          { required: true, message: '请输入电话号码', trigger: 'blur' }
        ],
      }
    }
  },
  created:function(){
    this.getUsers();
    this.getselect();
    let username = sessionStorage.getItem('huigujia_token');
    this.headersA=username;
    this.action=this.$store.state.api+"/image/upload";
  },
  methods:{
    getUsers(){
      this.$http.get(this.$store.state.api+'/channel/pages',{params:{pageNum:this.pageIndex,pageSize:this.pageSize}},{emulateJSON: true})
      .then((res)=>{
        this.tableData = res.body.dataList;
        this.total = res.body.objectotalNumber;
      })
    },
    getselect(){
      this.$http.get(this.$store.state.api+'/constant/provinces')
      .then((res)=>{
        this.areaProvinceIds = res.body;
      })
    },
    handleAvatarSuccess(res, file) {
        this.logoUrl = URL.createObjectURL(file.raw);
        this.logoType=res;
      },
    beforeAvatarUpload(file) {
        const isPNG = file.type === 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isPNG) {
          this.$message.error('上传头像图片只能是 png格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isPNG && isLt2M;
      },
    handleAvatarSuccess1(res, file) {
        this.stampUrl = URL.createObjectURL(file.raw);
        this.stampType=res;
      },
      beforeAvatarUpload1(file) {
        const isPNG = file.type === 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isPNG) {
          this.$message.error('上传头像图片只能是 png或jpg 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isPNG && isLt2M;
      },
    handleAvatarSuccess2(res, file) {
        this.watermarkUrl = URL.createObjectURL(file.raw);
        this.watermarkType=res;
      },
      beforeAvatarUpload2(file) {
        const isPNG = file.type === 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isPNG) {
          this.$message.error('上传头像图片只能是 png或jpg 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isPNG && isLt2M;
      },
    handleAvatarSuccess3(res, file) {
        this.wechatUrl = URL.createObjectURL(file.raw);
        this.wechatType=res;
      },
    beforeAvatarUpload3(file) {
        const isPNG = file.type === 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isPNG) {
          this.$message.error('上传头像图片只能是 png或jpg 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isPNG && isLt2M;
      },
    deleteLogo:function(){
      this.logoUpdateView = !this.logoUpdateView;
      this.logoUpdate = !this.logoUpdate;
    },
    deleteLogo1:function(){
      this.logoUpdateView1 = !this.logoUpdateView1;
      this.logoUpdate1 = !this.logoUpdate1;
    },
    deleteLogo2:function(){
      this.logoUpdateView2 = !this.logoUpdateView2;
      this.logoUpdate2 = !this.logoUpdate2;
    },
    deleteLogo3:function(){
      this.logoUpdateView3 = !this.logoUpdateView3;
      this.logoUpdate3 = !this.logoUpdate3;
    },
    selectCity:function(){
      this.$http.get(this.$store.state.api+'/constant/citys/provinceId',{params:{provinceId:this.areaProvinceId}},{emulateJSON: true})
      .then((res)=>{
        this.areaCityIds = res.body;
      })
    },
    changeRow:function(index){      //修改
      this.logoUpdate=false;
      this.logoUpdateView=true;
      this.logoUpdate1=false;
      this.logoUpdateView1=true;
      this.logoUpdate2=false;
      this.logoUpdateView2=true;
      this.logoUpdate3=false;
      this.logoUpdateView3=true;
      this.mainAddShow = !this.mainAddShow;
      this.mainContentviewC = !this.mainContentviewC;
      this.$http.get(this.$store.state.api+'/channel/id',{params:{id:this.tableData[index].id}},{emulateJSON:true})
      .then((res)=>{
        this.form=res.body.data;
        this.areaProvinceId = res.body.data.areaProvinceId;
        this.areaCityId = res.body.data.areaCityId;
      });
      this.$http.get(this.$store.state.api+'/image/image',{params:{module:"channel",type:"logo",id:this.tableData[index].id}},{emulateJSON: true})
      .then((res)=>{
        this.channelLogo="data:image/png;base64,"+res.body.data.image;
        this.logoType=res.body.data.type;
      });
      this.$http.get(this.$store.state.api+'/image/image',{params:{module:"channel",type:"stamp",id:this.tableData[index].id}},{emulateJSON: true})
      .then((res)=>{
        this.channelStamp="data:image/png;base64,"+res.body.data.image;
        this.stampType=res.body.data.type;
      });
      this.$http.get(this.$store.state.api+'/image/image',{params:{module:"channel",type:"wechat",id:this.tableData[index].id}},{emulateJSON: true})
      .then((res)=>{
        this.wechatLogo="data:image/png;base64,"+res.body.data.image;
        this.wechatType=res.body.data.type;
      });
      this.$http.get(this.$store.state.api+'/image/image',{params:{module:"channel",type:"watermark",id:this.tableData[index].id}},{emulateJSON: true})
      .then((res)=>{
        this.channelWatermark="data:image/png;base64,"+res.body.data.image;
        this.watermarkType=res.body.data.type;
      });
      this.getselect();
    },
    deleteRow:function(index){      //删除
      this.fullscreenLoading = true;
        setTimeout(() => {
          this.fullscreenLoading = false;
          this.$http.delete(this.$store.state.api+'/channel/id',{params:{id:this.tableData[index].id}},{emulateJSON: true})
      .then((res)=>{
        this.getUsers();
      })
        }, 1000);
    },
    toView:function(index){           //查看
      this.mainAddShow = !this.mainAddShow;
      this.toviewC = !this.toviewC;
      this.$http.get(this.$store.state.api+'/channel/id',{params:{id:this.tableData[index].id}},{emulateJSON:true})
      .then((res)=>{
        this.form=res.body.data;
      })
    },
    addRow:function(){          //添加
      this.mainAddShow = !this.mainAddShow;
      this.mainContentaddC = !this.mainContentaddC;
      this.getselect();
    },
    onSubmit:function(formName){  //获取输入框的内容向接口发送
      if(this.logoType==""||this.stampType==""||this.watermarkType==""||this.wechatType==""||this.logoType==undefined||this.stampType==undefined||this.watermarkType==undefined||this.wechatType==undefined){
        this.$message.error('公司logo 公章 水印文件为必填项');
        return false;
      };
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http.post(this.$store.state.api+'/channel/insert',{phoneNumber:this.form.phoneNumber,telNumber:this.form.telNumber,address:this.form.address,areaCityId:this.areaCityId,areaProvinceId:this.areaProvinceId,channelName:this.form.channelName,contactPerson:this.form.contactPerson,description:this.form.description,email:this.form.email,logoType:this.logoType,stampType:this.stampType,watermarkType:this.watermarkType,wechatType:this.wechatType,})
          .then((res)=>{
            this.getUsers();
            if(res.body.message){
              this.$message.error(res.body.message);
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
    onSubmitU:function(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http.post(this.$store.state.api+'/channel/update',{id:this.form.id,phoneNumber:this.form.phoneNumber,telNumber:this.form.telNumber,address:this.form.address,areaCityId:this.areaCityId,areaProvinceId:this.areaProvinceId,channelName:this.form.channelName,contactPerson:this.form.contactPerson,description:this.form.description,email:this.form.email,logoType:this.logoType,stampType:this.stampType,watermarkType:this.watermarkType,wechatType:this.wechatType,})
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
    cleanUp:function(){
      this.areaProvinceId ='';
      this.areaCityId ='';
      this.logoUrl='';
      this.stampUrl='';
      this.watermarkUrl='';
      this.wechatUrl='';
      this.form.id='';
      this.form.channelName='';
      this.form.address='';
      this.form.contactPerson='';
      this.form.phoneNumber='';
      this.form.telNumber='';
      this.form.email='';
      this.form.description='';
      this.logoType='';
      this.stampType='';
      this.watermarkType='';
      this.wechatType='';
    },
    onCancel:function(formName){        //关闭蒙层
      this.cleanUp();
      this.mainAddShow = !this.mainAddShow;
      this.mainContentaddC = !this.mainContentaddC;
      //this.$refs[formName].resetFields();
    },
    onCancelU:function(formName){
      this.cleanUp();
      this.mainAddShow = !this.mainAddShow;
      this.mainContentviewC = !this.mainContentviewC;
      //this.$refs[formName].resetFields();
    },
    onCancelUU:function(){
      this.mainAddShow = !this.mainAddShow;
      this.toviewC = !this.toviewC;
      this.cleanUp();
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
      this.$http.get(this.$store.state.api+'/channel/pages',{params:{pageNum:this.pageIndex,pageSize:this.pageSize}},{emulateJSON: true})
      .then((res)=>{
        this.tableData = res.body.dataList;
      })
    },
    mainSearch:function(){    //查询
      this.fullscreenLoading = true;
        setTimeout(() => {
          this.fullscreenLoading = false;
          this.$http.get(this.$store.state.api+'/channel/pages',{params:{pageNum:1,pageSize:this.pageSize,channelName:this.mainSearchinput,areaProvinceId:this.areaProvinceId,areaCityId:this.areaCityId,}},{emulateJSON: true})
          .then((res)=>{
          this.tableData = res.body.dataList;
          });
          this.mainSearchinput='';
          this.areaProvinceId='';
          this.areaCityId='';
        }, 1000);
    },
  }
}
</script>

<style>
#agencymore {
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

#agencymore .mainContentadd {
  width: 650px;
  height: 600px;
  background: #fff;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  border-radius: 10px;
}

#agencymore .mainContentview {
  width: 650px;
  height: 650px;
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
}

.viewButton {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 15px;
  margin-left: -100px;
}

.description {
  width: 715px !important;
}
.descriptionS {
  width: 1100px !important;
}
.toviewC {
  width: 980px;
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

.paddingButton {
  margin-left: 10px;
}

#agencymore .mainSearch {
  width: 750px;
}

.main-add-input-B {
  width: 70% !important;
}

#selectContent .el-form-item__content {
  margin-left: 100px !important;
}

#agencymore .addButtonDiv {
  margin-left: 260px;
  position: absolute;
  bottom: 15px;
}

.uploadContral {
  width: 200px;
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

#agencymore .mainNavadd{
  margin-left: 280px;
  margin-top: 20px;
  margin-bottom: 20px;
}

.logoUpdateControlSpan {
  position: relative;
  top: 10px;
  left: 23px;
}
.specialCity:before{
  content: "*";
  color: #ff4949;
  position: absolute;
  top:150px;
  left: 338px;
}
.specialProvince:before{
  content: "*";
  color: #ff4949;
  position: absolute;
  top:150px;
  left: 23px; 
}
#Updatefile .el-form-item__label{
  width: 85px !important;
}
#Updatefile .el-form-item__content{
  margin-left: 85px !important;
}
</style>