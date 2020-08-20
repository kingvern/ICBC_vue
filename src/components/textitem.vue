<template>
  <span class="text_style">{{ text }}</span>
</template>

<script>

    export default {
        name: 'buttonitem',
        props: ['text'],
    }
</script>

<style lang="less">

  .text_style {
    color: #515151;
    font-size: 24px;
  }

</style>
