<template>
  <div class="card_border">
    <headeritem :text="headText"></headeritem>
    <!--    <div class="input_list">-->
    <!--      <inputitem :label="label1" :type="type1" v-model="input1"></inputitem>-->
    <!--      <inputitem :label="label2" :type="type2" v-model="input2"></inputitem>-->
    <!--      <inputitem :label="label3" :type="type3" v-model="input3"></inputitem>-->
    <!--      <inputitem :label="label4" :type="type4" v-model="input4"></inputitem>-->
    <!--      &lt;!&ndash;      <inputitem :label="label5" :type="type5" v-model="input1"></inputitem>&ndash;&gt;-->
    <!--      <inputitem :label="label6" :type="type6" v-model="input6"></inputitem>-->
    <!--      <inputitem :label="label7" :type="type7" v-model="input7"></inputitem>-->
    <!--      <inputitem :label="label8" :type="type8" v-model="input8"></inputitem>-->
    <!--      <inputitem :label="label9" :type="type9" v-model="input9"></inputitem>-->
    <!--      <buttonitem @click.native="getCaptchaClick()" :text="getCaptchaText"></buttonitem>-->
    <!--      <inputitem :label="label10" :type="type10" v-model="input10"></inputitem>-->
    <!--      <inputitem :label="label11" :type="type11" v-model="input11"></inputitem>-->
    <!--      <inputitem :label="label12" :type="type12" v-model="input12"></inputitem>-->

    <!--    </div>-->
    <!--    <div class="button_row">-->
    <!--      <buttonitem @click.native="confirmClick" :text="confirmText"></buttonitem>-->
    <!--      <buttonitem @click.native="cancelClick" :text="cancelText"></buttonitem>-->

    <!--    </div>-->
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="300px" class="demo-ruleForm">
      <el-form-item label="姓名：" prop="username">
        <el-input v-model="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item label="身份证号：" prop="idCard">
        <el-input v-model="ruleForm.idCard"></el-input>
      </el-form-item>
      <el-form-item label="性别：" prop="gender">
        <el-input v-model="ruleForm.gender"></el-input>
      </el-form-item>
      <el-form-item label="职业：" prop="job">
        <el-input v-model="ruleForm.job"></el-input>
      </el-form-item>
      <!--      <el-form-item label="证件失效日期：" prop="idCard">-->
      <!--        <el-input v-model="ruleForm.idCard"></el-input>-->
      <!--      </el-form-item>-->
      <el-form-item label="家庭住址：" prop="familyAddress">
        <el-input v-model="ruleForm.familyAddress"></el-input>
      </el-form-item>
      <el-form-item label="I类卡卡号：" prop="masterCardID">
        <el-input v-model="ruleForm.masterCardID"></el-input>
      </el-form-item>
      <el-form-item label="I类卡开户行：" prop="masterCardOpeningBank">
        <el-input v-model="ruleForm.masterCardOpeningBank"></el-input>
      </el-form-item>
      <el-form-item label="预留手机号码：" prop="phoneNumber">
        <el-input v-model="ruleForm.phoneNumber"></el-input>
        <el-button type="danger" @click="getCaptchaClick()">获取验证码</el-button>
      </el-form-item>
      <el-form-item label="短信验证码：" prop="captchaCode">
        <el-input v-model="ruleForm.captchaCode"></el-input>
      </el-form-item>
      <el-form-item label="设置登录密码：" prop="paymentPassword">
        <el-input type="password" v-model="ruleForm.paymentPassword"></el-input>
      </el-form-item>
      <el-form-item label="再次输入密码：" prop="paymentPasswordConfirm">
        <el-input type="password" v-model="ruleForm.paymentPasswordConfirm"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="danger" @click="confirmClick('ruleForm')">确认开户</el-button>
        <el-button type="danger" @click="cancelClick()">返回登录</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>

    import buttonitem from '../../components/buttonitem'
    import headeritem from '../../components/headeritem'
    import inputitem from '../../components/inputitem'
    import {mapState, mapMutations} from 'vuex'
    import {signinApi} from "../../service/getData";
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
                    gender: '',
                    job: '',
                    familyAddress: '',
                    masterCardOpeningBank: '',
                    masterCardID: '',
                    phoneNumber: '',
                    captchaCode: '',
                    paymentPassword: '',
                    paymentPasswordConfirm: '',
                },
                rules: {},

                getCaptchaText: "获取验证码",
                confirmText: "确认开户",
                cancelText: "返回登录",
                headText: "电子II类账户开户信息登记",
                // label1: '姓名',
                // label2: '身份证号',
                // label3: '性别',
                // label4: '职业',
                // // label5: '证件失效日期',
                // label6: '家庭住址',
                // label7: 'I类卡开户行',
                // label8: 'I类卡卡号',
                // label9: '预留手机号码',
                // label10: '短信验证码',
                // label11: '设置登录密码',
                // label12: '再次输入密码',
                // type1: 'text',
                // type2: 'text',
                // type3: 'text',
                // type4: 'text',
                // // type5: 'text',
                // type6: 'text',
                // type7: 'text',
                // type8: 'text',
                // type9: 'text',
                // type10: 'text',
                // type11: 'password',
                // type12: 'password',
                // input1: '张三-1',
                // input2: '440102198001021231',
                // input3: '1',
                // input4: '1',
                // // input5: 'text',
                // input6: '北京市海淀区颐和园路1号',
                // input7: '中国工商银行(北京分行)',
                // input8: '9559480089071474411',
                // input9: '18210443801',
                // input10: '',
                // input11: '000000',
                // input12: '000000',
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
            ...mapMutations([
                'SIGNIN', 'SET_TOKEN'
            ]),
            confirmClick(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // this.loginData = await signinApi(this.card_I, this.card_II, this.amount, this.pwd);
                        // this.SIGNIN(this.loginData);
                        // this.$router.push('signinsucc')

                        this.$axios.post(config.baseUrl + "/createAccount", this.ruleForm).then(res => {
                            console.log(res.data)
                            let signinData = res.data

                            const jwt = res.headers['authorization']

                            // 把数据共享出去
                            this.SET_TOKEN(jwt)

                            this.SIGNIN(signinData);
                            this.$router.push('signinsucc')

                        })
                    }
                });
            },
            cancelClick() {
                this.$router.go(-1)
            },
            getCaptchaClick() {
                this.$axios.get(config.baseUrl + '/captcha/' + this.input9 + "?behavior=1").then(res => {
                    console.log(res.data.data)
                    let captcha_code = res.data.data.captchaCode
                    let captcha_id = res.data.data.id
                    let userPhoneNumber = res.data.data.userPhoneNumber
                    let expirationDate = res.data.data.expirationDate
                    alert(userPhoneNumber + "收到编号" + captcha_id + "的验证码短信：" + captcha_code + ",过期时间为" + expirationDate)
                    this.ruleForm.captchaCode = captcha_code
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
    margin-bottom: 60px;
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
