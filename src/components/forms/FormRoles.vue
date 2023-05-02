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
              />
            </div>
          </div>
        </div>
      </div>
      <div class="management">
        <div class="management__header">
          Management:
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M10 1.75C5.44321 1.75 1.75 5.44321 1.75 10C1.75 14.5568 5.44321 18.25 10 18.25C14.5568 18.25 18.25 14.5568 18.25 10C18.25 5.44321 14.5568 1.75 10 1.75ZM0.25 10C0.25 4.61479 4.61479 0.25 10 0.25C15.3852 0.25 19.75 4.61479 19.75 10C19.75 15.3852 15.3852 19.75 10 19.75C4.61479 19.75 0.25 15.3852 0.25 10ZM10 5.25C10.4142 5.25 10.75 5.58579 10.75 6V7C10.75 7.41421 10.4142 7.75 10 7.75C9.58579 7.75 9.25 7.41421 9.25 7V6C9.25 5.58579 9.58579 5.25 10 5.25ZM10 9.25C10.4142 9.25 10.75 9.58579 10.75 10V15C10.75 15.4142 10.4142 15.75 10 15.75C9.58579 15.75 9.25 15.4142 9.25 15V10C9.25 9.58579 9.58579 9.25 10 9.25Z"
              fill="#676F8F"
            />
          </svg>
        </div>
        <div class="management__item">
          <simple-checkbox
            label="All below"
            class="font__bold"
            value="allBelow"
            @update:modelValue="updateManagementSelected"
            :modelValue="allManagement"
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
            :label="value"
            :value="value"
            v-model="management.selected"
          />
        </div>
        <div class="management__item management__item_admin">
          <simple-checkbox
            label="Admin (Full access)"
            value="admin"
            v-model="management.admin"
          />

          <svg
            width="22"
            height="20"
            viewBox="0 0 22 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11 7V11.5M11 14.5V15M3.38254 19H18.6175C20.1387 19 21.103 17.3691 20.3699 16.0362L12.7524 2.18624C11.9926 0.80469 10.0074 0.804688 9.24757 2.18624L1.63011 16.0362C0.897013 17.3691 1.86134 19 3.38254 19Z"
              stroke="#EA9210"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
    <div class="roles__warn-card">
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M10 1.75C5.44321 1.75 1.75 5.44321 1.75 10C1.75 14.5568 5.44321 18.25 10 18.25C14.5568 18.25 18.25 14.5568 18.25 10C18.25 5.44321 14.5568 1.75 10 1.75ZM0.25 10C0.25 4.61479 4.61479 0.25 10 0.25C15.3852 0.25 19.75 4.61479 19.75 10C19.75 15.3852 15.3852 19.75 10 19.75C4.61479 19.75 0.25 15.3852 0.25 10ZM10 5.25C10.4142 5.25 10.75 5.58579 10.75 6V7C10.75 7.41421 10.4142 7.75 10 7.75C9.58579 7.75 9.25 7.41421 9.25 7V6C9.25 5.58579 9.58579 5.25 10 5.25ZM10 9.25C10.4142 9.25 10.75 9.58579 10.75 10V15C10.75 15.4142 10.4142 15.75 10 15.75C9.58579 15.75 9.25 15.4142 9.25 15V10C9.25 9.58579 9.58579 9.25 10 9.25Z"
          fill="#676F8F"
        />
      </svg>

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
    <action-button @click="sendForm">Invite User</action-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      accessCheckboxValues: ["View only", "Create", "Approve", "Pay"],
      allBelow: [],
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
        const filtered = this.titlesAccess.filter(elem => {
          return elem.access.includes(checkbox);
        });
        
        const status = filtered.every((elem) => {
          return elem.checked.includes(checkbox);
        });

        statusObj[checkbox] = status;
      });
      return statusObj;
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
      console.log(checked, value)
      this.titlesAccess.forEach ( elem => {
        if (elem.access.includes(value)) {
          checked ? elem.checked.push(value) : elem.checked.splice(elem.checked.indexOf(value), 1)
        }
      })
    },
    saveInformation() {
      const rolesForm = {
        access: {},
        management: {},
      };
      this.titlesAccess.forEach((elem) => {
        rolesForm.access[elem.title] = elem.checked;
      });
      rolesForm.management = this.management;
      this.$store.commit("setRoles", rolesForm);
    },
    sendForm() {
      this.saveInformation();
      this.$store.commit("setFormStatus", true);
      const form = this.$store.getters.getForm;
      console.log(form);
    },
  },
  created() {
    const rolesForm = this.$store.getters.getRoles;
    this.titlesAccess.forEach((elem) => {
      elem.checked = rolesForm.access[elem.title];
    });
    /* this.titlesManagement.selected = rolesForm.management; */
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
  font-size: 16px;
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