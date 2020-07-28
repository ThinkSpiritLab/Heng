<template>
    <div>
        <textarea v-model.trim="msg" v-on:change="update" />
        <!-- <button v-on:click="click">Send</button> -->
    </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
    name: "editRawMessage",
    data: function () {
        return {
            msg: "{}",
        };
    },
    methods: {
        update: function () {
            this.$emit("update", this.msg);
        },
        // click: function () {
        //     this.$emit("send", this.msg);
        // },
    },
});
</script>
