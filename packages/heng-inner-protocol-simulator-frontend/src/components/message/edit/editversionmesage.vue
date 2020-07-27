<template>
    <div>
        <p>
            <input v-model.trim="nextval" />
            <button v-on:click="version.push(nextval)">Add</button>
        </p>
        <p v-for="(ver, index) in version" v-bind:key="index">
            <input v-model.trim="version[index]" />
            <button v-on:click="version.splice(version.indexOf(ver), 1)">
                Remove
            </button>
        </p>

        <button v-on:click="send">Send</button>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
    name: "editversionmessage",
    data: function () {
        return {
            version: [],
            nextval: "0.0.1",
        };
    },
    methods: {
        send: function () {
            this.$emit("send", this.version);
        },
    },
});
</script>
