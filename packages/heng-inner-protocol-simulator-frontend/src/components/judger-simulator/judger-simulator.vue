<template>
    <div>
        <h1>评测端模拟</h1>
        <!-- <button
            v-for="tab in tabs"
            v-bind:key="tab"
            v-bind:class="['tab-button', { active: activetab === tab }]"
            v-on:click="activetab = tab"
        >{{ tab }}</button>-->
        <tabselect v-bind:tabs="tabs" v-bind:select="(s) => (activetab = s)" />
        <div v-if="activetab === 'message'" class="tab">
            <p>TODO</p>
        </div>
        <div v-else-if="activetab === 'server'" class="tab">
            <p>服务器连接面板</p>
            <p>
                <a>服务器</a>
                <input v-model.trim="server" placeholder="0.0.0.0" />
            </p>
            <p>
                <a>端口</a>
                <input v-model.number="port" placeholder="8080" />
            </p>
            <button v-on:click="connect">连接</button>
            <button v-on:click="connection.close()">断开</button>
        </div>
        <div v-else-if="activetab === 'setstatus'" class="tab">
            <tabselect
                v-bind:tabs="status.tabs"
                v-bind:select="(s) => (status.activetab = s)"
            />
            <div v-for="tab in status.tabs" v-bind:key="tab">
                <keep-alive>
                    <hardware
                        v-if="tab === status.activetab"
                        v-bind:title="tab"
                        v-bind:status="status[tab]"
                        v-bind:callback="(s) => (status[tab] = s)"
                        v-bind:class="['tab', tab]"
                    />
                </keep-alive>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import Vue from "vue";
import hardware from "./hardware.vue";
import tabselect from "../tabselect.vue";
export default Vue.extend({
    name: "judgersimulator",
    data: function () {
        return {
            connection: null,
            connected: false,
            activetab: "server",
            tabs: ["server", "message", "setstatus"],
            server: "0.0.0.0",
            port: 8080,
            serverpublickey: "",
            judgerprivatekey: "",
            judgerkeynumber: "",
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
        };
    },
    methods: {
        connect: function () {
            let url = "ws://" + this.server + ":" + this.port;
            console.log("connecting to " + url);
            this.connection = new WebSocket(url);
            this.connection.onopen = function () {
                alert("connected");
            };
            this.connection.onerror = function (e) {
                alert("Error: " + JSON.stringify(e));
            };
        },
    },
    components: {
        hardware,
        tabselect,
    },
});
</script>

<style scoped></style>
