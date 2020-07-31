<template>
    <div class="tool-pannel">
        <div>{{ title }}</div>
        <div class="tool-row no-break">
            <a>Current</a>
            <!-- <input v-model.number="status.percentage" /> -->
            <input
                :value="status.percentage"
                v-on:input="$emit('set', $event.target.value)"
            />
            <div
                v-for="val in [10, 20, 30, 50, 100, 120]"
                v-bind:key="val"
                v-on:click="$emit('set', val)"
                class="tool-button"
            >
                {{ val }}
            </div>
        </div>
        <div class="tool-row no-break">
            <a>Time</a>
            <input v-model.number="nexttime" />
            <div
                v-for="val in [1, 3, 5, 10]"
                v-bind:key="'time' + val"
                v-on:click="nexttime = val"
                class="tool-button"
            >
                {{ val }}
            </div>
            <a>Value</a>
            <input v-model.number="nextval" />
            <div
                v-for="val in [10, 20, 30, 50, 100, 120]"
                v-bind:key="'val' + val"
                v-on:click="nextval = val"
                class="tool-button"
            >
                {{ val }}
            </div>
            <div
                v-on:click="
                    $emit('add-recent', { time: nexttime, val: nextval })
                "
                class="tool-button"
            >
                Add
            </div>
        </div>
        <div
            v-for="(item, index) in status.recent"
            v-bind:key="index"
            class="tool-row no-break"
        >
            <a>Time</a>
            <input v-model.number="item.time" />
            <a>Value</a>
            <input v-model.number="item.val" />
            <div
                v-for="val in [10, 20, 30, 50, 100, 120]"
                v-bind:key="val"
                v-on:click="item.val = val"
                class="tool-button"
            >
                {{ val }}
            </div>
            <div v-on:click="$emit('delete-recent', index)" class="tool-button">
                Remove
            </div>
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
