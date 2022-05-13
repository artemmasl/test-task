<template>
  <div class="profile">
    <h1>ЛИЧНЫЙ КАБИНЕТ</h1>
    <div class="profile__section">
      <div class="profile__input-item">
        <label for="surname">Фамилия</label>
        <input type="text" id="surname" class="input" />
      </div>
      <div class="profile__input-item">
        <label for="surname">Имя</label>
        <input type="text" id="surname" class="input" />
      </div>
      <div class="profile__input-item">
        <label for="surname">Отчество</label>
        <input type="text" id="surname" class="input" />
      </div>
      <div class="profile__input-item">
        <label for="surname">Дата рождения</label>
        <DateSelect />
      </div>
    </div>
  </div>
</template>

<script>
import DateSelect from "../components/DateSelect.vue";
export default {
  name: "Profile",
  components: {
    DateSelect,
  },
  data() {
    return {};
  },
  methods: {
    getYears() {
      const goBackYears = 10;
      const currentYear = 2022;
      const startYear = currentYear - goBackYears;
      return [...Array(goBackYears + 1).keys()].map((x) => x + startYear);
    },
  },
};
</script>

<style lang="scss" scoped>
.profile {
  width: 100%;
  &__section {
    display: grid;
    gap: 10px;
    margin-top: 30px;
  }
  &__input-item {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
}
.input {
  height: 40px;
  border: 1px solid var(--brand-color);
  border-radius: 5px;
}
</style>
