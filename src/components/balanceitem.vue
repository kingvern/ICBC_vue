<template>
  <div class="input_row">
    <span class="label_style">{{ label }}</span>
    <input class="input_style" type="password" v-if="type=='password'" ref="input" :value="value"
           @input="$emit('input',$event.target.value)"/>
    <input class="input_style" type="text" v-if="type=='text'" ref="input" :value="value"
           @input="$emit('input',$event.target.value)"/>
  </div>
</template>

<script>

    export default {
        name: 'balanceitem',
        props: ['label', 'type', 'value'],
    }
</script>

<style lang="less" scoped>
  .input_row {
    display: flex;
    -ms-flex-direction: column;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    margin: 10px 10px;
  }

  .label_style {
    color: #515151;
    font-size: 24px;
    font-weight: 650;
  }

  .input_style {
    width: 100px;
    height: 28px;
    font-weight: 400;
    font-style: normal;
    font-size: 23px;
    text-decoration: none;
    color: #000000;
    text-align: left;
  }


</style>
