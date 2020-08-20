<template>
  <span class="button_style">{{ text }}</span>
</template>

<script>

    export default {
        name: 'buttonitem',
        props: ['text'],
    }
</script>

<style lang="less">

  .button_style {
    display: block;
    padding: 8px 34px;
    color: #fff;
    font-size: 18px;
    background: #da2a20cc;
    border-radius: 5px;
    margin: 0 65px;
  }

</style>
