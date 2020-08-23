<template>
  <div class="card_border">
    <headeritem :text="headText"></headeritem>
    <div class="input_list" id="balance_input">
      <textitem :text="text1"></textitem>
      <textitem :text="text2"></textitem>

      <balanceitem :label="label1" :type="type1" v-model="amount"></balanceitem>
      <balanceitem :label="label2" :type="type2" v-model="pwd"></balanceitem>

    </div>
    <div class="button_row">
      <buttonitem @click.native="confirmClick" :text="confirmText"></buttonitem>
      <buttonitem @click.native="backClick" :text="backText"></buttonitem>

    </div>

  </div>
</template>

<script>

    import buttonitem from '../../components/buttonitem'
    import headeritem from '../../components/headeritem'
    import balanceitem from '../../components/balanceitem'
    import textitem from '../../components/textitem'
    import {mapState, mapMutations} from 'vuex'
    import {withdrawApi} from "../../service/getData";

    export default {
        name: 'withdraw',
        components: {
            buttonitem,
            headeritem,
            balanceitem,
            textitem
        },
        data() {
            return {
                backText: "返回大厅",
                confirmText: "确认提现",
                headText: "电子II类账户提现服务平台",
                text1: 'I 类账户余额：' + this.$store.state.card_I.balance,
                text2: 'II类账户余额：' + this.$store.state.card_II.balance,
                label1: '转账金额：',
                label2: '支付密码：',
                type1: 'text',
                type2: 'password',
                amount: '',
                pwd: ''
            }
        },
        computed: mapState([
            'card_I',
            'card_II'
        ]),
        methods: {
            ...mapMutations([
                'SETBALANCE'
            ]),
            confirmClick() {
                let data = {
                    card_I_ID: this.card_I.cardId,
                    card_II_ID: this.card_II.cardId,
                    amount: this.amount,
                    paymentPassword: this.pwd
                }
                console.log(data)
                this.$axios.post('http://47.95.255.230:8080/withdraw', data, {
                    headers: {
                        "Authorization": localStorage.getItem("token")
                    }
                }).then(res => {

                    console.log(res.data)
                    let txData = res.data

                    this.SETBALANCE(txData);
                    this.$router.push('withdrawsucc')
                })
            },
            backClick() {
                this.$router.go(-1)
            },

        }
    }

</script>

<style lang="less">
  .input_list {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    padding: 10px 38px;

    .text_style {
      color: #515151;
      font-size: 24px;
      font-weight: 650;
      margin: 10px;
    }

    /*.input_row {*/
    /*  .label_style {*/
    /*    color: #515151;*/
    /*    font-size: 24px;*/
    /*    font-weight: 650;*/
    /*  }*/

    /*  .input_style {*/
    /*    width: 100px;*/
    /*    height: 28px;*/
    /*    font-size: 23px;*/
    /*    margin-left: 0;*/
    /*  }*/
    /*}*/
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


</style>
