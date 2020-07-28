<template>
    <div class="message-pannel">
        <div class="message-card">
            <div class="message-pannel">
                <a>ContextID : {{ message.contextID }}</a>
            </div>
            <div class="message-pannel">
                <div class="message-card no-grow">
                    <button v-on:click="showRaw = !showRaw">
                        切换原始信息显示
                    </button>
                </div>
                <div class="message-card raw-view" v-if="showRaw">
                    {{ JSON.stringify(message) }}
                </div>
            </div>
        </div>
        <div class="message-card">
            <ackmessage v-if="message.type === 1" v-bind:message="message" />
            <verify-message
                v-else-if="message.type === 3"
                v-bind:message="message"
            />
            <general-message v-else v-bind:message="message" />
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import ackmessage from "./view/ackmessage.vue";
import verifyMessage from "./view/VerifyMessage.vue";
import GeneralMessage from "./view/GeneralMessage.vue";
export default Vue.extend({
    name: "basicmessage",
    props: ["message"],
    data: function () {
        return { showRaw: false };
    },
    components: { ackmessage, verifyMessage, GeneralMessage },
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
    max-width: 95%;
    margin: 5px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
    word-break: break-all;
}
.raw-view {
    border: 2px solid #aaa;
    margin: 10px;
    /* height: 100%; */
    max-width: 70%;
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    word-break: break-all;
}
.no-grow {
    flex-grow: 0;
}
.no-break {
    word-break: keep-all;
}
</style>
