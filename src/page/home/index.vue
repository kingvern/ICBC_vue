<template>

  <div class="card_border">
    <headeritem :text="headText"></headeritem>
    <div class="home_board">
      <div class="blue_board">
        <span>当前账户余额：{{ card_II.balance }}</span>
<!--        <span>近期一周支出：{{ card_II.outflow_in_week }}</span>-->
<!--        <span>近期一周收入：{{ card_II.inflow_in_week }}</span>-->
      </div>
      <div class="button_board">
        <div class="button_row">
          <buttonitem @click.native="rechargeClick" :text="rechargeText"></buttonitem>
          <buttonitem @click.native="withdrawClick" :text="withdrawText"></buttonitem>
        </div>
        <div class="button_row">
          <buttonitem @click.native="cancelClick" :text="cancelText"></buttonitem>
          <buttonitem @click.native="logoutClick" :text="logoutText"></buttonitem>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
    import buttonitem from '../../components/buttonitem'
    import headeritem from '../../components/headeritem'
    import inputitem from '../../components/inputitem'
    import {mapState, mapMutations} from 'vuex'
    import {logoutApi} from '../../service/getData'

    import * as config from '../../config/env'

    export default {
        name: 'home',
        components: {
            buttonitem,
            headeritem,
            inputitem
        },
        data() {
            return {
                rechargeText: "充值服务",
                withdrawText: "提现服务",
                cancelText: "注销账户",
                logoutText: "退出登录",
                headText: "电子II类账户综合服务大厅",
                rst: null
            }
        },
        computed: mapState([
            'card_II'
        ]),
        methods: {
            ...mapMutations([
                'LOGOUT'
            ]),
            rechargeClick() {
                this.$router.push('recharge')
            },
            withdrawClick() {
                this.$router.push('withdraw')
            },
            cancelClick() {
                this.$router.push('cancel')
            },
            logoutClick() {
                console.log('http://47.95.255.230:8080/logout')
                this.$axios.get(config.baseUrl + "/logout", {
                    headers: {
                        "Authorization": localStorage.getItem("token")
                    }
                }).then(res => {
                    console.log(res)
                    this.LOGOUT();
                    this.$router.push('login')

                })


            },
        }
    }
</script>

<style lang="less">
  .home_board {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 12px 38px;

    .blue_board {
      background: #e9f1f9;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      padding: 18px 38px;
      width: 300px;

      span {
        color: rgb(51, 51, 51);
        display: inline;
        font-size: 18px;
        font-weight: 650;
        margin: 10px 10px;
      }
    }

    .button_board {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;

      .button_row {
        display: flex;
        width: 475px;
        padding: 21px 0px;
        -ms-flex-direction: row;
        flex-direction: row;
        -ms-flex-pack: center;
        justify-content: center;

        .button_style{
          margin: 0 15px;
        }
      }
    }
  }

  .card_border {
    width: 900px;
    padding: 20px 20px 75px 20px;
    margin: 50px auto;
    border: 1px #797979 solid;
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.3);
  }

</style>
