<template>
    <div id="app">
        <basicmessage />
    </div>
</template>

<script lang="ts">
import basicmessage from "./components/message/basicmassage.vue";

export default {
    name: "App",
    components: {
        basicmessage,
    },
};
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
