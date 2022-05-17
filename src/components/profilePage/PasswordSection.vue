<template>
  <div class="flex column">
    <h2>Изменить пароль</h2>
    <div class="profile-section">
      <div class="profile-section__block">
        <label for="password">Новый пароль</label>
        <div class="wrapper">
          <input
            id="password"
            class="input"
            v-model="password"
            :type="inputTypePassword"
            :class="{ input_error: error.password }"
          />
          <img
            src="../../assets/passwordEye.svg"
            class="input__icon"
            @mousedown="inputTypePassword = 'text'"
            @mouseup="inputTypePassword = 'password'"
          />
        </div>
        <span class="input__error-text" v-if="error.password">
          {{ error.password }}
        </span>
      </div>
      <div class="profile-section__block">
        <label for="passwordRepeat">Повторить пароль</label>
        <div class="wrapper">
          <input
            id="passwordRepeat"
            class="input"
            v-model="passwordRepeat"
            :type="inputTypeRepeatPassword"
            :class="{ input_error: error.passwordRepeat }"
          />
          <img
            src="../../assets/passwordEye.svg"
            class="input__icon"
            @mousedown="inputTypeRepeatPassword = 'text'"
            @mouseup="inputTypeRepeatPassword = 'password'"
          />
        </div>
        <span class="input__error-text" v-if="error.passwordRepeat">
          {{ error.passwordRepeat }}
        </span>
      </div>
      <div class="profile-section__btn-group" v-if="password">
        <button class="btn btn_black" @click="save">Сохранить пароль</button>
        <button class="btn" @click="cancel">Отменить</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "PasswordSection",
  data() {
    return {
      password: "",
      passwordRepeat: "",
      inputTypePassword: "password",
      inputTypeRepeatPassword: "password",

      error: {
        password: "",
        passwordRepeat: "",
      },

      loaded: true,
    };
  },
  methods: {
    async save() {
      this.error = {
        password: "",
        passwordRepeat: "",
      };
      if (this.checkError() && this.loaded) {
        try {
          this.loaded = false;
          // Допустим тут запрос на изменения пароля
          await new Promise((resolve) => {
            setTimeout(() => {
              resolve("ok");
            }, 300);
          });
          this.password = "";
          this.passwordRepeat = "";
          this.$noty.success("Пароль успешно изменён!");
        } catch (e) {
          this.$noty.error(e.message);
        } finally {
          this.loaded = true;
        }
      }
    },
    checkError() {
      switch (true) {
        case this.password !== this.passwordRepeat:
          this.$noty.error("Пароли не совпадают");
          this.error.passwordRepeat = "Пароли не совпадают";
          return false;
        case this.password.length < 5:
          this.$noty.error("Пароль должен состоять минимум из 6 символов");
          this.error.password = "Минимум 6 символов, буквы и цифры";
          return false;
        case !/^[0-9A-Z_a-z А-Я а-я]*$/.test(this.password):
          this.$noty.error("Пароль должен состоять только из букв и цифр");
          this.error.password = "Минимум 6 символов, буквы и цифры";
          return false;
        default:
          return true;
      }
    },
    cancel() {
      this.password = "";
      this.passwordRepeat = "";
    },
  },
};
</script>
