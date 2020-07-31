<template>
    <div class="column">
        <tabselect v-bind:tabs="tabs" v-bind:select="(s) => (activetab = s)" />
        <div v-show="activetab === 'Hardware'" class="pannel">
            <tabselect
                v-bind:tabs="status.tabs"
                v-bind:select="(s) => (status.activetab = s)"
            />
            <div v-for="tab in status.tabs" v-bind:key="tab">
                <keep-alive>
                    <hardware
                        v-show="tab === status.activetab"
                        v-bind:title="tab"
                        v-bind:status="status[tab]"
                        v-bind:callback="(s) => (status[tab] = s)"
                        v-on:add-recent="(s) => status[tab].recent.push(s)"
                        v-on:delete-recent="
                            (s) => status[tab].recent.splice(s, 1)
                        "
                        v-on:set-recent="
                            (pos, val) => Vue.set(status[tab].recent, pos, val)
                        "
                        v-on:set="(s) => (status[tab].percentage = s)"
                        v-bind:class="['pannel', tab]"
                    />
                </keep-alive>
            </div>
            <!-- <div>{{ JSON.stringify(status) }}</div> -->
        </div>
        <div v-show="activetab === 'Tasks'" class="pannel">
            <div class="tool-column">
                <div class="tool-column card">
                    <div>Preparing</div>
                    <div class="tool-row">
                        <div>Downloading</div>
                        <input v-model.number="tasks.preparing.downloading" />
                        <div
                            v-on:click="tasks.preparing.downloading++"
                            class="tool-button"
                        >
                            +1
                        </div>
                        <div
                            v-on:click="tasks.preparing.downloading--"
                            class="tool-button"
                        >
                            -1
                        </div>
                    </div>
                    <div class="tool-row">
                        <div>ReadingCache</div>
                        <input v-model.number="tasks.preparing.readingCache" />
                        <div
                            v-on:click="tasks.preparing.readingCache++"
                            class="tool-button"
                        >
                            +1
                        </div>
                        <div
                            v-on:click="tasks.preparing.readingCache--"
                            class="tool-button"
                        >
                            -1
                        </div>
                    </div>
                </div>
                <div class="tool-row">
                    <div>Pending</div>
                    <input v-model.number="tasks.pending" />
                    <div v-on:click="tasks.pending++" class="tool-button">
                        +1
                    </div>
                    <div v-on:click="tasks.pending--" class="tool-button">
                        -1
                    </div>
                </div>
                <div class="tool-row">
                    <div>Running</div>
                    <input v-model.number="tasks.running" />
                    <div v-on:click="tasks.running++" class="tool-button">
                        +1
                    </div>
                    <div v-on:click="tasks.running--" class="tool-button">
                        -1
                    </div>
                </div>
                <div class="tool-row">
                    <div>Finished</div>
                    <input v-model.number="tasks.finished" />
                    <div v-on:click="tasks.finished++" class="tool-button">
                        +1
                    </div>
                    <div v-on:click="tasks.finished--" class="tool-button">
                        -1
                    </div>
                </div>
                <div class="tool-row">
                    <div>Total</div>
                    <input v-model.number="tasks.total" />
                    <div
                        v-on:click="tasks.total = totalTask"
                        class="tool-button"
                    >
                        Sum
                    </div>
                    <div v-on:click="tasks.total++" class="tool-button">
                        +1
                    </div>
                    <div v-on:click="tasks.total--" class="tool-button">
                        -1
                    </div>
                </div>
            </div>
        </div>
        <div v-show="activetab === 'Interval'" class="pannel">
            <div class="tool-column">
                <div class="tool-row card">
                    <div>Time</div>
                    <input v-model.number="time.time" />
                    <div v-on:click="time.time += 60" class="tool-button">
                        +60
                    </div>
                    <div v-on:click="time.time++" class="tool-button">
                        +1
                    </div>
                    <div
                        v-on:click="time.time = Math.floor(Date.now() / 1000)"
                        class="tool-button"
                    >
                        Now
                    </div>
                    <div v-on:click="time.time--" class="tool-button">
                        -1
                    </div>
                    <div v-on:click="time.time -= 60" class="tool-button">
                        -60
                    </div>
                </div>
                <div class="tool-row card">
                    <div>NextReportTime</div>
                    <input v-model.number="time.nextReportTime" />
                    <div
                        v-on:click="time.nextReportTime += 60"
                        class="tool-button"
                    >
                        +60
                    </div>
                    <div v-on:click="time.nextReportTime++" class="tool-button">
                        +1
                    </div>
                    <div
                        v-on:click="
                            time.nextReportTime = Math.floor(Date.now() / 1000)
                        "
                        class="tool-button"
                    >
                        Now
                    </div>
                    <div v-on:click="time.nextReportTime--" class="tool-button">
                        -1
                    </div>
                    <div
                        v-on:click="time.nextReportTime -= 60"
                        class="tool-button"
                    >
                        -60
                    </div>
                </div>
            </div>
        </div>
        <div v-on:click="update" class="save-btn tool-button">Save</div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import tabselect from "../../tabselect.vue";
import hardware from "./hardware.vue";
export default Vue.extend({
    name: "editStatusReportMessage",
    data: function () {
        return {
            status: {
                activetab: "cpu",
                tabs: ["cpu", "memory"],
                cpu: {
                    percentage: 0,
                    recent: [],
                },
                memory: {
                    percentage: 0,
                    recent: [],
                },
            },
            tasks: {
                preparing: {
                    downloading: 0,
                    readingCache: 0,
                },
                pending: 0,
                running: 0,
                finished: 0,
                total: 0,
            },
            time: {
                time: 0,
                nextReportTime: 0,
            },
            tabs: ["Hardware", "Tasks", "Interval"],
            activetab: "Hardware",
        };
    },
    methods: {
        update: function () {
            this.$emit("update", this.body);
        },
    },
    computed: {
        totalTask: function () {
            return (
                this.tasks.preparing.downloading +
                this.tasks.preparing.readingCache +
                this.tasks.pending +
                this.tasks.running +
                this.tasks.finished
            );
        },
        body: function () {
            return {
                time: this.time.time,
                nextReportTime: this.time.nextReportTime,
                hardware: {
                    cpu: this.status.cpu,
                    memory: this.status.memory,
                },
                task: this.tasks,
            };
        },
    },
    components: {
        tabselect,
        hardware,
    },
});
</script>
