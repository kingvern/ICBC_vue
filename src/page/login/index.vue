<template>
  <div class="card_border">
    <headeritem :text="headText"></headeritem>
<!--      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">-->
<!--        <el-form-item label="用户名" prop="username">-->
<!--          <el-input v-model="ruleForm.username"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="密码" prop="password">-->
<!--          <el-input type="password" v-model="ruleForm.password"></el-input>-->
<!--        </el-form-item>-->

<!--        <el-form-item>-->
<!--          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>-->
<!--          <el-button @click="resetForm('ruleForm')">重置</el-button>-->
<!--        </el-form-item>-->
<!--      </el-form>-->
    <div class="input_list">
      <inputitem :label="label1" :type="type1" v-model="userAccount"></inputitem>
      <inputitem :label="label2" :type="type2" v-model="passWord"></inputitem>

      <span class="forget_span" @click="resetClick" ><a class="forget_pwd">忘记密码</a></span>
    </div>
    <div class="button_row">
      <buttonitem @click.native="loginClick" :text="loginText"></buttonitem>
      <buttonitem @click.native="signinClick" :text="signinText"></buttonitem>

    </div>

  </div>
</template>

<script>

    import buttonitem from '../../components/buttonitem'
    import headeritem from '../../components/headeritem'
    import inputitem from '../../components/inputitem'
    import {mapState, mapMutations} from 'vuex'
    import {loginApi} from '../../service/getData'

    export default {
        name: 'login',
        components: {
            buttonitem,
            headeritem,
            inputitem
        },
        data() {
            return {
                signinText: "注册开户",
                loginText: "点击登录",
                headText: "电子II类账户充值服务平台",
                label1: 'I类卡/II类卡号/电话号码',
                label2: '登录密码',
                type1: 'text',
                type2: 'password',
                userAccount: '440102198001021231',
                passWord: '1'
            }
        },
        methods: {
            ...mapMutations([
                'LOGIN','SET_TOKEN'
            ]),
            loginClick() {
                // if (!this.userAccount) {
                //     this.showAlert = true;
                //     this.alertText = '请输入手机号/邮箱/用户名';
                //     return
                // }else if(!this.passWord){
                //     this.showAlert = true;
                //     this.alertText = '请输入密码';
                //     return
                // }
                let data = {
                    username: this.userAccount,
                    loginPassword: this.passWord
                }
                this.$axios.post('http://47.95.255.230:8080/login', data).then(res => {

                    console.log(res.data)
                    let loginData = res.data

                    if(loginData.code != 200){
                        alert(loginData.msg)
                    }
                    else{
                        const jwt = res.headers['authorization']
                        // 把数据共享出去
                        this.SET_TOKEN(jwt)
                        this.LOGIN(loginData);
                        if(loginData.data.card_II){
                            this.$router.push('home');
                        }else{
                            alert("您还没有II类卡，请注册II类卡！")
                        }
                    }



                })

            },
            resetClick() {
                this.$router.push('reset')
            },

            signinClick() {
                this.$router.push('signin')
            },

        }
    }

</script>

<style lang="less">
  .input_list {
    display: flex;
    -ms-flex-direction: row;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-end;
    padding: 10px 38px;
  }

  .input_list .forget_span{
    font-size: 22px;
    margin-bottom: 50px;
  }
  .input_list .forget_span a{
    color: dodgerblue;
  }

  .card_border {
    width: 900px;
    padding: 20px 20px 75px 20px;
    margin: 50px auto;
    border: 1px #797979 solid;
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.3);
  }

  .button_row {
    display: flex;
    -ms-flex-direction: column;
    flex-direction: row;
    justify-content: center;
  }

  .forget_pwd {
    padding: 0 10px;
    font-size: 15px;
    margin-bottom: 40px;

  }


</style>
