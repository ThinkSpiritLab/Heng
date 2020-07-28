<template>
    <div>
        <div>
            <div
                v-for="(val, key) in obj"
                v-bind:key="key"
                class="message-pannel"
            >
                <div class="message-card no-break no-grow">
                    <a>{{ key }}</a>
                </div>
                <div class="message-card no-grow"><a>:</a></div>
                <div v-if="justshow(val)" class="message-card">
                    <a>{{ val }}</a>
                </div>
                <div v-else class="message-card">
                    <general-message-obj v-bind:obj="val" />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
    name: "generalMessageObj",
    props: ["obj"],
    methods: {
        justshow: function (obj) {
            // console.log(obj + " is " + !(obj instanceof Object));
            return !(obj instanceof Object);
        },
    },
});
</script>
