<template>
  <div class="card_border">
    <headeritem :text="headText"></headeritem>

    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="300px" class="demo-ruleForm">
      <el-form-item label="姓名：" prop="username">
        <el-input v-model="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item label="身份证号：" prop="idCard">
        <el-input v-model="ruleForm.idCard"></el-input>
      </el-form-item>
      <el-form-item label="预留手机号码：" prop="phoneNumber">
        <el-input v-model="ruleForm.phoneNumber"></el-input>
        <el-button type="danger" @click="getCaptchaClick()">获取验证码</el-button>
      </el-form-item>
      <el-form-item label="短信验证码：" prop="captchaCode">
        <el-input v-model="ruleForm.captchaCode"></el-input>
      </el-form-item>
      <el-form-item label="设置登录密码：" prop="loginPassword">
        <el-input type="password" v-model="ruleForm.loginPassword"></el-input>
      </el-form-item>
      <el-form-item label="再次输入密码：" prop="loginPasswordConfirm">
        <el-input type="password" v-model="ruleForm.loginPasswordConfirm"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="danger" @click="confirmClick('ruleForm')">确认开户</el-button>
        <el-button type="danger" @click="cancelClick()">返回登录</el-button>
      </el-form-item>
    </el-form>
    <!--    <div class="input_list">-->
    <!--      <inputitem :label="label1" :type="type1" v-model="input1"></inputitem>-->
    <!--      <inputitem :label="label2" :type="type2" v-model="input2"></inputitem>-->
    <!--&lt;!&ndash;      <inputitem :label="label3" :type="type3" v-model="input1"></inputitem>&ndash;&gt;-->
    <!--&lt;!&ndash;      <inputitem :label="label4" :type="type4" v-model="input1"></inputitem>&ndash;&gt;-->
    <!--      <inputitem :label="label5" :type="type5" v-model="input5"></inputitem>-->
    <!--      <buttonitem @click.native="getCaptchaClick()" :text="getCaptchaText"></buttonitem>-->
    <!--      <inputitem :label="label6" :type="type6" v-model="input6"></inputitem>-->
    <!--      <inputitem :label="label7" :type="type7" v-model="input7"></inputitem>-->
    <!--      <inputitem :label="label8" :type="type8" v-model="input8"></inputitem>-->

    <!--    </div>-->
    <!--    <div class="button_row">-->
    <!--      <buttonitem @click.native="confirmClick" :text="confirmText"></buttonitem>-->
    <!--      <buttonitem @click.native="cancelClick" :text="cancelText"></buttonitem>-->

    <!--    </div>-->

  </div>
</template>

<script>

    import buttonitem from '../../components/buttonitem'
    import headeritem from '../../components/headeritem'
    import inputitem from '../../components/inputitem'
    import {mapState, mapMutations} from 'vuex'
    import {resetApi} from "../../service/getData";
    import * as config from '../../config/env'

    export default {
        name: 'reset',
        components: {
            buttonitem,
            headeritem,
            inputitem
        },
        data() {
            return {
                ruleForm: {
                    username: '',
                    idCard: '',
                    phoneNumber: '',
                    captchaCode: '',
                    loginPassword: '',
                    loginPasswordConfirm: '',
                },
                rules: {},
                confirmText: "确认提交",
                cancelText: "返回登录",
                headText: "忘记登录密码",
                getCaptchaText: "获取验证码",
                label1: '姓名',
                label2: '身份证号',
                // label3: 'I类或II类卡号',
                // label4: '支付密码',
                label5: '手机号',
                label6: '短信验证码',
                label7: '设置新密码',
                label8: '确认新密码',
                type1: 'text',
                type2: 'text',
                type3: 'text',
                type4: 'password',
                type5: 'text',
                type6: 'text',
                type7: 'password',
                type8: 'password',
                input1: '张三-1',
                input2: '440102198001021231',
                input3: '',
                input4: '',
                input5: '18210443801',
                input6: '',
                input7: 'qwerty',
                input8: 'qwerty',
            }
        },
        //     props: ['fatherComponent'],
        //     computed: mapState([
        //         'itemNum', //第几题
        //         'level', //第几周
        //         'itemDetail', //题目详情
        //         'timer', //计时器
        //     ]),
        methods: {
            // ...mapMutations([
            //     // 'addNum', 'initializeData',
            // ]),
            confirmClick(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // let data = {
                        //     username: this.input1,
                        //     idCard: this.input2,
                        //     phoneNumber: this.input5,
                        //     captchaCode: this.input6,
                        //     loginPassword: this.input7,
                        //     loginPasswordConfirm: this.input8
                        // }

                        this.$axios.post(config.baseUrl + "/reset", this.ruleForm).then(res => {
                            console.log(res.data)
                            this.$router.push('login')

                        })
                    }
                });
            },
            cancelClick() {
                this.$router.go(-1)
            },
            getCaptchaClick() {
                this.$axios.get(config.baseUrl + '/captcha/' + this.input5 + "?behavior=0").then(res => {
                    console.log(res.data.data)
                    let captcha_code = res.data.data.captchaCode
                    let captcha_id = res.data.data.id
                    let userPhoneNumber = res.data.data.userPhoneNumber
                    let expirationDate = res.data.data.expirationDate
                    alert(userPhoneNumber + "收到编号" + captcha_id + "的验证码短信：" + captcha_code + ",过期时间为" + expirationDate)
                    this.input6 = captcha_code
                })

            },

        }
    }

</script>

<style lang="less">
  .input_list {
    display: flex;
    width: 720px;
    -ms-flex-direction: row;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-end;
    padding: 10px 38px;
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
  .el-input{
    width: 70%;
  }

</style>
