import {createApp} from "vue";
import App from "./App.vue";
import MTextfield from "./components/textfield/MTextfield.vue";
import MForm from "./components/form/MForm.vue";
import MButton from "./components/button/MButton.vue";

const app = createApp(App);

app.component("MTextfield", MTextfield);
app.component("MForm", MForm);
app.component("MButton", MButton);
app.mount("#app");

export default app;
