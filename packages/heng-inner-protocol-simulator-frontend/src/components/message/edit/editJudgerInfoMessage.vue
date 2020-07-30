<template>
    <div class="column">
        <div class="row tool-row">
            <div class="no-grow">timestamp</div>
            <input v-model.number="timestamp" />
            <div
                class="tool-button"
                v-on:click="timestamp = Math.floor(Date.now() / 1000)"
            >
                使用当前时间
            </div>
        </div>
        <div class="row tool-row">
            <div class="no-grow">maxTaskCount</div>
            <input v-model.number="maxTaskCount" />
        </div>
        <div class="row tool-row">
            <div class="no-grow">name</div>
            <div
                class="tool-button"
                v-on:click="name = name == undefined ? '' : undefined"
            >
                {{ name == undefined ? "启用" : "弃用" }}
            </div>
            <input v-if="name != undefined" v-model.trim="name" />
        </div>
        <div class="row tool-row">
            <div class="no-grow">software</div>
            <div
                class="tool-button"
                v-on:click="software = software == undefined ? '' : undefined"
            >
                {{ software == undefined ? "启用" : "弃用" }}
            </div>
            <input v-if="software != undefined" v-model.trim="software" />
        </div>
        <div class="row tool-row">
            <div class="no-grow">ackey</div>
            <input v-model.trim="ackey" />
        </div>
        <div class="row tool-row">
            <div class="no-grow">signature</div>
            <input v-model.trim="signature" />
            <div v-on:click="Clicksign" class="tool-button">Sign</div>
        </div>
        <div class="row tool-row">
            <div class="no-grow">secrectKey</div>
            <input v-model.trim="secrectKey" />
        </div>
        <div v-on:click="update" class="save-btn tool-button">Save</div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import CryptoJS from "crypto-js";
export default Vue.extend({
    name: "editJudgerInfoMessage",
    data: function () {
        return {
            timestamp: 0,
            maxTaskCount: 12,
            name: "JudgerSimuliater42",
            software: "JudgerSimuliater",
            ackey: "e170ef7d7cf46092d0",
            signature: "",
            secrectKey: "e170ef7d7cf46092d0",
        };
    },
    methods: {
        update: function () {
            this.$emit("update", this.body);
        },
        sign: function (str, skey) {
            let sha256 = CryptoJS.algo.SHA256.create();
            console.log("str:" + str);
            // return SHA256.create().update(str).update(skey);
            sha256.update(str);
            sha256.update(skey);
            return String(sha256.finalize());
            // return sha256.update(str).update(skey).digest("hex");
            // return sha256(str, skey);
        },
        Clicksign: function () {
            this.signature = "7def6260-cf55-11ea-87d0-0242ac130003";
            let jsonStr = JSON.stringify(this.body);
            this.signature = this.sign(jsonStr, this.secrectKey);
        },
    },
    computed: {
        body: function () {
            return {
                timestamp: this.timestamp,
                maxTaskCount: this.maxTaskCount,
                name: this.name,
                software: this.software,
                ackey: this.ackey,
                signature: this.signature,
            };
        },
    },
});
</script>
