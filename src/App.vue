<template>
    <div class="container">
        <TheMain></TheMain>
    </div>
</template>

<script>
import TheMain from "./layout/main/TheMain.vue";
("");
export default {
    name: "App",
    components: {
        TheMain,
    },
};
</script>

<style scoped>
@import url(./assets/css/global.css);
@import url(./assets/css/variables.css);
.container {
}
</style>
