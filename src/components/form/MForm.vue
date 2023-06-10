<template>
    <Form class="form" :validation-schema="schema" @submit="onSubmit">
        <div class="form__controller">
            <label for="add" class="label__textfield">Add new task</label>
            <div>
                <Field name="title" v-model="todo.title" v-slot="{field}">
                    <input
                        id="add"
                        class="input-textarea"
                        v-bind="field"
                        :value="todo.title"
                    />
                </Field>
                <ErrorMessage name="title" class="text-help" />
            </div>
        </div>
        <div class="form__controller">
            <label for="description" class="label__textfield"
                >Description</label
            >
            <div>
                <Field
                    name="description"
                    v-model="todo.description"
                    v-slot="{field}"
                >
                    <textarea
                        id="description"
                        class="input-textarea"
                        v-bind="field"
                        :value="todo.description"
                    ></textarea>
                </Field>
                <ErrorMessage name="description" class="text-help" />
            </div>
        </div>
        <div class="wraper">
            <div class="form__controller">
                <label for="duodate" class="label__textfield">Duo Date</label>
                <div>
                    <input
                        id="duodate"
                        class="input-textarea"
                        v-model="todo.date"
                        type="date"
                    />
                </div>
            </div>
            <div class="form__controller">
                <label for="select" class="label__textfield">Piority</label>
                <select
                    name="piority"
                    id="piority"
                    class="input-textarea"
                    v-model="todo.piority"
                    :value="todo.piority"
                >
                    <option value="High">High</option>
                    <option value="Normal">Normal</option>
                    <option value="Low">Low</option>
                </select>
            </div>
        </div>
        <div class="submit__form">
            <button class="btn button__submit">{{ nameButton }}</button>
        </div>
    </Form>
</template>

<script>
import * as yup from "yup";
import {Form, Field, ErrorMessage} from "vee-validate";
import {updateToDo} from "@/js/services";
export default {
    name: "MForm",
    data() {
        return {
            todo: {
                date: "2023-06-14",
                piority: "Normal",
            },
        };
    },
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    props: {
        nameButton: {
            type: String,
            default: "Add",
        },
        todoItem: {
            type: Object,
        },
    },
    computed: {
        schema() {
            return yup.object({
                title: yup.string().required("Nội dung không được để trống"),
                description: yup.string().required("Mô tả không được để trống"),
            });
        },
    },
    methods: {
        async onSubmit(values) {
            values.date = this.todo.date;
            values.piority = this.todo.piority;
            if (this.nameButton == "Add") {
                this.$emit("onSubmit", values);
            } else {
                console.log(this.todo.id, values);
                await updateToDo(this.todo.id, values);
                this.$emit("update");
            }
        },
    },
    mounted() {
        if (this.todoItem != null) {
            let jsonObject = JSON.stringify(this.todoItem);
            this.todo = JSON.parse(jsonObject);
        }
    },
};
</script>

<style scoped>
@import url(./MForm.css);
.text-help {
    position: absolute;
    bottom: -20px;
    left: 0;
    font-size: 14px;
    color: var(--color-red-500);
}
</style>
