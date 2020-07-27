<template>
    <div class="pannel">
        <div class="edit-area">
            <verselect
                v-bind:tabs="messagetypes"
                v-bind:select="(s) => (messagetype = s)"
            />
            <div class="edit-pannel">
                <div>
                    <p><a>ContextID</a> <input v-model.trim="contextid" /></p>
                </div>
                <div v-show="messagetype === 1">
                    <p>ackmessage has no config</p>
                    <button v-on:click="sendmessage()">
                        Send
                    </button>
                </div>
                <editversionmessage
                    v-show="messagetype === 2"
                    v-on:send="sendmessage"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import verselect from "../verselect.vue";
import editversionmessage from "./edit/editversionmesage.vue";
export default Vue.extend({
    name: "sendpanel",
    props: ["connection", "send"],
    data: function () {
        return {
            messagetype: 0,
            contextid: 0,
            messagetypes: {
                ack: 1,
                version: 2,
                verify: 3,
                judgerinfo: 4,
                statusreport: 17,
                statusrequest: 18,
                judgeRequest: 33,
                judgeResult: 34,
                judgeState: 35,
                shutdown: 126,
                error: 127,
            },
        };
    },
    methods: {
        sendmessage: function (body) {
            this.send({
                contextid: this.contextid,
                type: this.messagetype,
                body: body,
            });
        },
    },
    components: { editversionmessage, verselect },
});
</script>
<style scoped>
.pannel {
    border: 2px solid #2f2f2f;
    border-radius: 5px;
    padding: 10px;
}
.edit-area {
    /* max-width: 500px; */
    padding-left: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.edit-pannel {
    min-width: 400px;
    display: block;
    align-items: baseline;
    justify-content: center;
}
</style>
