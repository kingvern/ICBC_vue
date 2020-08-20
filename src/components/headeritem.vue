<template>
  <div class="headerrow">
    <img class="logoimg" src="../images/u2.png"/>
    <span class="header_style">{{ text }}</span>
  </div>
</template>

<script>

    export default {
        name: 'headeritem',
        props: ['text'],
    }
</script>

<style lang="less">
  .logoimg{
    width: 350px;;
  }
  .headerrow{
    display: flex;
    -ms-flex-direction: column;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
  }

  .header_style {
    /*display: block;*/
    font-size: 32px;
    font-weight: 650;
    color:rgb(51, 51, 51);
  }

</style>
