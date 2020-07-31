<template>
    <div class="message-pannel">
        <general-message-obj
            v-bind:obj="message"
            v-bind:maxlength="maxlength"
            v-bind:foldLevel="2"
            class="message-card"
        />
        <!-- <general-message-obj v-bind:obj="message.body" class="message-card" /> -->
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import generalMessageObj from "./GeneralMessageObj.vue";
export default Vue.extend({
    name: "verifyMessage",
    props: ["message", "maxlength"],
    components: { generalMessageObj },
});
</script>
