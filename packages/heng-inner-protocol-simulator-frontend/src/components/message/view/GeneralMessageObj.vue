<template>
    <div>
        <div>
            <div
                v-for="(val, key) in obj"
                v-bind:key="key"
                class="message-pannel"
            >
                <div class="message-card no-break no-grow no-border">
                    <a>{{ key }}</a>
                </div>
                <div class="message-card no-grow no-border"><a>:</a></div>
                <div v-if="justshow(val)" class="grow">
                    <div class="row no-border no-margin">
                        <div class="message-card">
                            {{ JSON.stringify(val).substring(0, maxlength) }}
                        </div>
                        <div class="buttom" v-on:click="copy(val)">Copy</div>
                    </div>
                </div>
                <div v-else class="message-card">
                    <general-message-obj
                        v-bind:obj="val"
                        v-bind:maxlength="maxlength"
                    />
                    <div class="buttom" v-on:click="copy(val)">Copy</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
    name: "generalMessageObj",
    props: ["obj", "maxlength"],
    methods: {
        justshow: function (obj) {
            // console.log(obj + " is " + !(obj instanceof Object));
            return !(obj instanceof Object);
        },
        isarray: function (obj) {
            return obj instanceof Array;
        },
        copy: function (obj) {
            let str = JSON.stringify(obj);
            console.log("try copy: " + str);
            const inputarea = document.createElement("input");
            inputarea.setAttribute("readonly", "readonly");
            inputarea.setAttribute("value", str);
            document.body.appendChild(inputarea);
            // inputarea.setSelectionRange(0, inputarea.value.length);
            inputarea.select();
            if (document.execCommand("copy")) {
                document.execCommand("copy");
                alert("复制了");
            }
            document.body.removeChild(inputarea);
        },
    },
});
</script>
