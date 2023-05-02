<template>
  <div class="invite__card">
    <svg
      class="invite__close-icon"
      width="26"
      height="26"
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M13 2C6.92428 2 2 6.92428 2 13C2 19.0757 6.92428 24 13 24C19.0757 24 24 19.0757 24 13C24 6.92428 19.0757 2 13 2ZM0 13C0 5.81972 5.81972 0 13 0C20.1803 0 26 5.81972 26 13C26 20.1803 20.1803 26 13 26C5.81972 26 0 20.1803 0 13ZM8.51956 8.51956C8.91008 8.12904 9.54325 8.12904 9.93377 8.51956L13 11.5858L16.0662 8.51956C16.4568 8.12904 17.0899 8.12904 17.4804 8.51956C17.871 8.91008 17.871 9.54325 17.4804 9.93377L14.4142 13L17.4804 16.0662C17.871 16.4568 17.871 17.0899 17.4804 17.4804C17.0899 17.871 16.4568 17.871 16.0662 17.4804L13 14.4142L9.93377 17.4804C9.54325 17.871 8.91008 17.871 8.51956 17.4804C8.12904 17.0899 8.12904 16.4568 8.51956 16.0662L11.5858 13L8.51956 9.93377C8.12904 9.54325 8.12904 8.91008 8.51956 8.51956Z"
        fill="#676F8F"
      />
    </svg>
    <h2 class="invite__title">Invite User</h2>
    <nav class="nav">
      <ul class="nav__list">
        <li
          class="nav__item"
          @click="changePage(item)"
          :class="{ nav__item_active: activeTab === item.component }"
          v-for="(item, index) in navigation"
          :key="item.title"
        >
          <div
            class="nav__number"
            :class="{ nav__number_filled: item.checked }"
          >
            <span v-if="item.checked != true">{{ index + 1 }}</span>
            <svg
              v-else
              width="11"
              height="9"
              viewBox="0 0 11 9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.40039 5.2001L3.80039 7.6001L9.80039 1.6001"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <div class="nav__text">
            {{ item.title }}
          </div>
        </li>
      </ul>
    </nav>
    <form class="form">
      <component ref="currentComponent" @save="nextPage" :is="activeTab" />
    </form>
  </div>
</template>

<script>
import FormMain from "@/components/forms/FormMain.vue";
import FormLocations from "@/components/forms/FormLocations.vue";
import FormRoles from "@/components/forms/FormRoles.vue";

export default {
  components: { FormMain, FormLocations, FormRoles },
  data() {
    return {
      activeTab: "FormMain",
      navigation: [
        { title: "Main Info", component: "FormMain", checked: false },
        {
          title: "Available Locations",
          component: "FormLocations",
          checked: false,
        },
        { title: "Roles", component: "FormRoles", checked: false },
      ],
    };
  },
  computed: {
    currentIndex() {
      return this.navigation.findIndex((e) => e.component === this.activeTab);
    },
  },
  methods: {
    // handler tabs change
    changePage(item) {
      this.$refs.currentComponent.saveInformation();
      this.navigation.forEach((e) => {
        if (e.component === this.activeTab && this.activeTab != "FormRoles") {
          e.checked = true;
        }
      });
      this.activeTab = item.component;
    },
    //onComponentEmit
    nextPage() {
      this.navigation.forEach((e) => {
        if (e.component === this.activeTab) {
          e.checked = true;
        }
      });
      this.activeTab = this.navigation[this.currentIndex + 1].component;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/style/helpers/vars.scss";

.invite__card {
  position: relative;
  margin: 0px auto;
  margin-top: 36px;
  padding: 24px 0;
  max-width: 867px;
  background-color: $card-background-color;
  box-shadow: 0px 8px 16px rgba(54, 62, 113, 0.24);
  border-radius: 16px;
}
.invite__close-icon {
  position: absolute;
  cursor: pointer;
  top: 24px;
  right: 24px;
  path {
    transition: all 0.3s;
  }
  &:hover path {
    fill: $accent-color;
  }
}
.invite__title {
  padding: 0 24px;
  font-weight: 600;
  font-size: 1.5rem;
}
.nav {
  padding: 0 24px;
  margin: 14px 0;
}
.nav__list {
  display: flex;
  align-items: center;
}
.nav__item {
  position: relative;
  display: flex;
  cursor: pointer;
  align-items: center;
  .nav__text {
    opacity: 0.5;
  }

  margin-right: 24px;
  &:last-child {
    margin-right: 0;
  }
  &::after {
    content: "";
    position: absolute;
    bottom: -16px;
    left: 0;
    height: 2px;
    width: 100%;
    background-color: inherit;
    transition: background-color 0.3s ease-in-out;
  }
}
.nav__item_active {
  color: $accent-color;
  .nav__text {
    opacity: 1;
  }
  .nav__number {
    background-color: rgba(65, 90, 218, 0.05);
  }
  &::after {
    background-color: $accent-color;
  }
}
.nav__number {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: rgba($color: #5e6a75, $alpha: 0.05);
}
.nav__number_filled {
  background-color: $accent-color !important;
  opacity: 1 !important;
}
.nav__text {
  margin-left: 8px;
}
</style>