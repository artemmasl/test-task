<template>
  <div class="flex column">
    <h2>Контактные данные</h2>
    <div class="profile-section">
      <div class="profile-section__block">
        <label for="number">Номер телефона</label>
        <input type="text" id="number" class="input" v-model="number" />
      </div>
      <div class="profile-section__block">
        <label for="email">Email</label>
        <input type="text" id="email" class="input" v-model="email" />
      </div>
      <div
        class="profile-section__btn-group"
        v-if="number !== account.number || email !== account.email"
      >
        <button class="btn btn_black" @click="save">Сохранить изменения</button>
        <button class="btn" @click="cancel">Отменить</button>
      </div>
      <span
        class="profile-section__btn-group"
        v-if="number !== account.number || email !== account.email"
        >На ваш телефон будет отправлен код подтверждения</span
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "ContactSection",
  props: {
    account: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      email: "",
      number: "",

      loaded: true,
    };
  },
  watch: {
    account: {
      handler() {
        this.email = this.account.email;
        this.number = this.account.number;
      },
      immediate: true,
    },
    email() {
      this.number = this.account.number;
    },
    number() {
      this.email = this.account.email;
    },
  },
  methods: {
    async save() {
      if (this.loaded) {
        try {
          this.loaded = false;
          const copyAccount = JSON.parse(JSON.stringify(this.account));
          if (this.number !== this.account.number) {
            const response = await new Promise((resolve) => {
              setTimeout(() => {
                copyAccount.number = this.number;
                resolve(copyAccount);
              }, 300);
            });
            this.$store.commit("account/SET_ACCOUNT", response);
            this.$noty.success("Пароль успешно изменён!");
          } else if (this.email !== this.account.email) {
            const response = await new Promise((resolve) => {
              setTimeout(() => {
                copyAccount.email = this.email;
                resolve(copyAccount);
              }, 300);
            });
            this.$store.commit("account/SET_ACCOUNT", response);
            this.$noty.success("Пароль успешно изменён!");
          }
        } catch (e) {
          this.$noty.error(e.message);
        } finally {
          this.loaded = true;
        }
      }
    },
    cancel() {
      this.number = this.account.number;
      this.email = this.account.email;
    },
  },
};
</script>
