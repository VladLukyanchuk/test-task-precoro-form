<template>
  <div class="invite__card">
    <closeIcon class="invite__close-icon"/>
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
            <checkedIcon v-else />
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

import closeIcon from "@/assets/svg/closeIcon.vue";
import checkedIcon from "@/assets/svg/checkedIcon.vue";

export default {
  components: { FormMain, FormLocations, FormRoles, closeIcon, checkedIcon },
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