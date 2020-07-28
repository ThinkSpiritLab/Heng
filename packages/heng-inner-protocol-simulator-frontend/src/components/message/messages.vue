<template>
    <div class="message-pannel">
        <div class="msg-select">
            <p>ContextID</p>
            <verselect
                v-bind:tabs="Object.keys(messages)"
                v-bind:select="(s) => (curid = s)"
            />
        </div>
        <div
            v-for="(group, id) in messages"
            class="msg-dis card"
            v-bind:key="id"
            v-show="id == curid"
        >
            <div
                v-for="(msg, index) in messages[id]"
                v-bind:key="index"
                class="message-card card"
            >
                <basicmessage v-bind:message="msg" />
            </div>
        </div>
        <!-- <p>{{ JSON.stringify(messages) }}</p> -->
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import basicmessage from "./basicmessage.vue";
import verselect from "../verselect.vue";
export default Vue.extend({
    name: "messages",
    props: ["messages"],
    data: function () {
        return {
            curid: "other",
        };
    },
    components: { verselect, basicmessage },
});
</script>
<style scoped>
.message-pannel {
    border: 2px solid #aaa;
    margin: 10px;
    display: flex;
    border-radius: 5px;

    flex-direction: row;
    align-items: stretch;
    justify-content: center;
}
.msg-select {
    border: 2px solid #aaa;
    border-radius: 5px;
    margin: 10px;
}
.msg-dis {
    width: 70%;
    border: 2px solid #aaa;
    border-radius: 5px;
    margin: 10px;
}
.card {
    border: 1px solid #ccc;
    margin: 5px;
    border-radius: 5px;
    padding: 10px;
}
</style>
