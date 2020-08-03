<template>
    <div class="tool-pannel">
        <div class="tool-row">
            <div class="no-break no-grow">data?:</div>
            <edit-file
                v-bind:file="mainFile"
                v-on:update="(s) => (mainFile = s)"
            />
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import editFile from "./editFile.vue";
export default Vue.extend({
    name: "editJudgeRequestMessage",
    data: function () {
        return {
            mainFile: { id: "", content: "" },
        };
    },
    methods: {
        update: function () {
            this.$emit("update", JSON.parse(JSON.stringify(this.body)));
        },
    },
    computed: {
        body: function () {
            return {
                data: { id: "", content: "" },
            };
        },
    },
    components: {
        editFile,
    },
});
</script>
