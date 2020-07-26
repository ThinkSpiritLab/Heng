<template>
    <div>
        <h1>评测端模拟</h1>
        <button
            v-for="tab in tabs"
            v-bind:key="tab"
            v-bind:class="['tab-button', { active: activetab === tab }]"
            v-on:click="activetab = tab"
        >{{ tab }}</button>
        <div v-if="activetab==='message'" class="tab">
            <p>TODO</p>
        </div>
        <div v-else-if="activetab==='server'" class="tab">
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
        </div>
        <div v-else-if="activetab==='setstatus'" class="tab">
            <p>TODO</p>
        </div>
    </div>
</template>
<script lang="ts">
import Vue from "vue";
// import WebSocket from "ws";
export default Vue.extend({
    name: "judgersimulator",
    data: function () //:
    // {
    //     connection: WebSocket | null;
    //     connected: boolean;
    //     server: string;
    //     port: number;
    // }
    {
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
});
</script>

<style scoped>
.tab-button {
    padding: 6px 10px;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    border: 1px solid #ccc;
    cursor: pointer;
    background: #f0f0f0;
    margin-bottom: -1px;
    margin-right: -1px;
}
.tab-button:hover {
    background: #e0e0e0;
}
.tab-button.active {
    background: #e0e0e0;
}
.tab {
    border: 1px solid #ccc;
    padding: 10px;
}
</style>