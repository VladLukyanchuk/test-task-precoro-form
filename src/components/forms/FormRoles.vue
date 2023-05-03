<template>
  <div class="roles__wrapper">
    <div class="roles__inputs">
      <div class="access">
        <div class="access__header">
          <div class="access__titles">Access to:</div>
          <div class="access__values">
            <div
              class="access__value"
              v-for="value in accessCheckboxValues"
              :key="value"
            >
              {{ value }}
            </div>
          </div>
        </div>
        <div class="access__content">
          <div class="access__all-below">
            <div class="access__below">All bellow</div>
            <div class="access__checkboxes">
              <simple-checkbox
                v-for="(value, checkbox) in allAccess"
                :value="checkbox"
                :key="checkbox"
                @update:modelValue="updateAccessSelected"
                :modelValue="value"
                :disabled="disabled"
              />
            </div>
          </div>
          <div
            class="access__item"
            v-for="item in titlesAccess"
            :key="item.title"
          >
            <div class="access__item-name">{{ item.title }}</div>
            <div class="access__checkboxes">
              <simple-checkbox
                v-for="value in item.access"
                :value="value"
                :key="value"
                v-model="item.checked"
                :disabled="disabled"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="management">
        <div class="management__header">
          Management:
          <infoIcon />
        </div>
        <div class="management__item">
          <simple-checkbox
            label="All below"
            class="font__bold"
            @update:modelValue="updateManagementSelected"
            :modelValue="allManagement"
            :disabled="disabled"
          />
          <!-- <span class="management__text management__text_all-below"
            >All bellow</span
          > -->
        </div>
        <div
          class="management__item"
          v-for="value in managementCheckboxValues"
          :key="value"
        >
          <simple-checkbox
          :disabled="disabled"
            :label="value"
            :value="value"
            v-model="management.selected"
          />
        </div>
        <div class="management__item management__item_admin">
          <simple-checkbox
            :disabled="disabled"
            label="Admin (Full access)"
            value="admin"
            v-model="management.admin"
          />
          <warnIcon />
        </div>
      </div>
    </div>
    <div class="roles__warn-card">
      <infoIcon />
      <p class="roles__warn-text">
        The user becomes a
        <a target="blank" class="roles__link" href="https://precoro.com/product"
          >Power user</a
        >
        if at least ONE of the following roles is selected: Approve, View only,
        Configuration, Suppliers and Items, Budgets, Warehouse manager.
      </p>
    </div>
  </div>
  <div class="roles__actions">
    <action-button :disabled="disabled" @click="sendForm">Invite User</action-button>
  </div>
</template>

<script>
import warnIcon from "@/assets/svg/warnIcon.vue";
import infoIcon from "@/assets/svg/infoLightIcon.vue";

export default {
  components: { warnIcon, infoIcon },
  data() {
    return {
      accessCheckboxValues: ["View only", "Create", "Approve", "Pay"],
      titlesAccess: [
        {
          title: "Warehouse requests",
          checked: [],
          access: ["View only", "Create", "Approve"],
        },
        {
          title: "Purchase requests",
          checked: ["View only"],
          access: ["View only", "Create", "Approve"],
        },
        {
          title: "Request for proposals",
          checked: ["View only"],
          access: ["View only", "Create", "Approve"],
        },
        {
          title: "Purchase orders",
          checked: ["View only"],
          access: ["View only", "Create", "Approve"],
        },
        {
          title: "Receipts",
          checked: ["View only"],
          access: ["View only", "Create", "Approve"],
        },
        {
          title: "Invoices",
          checked: [],
          access: ["View only", "Create", "Approve", "Pay"],
        },
        {
          title: "Expenses",
          checked: [],
          access: ["View only", "Create", "Approve", "Pay"],
        },
      ],
      managementCheckboxValues: [
        "Configuration",
        "Suppliers and items",
        "Budgets",
        "Warehouse manager",
        "Reports",
      ],
      management: {
        selected: [],
        admin: false,
      },
    };
  },
  computed: {
    allManagement() {
      return (
        this.managementCheckboxValues.length === this.management.selected.length
      );
    },
    allAccess() {
      const statusObj = {};
      this.accessCheckboxValues.forEach((checkbox) => {
        const filtered = this.titlesAccess.filter((elem) => {
          return elem.access.includes(checkbox);
        });

        const status = filtered.every((elem) => {
          return elem.checked.includes(checkbox);
        });

        statusObj[checkbox] = status;
      });
      return statusObj;
    },
    disabled() {
      return this.$store.getters.getFormStatus;
    },
  },
  emits: ["save"],
  methods: {
    updateManagementSelected(value) {
      this.management.selected = value
        ? [...this.managementCheckboxValues]
        : [];
    },
    updateAccessSelected(checked, value) {
      this.titlesAccess.forEach((elem) => {
        if (elem.access.includes(value)) {
          checked
            ? elem.checked.push(value)
            : elem.checked.splice(elem.checked.indexOf(value), 1);
          //filter duplicates
          elem.checked = elem.checked.filter((item, index) => {
            const firstIndex = elem.checked.indexOf(item);
            return index === firstIndex;
          });
        }
      });
    },
    saveInformation() {
      const rolesForm = {
        access: {},
        management: [],
        admin: false,
      };
      this.titlesAccess.forEach((elem) => {
        rolesForm.access[elem.title] = elem.checked;
      });
      rolesForm.management = this.management.selected;
      rolesForm.admin = this.management.admin;
      this.$store.commit("setRoles", rolesForm);
    },
    sendForm() {
      this.saveInformation();
      this.$store.commit("setFormStatus", true);
      const form = this.$store.getters.getForm;
      console.log(JSON.stringify(form));
    },
  },
  created() {
    const rolesForm = this.$store.getters.getRoles;
    this.titlesAccess.forEach((elem) => {
      elem.checked = rolesForm.access[elem.title];
    });
    this.management.selected = rolesForm.management;
    this.management.admin = rolesForm.admin;
  },
};
</script>

<style lang="scss" scoped>
.roles__wrapper {
  border-top: 1px solid rgba($color: #000000, $alpha: 0.1);
  border-bottom: 1px solid rgba($color: #000000, $alpha: 0.1);
  padding: 24px 24px 32px 24px;
}
.roles__inputs {
  display: grid;
  grid-template-columns: 62% 38%;
}
.access {
  padding-right: 15px;
  border-right: 1px solid #dddee5;
}
.access__header {
  line-height: 150%;
  display: flex;
  justify-content: space-between;
  color: #676f8f;
  margin-bottom: 24px;
}
.access__titles {
  font-weight: 600;
}
.access__values {
  //max-width: 300px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  justify-items: center;
}
.access__value {
  text-align: center;
}
.access__content {
}
.access__all-below {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
}
.access__below {
  font-weight: 600;
}
.access__checkboxes {
  display: grid;
  grid-template-columns: 75px 75px 75px 75px;
  justify-items: center;
}
.access__item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
  &:last-child {
    margin-bottom: 0;
  }
}
.access__item-name {
  margin-right: 24px;
}
.management {
  padding-left: 30px;
  display: flex;
  flex-direction: column;
}
.management__header {
  display: flex;
  font-weight: 600;
  align-items: center;
  color: #676f8f;
  line-height: 150%;
  margin-bottom: 24px;
  svg {
    margin-left: 6.25px;
    vertical-align: middle;
  }
}
.management__item {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  &:last-child {
    margin-bottom: 0;
  }
}
.management__text_all-below {
  font-weight: 600;
}
.management__text {
  margin-left: 16px;
}
.management__item_admin {
  margin-top: auto;
  svg {
    margin-left: 16px;
  }
}
@media (max-width: 740px) {
  .roles__inputs {
    display: grid;
    max-width: 540px;
    grid-template-columns: 1fr;
  }
  .access {
    padding-right: 0;
    border-right: none;
    padding-bottom: 30px;
    border-bottom: 1px solid #dddee5;
  }
  .management {
    padding-left: 0;
    padding-top: 32px;
  }
  .management__item_admin {
    margin-top: 24px;
  }
}
@media (max-width: 440px) {
  .access__values {
    grid-template-columns: 50px 50px 50px 50px;
    column-gap: 16px;
  }
  .access__item-name {
    margin-right: 0;
  }
  .access__checkboxes {
    grid-template-columns: 50px 50px 50px 50px;
    column-gap: 16px;
  }
}
.roles__warn-card {
  max-width: 636px;
  margin-top: 32px;
  background: rgba(244, 244, 255, 0.5);
  border-radius: 8px;
  padding: 10px 12px;
  display: flex;
  align-items: center;
  svg {
    margin-right: 8px;
    opacity: 0.5;
    flex-shrink: 0;
  }
}
.roles__warn-text {
  font-weight: 500;
  font-size: 14px;
  line-height: 130.02%;
  color: rgba(29, 36, 82, 0.5);
}
.roles__link {
  position: relative;
  font-size: 14px;
  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    border-bottom: 1px solid #415ada;
    opacity: 0.5;
  }
}
.roles__actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  margin-right: 24px;
}
.font__bold {
  font-weight: 600;
}
</style>