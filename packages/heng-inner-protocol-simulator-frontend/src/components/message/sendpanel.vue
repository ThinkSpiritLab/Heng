<template>
    <div class="pannel">
        <div class="edit-area">
            <div class="side-pannel">
                <a>消息类型选择</a>
                <verselect
                    v-bind:tabs="messagetypes"
                    v-bind:select="(s) => (messagetype = s)"
                />
            </div>
            <div class="edit-pannel">
                <div>
                    <p><a>ContextID</a> <input v-model.trim="contextid" /></p>
                </div>
                <div class="custom-edit">
                    <edit-raw-message
                        v-show="messagetype === 0"
                        v-on:send="sendraw"
                        v-on:update="update"
                    />
                    <div v-show="messagetype === 1">
                        <p>ackmessage has no config</p>
                        <button
                            v-on:click="updatebody(undefined)"
                            class="save-btn"
                        >
                            Save
                        </button>
                    </div>
                    <!-- <editversionmessage
                        v-show="messagetype === 2"
                        v-on:send="sendmessage"
                        v-on:update="updatebody"
                    />
                    <edit-verify-message
                        v-show="messagetype === 3"
                        v-on:update="updatebody"
                    /> -->
                    <edit-judger-info-message
                        v-show="messagetype === 4"
                        v-on:send="sendmessage"
                        v-on:update="updatebody"
                    />
                    <edit-status-report-message
                        v-show="messagetype === 17"
                        v-on:send="sendmessage"
                        v-on:update="updatebody"
                    />
                </div>
                <div>
                    <button v-on:click="sendraw(message)" class="send-btn">
                        Send
                    </button>
                </div>
            </div>
            <div class="tool-pannel pannel" style="max-width: 25%;">
                <div class="raw-view">
                    <p>{{ JSON.stringify(message) }}</p>
                </div>
                <div class="button no-grow no-break" v-on:click="copy(message)">
                    CopyAll
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import verselect from "../verselect.vue";
import editRawMessage from "./edit/editetrawmessage.vue";
// import editversionmessage from "./edit/editversionmesage.vue";
// import editVerifyMessage from "./edit/editVerifyMessage.vue";
import editJudgerInfoMessage from "./edit/editJudgerInfoMessage.vue";
import editStatusReportMessage from "./edit/editStatusReportMessage.vue";
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
                // version: 2,
                // verify: 3,
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
                contextID: this.contextid,
                type: this.messagetype,
                body:
                    msg !== undefined
                        ? JSON.parse(JSON.stringify(msg))
                        : undefined,
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
        copy: function (obj) {
            let str = JSON.stringify(obj);
            console.log("try copy: " + str);
            const inputarea = document.createElement("input");
            inputarea.setAttribute("readonly", "readonly");
            inputarea.setAttribute("value", str);
            document.body.appendChild(inputarea);
            // inputarea.setSelectionRange(0, inputarea.value.length);
            inputarea.select();
            if (document.execCommand("copy")) {
                document.execCommand("copy");
                alert("复制了");
            }
            document.body.removeChild(inputarea);
        },
    },
    components: {
        verselect,
        editRawMessage,
        // editversionmessage,
        // editVerifyMessage,
        editJudgerInfoMessage,
        editStatusReportMessage,
    },
});
</script>
<style>
.pannel {
    border: 2px solid #aaa;
    border-radius: 5px;
    padding: 10px;
}
.card {
    border: 1px solid #aaa;
    border-radius: 5px;
    padding: 10px;
}
.edit-area {
    /* max-width: 1000px; */
    /* border: 2px solid #777; */
    padding-left: 10px;
    display: flex;
    align-items: stretch;
    justify-content: center;
    /* height: 500px; */
}
.side-pannel {
    border: 2px solid #aaa;
    margin: 10px;
    max-width: 200px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
}
.edit-pannel {
    border: 2px solid #aaa;
    margin: 10px;
    min-width: 400px;
    /* height: 100%; */
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
}

.edit-pannel > {
    justify-content: center;
}
.raw-view {
    border: 1px solid #aaa;
    border-radius: 2px;
    margin: 10px;
    /* height: 100%; */
    /* width: 25%; */
    min-width: 400px;
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    word-break: break-all;
}
.custom-edit {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
}
.send-btn {
    width: 100%;
    height: 50px;
}
.save-btn {
    /* width: 70%; */
    height: 50px;
}
.tool-pannel {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
}
.tool-column {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
}
.tool-row {
    border: 1px solid #ccc;
    margin: 10px;
    border-radius: 5px;
    display: flex;
    align-items: stretch;
    justify-content: flex-start;
}
.tool-row > * {
    margin: 10px;
    flex-grow: 1;
}
.tool-button {
    border: 2px solid #aaa;
    border-radius: 3px;
    margin: 5px;
    background: #ccc;
    word-break: keep-all;
    flex-grow: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
</style>
