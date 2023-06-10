<template>
    <div class="body">
        <div class="newtask">
            <h3 class="header__text">New Task</h3>
            <MForm @onSubmit="onSubmit" nameButton="Add"></MForm>
        </div>
        <div class="todolist">
            <div class="content">
                <h3 class="header__text">To do list</h3>
                <MTextfield placeHoder="Search..."></MTextfield>
                <div
                    class="todo__list"
                    v-for="todoItem in todo"
                    :key="todoItem.id"
                >
                    <div class="todo__item">
                        <div class="todo__item--checkbox">
                            <input type="checkbox" />
                            <h5>{{ todoItem.title }}</h5>
                        </div>
                        <div class="todo__item--action">
                            <button
                                class="btn action--detail"
                                @click="showDetailTodo(todoItem.id)"
                            >
                                Detail
                            </button>
                            <button
                                class="btn action--delete"
                                @click="onDelete(todoItem.id)"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                    <div class="todo__item--detail">
                        <MForm
                            @onSubmit="onSubmit"
                            nameButton="Update"
                            v-if="arrIdShow.indexOf(todoItem.id) != -1"
                            :todoItem="todoItem"
                            @update="getTodoList"
                        ></MForm>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {getToDo, addToDo, deleteToDo} from "@/js/services";
export default {
    name: "TheMain",
    data() {
        return {
            arrIdShow: [],
            showDetail: null,
            todo: [{}],
        };
    },
    methods: {
        /**
         * Thêm một công việc
         */
        async onSubmit(values) {
            console.log(values);
            await addToDo(values);
            this.getTodoList();
        },

        /**
         * Hiển thị công việc
         */
        async getTodoList() {
            const res = await getToDo();
            this.todo = res;
            console.log(this.todo);
        },

        /**
         * Xóa công việc lựa chọn
         */
        async onDelete(idItem) {
            await deleteToDo(idItem);
            this.getTodoList();
        },

        showDetailTodo(idItem) {
            if (this.arrIdShow.indexOf(idItem) != -1) {
                let index = this.arrIdShow.indexOf(idItem);
                this.arrIdShow.splice(index, index + 1);
                this.showDetail = null;
            } else {
                this.showDetail = idItem;
                this.arrIdShow.push(idItem);
            }
        },
    },
    created() {
        this.getTodoList();
    },
};
</script>

<style scoped>
@import url(./TheMain.css);
</style>
