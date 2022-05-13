<template>
  <div class="header" :class="{ header_active: menuActive }">
    <div class="header__container">
      <div class="header__logo">
        <img src="../assets/logo.svg" />
      </div>
      <div
        class="nav-toggle"
        :class="{ 'nav-toggle_active': menuActive }"
        @click="menuActive = !menuActive"
      >
        <div class="nav-toggle__icon-left"></div>
        <div class="nav-toggle__icon-right"></div>
      </div>
      <span>МЕНЮ</span>
    </div>
    <div class="header__nav">
      <li @click="redirect('/catalog')">
        <div class="header__logo">
          <img src="../assets/catalog.svg" />
        </div>
        <span>Каталог</span>
      </li>
      <li @click="redirect('/basket')">
        <div class="header__logo">
          <img src="../assets/basket.svg" />
        </div>
        <span>Мои заказы</span>
      </li>
      <li @click="redirect('/profile')">
        <div class="header__logo">
          <img src="../assets/user.svg" />
        </div>
        <span>Личный кабинет</span>
      </li>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      menuActive: false,
    };
  },
  methods: {
    redirect(route) {
      this.$router.push(route);
      this.menuActive = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.header {
  width: 100%;
  height: 50px;
  position: fixed;
  overflow: hidden;
  border-bottom: 1px solid #cedbe5;
  transition-duration: 0.5s;
  &_active {
    height: 100vh;
  }
  &__container {
    display: flex;
    align-items: center;
  }
  &__logo {
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--brand-color);
  }
  &__nav {
    height: 100%;
    padding: 10px 10px 0 0;
    background: var(--brand-color);
    li {
      display: flex;
      align-items: center;
      height: 50px;
      list-style: none;
      text-transform: uppercase;
      gap: 11px;
      color: #fff;
      img {
        width: 25px;
      }
    }
  }
}

@mixin navToggle() {
  position: relative;
  width: 18px;
  height: 50px;
  margin-left: 16px;
  margin-right: 11px;
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

@mixin icon-before($height, $width) {
  transition-duration: 0.5s;
  position: absolute;
  width: $width;
  height: $height;
  background-color: var(--brand-color);
  content: "";
  top: -6px;
}

@mixin icon-after($height, $width) {
  transition-duration: 0.5s;
  position: absolute;
  width: $width;
  height: $height;
  background-color: var(--brand-color);
  content: "";
  top: 6px;
}
.nav-toggle {
  @include navToggle();

  &:hover {
    cursor: pointer;
  }

  &__icon-left {
    @include icon(2px, 9px);

    &:before {
      @include icon-before(2px, 9px);
    }

    &:after {
      @include icon-after(2px, 9px);
    }
  }

  &__icon-right {
    @include icon(2px, 9px);
    left: 7px;

    &:before {
      @include icon-before(2px, 9px);
    }

    &:after {
      @include icon-after(2px, 9px);
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
</style>
