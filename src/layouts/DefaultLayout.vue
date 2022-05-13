<template>
  <div class="layout">
    <Header />
    <div class="layout__container">
      <router-view />
    </div>
    <!-- <div>DefaultLayout</div> -->
  </div>
</template>

<script>
import Header from "../components/Header";
export default {
  name: "DefaultLayout",
  components: {
    Header,
  },
};
</script>

<style lang="scss" scoped>
.layout {
  width: 100%;
  &__container {
    padding: 70px 15px 0 15px;
    height: 100%;
    width: 100%;
  }
}
</style>
