<template>
    <div class="body">
        <div class="newtask" :class="{'class-block': showNewTask}">
            <div class="icon-right" @click="showTodo"></div>
            <h3 class="header__text">New Task</h3>
            <MForm @onSubmit="onSubmit" nameButton="Add"></MForm>
        </div>
        <div class="todolist" :class="{'class-none': showNewTask}">
            <div class="todolist__content">
                <button class="btn add__newtask" @click="showTask">
                    New Task
                </button>
                <h3 class="header__text">To do list</h3>
                <input
                    class="input__textarea input__search"
                    placeholder="Search..."
                    v-model="textSearch"
                    @input="getSearchTodo"
                />
                <div
                    class="todo__list"
                    v-for="todoItem in todo"
                    :key="todoItem.id"
                >
                    <div class="todo__item">
                        <div class="todo__item--checkbox">
                            <input
                                type="checkbox"
                                @click="showFooter(todoItem.id)"
                            />
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
            <div class="footer" v-if="showFooterAction">
                <h4 class="footer__text">Bulk action:</h4>
                <div class="footer__action">
                    <button class="btn action--done">Done</button>
                    <button
                        class="btn action--remove action--delete"
                        @click="removeSelected"
                    >
                        Remove
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {getToDo, addToDo, deleteToDo, deleteSelectedToDo} from "@/js/services";
export default {
    name: "TheMain",
    data() {
        return {
            arrIdShow: [],
            showDetail: null,
            todo: [{}],
            showFooterAction: false,
            selectedDelete: [],
            textSearch: "",
            showNewTask: false,
        };
    },
    methods: {
        /**
         * Thêm một công việc
         */
        async onSubmit(values) {
            await addToDo(values);
            this.getTodoList();
        },

        /**
         * Hiển thị công việc
         */
        async getTodoList() {
            const res = await getToDo();
            this.todo = res;
        },

        /**
         * Xóa công việc lựa chọn
         */
        async onDelete(idItem) {
            await deleteToDo(idItem);
            this.getTodoList();
        },

        /**
         * Hiển thị chi tiết công việc
         */
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

        /**
         * Hiện thanh chỉnh sửa phía dưới
         */
        showFooter(idItem) {
            //Kiểm tra nếu chọn input từ 1 trở lên thì sẽ luôn hiện và khi không chọn gì sẽ mất
            if (this.selectedDelete.length > 1) {
                this.showFooterAction = true;
            } else if (this.selectedDelete.length == 1) {
                if (this.selectedDelete[0] == idItem) {
                    this.showFooterAction = false;
                } else {
                    this.showFooterAction = true;
                }
            } else {
                this.showFooterAction = this.showFooterAction ? false : true;
            }

            //Kiểm tra xem nếu phần tử đó có rồi thì xóa đi mà chưa có thì thêm vào
            if (this.selectedDelete.indexOf(idItem) != -1) {
                let index = this.selectedDelete.indexOf(idItem);
                this.selectedDelete.splice(index, index + 1);
            } else {
                this.selectedDelete.push(idItem);
            }
        },

        /**
         * Xóa tất cả những công việc đã chọn
         */
        async removeSelected() {
            await deleteSelectedToDo(this.selectedDelete);
            this.showFooterAction = true;
            this.getTodoList();
        },

        /**
         * Hiển thị công viẹc theo tìm kiếm
         */
        async getSearchTodo() {
            const res = await getToDo();
            this.todo = res.filter(
                (obj) => obj.title.indexOf(this.textSearch) != -1
            );
        },
        showTask() {
            this.showNewTask = !this.showNewTask;
        },
        showTodo() {
            this.showNewTask = !this.showNewTask;
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
