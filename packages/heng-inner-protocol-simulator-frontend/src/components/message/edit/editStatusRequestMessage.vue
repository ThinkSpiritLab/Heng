<template>
    <div class="colnum">
        <div class="tool-row card">
            <div class="no-grow">setReportInterval</div>
            <div
                class="tool-button"
                v-on:click="
                    body.setReportInterval =
                        body.setReportInterval == undefined ? 10 : undefined
                "
            >
                {{ body.setReportInterval == undefined ? "启用" : "弃用" }}
            </div>
            <input
                v-if="body.setReportInterval != undefined"
                v-model.number="body.setReportInterval"
            />
        </div>
        <div class="tool-row card">
            <div class="no-grow">immediate</div>
            <div
                class="tool-button grow"
                v-on:click="body.immediate = !body.immediate"
            >
                {{ body.immediate ? "True" : "False" }}
            </div>
        </div>
        <div v-on:click="update" class="save-btn tool-button">Save</div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
    name: "editStatusRequestMessage",
    data: function () {
        return {
            body: {
                setReportInterval: undefined,
                immediate: false,
            },
        };
    },
    methods: {
        update: function () {
            this.$emit("update", JSON.parse(JSON.stringify(this.body)));
        },
    },
});
</script>
