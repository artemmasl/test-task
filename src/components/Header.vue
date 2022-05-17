<template>
  <div class="header" :class="{ header_active: menuActive }">
    <router-link to="/home" class="header__logo">
      <img src="../assets/logo.svg" />
    </router-link>
    <div class="header__container">
      <div
        class="nav-toggle"
        :class="{ 'nav-toggle_active': menuActive }"
        @click="menuActive = !menuActive"
      >
        <div class="nav-toggle__icon-left"></div>
        <div class="nav-toggle__icon-right"></div>
      </div>
      <span class="nav-toggle__text">МЕНЮ</span>
    </div>
    <div class="header__nav">
      <router-link
        v-for="link in links"
        :key="link.text"
        :to="link.path"
        class="header__nav-item"
      >
        <img :src="link.imgSrc" />
        <span>{{ link.text }}</span>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      menuActive: false,
      links: [
        {
          path: "/catalog",
          imgSrc: require("../assets/catalog.svg"),
          text: "Каталог",
        },
        {
          path: "/basket",
          imgSrc: require("../assets/basket.svg"),
          text: "Мои заказы",
        },
        {
          path: "/profile",
          imgSrc: require("../assets/user.svg"),
          text: "Личный кабинет",
        },
      ],
    };
  },
};
</script>
<style lang="scss" scoped>
.header {
  width: 100%;
  height: 50px;
  top: 0;
  left: 0;
  position: fixed;
  overflow: hidden;
  background: #fff;
  border-bottom: 1px solid #cedbe5;
  transition-duration: 0.5s;
  z-index: 2;
  &_active {
    height: 100vh !important;
  }
  &__container {
    display: flex;
    align-items: center;
    height: 50px;
  }
  &__logo {
    width: 50px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--brand-color);
    cursor: pointer;
  }
  &__nav {
    height: 100%;
    padding: 10px 10px 0 0;
    background: var(--brand-color);
  }
  &__nav-item {
    display: flex;
    align-items: center;
    height: 50px;
    list-style: none;
    text-transform: uppercase;
    gap: 11px;
    color: #fff;
    cursor: pointer;
    text-decoration: none;
    img {
      width: 25px;
    }
  }
}

@mixin navToggle() {
  position: relative;
  width: 18px;
  height: 50px;
  transition-duration: 0.5s;
}

@mixin icon($height, $width) {
  transition-duration: 0.5s;
  position: absolute;
  height: $height;
  top: 50%;
  width: $width;
  background-color: var(--brand-color);
}

@mixin icon-before($height, $width, $top) {
  transition-duration: 0.5s;
  position: absolute;
  width: $width;
  height: $height;
  background-color: var(--brand-color);
  content: "";
  top: $top;
}

@mixin icon-after($height, $width, $top) {
  transition-duration: 0.5s;
  position: absolute;
  width: $width;
  height: $height;
  background-color: var(--brand-color);
  content: "";
  top: $top;
}
.nav-toggle {
  @include navToggle();
  margin-left: 16px;

  &__text {
    margin-left: 11px;
  }
  &:hover {
    cursor: pointer;
  }

  &__icon-left {
    @include icon(2px, 9px);

    &:before {
      @include icon-before(2px, 9px, -6px);
    }

    &:after {
      @include icon-after(2px, 9px, 6px);
    }
  }

  &__icon-right {
    @include icon(2px, 9px);
    left: 7px;

    &:before {
      @include icon-before(2px, 9px, -6px);
    }

    &:after {
      @include icon-after(2px, 9px, 6px);
    }
  }

  &_active {
    .nav-toggle__icon-left {
      transition-duration: 0.5s;
      background: transparent;

      &:before {
        transform: rotateZ(45deg) scaleX(1.4) translate(2px, 2px);
      }

      &:after {
        transform: rotateZ(-45deg) scaleX(1.4) translate(2px, -2px);
      }
    }

    .nav-toggle__icon-right {
      transition-duration: 0.5s;
      background: transparent;

      &:before {
        transform: rotateZ(-45deg) scaleX(1.4) translate(-2px, 2px);
      }

      &:after {
        transform: rotateZ(45deg) scaleX(1.4) translate(-2px, -2px);
      }
    }
  }
}

@media screen and (min-width: 768px) {
  .header {
    height: 120px;
    &__container {
      height: 120px;
    }
    &__logo {
      width: 120px;
      img {
        width: 58px;
      }
    }
    &__nav-item {
      img {
        width: 35px;
      }
    }
  }

  .nav-toggle {
    @include navToggle();
    margin-left: 26px;
    width: 28px;
    &__text {
      margin-left: 16px;
      font-size: 24px;
      font-weight: 500;
    }
    &:hover {
      cursor: pointer;
    }

    &__icon-left {
      @include icon(3px, 14px);

      &:before {
        @include icon-before(3px, 14px, -10px);
      }

      &:after {
        @include icon-after(3px, 14px, 10px);
      }
    }

    &__icon-right {
      @include icon(3px, 14px);
      left: 14px;

      &:before {
        @include icon-before(3px, 14px, -10px);
      }

      &:after {
        @include icon-after(3px, 14px, 10px);
      }
    }
  }
}
@media screen and (min-width: 1024px) {
  .header {
    width: 120px;
    height: 100vh;
    &__logo {
      height: 120px;
    }
    &__nav-item {
      flex-direction: column;
      height: 80px;
      text-align: center;
      padding: 8px;
      font-size: 10px;
      img {
        width: 35px;
      }
    }
  }
  .nav-toggle {
    display: none;
  }
  .header__container {
    display: none;
  }
}
</style>
