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
      <el-form-item label="II类卡卡号：" prop="card_II_ID">
        <el-input v-model="ruleForm.card_II_ID"></el-input>
      </el-form-item>
      <el-form-item label="设置登录密码：" prop="paymentPassword">
        <el-input type="password" v-model="ruleForm.paymentPassword"></el-input>
      </el-form-item>
      <el-form-item label="预留手机号码：" prop="phoneNumber">
        <el-input v-model="ruleForm.phoneNumber"></el-input>
        <el-button type="danger" @click="getCaptchaClick()">获取验证码</el-button>
      </el-form-item>
      <el-form-item label="短信验证码：" prop="captchaCode">
        <el-input v-model="ruleForm.captchaCode"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="danger" @click="confirmClick('ruleForm')">确认注销</el-button>
        <el-button type="danger" @click="cancelClick()">取消注销</el-button>
      </el-form-item>
    </el-form>
    <!--    <div class="input_list">-->
    <!--      <inputitem :label="label1" :type="type1" v-model="input1"></inputitem>-->
    <!--      <inputitem :label="label2" :type="type2" v-model="input2"></inputitem>-->
    <!--      <inputitem :label="label3" :type="type3" v-model="input3"></inputitem>-->
    <!--      <inputitem :label="label4" :type="type4" v-model="input4"></inputitem>-->
    <!--      <inputitem :label="label5" :type="type5" v-model="input5"></inputitem>-->
    <!--      <buttonitem @click.native="getCaptchaClick()" :text="getCaptchaText"></buttonitem>-->
    <!--      <inputitem :label="label6" :type="type6" v-model="input6"></inputitem>-->

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
    import {cancelApi} from "../../service/getData";
    import * as config from '../../config/env'

    export default {
        name: 'cancel',
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
                    card_II_ID: '',
                    paymentPassword: '',
                    phoneNumber: '',
                    captchaCode: '',
                },
                rules: {},
                confirmText: "确认注销",
                cancelText: "取消注销",
                headText: "电子II类账户销户信息登记",
                getCaptchaText: "获取验证码",
                label1: '姓名',
                label2: '身份证号',
                label3: 'II类卡号',
                label4: '支付密码',
                label5: '手机号',
                label6: '短信验证码',
                type1: 'text',
                type2: 'text',
                type3: 'text',
                type4: 'password',
                type5: 'text',
                type6: 'text',
                input1: this.$store.state.userInfo.username,
                input2: this.$store.state.userInfo.idCard,
                input3: this.$store.state.card_II.cardId,
                input4: this.$store.state.card_II.paymentPassword,
                input5: this.$store.state.userInfo.phoneNumber,
                input6: ''
            }
        },
        computed: mapState([
            'card_II_id',
        ]),
        methods: {
            ...mapMutations([
                'CANCEL'
            ]),
            confirmClick(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // let data = {
                        //     username: this.ruleForm.username,
                        //     loginPassword: this.ruleForm.password
                        // }
                        // let data = {
                        //     username: this.ruleForm.input1,
                        //     idCard: this.ruleForm.input2,
                        //     card_II_ID: this.input3,
                        //     paymentPassword: this.input4,
                        //     phoneNumber: this.input5,
                        //     captchaCode: this.input6,
                        //
                        // }
                        console.log(this.$store.state)
                        if (this.$store.state.card_II.balance == 0) {
                            this.$axios.post(config.baseUrl + '/cancelAccount', this.ruleForm, {
                                headers: {
                                    "Authorization": localStorage.getItem("token")
                                }
                            }).then(res => {
                                console.log(res.data)
                                this.CANCEL(res.data.data.cardId);
                                this.$router.push('cancelsucc')
                            })

                        } else {
                            alert("余额不为零，请提现后注销")
                        }
                    }
                });
            },
            cancelClick() {
                this.$router.go(-1)
            },
            getCaptchaClick() {

                this.$axios.get(config.baseUrl + '/captcha/' + this.input5 + "?behavior=-1").then(res => {

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
