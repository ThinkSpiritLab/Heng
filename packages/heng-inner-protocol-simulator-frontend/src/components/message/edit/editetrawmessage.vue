<template>
    <div class="tool-pannel pannel grow">
        <textarea class="raw-edit card" v-model.trim="msg" />
        <div v-on:click="update" class="tool-button">Save</div>
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

<style scoped>
.raw-edit {
    /* height: 200px; */
    resize: none;
    /* width: 100%; */
    flex-grow: 1;
}
</style>
