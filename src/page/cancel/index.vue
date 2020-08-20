<template>
  <div class="card_border">
    <headeritem :text="headText"></headeritem>
    <div class="input_list">
      <inputitem :label="label1" :type="type1" v-model="input1"></inputitem>
      <inputitem :label="label2" :type="type2" v-model="input2"></inputitem>
      <inputitem :label="label3" :type="type3" v-model="input3"></inputitem>
      <inputitem :label="label4" :type="type4" v-model="input4"></inputitem>
      <inputitem :label="label5" :type="type5" v-model="input5"></inputitem>
      <buttonitem @click.native="getCaptchaClick()" :text="getCaptchaText"></buttonitem>
      <inputitem :label="label6" :type="type6" v-model="input6"></inputitem>

    </div>
    <div class="button_row">
      <buttonitem @click.native="confirmClick" :text="confirmText"></buttonitem>
      <buttonitem @click.native="cancelClick" :text="cancelText"></buttonitem>

    </div>

  </div>
</template>

<script>

    import buttonitem from '../../components/buttonitem'
    import headeritem from '../../components/headeritem'
    import inputitem from '../../components/inputitem'
    import {mapState, mapMutations} from 'vuex'
    import {cancelApi} from "../../service/getData";

    export default {
        name: 'cancel',
        components: {
            buttonitem,
            headeritem,
            inputitem
        },
        data() {
            return {
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
                input1: '张三-1',
                input2: '440102198001021231',
                input3: '9559480089071474421',
                input4: '000000',
                input5: '18210443801',
                input6: '1'
            }
        },
        computed: mapState([
            'card_II_id',
        ]),
        methods: {
            ...mapMutations([
                'CANCEL'
            ]),
            confirmClick() {
                let data = {
                    username: this.input1,
                    idCard: this.input2,
                    card_II_ID: this.input3,
                    paymentPassword: this.input4,
                    phoneNumber: this.input5,
                    captchaCode: this.input6,

                }
                this.$axios.post('http://localhost:8080/cancelAccount', data, {
                    headers: {
                        "Authorization": localStorage.getItem("token")
                    }
                }).then(res => {
                    console.log(res.data)
                    this.CANCEL(res.data.data.cardId);
                    this.$router.push('cancelsucc')
                })

            },
            cancelClick() {
                this.$router.go(-1)
            },
            getCaptchaClick() {

                this.$axios.get('http://localhost:8080/captcha/' + this.input5 + "?behavior=-1").then(res => {

                    console.log(res.data.data)
                    let captcha_code = res.data.data.captchaCode
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


</style>
