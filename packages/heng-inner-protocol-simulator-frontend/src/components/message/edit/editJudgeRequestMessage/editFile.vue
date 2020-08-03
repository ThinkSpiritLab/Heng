<template>
    <div class="card tool-column">
        <div class="tool-row">
            <div class="no-break no-grow">id</div>
            <input
                :value="file.id"
                v-on:input="
                    update(Object.assign({ id: $event.target.value }, file))
                "
            />
        </div>
        <div class="tool-row">
            <div class="no-break no-grow">hashsum</div>
            <div class="tool-button" v-on:click="switchFileHashSum">切换</div>
            <input
                v-if="file.hashsum !== undefined"
                :value="file.hashsum"
                v-on:input="
                    update(
                        Object.assign({ hashsum: $event.target.value }, file)
                    )
                "
            />
        </div>
        <div class="tool-button" v-on:click="switchFileType">切换</div>
        <div v-if="hasContent" class="tool-row">
            <div class="no-break no-grow">content</div>
            <input
                :value="file.content"
                v-on:input="
                    update(
                        Object.assign({ content: $event.target.value }, file)
                    )
                "
            />
        </div>
        <div v-if="!hasContent" class="tool-row">
            <div class="no-break no-grow">url</div>
            <input
                :value="file.url"
                v-on:input="
                    update(Object.assign({ url: $event.target.value }, file))
                "
            />
        </div>
        <div v-if="!hasContent" class="tool-row">
            <div class="tool-button" v-on:click="switchFileAuthorization">
                切换
            </div>
            <div class="no-break no-grow">authorization</div>
            <input
                v-if="file.authorization !== undefined"
                :value="file.authorization"
                v-on:input="
                    update(
                        Object.assign(
                            { authorization: $event.target.value },
                            file
                        )
                    )
                "
            />
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
    name: "fileEdit",
    props: ["file"],
    data: function () {
        return {
            // hasContent: false,
        };
    },
    methods: {
        update: function (file) {
            // this.$emit("update", Object.assign(file, this.file));
            this.$emit("update", file);
        },
        getFileClone: function () {
            return JSON.parse(JSON.stringify(this.file));
        },
        switchFileType: function () {
            let fileClone = this.getFileClone();
            if (fileClone.content !== undefined) {
                delete fileClone.content;
                // fileClone["url"] = "";
                // fileClone["authorization"] = "";
                Object.assign(fileClone, {
                    url: "",
                    authorization: "",
                });
            } else {
                delete fileClone.url;
                delete fileClone.authorization;
                // fileClone["content"] = "";
                Object.assign(fileClone, { content: "" });
            }
            this.update(fileClone);
        },
        switchFileAuthorization: function () {
            let fileClone = this.getFileClone();
            if (fileClone.url !== undefined) {
                if (fileClone.authorization !== undefined) {
                    delete fileClone.authorization;
                } else {
                    fileClone["authorization"] = "";
                }
            } else {
                alert("Can't switch authorization in content mode");
            }
            this.update(fileClone);
        },
        switchFileHashSum: function () {
            let fileClone = this.getFileClone();
            if (fileClone.hashsum !== undefined) {
                delete fileClone.hashsum;
            } else {
                Object.assign(fileClone, { hashsum: "" });
            }
            this.update(fileClone);
        },
    },
    computed: {
        hasContent: function () {
            return this.file.content !== undefined;
        },
    },
});
</script>
