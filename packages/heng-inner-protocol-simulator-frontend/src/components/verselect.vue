<template>
    <div class="side-select">
        <ul v-if="isarray" class="side-bar">
            <li
                v-for="tab in tabs"
                v-bind:key="tab"
                v-bind:class="['side-button', { active: activetab === tab }]"
                v-on:click="click(tab)"
            >
                {{ tab }}
            </li>
        </ul>
        <ul v-else class="side-bar">
            <li
                v-for="(tab, index) in tabs"
                v-bind:key="index"
                v-bind:class="['side-button', { active: activetab === tab }]"
                v-on:click="click(tab)"
            >
                {{ index }}
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
    name: "verselect",
    props: ["tabs", "select"],
    data: function () {
        return {
            activetab: "",
        };
    },
    methods: {
        click: function (tab) {
            this.activetab = tab;
            this.select(tab);
        },
    },
    computed: {
        isarray: function () {
            // console.log(
            //     JSON.stringify(this.tabs) +
            //         " is array?" +
            //         JSON.stringify(this.tabs instanceof Array)
            // );
            return this.tabs instanceof Array;
        },
    },
});
</script>

<style scoped>
.side-button {
    padding: 6px 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    cursor: pointer;
    background: #f0f0f0;
    margin-bottom: -1px;
    margin-right: -1px;
}
.side-button:hover {
    background: #e0e0e0;
}
.side-button.active {
    background: #707070;
}
.side-bar {
    max-width: 40vw;
    margin: 0;
    padding: 0 10px 0 0;
    list-style-type: none;
    /* border-right: 1px solid #ccc; */
}
</style>
