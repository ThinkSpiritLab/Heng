<template>
    <div id="app">
        <h1>模拟器</h1>
        <tabselect v-bind:tabs="tabs" v-bind:select="(s) => (activetab = s)" />
        <keep-alive v-if="activetab === 'judger'">
            <judgersimulator v-bind:class="['tab', 'judger']" />
        </keep-alive>
        <keep-alive v-if="activetab === 'controller'">
            <p v-bind:class="['tab', 'controller']">TODO</p>
            <!-- <judgersimulator v-bind:class="['tab', 'controller']" /> -->
        </keep-alive>
    </div>
</template>

<script lang="ts">
import judgersimulator from "./components/judger-simulator/judger-simulator.vue";
import tabselect from "./components/tabselect.vue";
export default {
    name: "App",
    components: {
        judgersimulator,
        tabselect,
    },
    data: function () {
        return {
            tabs: ["judger", "controller"],
            activetab: "judger",
        };
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
.tab {
    border: 1px solid #ccc;
    padding: 10px;
}
.buttom {
    border: 2px solid #aaa;
    /*拼写错误，修复完成后删除 */
    border-radius: 150px;
    margin: 5px;
    background: #f00;
}
.button {
    border: 2px solid #aaa;
    /* border-radius: 50%; */
    border-radius: 150px;
    margin: 5px;
    background: #ccc;
}
.row {
    display: flex;
    align-items: stretch;
}
.column {
    display: flex;
    flex-direction: column;
    align-items: stretch;
}
.grow {
    flex-grow: 1;
}
.no-grow {
    flex-grow: 0;
}
.no-break {
    word-break: keep-all;
}
.no-border {
    border: none;
}
.no-margin {
    margin: 0;
}
</style>
