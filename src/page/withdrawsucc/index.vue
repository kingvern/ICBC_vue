<template>
  <div class="card_border">
    <headeritem :text="headText"></headeritem>
    <div class="success">
      <span >提现成功</span>
    </div>
    <div class="input_list">
      <textitem :text="text1"></textitem>
      <textitem :text="text2"></textitem>
    </div>
    <div class="button_row">
      <buttonitem @click.native="withdrawClick" :text="withdrawText"></buttonitem>
      <buttonitem @click.native="backClick" :text="backText"></buttonitem>

    </div>

  </div>
</template>

<script>

    import buttonitem from '../../components/buttonitem'
    import headeritem from '../../components/headeritem'
    import inputitem from '../../components/inputitem'
    import textitem from '../../components/textitem'
    import {mapState, mapMutations} from 'vuex'

    export default {
        name: 'withdrawsucc',
        components: {
            buttonitem,
            headeritem,
            inputitem,
            textitem
        },
        data() {
            return {
                backText: "返回大厅",
                withdrawText: "继续提现",
                headText: "电子II类账户提现服务平台",
                text1: 'I 类账户余额：' + this.$store.state.card_I.balance,
                text2: 'II类账户余额：' + this.$store.state.card_II.balance,
                headText: "电子II类账户提现服务平台",
                label1: 'I类卡/II类卡号/电话号码',
                label2: '登录密码',
                type1: 'text',
                type2: 'password',
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
                // 'addNum', 'initializeData',
            ]),
            backClick() {
                this.$router.push('home')
            },
            withdrawClick() {
                this.$router.push('withdraw')
            },

        }
    }

</script>

<style lang="less">
  .success {
    display: flex;
    flex-direction: column;
    align-items: center;

    span{
      color: rgb(153, 0, 0);
      font-size: 32px;
      font-weight: 650;

    }
  }

  .input_list {
    display: flex;
    -ms-flex-direction: row;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
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
