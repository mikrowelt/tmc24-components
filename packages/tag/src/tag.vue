<template>
  <transition :name="disableTransitions ? '' : 'tm-zoom-in-center'">
    <span
      class="tm-tag"
      :class="[
        type ? 'tm-tag--' + type : '',
        tagSize && `tm-tag--${tagSize}`,
        {'is-hit': hit}
      ]"
      :style="{backgroundColor: color}">
      <slot></slot>
      <tm-icon class="tm-tag__close"
               name="cross"
               v-if="closable"
               @click="handleClose"></tm-icon>
    </span>
  </transition>
</template>
<script>
  import TmIcon from 'tmconsulting-ui/packages/icon';

  export default {
    components: {
      TmIcon
    },
    name: 'TmTag',
    props: {
      text: String,
      closable: Boolean,
      type: String,
      hit: Boolean,
      disableTransitions: Boolean,
      color: String,
      size: String
    },
    methods: {
      handleClose(event) {
        this.$emit('close', event);
      }
    },
    computed: {
      tagSize() {
        return this.size || (this.$ELEMENT || {}).size;
      }
    }
  };
</script>
