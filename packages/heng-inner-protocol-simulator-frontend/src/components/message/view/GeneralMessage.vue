<template>
    <div class="message-pannel">
        <general-message-obj v-bind:obj="message" class="message-card" />
        <!-- <general-message-obj v-bind:obj="message.body" class="message-card" /> -->
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import generalMessageObj from "./GeneralMessageObj.vue";
export default Vue.extend({
    name: "verifyMessage",
    props: ["message"],
    components: { generalMessageObj },
});
</script>
