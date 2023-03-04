<template>
  <div class="login-panel">
    <div class="login-close" @click="closeLogin">
      <img src="../../../../assets/img/header/close.svg" />
    </div>
    <div class="login-mes">
      <img src="../../../../assets/img/header/loginPhone.svg" />
    </div>
    <div class="login-info">
      <el-input
        @blur="_phoneVerify"
        class="login-phone"
        placeholder="请输入手机号"
        v-model="phone"
        clearable
        style="margin-bottom: 10px"
      >
      </el-input>
      <el-input
        class="login-pwd"
        @blur="pwdVerify"
        placeholder="请输入密码"
        v-model="pwd"
        show-password
      ></el-input>
      <el-button type="danger" class="login-btn" @click="_login"
        >登录</el-button
      >
      <p>注册</p>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { phoneVerify, login } from "../../../../network/login.js";
export default {
  data() {
    return {
      phone: "",
      pwd: "",
    };
  },
  methods: {
    ...mapMutations(["updateToken", "updateAvatar", "updateUserName"]),
    closeLogin() {
      this.$parent.isLogin = false;
    },
    //手机号码验证
    _phoneVerify() {
      if (this.phone.trim() === "") {
        this.$message.error("请输入手机号");
        return;
      } else {
        phoneVerify(this.phone).then((res) => {
          if (res.data.exist != 1) {
            this.$message.error("手机号输入错误!");
          }
        });
      }
    },
    pwdVerify() {
      if (this.pwd.trim() === "") {
        this.$message.error("请输入密码");
        return;
      }
    },
    _login() {
      login(this.phone, this.pwd).then((res) => {
        if (res.data.code != 200) {
          this.$message.error("密码错误!");
          return;
        } else {
          this.closeLogin();
          let token = res.data.token;
          let avatar = res.data.profile.avatarUrl;
          let userName = res.data.profile.nickname;
          this.updateToken(token);
          localStorage.setItem("token", token);
          this.updateAvatar(avatar);
          this.updateUserName(userName);
          localStorage.setItem("avatar", avatar);
          localStorage.setItem("uid", res.data.profile.userId);
          localStorage.setItem("userName", userName);
          this.$message.success("登录成功!");
        }
      });
    },
  },
};
</script>

<style scoped>
.login-panel {
  position: fixed;
  z-index: 100;
  top: 60px;
  left: 40%;
  width: 25%;
  height: 500px;
  background-color: #eee;
}
.login-close {
  float: right;
  width: 20px;
  height: 20px;
  margin: 10px 10px 0 0;
}
.login-close img {
  width: 100%;
  height: 100%;
}
.login-mes {
  width: 80px;
  height: 100px;
  margin: 30px auto;
}

.login-mes img {
  width: 100%;
  height: 100%;
}
.login-info {
  width: 200px;
  margin: 0 auto;
}
.login-btn {
  margin-top: 20px;
  width: 200px;
}
.login-info p {
  text-align: center;
  margin-top: 20px;
  font-size: 14px;
}
/* >>> .el-input__inner {
  background-color: #fff;
  border: none;
  color: white;
  border-radius: 15px;
} */
</style>
