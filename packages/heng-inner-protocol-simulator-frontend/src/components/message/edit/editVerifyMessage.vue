<template>
    <div>
        <a>Step</a>
        <tabselect
            v-bind:tabs="Object.keys(verifyPayload)"
            v-bind:select="(s) => (curmod = s)"
        ></tabselect>
        <div
            v-for="mod in Object.keys(verifyPayload)"
            v-bind:key="mod"
            v-show="mod === curmod"
        >
            <div v-for="(val, index) in verifyPayload[mod]" v-bind:key="index">
                <a>{{ index }}</a>
                <input v-model.trim="verifyPayload[mod][index]" />
            </div>
        </div>
        <button v-on:click="update">Save</button>
        <p>Tool</p>
        <div class="tool-pannel">
            <div class="tool-row">
                <p>public_key</p>
                <textarea class="edit-key" v-model.trim="public_key" />
                <p>private_key</p>
                <textarea class="edit-key" v-model.trim="private_key" />
            </div>
            <div class="tool-row">
                <p>Plaintext</p>
                <textarea class="edit-key" v-model.trim="cleartext" />
                <p>Ciphertext</p>
                <textarea class="edit-key" v-model.trim="encrypted" />
            </div>
            <div class="tool-row">
                <p>
                    <button v-on:click="clickencrypt">
                        Encrypt</button
                    ><button v-on:click="clickdecrypt">
                        Decrypt</button
                    ><button v-on:click="clickgenerate">
                        generate
                    </button>
                </p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import tabselect from "../../tabselect.vue";
export default Vue.extend({
    name: "editVerifyMessage",
    data: function () {
        return {
            verifyPayload: {
                1: {
                    keyNumber: 0,
                    encrypedRandNumber1: "",
                },
                2: {
                    decryptedRandNumber1: "",
                    encrypedRandNumber2: "",
                },
                3: {
                    decryptedRandNumber2: "",
                },
                4: {
                    judgerID: "",
                    connectionToken: "",
                },
            },
            public_key: "pem",
            private_key: "crt",
            cleartext: "ctxt",
            encrypted: "etxt",
            curmod: 1,
        };
    },
    computed: {},
    methods: {
        update: function () {
            this.$emit(
                "update",
                Object.assign(
                    { step: Number(this.curmod) },
                    this.verifyPayload[this.curmod]
                )
            );
        },
        str2ab: function (str) {
            let buf = new ArrayBuffer(str.length);
            let bufView = new Uint8Array(buf);
            for (let i = 0, strLen = str.length; i < strLen; i++) {
                bufView[i] = str.charCodeAt(i);
            }
            return buf;
        },
        ab2str: function (buf) {
            // return String.fromCharCode.apply(null, new Uint16Array(buf));
            return String.fromCharCode(...new Uint8Array(buf));
        },
        getpem: async function (pem) {
            // let pemHeader = "";
            // let pemFooter = "";
            let pemHeader = "-----BEGIN PRIVATE KEY-----";
            let pemFooter = "-----END PRIVATE KEY-----";
            let pemstr = pem.substring(
                pemHeader.length,
                pem.length - pemFooter.length
            );
            console.log(pem);
            console.log(pemstr);
            let pembinstr = window.atob(pemstr);
            console.log(pembinstr);
            let pembin = this.str2ab(pembinstr);
            console.log(pembin);
            return await window.crypto.subtle.importKey(
                "spki",
                pembin,
                {
                    name: "RSA-OAEP",
                    hash: "SHA-256",
                },
                true,
                ["encrypt"]
            );
        },
        getpriv: async function (pem) {
            const pemHeader = "-----BEGIN PRIVATE KEY-----";
            const pemFooter = "-----END PRIVATE KEY-----";
            const pemContents = pem.substring(
                pemHeader.length,
                pem.length - pemFooter.length
            );
            const binaryDerString = window.atob(pemContents);
            let binaryDer = this.str2ab(binaryDerString);
            return await window.crypto.subtle.importKey(
                "pkcs8",
                binaryDer,
                {
                    name: "RSA-OAEP",
                    hash: "SHA-256",
                },
                true,
                ["decrypt"]
            );
        },
        encrypt: async function (tar) {
            let chipval = await window.crypto.subtle.encrypt(
                { name: "RSA-OAEP" },
                await this.getpem(this.public_key),
                tar
            );
            let buf = new Uint8Array(chipval);
            let str = String.fromCharCode(...buf);
            str = window.btoa(str);
            let rev = new Uint8Array(this.str2ab(window.atob(str)));
            console.log("mathc?" + (rev === buf));
            console.log("encrypted:" + str);
            console.log("encryptedbuf:" + buf);
            console.log("encryptedrev:" + rev);
            return window.btoa(str);
        },
        decrypt: async function (tar) {
            let binary = this.str2ab(window.atob(tar));
            let decdata = await window.crypto.subtle.decrypt(
                { name: "RSA-OAEP" },
                await this.getpriv(this.private_key),
                binary
            );
            let str = this.ab2str(decdata);
            console.log(str);
            return str;
        },
        exportCryptoKey: async function (key) {
            const exported = await window.crypto.subtle.exportKey("pkcs8", key);
            const exportedAsString = this.ab2str(exported);
            const exportedAsBase64 = window.btoa(exportedAsString);
            const pemExported = `-----BEGIN PRIVATE KEY-----\n${exportedAsBase64}\n-----END PRIVATE KEY-----`;
            // this.private_key = pemExported;
            return pemExported;
        },
        exportPublicKey: async function (key) {
            const exported = await window.crypto.subtle.exportKey("spki", key);
            const exportedAsString = this.ab2str(exported);
            const exportedAsBase64 = window.btoa(exportedAsString);
            const pemExported = `-----BEGIN PUBLIC KEY-----\n${exportedAsBase64}\n-----END PUBLIC KEY-----`;
            // this.private_key = pemExported;
            return pemExported;
        },
        clickencrypt: async function () {
            let that = this;
            let coded = new TextEncoder().encode(this.cleartext);
            console.log("encrypt:" + coded);
            that.encrypted = await this.encrypt(coded);
        },
        clickdecrypt: async function () {
            let coded = window.atob(this.encrypted);
            console.log("decrypt:" + coded);
            this.cleartext = await this.decrypt(coded);
        },
        clickgenerate: async function () {
            let key = await window.crypto.subtle.generateKey(
                {
                    name: "RSA-OAEP",
                    modulusLength: 4096,
                    publicExponent: new Uint8Array([1, 0, 1]),
                    hash: "SHA-256",
                },
                true,
                ["encrypt", "decrypt"]
            );
            let priv_key = await this.exportCryptoKey(key.privateKey); //this.private_key =
            console.log(priv_key);
            this.private_key = priv_key;
            let pub_key = await this.exportPublicKey(key.publicKey);
            console.log(pub_key);
            this.public_key = pub_key;
            // console.log("TODO");
        },
    },
    components: { tabselect },
});
//window.crypto.subtle.encrypt({name:"RSA-OAEP"},, (new TextEncoder().encode("123")))
</script>

<style scoped>
.tool-pannel {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.tool-row {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
