<script setup>
import { onMounted } from 'vue';
import useDivisions from '@/composables/divisions';

const { division, getDivision, updateDivision, errors } = useDivisions();

const props = defineProps({
    id: {
        required: true,
        type: String,
    },
    division: {
        required: true,
        type: Object,
    },
});

onMounted(() => {
    getDivision(props.id);
});

</script>

<template>
    <div class="modal fade" :id="'updateDivision' + id" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog">
            <div class="modal-content bg-gradient-warning">
                <div class="modal-header">
                    <h4 class="modal-title"><b>Edit Division</b></h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>

                <div class="modal-body">
                    <div class="input-group mb-3">
                        <input type="text" :id="'name' + id" v-model="division.name" class="form-control"
                            placeholder="Enter Division Name" />
                        <div class="input-group-append">
                            <div class="input-group-text">
                                <span class="fas fa-archive"></span>
                            </div>
                        </div>
                    </div>

                    <div class="input-group mb-3">
                        <input type="text" :id="'code' + id" v-model="division.code" class="form-control"
                            placeholder="Enter Division Code" />
                        <div class="input-group-append">
                            <div class="input-group-text">
                                <span class="fas fa-keyboard"></span>
                            </div>
                        </div>
                    </div>

                    <div class="input-group mb-3">
                        <input type="text" :id="'head' + id" v-model="division.head" class="form-control"
                            placeholder="Enter Division Head" />
                        <div class="input-group-append">
                            <div class="input-group-text">
                                <span class="fas fa-user-tie"></span>
                            </div>
                        </div>
                    </div>

                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text"><i class="fas fa-briefcase"></i></span>
                        </div>
                        <textarea :id="'duty' + id" v-model="division.duty" class="form-control"
                            placeholder="Enter Duty"></textarea>
                    </div>

                    <div class="modal-footer justify-content-between">
                        <button type="button" class="btn btn-outline-dark" :id="'modalremove' + id" data-dismiss="modal"><b>Close</b></button>
                        <button @click.prevent="updateDivision(id)" class="btn btn-outline-dark"><b>Update</b></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>