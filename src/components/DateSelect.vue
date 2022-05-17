<template>
  <div class="date-select">
    <div class="date-select__input-wrapper">
      <div class="date-select__input">
        <input
          type="text"
          placeholder="дд"
          autocomplete="off"
          v-model="date.day"
          @focus="active.day = true"
          @blur="blurDay()"
        />
        <img src="../assets/arrow.svg" />
      </div>
      <div class="dropdown-content" v-show="active.day">
        <div
          class="dropdown-item"
          v-for="day in getDay"
          :key="day"
          :class="{ 'dropdown-item_active': date.day === day }"
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
          autocomplete="off"
          v-model="date.month"
          @focus="active.month = true"
          @blur="blurMonth"
        />
        <img src="../assets/arrow.svg" />
      </div>
      <div class="dropdown-content" v-show="active.month">
        <div
          class="dropdown-item"
          v-for="month in getMonths"
          :key="month.name"
          :class="{ 'dropdown-item_active': date.month === month.name }"
          @mousedown="date.month = month.name"
        >
          {{ month.name }}
        </div>
      </div>
    </div>
    <div class="date-select__input-wrapper">
      <div class="date-select__input">
        <input
          type="text"
          placeholder="гггг"
          id="year"
          autocomplete="off"
          v-model="date.year"
          @focus="active.year = true"
          @blur="active.year = false"
        />
        <img src="../assets/arrow.svg" />
      </div>
      <div class="dropdown-content" v-show="active.year">
        <div
          class="dropdown-item"
          v-for="year in getYear"
          :key="year"
          :class="{ 'dropdown-item_active': date.year === year }"
          @mousedown="date.year = year"
        >
          {{ year }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DateSelect",
  props: {
    dateProps: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      maxDay: 31,
      date: {
        day: "",
        month: "январь",
        year: "",
      },
      active: {
        day: false,
        month: false,
        year: false,
      },
    };
  },
  created() {
    this.setDate(this.dateProps);
  },
  watch: {
    "date.month"() {
      // Изменяю максимально количество дней
      const month = this.getMonths.find(
        (month) => month.name === this.date.month
      );
      if (month) {
        this.maxDay =
          32 - new Date(this.date.year, Number(month.value) - 1, 32).getDate();
        if (this.maxDay < this.date.day) {
          this.date.day = this.maxDay;
        }
      }
    },

    date: {
      handler() {
        const month = this.getMonths.find(
          (month) => month.name === this.date.month
        );
        if (this.date.day && this.date.year && month) {
          this.$emit(
            "update:dateProps",
            `${this.date.year}-${month.value}-${this.date.day}`
          );
        }
      },
      deep: true,
    },
  },
  computed: {
    getMonths() {
      const months = [];
      for (let i = 0; i <= 11; i++) {
        let mm = String(i + 1);
        if (mm < 10) mm = "0" + mm;
        // Сделано через toLocaleString для маштабирования по языку
        months.push({
          name: new Date(2000, i, 1).toLocaleString("default", {
            month: "long",
          }),
          value: mm,
        });
      }
      return months;
    },
    getDay() {
      const day = [];
      for (let i = 1; i <= this.maxDay; i++) {
        day.push(i);
      }
      return day;
    },
    getYear() {
      const goBackYears = 120;
      const currentYear = new Date().getFullYear() - 18;
      const startYear = currentYear - goBackYears;
      return [...Array(goBackYears + 1).keys()].map((x) => x + startYear);
    },
  },
  methods: {
    setDate(value) {
      if (value) {
        const date = new Date(value);
        this.date = {
          day: date.getDate(),
          month: date.toLocaleString("default", { month: "long" }),
          year: date.getFullYear(),
        };
      }
    },
    blurDay() {
      switch (true) {
        case isNaN(Number(this.date.day)):
          this.date.day = 1;
          break;
        case this.date.day < 1:
          this.date.day = 1;
          break;
        case this.date.day > this.maxDay:
          this.date.day = this.maxDay;
          break;
      }
      this.active.day = false;
    },
    blurMonth() {
      const month = this.getMonths.find(
        (month) => month.name === this.date.month
      );
      this.date.month = month ? month.name : this.getMonths[0].name;
      this.active.month = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.date-select {
  display: flex;
  height: 40px;
  &__input {
    position: relative;
    width: 100%;
    input {
      border: 1px solid transparent;
      border-radius: 5px;
      padding: 10px;
      width: 100%;
    }
    img {
      position: absolute;
      top: 15px;
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
    border-radius: 0 0 8px 8px;
    .dropdown-item {
      color: black;
      font-size: 0.7em;
      line-height: 1em;
      padding: 8px;
      text-decoration: none;
      display: block;
      cursor: pointer;
      &_active {
        background-color: #e7ecf5;
      }
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
