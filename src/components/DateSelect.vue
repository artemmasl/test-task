<template>
  <div class="date-select">
    <div class="date-select__input-wrapper">
      <div class="date-select__input">
        <input
          type="text"
          placeholder="дд"
          v-model="date.day"
          @focus="active.day = true"
          @blur="active.day = false"
        />
        <img src="../assets/arrow.svg" />
      </div>
      <div class="dropdown-content" v-show="active.day">
        <div
          class="dropdown-item"
          v-for="day in getDay()"
          :key="day"
          @mousedown="date.day = day"
        >
          {{ day }}
        </div>
      </div>
    </div>
    <div class="date-select__input-wrapper">
      <div class="date-select__input">
        <input
          type="text"
          placeholder="июнь"
          v-model="date.month"
          @focus="active.month = true"
          @blur="active.month = false"
        />
        <img src="../assets/arrow.svg" />
      </div>
      <div class="dropdown-content" v-show="active.month">
        <div class="dropdown-item" v-for="month in months" :key="month.name">
          {{ month.name }}
        </div>
      </div>
    </div>
    <div class="date-select__input-wrapper">
      <div class="date-select__input">
        <input
          type="text"
          placeholder="гггг"
          v-model="date.year"
          @focus="active.year = true"
          @blur="active.year = false"
        />
        <img src="../assets/arrow.svg" />
      </div>
      <div class="dropdown-content" v-show="active.year">
        <div class="dropdown-item" v-for="year in getYear()" :key="year">
          {{ year }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DateSelect",
  data() {
    return {
      date: {
        day: "",
        month: "",
        year: "",
      },
      active: {
        day: false,
        month: false,
        year: false,
      },
      months: [
        { name: "яварь", value: "01" },
        { name: "февраль", value: "02" },
        { name: "март", value: "03" },
        { name: "апрель", value: "04" },
      ],
    };
  },
  methods: {
    getDay() {
      const day = [];
      for (let i = 1; i <= 31; i++) {
        day.push(i);
      }
      return day;
    },
    getYear() {
      const goBackYears = 10;
      const currentYear = 2022;
      const startYear = currentYear - goBackYears;
      return [...Array(goBackYears + 1).keys()].map((x) => x + startYear);
    },
  },
};
</script>

<style lang="scss" scoped>
.date-select {
  display: flex;
  &__input {
    position: relative;
    width: 100%;
    input {
      width: 100%;
      padding: 15px 10px;
      border: none;
      content: "2";
    }
    img {
      position: absolute;
      top: 20px;
      right: 10px;
    }
  }
  &__input-wrapper {
    width: 100%;
    position: relative;
    border: 1px solid var(--brand-color);
  }
  :first-child {
    border-radius: 5px 0 0 5px;
    border-right: none;
  }
  :last-child {
    border-radius: 0 5px 5px 0;
    border-left: none;
  }
  .dropdown-content {
    position: absolute;
    background-color: #fff;
    width: 100%;
    max-width: 100%;
    max-height: 250px;
    border: 1px solid var(--brand-color);
    box-shadow: 0px -8px 34px 0px rgba(0, 0, 0, 0.05);
    overflow: auto;
    z-index: 1;
    .dropdown-item {
      color: black;
      font-size: 0.7em;
      line-height: 1em;
      padding: 8px;
      text-decoration: none;
      display: block;
      cursor: pointer;
      &:hover {
        background-color: #e7ecf5;
      }
    }
  }
  .dropdown:hover .dropdowncontent {
    display: block;
  }
}
</style>
