<template>
  <div>
    <h1>ЛИЧНЫЙ КАБИНЕТ</h1>
    <ProfileSection class="section" :account="account" />

    <PasswordSection class="section" />

    <ContactSection class="section" :account="account" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ProfileSection from "../components/profilePage/ProfileSection.vue";
import PasswordSection from "../components/profilePage/PasswordSection.vue";
import ContactSection from "../components/profilePage/ContactSection.vue";
export default {
  name: "Profile",
  components: {
    ProfileSection,
    PasswordSection,
    ContactSection,
  },
  computed: {
    ...mapGetters({
      account: "account/account",
    }),
  },
};
</script>

<style lang="scss" scoped>
.section {
  display: grid;
  gap: 10px;
  padding: 30px 0;
  border-bottom: 1px solid #cedbe5;
}
::v-deep .profile-section {
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
  font-size: 14px;

  &__block {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 10px;
    .wrapper {
      width: 100%;
    }
  }
  &__btn-group {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
}
@media screen and (min-width: 768px) {
  ::v-deep .profile-section {
    grid-template-columns: 1fr 1fr;
    gap: 20px;

    &__block {
      :nth-child(2) {
        order: 1;
      }
    }
    &__btn-group {
      flex-direction: row-reverse;
      gap: 20px;
      :first-child {
        flex: 2;
      }
      :last-child {
        flex: 1;
      }
    }
  }
}
@media screen and (min-width: 1024px) {
  ::v-deep .profile-section {
    &__btn-group {
      padding-top: 40px;
    }
  }
}
</style>
