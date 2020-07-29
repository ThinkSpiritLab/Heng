<template>
    <div>
        <div v-if="message.body.step != undefined">
            <div
                v-for="(val, key) in message.body"
                v-bind:key="key"
                class="message-pannel"
            >
                <div class="message-card no-break">
                    <a>{{ key }}</a>
                </div>
                <div class="message-card no-grow"><a>:</a></div>
                <div class="message-card">
                    <a>{{ JSON.stringify(val).substring(0, 50) }}</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
    name: "verifyMessage",
    props: ["message"],
});
</script>
