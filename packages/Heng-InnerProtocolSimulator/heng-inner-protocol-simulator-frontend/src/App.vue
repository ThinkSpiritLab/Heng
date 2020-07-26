<template>
    <div id="app">
        <judgersimulator />
    </div>
</template>

<script lang="ts">
import judgersimulator from "./components/judger-simulator/judger-simulator.vue";

export default {
    name: "App",
    components: {
        judgersimulator,
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
