<template>
    <div :class="classFormTextfield" class="input__detail">
        <div v-if="label" style="margin-bottom: 8px">
            <label :for="idLabel" class="label__textfield" :title="title">
                {{ label }}
            </label>
        </div>
        <!-- <Field
            :name="name"
            v-slot="{field}"
            @input="$emit('update:modelValue', $event.target.value)"
            :type="type"
            :value="bindingValue"
        > -->
        <input
            :style="{minWidth: minWidth}"
            class="textfield__input"
            :placeholder="placeHoder"
            :id="idLabel"
            :type="type"
            ref="MInput"
            v-bind="field"
            :class="classInput"
        />
        <!-- </Field> -->
        <!-- <ErrorMessage :name="name" class="text-help" /> -->
    </div>
</template>

<script>
export default {
    name: "MTextfield",
    components: {
        // Field,
        // ErrorMessage,
    },
    props: {
        label: {
            type: String,
            default: "",
        },
        title: {
            type: String,
            default: "",
        },
        idLabel: {
            type: String,
            default: "",
        },
        type: {
            type: String,
            default: "text",
        },
        classInput: {
            type: String,
            default: "",
        },
        iconClass: {
            type: String,
            default: "",
        },
        classFormTextfield: {
            type: String,
            default: "",
        },
        placeHoder: {
            type: String,
            default: "",
        },
        minWidth: {
            type: String,
            default: "0px",
        },
        // checkBorder: {
        //     type: Boolean,
        //     default: false,
        // },
    },
    methods: {},
};
</script>

<style scoped>
@import url(./MTextfield.css);
.input__detail {
    position: relative;
    margin-bottom: 24px;
}
/* .text-help {
    position: absolute;
    bottom: -20px;
    left: 0;
    font-size: 14px;
    color: var(--color-red-500);
} */

/* .border--error {
    color: var(--color-red-500);
} */
</style>
