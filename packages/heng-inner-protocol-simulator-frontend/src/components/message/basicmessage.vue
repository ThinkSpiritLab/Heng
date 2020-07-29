<template>
    <div class="message-pannel">
        <div class="message-card no-grow">
            <div class="message-card no-grow no-break">
                <a>ContextID : {{ message.contextID }}</a>
            </div>
            <div class="message-card no-grow buttom no-break">
                <div v-on:click="showRaw = !showRaw">
                    切换原始信息显示
                </div>
            </div>
            <div class="message-card raw-view" v-if="showRaw">
                {{ JSON.stringify(message) }}
            </div>
        </div>
        <div class="message-card">
            <ackmessage v-if="message.type === 1" v-bind:message="message" />
            <!-- <verify-message
                v-else-if="message.type === 3"
                v-bind:message="message"
            /> -->
            <general-message
                v-else
                v-bind:message="message"
                v-bind:maxlength="50"
            />
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import ackmessage from "./view/ackmessage.vue";
// import verifyMessage from "./view/VerifyMessage.vue";
import GeneralMessage from "./view/GeneralMessage.vue";
export default Vue.extend({
    name: "basicmessage",
    props: ["message"],
    data: function () {
        return { showRaw: false };
    },
    components: { ackmessage, /*verifyMessage,*/ GeneralMessage },
});
</script>

<style>
.message-pannel {
    border: 2px solid #aaa;
    margin: 5px;
    display: flex;
    align-items: stretch;
    justify-content: center;
    border-radius: 5px;
    padding: 10px;
}
.message-card {
    flex-grow: 1;
    border: 1px solid #ccc;
    border-radius: 5px;
    max-width: 100%;
    margin: 5px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
    word-break: break-all;
}
.raw-view {
    border: 2px solid #aaa;
    /* height: 100%; */
    display: flex;
    align-items: stretch;
    justify-content: center;
    flex-grow: 1;
    word-break: break-all;
}
.buttom {
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
