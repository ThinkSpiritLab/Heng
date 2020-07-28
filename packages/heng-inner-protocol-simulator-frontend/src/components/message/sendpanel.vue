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
                <edit-raw-message
                    v-show="messagetype === 0"
                    v-on:send="sendraw"
                    v-on:update="update"
                />
                <div v-show="messagetype === 1">
                    <p>ackmessage has no config</p>
                    <button v-on:click="updatebody(undefined)">
                        Save
                    </button>
                </div>
                <editversionmessage
                    v-show="messagetype === 2"
                    v-on:send="sendmessage"
                    v-on:update="updatebody"
                />
                <div>
                    <button v-on:click="sendraw(message)" class="send-btn">
                        Send
                    </button>
                </div>
            </div>
            <div class="raw-view">
                <p>{{ JSON.stringify(message) }}</p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import verselect from "../verselect.vue";
import editRawMessage from "./edit/editetrawmessage.vue";
import editversionmessage from "./edit/editversionmesage.vue";
export default Vue.extend({
    name: "sendpanel",
    props: ["connection", "send"],
    data: function () {
        return {
            messagetype: 0,
            contextid: 0,
            messagetypes: {
                raw: 0,
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
            message: "",
        };
    },
    methods: {
        update: function (msg) {
            this.message = JSON.parse(msg);
        },
        updatebody: function (msg) {
            this.message = {
                contextid: this.contextid,
                type: this.messagetype,
                body: msg,
            };
        },
        sendraw: function (rawmessage) {
            this.send(rawmessage);
        },
        sendmessage: function (body) {
            this.send({
                contextid: this.contextid,
                type: this.messagetype,
                body: body,
            });
        },
    },
    components: { editversionmessage, verselect, editRawMessage },
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
    border: 2px solid #777;
    padding-left: 10px;
    display: flex;
    align-items: stretch;
    justify-content: center;
    height: 400px;
}
.edit-pannel {
    border: 2px solid #777;
    min-width: 400px;
    /* height: 100%; */
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
}

.edit-pannel > {
    justify-content: center;
}
.raw-view {
    border: 2px solid #777;
    /* height: 100%; */
    min-width: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.send-btn {
    flex-grow: 1;
}
</style>
