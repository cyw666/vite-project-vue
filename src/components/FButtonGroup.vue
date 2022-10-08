<template>
  <div class="app-button-group">
    <slot></slot>
  </div>
</template>

<style lang="scss">
.app-button-group {
  display: inline-block;
  vertical-align: middle;
  &::after,
  &::before {
    display: table;
    content: '';
  }
  &::before {
    clear: both;
  }
  & > .app-button {
    float: left;
    position: relative;
    min-width: 60px;
    &:first-child {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      border-right-color: rgba(26, 56, 96, 0.05);
    }
    &:not(:first-child):not(:last-child) {
      border-left-color: rgba(26, 56, 96, 0.05);
      border-right-color: rgba(26, 56, 96, 0.05);
      border-left: none;
    }
    &:last-child {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      border-left-color: rgba(26, 56, 96, 0.05);
      border-left: none;
    }
  }
}
</style>
