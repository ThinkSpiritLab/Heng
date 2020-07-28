<template>
    <div class="message-card">
        <p>
            <a>ContextID : </a><a>{{ message.contextID }}</a>
        </p>
        <ackmessage v-if="message.type === 1" v-bind:message="message" />
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import ackmessage from "./ackmessage.vue";
export default Vue.extend({
    name: "basicmessage",
    props: ["message"],
    components: { ackmessage },
});
</script>

<style lang="stylus" scoped>
.card {
    border: 1px solid #ccc;
    margin: 5px;
    border-radius: 5px;
    padding: 10px;
}
</style>
