<template>
  <div>
    <div>
      <el-container>
        <el-container style="width: 50%">
          <el-breadcrumb separator="》" style="padding-left:10px;font-size:15px;">
            <el-breadcrumb-item :to="{ path: '/StuHome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>实践创新</el-breadcrumb-item>
            <el-breadcrumb-item>职务上报</el-breadcrumb-item>
          </el-breadcrumb>
        </el-container>
        <el-container>
          <el-row>
            <el-button type="warning" round @click="postdetail" >职务明细</el-button>
          </el-row>
        </el-container>
      </el-container>
    </div>
    <el-container>
      <el-container>
        <el-card class="postform">
          <el-row :gutter="0">
            <el-form ref="post" :model="post" :rules="rules" size="mini" label-width="100px">
              <el-col :span="8">
                <el-form-item label="任职学年" prop="scyear" style="padding-top: 3%">
                  <el-select v-model="post.scyear" placeholder="任职学年" clearable :style="{width: '100%'}">
                    <el-option v-for="(item, index) in scyearOptions" :key="index" :label="item.label"
                               :value="item.value" :disabled="item.disabled"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="任职学期" prop="semester" style="padding-top: 3%">
                  <el-select v-model="post.semester" placeholder="任职学期" clearable :style="{width: '100%'}">
                    <el-option v-for="(item, index) in semesterOptions" :key="index" :label="item.label"
                               :value="item.value" :disabled="item.disabled"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="履职日期" prop="time" style="padding-top: 3%">
                  <el-date-picker v-model="post.time" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                                  :style="{width: '100%'}" placeholder="履职日期" clearable></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="级别" prop="level" style="padding-top: 3%">
                  <el-select v-model="post.level" placeholder="请选择级别" clearable :style="{width: '100%'}">
                    <el-option v-for="(item, index) in levelOptions" :key="index" :label="item.label"
                               :value="item.value" :disabled="item.disabled"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="组织" prop="organization" style="padding-top: 3%">
                  <el-select v-model="post.organization" placeholder="请选择组织" clearable :style="{width: '100%'}">
                    <el-option v-for="(item, index) in organizationOptions" :key="index" :label="item.label"
                               :value="item.value" :disabled="item.disabled"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="任职情况" prop="age" style="padding-top: 3%">
                  <el-select v-model="post.age" placeholder="请选择任职情况" clearable :style="{width: '100%'}">
                    <el-option v-for="(item, index) in ageOptions" :key="index" :label="item.label"
                               :value="item.value" :disabled="item.disabled"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="职务" prop="poname" style="padding-top: 3%">
                  <el-input v-model="post.poname" placeholder="请输入职务" clearable :style="{width: '100%'}"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="加分数" prop="mark" style="padding-top: 3%">
                  <el-rate v-model="post.mark" :max='54' show-score></el-rate>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label-width="130px" label="证明材料上传" prop="prove" style="padding-top: 10%">

                  <el-upload ref="prove" :file-list="provefileList" :action="proveAction"
                             :on-success="submitsuccess"
                             :class="{hide:hideUpload}"
                             :on-remove="removeimage"
                             :on-change="handleChange"
                             :before-upload="proveBeforeUpload" list-type="picture-card" accept="image/*">
                    <i class="el-icon-plus"></i>
                  </el-upload>

                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item size="medium" style="padding-top: 5%" >
                  <span style="padding-left: 20%">
                  <el-button type="primary" @click="submitForm">上报申请</el-button>
                  </span>
                  <span style="padding-left: 10%">
                  <el-button @click="resetForm">重置数据</el-button>
                  </span>
                </el-form-item>
              </el-col>
            </el-form>
          </el-row>
        </el-card>
      </el-container>


      <el-container>
        <el-card style="width: 500px;height: 590px;margin-left: 6%; margin-top: 3%;">
          <h3>职务加分标准</h3>
          <img src="../../../assets/img/post.jpg" style="width: 400px;height: 500px">
        </el-card>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import {provedelete,setextrapoint} from '../../../api/taekeoffice'
  export default {
    name: 'post',
    data() {
      return {
        hideUpload: false,
        post: {
          scyear: "",
          semester: "",
          time: null,
          level: undefined,
          organization: undefined,
          age: undefined,
          poname: undefined,
          mark: 12,
          prove: null,
        },
        rules: {
          scyear: [{
            required: true,
            message: '任职学年',
            trigger: 'change'
          }],
          semester: [{
            required: true,
            message: '任职学期',
            trigger: 'change'
          }],
          time: [{
            required: true,
            message: '履职日期',
            trigger: 'change'
          }],
          level: [{
            required: true,
            message: '请选择级别',
            trigger: 'change'
          }],
          organization: [{
            required: true,
            message: '请选择组织',
            trigger: 'change'
          }],
          age: [{
            required: true,
            message: '请选择任职情况',
            trigger: 'change'
          }],
          poname: [{
            required: true,
            message: '请输入职务',
            trigger: 'blur'
          }],
          mark: [{
            required: true,
            message: '加分数不能为空',
            trigger: 'change'
          }],
        },
        proveAction: "http://localhost:8082/ZongCe/takeoffice/proveupload",
        provefileList: [],
        scyearOptions: [
          {
            "label": "2021年~2022年",
            "value": "2021年~2022年"
          }, {
            "label": "2020年~2021年",
            "value": "2020年~2021年"
          }, {
            "label": "2019年~2020年",
            "value": "2019年~2020年"
          }, {
            "label": "2018年~2019年",
            "value":"2018年~2019年"
          }],
        semesterOptions: [
          {
          "label": "第一学期",
          "value": 1
        }, {
          "label": "第二学期",
          "value": 2
        },
          {
            "label": "第一、二学期",
            "value": 3
          }],
        levelOptions: [
          {
          "label": "一级岗位",
          "value": 1
        }, {
          "label": "二级岗位",
          "value": 2
        }, {
          "label": "三级岗位",
          "value": 3
        }, {
          "label": "四级岗位",
          "value": 4
        }, {
          "label": "五级岗位",
          "value": 5
        }, {
          "label": "六级岗位",
          "value": 6
        }, {
          "label": "七级岗位",
          "value": 7
        }, {
          "label": "八级岗位",
          "value": 8
        }, {
          "label": "九级岗位",
          "value": 9
        }],
        organizationOptions: [
          {
          "label": "党团组织",
          "value": "党团组织",
        }, {
          "label": "学生会",
          "value": "学生会",
        }, {
          "label": "校社团联合会",
          "value": "校社团联合会",
        }, {
          "label": "青年志愿者协会，红十字会学生理事会",
          "value": "青年志愿者协会，红十字会学生理事会",
        }, {
          "label": "校广播站，艺术团，学生助理",
          "value":  "校广播站，艺术团，学生助理",
        }, {
          "label": "其它校内组织",
          "value": "其它校内组织"
        }],
        ageOptions: [
          {
          "label": "已满一年",
          "value": "已满一年"
        }, {
          "label": "未满一年但满一学期",
          "value":"未满一年但满一学期"
        }, {
          "label": "未满一学期",
          "value":  "未满一学期"
        }],
      }
    },
    methods: {
      async setextrapoint(stunum,postobject){
        const { data }=await setextrapoint(stunum,postobject)
        console.log(data)
        if(data.code===200)this.$message({
          message: "加分上报成功！",
          type: 'success'
        });
        else this.$message({
          message: "加分上报失败！",
          type: 'error'
        });
      },
      async proveDelete(file){
        const { data }=await provedelete(file)
        console.log(data)
      },
      handleChange(file,fileList) {
        this.hideUpload = fileList.length>=1;
      },
      removeimage(fileList){
        this.hideUpload = fileList.length >= 1;
        var oldprove=this.post.prove
        this.post.prove=null
        this.proveDelete(oldprove)

      },
      submitsuccess(data){
        console.log(data)
        this.post.prove=data.data.url
        console.log( "证明材料链接："+this.post.prove+"牛逼")
      },

      postdetail(){
        this.$router.push('/takeoffice')
      },
      submitForm() {
        this.$refs['post'].validate(valid => {
          if (!valid) return
          // TODO 提交表单
          var stunum=this.$session.get("user").stunum
          this.setextrapoint(stunum,this.post)
          var that = this;
          setTimeout(function(){
            that.$router.go(0)
          },800)
        })
      },
      resetForm() {
        this.$refs['post'].resetFields()
      },
      proveBeforeUpload(file) {
        let isRightSize = file.size / 1024 / 1024 < 10
        if (!isRightSize) {
          this.$message.error('文件大小超过 10MB')
        }
        let isAccept = new RegExp('image/*').test(file.type)
        if (!isAccept) {
          this.$message.error('应该选择image/*类型的文件')
        }
        return isRightSize && isAccept
      },
    }
  }
</script>

<style scoped>
  .postform{
    width: 800px;
    height: 590px;
    margin-left: 2%;
    margin-top: 2%;
    text-align: left;
    /*background-image: url("../../../assets/submitaction.png") ;*/
    /*backdrop-filter: inherit;*/
    background: #fcfcfc url('../../../assets/bac/endeavor.png') no-repeat bottom right/ 45% auto;
    /*background-size: cover;*/
    /*background: #fff url("../../../assets/submitaction.png") no-repeat;*/
  .el-rate {
    display: inline-block;
    vertical-align: text-top;
  }

  .el-upload__tip {
    line-height: 1.2;
  }
  }
</style>
