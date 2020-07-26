<template>
    <div>
        <p>{{title}}</p>
        <p>
            <a>Current</a>
            <input v-model.number="status.percentage" />
        </p>
        <div>
            <p>
                <a>Time</a>
                <input v-model.number="nexttime" />
                <a>Value</a>
                <input v-model.number="nextval" />
                <button v-on:click="status.recent.push({time:nexttime,val:nextval})">Add</button>
            </p>
        </div>
        <div v-for="item in status.recent" v-bind:key="item">
            <p>
                <a>Time</a>
                <input v-model.number="item.time" />
                <a>Value</a>
                <input v-model.number="item.val" />
                <button v-on:click="status.recent.splice(status.recent.indexOf(item),1)">Remove</button>
            </p>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
    name: "hardware",
    props: {
        title: String,
        status: Object,
    },
    data: function () {
        return {
            nexttime: 0,
            nextval: 0,
        };
    },
});
</script>