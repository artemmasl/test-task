<template>
  <div class="layout">
    <Header />
    <div class="layout__container">
      <router-view v-if="loaded" />
      <!-- На v-elese сделаю лоадер -->
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
  data() {
    return {
      loaded: false,
    };
  },
  async created() {
    try {
      await this.$store.dispatch("account/SET_ACCOUNT"); // Типо авторизация
    } catch (e) {
      this.$noty.error(e.message);
    } finally {
      this.loaded = true;
    }
  },
};
</script>

<style lang="scss" scoped>
.layout {
  width: 100%;
  &__container {
    padding: 20px 15px 0 15px;
    height: 100%;
    width: 100%;
    margin-top: 50px;
    overflow: auto;
    max-height: calc(100vh - 50px);
  }
}
@media screen and (min-width: 768px) {
  .layout__container {
    margin-top: 120px;
    max-height: calc(100vh - 120px);
  }
}
@media screen and (min-width: 1024px) {
  .layout {
    width: calc(100% - 120px);
    display: flex;
    justify-content: center;
    font-size: 27px;
    &__container {
      margin-top: 0px;
      max-width: 900px;
      margin-left: 120px;
      padding: 40px 70px;
      height: 100%;
      overflow: initial;
    }
  }
}
</style>
