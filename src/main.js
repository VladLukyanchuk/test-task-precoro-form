import { createApp } from "vue";
import App from "./App.vue";
import "@/style/main.scss";
import store from "./store";
//Custom elements
import TextField from "@/components/UI/TextField"
import SelectItem from "@/components/UI/SelectItem"
import SwitchCheckbox from "@/components/UI/SwitchCheckbox"
import ActionButton from "@/components/UI/ActionButton"
import SimpleCheckbox from "@/components/UI/SimpleCheckbox"

const app = createApp(App);

app.use(store)

app
    .component("text-field", TextField)
    .component("select-item", SelectItem)
    .component("switch-checkbox", SwitchCheckbox)
    .component("action-button", ActionButton)
    .component("simple-checkbox", SimpleCheckbox)

app.mount("#app");
