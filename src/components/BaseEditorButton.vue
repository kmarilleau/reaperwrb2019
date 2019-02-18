<template>
  <button :title="this.label" class="pure-button">
    <svgicon :icon="this.icon" /><span>{{label}}</span>
  </button>
</template>

<script>
export default {
  props: ['icon', 'label'],
}
</script>