<template>
    <div class="card">
        <div v-for="(msg, index) in messages" v-bind:key="index">
            <basicmessage v-bind:message="msg" />
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import basicmessage from "./basicmessage.vue";
export default Vue.extend({
    name: "messages",
    props: ["messages"],
    components: { basicmessage },
});
</script>
<style scoped>
.card {
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
}
</style>
