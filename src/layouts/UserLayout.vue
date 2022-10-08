<template>
  <el-container class="user-layout">
    <el-aside class="user-layout__aside" width="500px">
      <div class="user-layout__top">
        <router-link to="/">
          <p class="layout-header">
            <FIcon type="logo" class="icon" />
            <span class="title">面包会有的</span>
          </p>
        </router-link>
        <div class="desc">每一份坚持<br />都值得被鼓励</div>
      </div>
    </el-aside>
    <el-main class="user-layout">
      <router-view />
    </el-main>
  </el-container>
</template>
<script lang="ts">
export default {
  name: 'UserLayout',
}
</script>
<style lang="scss" scoped>
.user-layout {
  height: 100vh;
  &__aside {
    background: #fdcb6e;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    .layout-header {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      margin-bottom: 42px;
      .icon {
        font-size: 40px;
      }
      .title {
        font-size: 18px;
        font-weight: 700;
        color: #001a26;
        margin-left: 15px;
      }
    }
    .desc {
      font-size: 50px;
      font-weight: 900;
      color: rgba(255, 255, 255, 0.6);
      line-height: 66px;
    }
  }
  &__top {
    padding: 38px 60px 0;
  }
  &__bottom {
    text-align: center;
    width: 100%;
    object-fit: contain;
  }
}

@media screen and (max-width: 768px) {
  .user-layout {
    &__aside {
      display: none;
    }
  }
}
</style>
