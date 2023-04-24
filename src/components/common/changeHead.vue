<template>
  <el-dialog title="头像修改" :visible.sync="dialogFormVisible" class="changehead" center @close="Close">
    <div style="padding-left: 34%">
    <pan-thumb :image="image" />
    </div>
      <div style="padding-top: 20%;padding-left: 28%">
    <el-button type="primary" icon="el-icon-upload" style="position: absolute;bottom: 15px;margin-left: 40px;" @click="imagecropperShow=true">
      上传头像
    </el-button>
      </div>


    <image-cropper
      v-show="imagecropperShow"
      :width="300"
      :height="300"
      :key="imagecropperKey"
      :url="'/ZongCe/student/modifyHead'"
      field="file"
      @close="closeImage"
      @crop-upload-success="cropSuccess"/>

  </el-dialog>
</template>


<script>

  import ImageCropper from '@/components/ImageCropper'
  import PanThumb from '@/components/PanThumb'
  import { deleteImgFile } from '@/api/Users'


  export default {
    name: 'changeHead',
    props:['dialogFormVisible','image'],
    components: { ImageCropper, PanThumb },
    data() {
      return {
        imagecropperShow: false,
        imagecropperKey: 0,
      }
    },
    created () {

    },
    methods: {
      field101BeforeUpload(file) {
        let isRightSize = file.size / 1024 / 1024 < 2
        if (!isRightSize) {
          this.$message.error('文件大小超过 2MB')
        }
        let isAccept = new RegExp('image/*').test(file.type)
        if (!isAccept) {
          this.$message.error('应该选择image/*类型的文件')
        }
        return isRightSize && isAccept
      },
      // 上传成功后的回调函数
      cropSuccess(data) {
        console.log(data)
        var oldImage = this.image;
        this.imagecropperShow = false
        var newImage=data.data.url;
        var id=this.$session.get("user").stunum
        if(id===undefined)id=this.$session.get("user").teanum
        var user=this.$session.get("user")
        user.head=newImage
        this.$session.set("user",user)
        console.log(this.$session.get("user"))
        // 上传成功后，重新打开上传组件时初始化组件，否则显示上一次的上传结果
        this.imagecropperKey = this.imagecropperKey + 1
        //上传成功之后删除之前的头像
        console.log(id)
        console.log(newImage)
        this.deleteAvatar(oldImage,id,newImage);
        this.$emit("replaceHead");
        this.$message({
          message: '头像修改成功！',
          type: 'success'
        });

      },
      async deleteAvatar(oldImage,id,newImage){
        const {data} = await deleteImgFile(oldImage,id,newImage)
      },
      // 关闭上传组件
      closeImage() {
        this.imagecropperShow = false
        // 上传失败后，重新打开上传组件时初始化组件，否则显示上一次的上传结果
        this.imagecropperKey = this.imagecropperKey + 1
      },
      close() {
        this.imagecropperShow = false
      },

      Close () {
        this.dialogFormVisible = false;
        this.$emit("ChangedialogFormVisible");
      }
    }
  }
</script>

<style  scoped>
  .avatar{
    width: 200px;
    height: 200px;
    border-radius: 50%;
  }
  .changehead{
    height: 3000px;
    width: 1000px;
    position: center;
    text-align: center;
    margin-left: 23%;
    margin-top: 5%;
  }
</style>
