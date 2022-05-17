<template>
  <div class="profile-section">
    <div class="profile-section__block">
      <label for="surname">Фамилия*</label>
      <input
        type="text"
        id="surname"
        class="input"
        :class="{ input_error: profileError.surname }"
        v-model="copyProfile.surname"
      />
      <span class="input__error-text" v-if="profileError.surname">
        {{ profileError.surname }}
      </span>
    </div>
    <div class="profile-section__block">
      <label for="name">Имя*</label>
      <input
        type="text"
        id="name"
        class="input"
        :class="{ input_error: profileError.name }"
        v-model="copyProfile.name"
      />
      <span class="input__error-text" v-if="profileError.name">
        {{ profileError.name }}
      </span>
    </div>
    <div class="profile-section__block">
      <label for="patronymic">Отчество</label>
      <input
        type="text"
        id="patronymic"
        class="input"
        v-model="copyProfile.patronymic"
      />
    </div>
    <div class="flex column gap-1">
      <label for="surname">Дата рождения</label>
      <DateSelect :dateProps.sync="copyProfile.birthday" />
    </div>
    <div
      class="profile-section__btn-group"
      v-if="JSON.stringify(copyProfile) !== JSON.stringify(account)"
    >
      <button class="btn btn_black" @click="save">Сохранить изменения</button>
      <button class="btn" @click="cancel">Отменить</button>
    </div>
  </div>
</template>

<script>
import DateSelect from "../DateSelect.vue";
export default {
  name: "ProfileSection",
  components: {
    DateSelect,
  },
  props: {
    account: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      copyProfile: null,
      profileError: {
        name: false,
        surname: false,
        patronymic: false,
        birthday: false,
      },
      loaded: true,
    };
  },
  watch: {
    account: {
      handler() {
        this.copyProfile = JSON.parse(JSON.stringify(this.account));
      },
      immediate: true,
    },
    "copyProfile.name"(value) {
      this.$set(this.profileError, "name", this.checkTextField(value, true));
    },
    "copyProfile.surname"(value) {
      this.$set(this.profileError, "surname", this.checkTextField(value, true));
    },
    "copyProfile.patronymic"(value) {
      this.$set(this.profileError, "patronymic", this.checkTextField(value));
    },
  },
  methods: {
    async save() {
      if (this.checkErrorProfile() && this.loaded) {
        try {
          this.loaded = false;
          // Допустим тут запрос
          const response = await new Promise((resolve) => {
            setTimeout(() => {
              resolve(this.copyProfile);
            }, 300);
          });
          this.$store.commit("account/SET_ACCOUNT", response);
          this.$noty.success("Изменения успешно сохранены!");
        } catch (e) {
          this.$noty.error(e.message);
        } finally {
          this.loaded = true;
        }
      }
    },
    checkTextField(value, isReq = false) {
      switch (true) {
        case !value && isReq:
          return "Это поле является обязательным";
        case value.length > 16:
          return "Максимум 16 символов";
        default:
          return false;
      }
    },
    checkErrorProfile() {
      switch (true) {
        case !this.copyProfile.name:
          this.$noty.error("Имя является обязательным полем");
          this.profileError.name = "Это поле является обязательным";
          return false;
        case !this.copyProfile.surname:
          this.$noty.error("Фамилия является обязательным полем");
          this.profileError.surname = "Это поле является обязательным";
          return false;
        default:
          return true;
      }
    },
    cancel() {
      this.copyProfile = JSON.parse(JSON.stringify(this.account));
    },
  },
};
</script>
