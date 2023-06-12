<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>ADD JADWAL UMUM</h4>
                        <hr />
                        <form @submit.prevent="store">
                            <div class="form-group mb-3">
                                <label for="content" class="form-label">ID JADWAL UMUM</label>
                                <input type="numeric" class="form-control" v-model="classonrunning.ID_CLASS_ON_RUNNING" />
                                <!-- validation -->
                                <div v-if="validation.ID_CLASS_ON_RUNNING" class="mt-2 alert alert-danger">
                                    {{ validation.ID_CLASS_ON_RUNNING[0] }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Instructor</label>
                                <select name="ID_INSTRUCTOR" id="ID_INSTRUCTOR" class="form-select"
                                    v-model="classonrunning.ID_INSTRUCTOR">
                                    <option value="Pilih..." disabled selected>Pilih...</option>
                                    <option v-for="(item, ID_INSTRUCTOR) in instructor.value" :key="ID_INSTRUCTOR" v-bind:value="item.ID_INSTRUCTOR">{{
                                        item.FULL_NAME
                                    }}</option>
                                </select>
                                <!-- validation -->
                                <div v-if="validation.ID_INSTRUCTOR" class="mt-2 alert alert-danger">
                                    {{ validation.ID_INSTRUCTOR[0] }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Class</label>
                                <select name="ID_CLASS" id="ID_CLASS" class="form-select"
                                    v-model="classonrunning.ID_CLASS">
                                    <option value="Pilih..." disabled selected>Pilih...</option>
                                    <option v-for="(item, ID_CLASS) in class_detail.value" :key="ID_CLASS" v-bind:value="item.ID_CLASS">{{
                                            item.CLASS_NAME
                                    }}</option>
                                </select>
                                <!-- validation -->
                                <div v-if="validation.ID_CLASS" class="mt-2 alert alert-danger">
                                    {{ validation.ID_CLASS[0] }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Date</label>
                                <input type="date" class="form-control" v-model="classonrunning.DATE" />
                                <!-- validation -->
                                <div v-if="validation.DATE" class="mt-2 alert alert-danger">
                                    {{ validation.DATE[0] }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Start Class</label>
                                <input type="time" class="form-control" v-model="classonrunning.START_CLASS" />
                                <!-- validation -->
                                <div v-if="validation.START_CLASS" class="mt-2 alert alert-danger">
                                    {{ validation.START_CLASS[0] }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="content" class="form-label">End Class</label>
                                <input type="time" class="form-control" v-model="classonrunning.END_CLASS" />
                                <!-- validation -->
                                <div v-if="validation.END_CLASS" class="mt-2 alert alert-danger">
                                    {{ validation.END_CLASS[0] }}
                                </div>
                            </div>
                            <button type="submit" class="btn btn-primary">SIMPAN</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

export default {
    setup() {
        //state jadwal umum
        const classonrunning = reactive({
            ID_CLASS_ON_RUNNING: '',
            ID_INSTRUCTOR: '',
            ID_CLASS: '',
            DATE: '',
            START_CLASS: '',
            END_CLASS: '',
            CLASS_CAPACITY: ''
        })
        const instructor = reactive([])

        const class_detail = reactive([])
        //state validation
        const validation = ref([])
        //vue router
        const router = useRouter()

        onMounted(() => {
            //get API from Laravel Backend
            axios
            .get("http://localhost:8000/api/instructor")
                .then((response) => {
                    //assign state posts with response data
                    instructor.value = response.data.data;
                    console.log(instructor.value.data)
                })
                .catch((error) => {
                    console.log(error.response.data);
                });

            axios
                .get("http://localhost:8000/api/class_detail")
                .then((response) => {
                    //assign state posts with response data
                    class_detail.value = response.data.data;
                    console.log(class_detail.value.data)
                })
                .catch((error) => {
                    console.log(error.response.data);
                });
        });

        //method store
        function store() {
            let ID_CLASS_ON_RUNNING = classonrunning.ID_CLASS_ON_RUNNING
            let ID_INSTRUCTOR = classonrunning.ID_INSTRUCTOR
            let ID_CLASS = classonrunning.ID_CLASS
            let DATE = classonrunning.DATE
            let START_CLASS = classonrunning.START_CLASS
            let END_CLASS = classonrunning.END_CLASS
            let CLASS_CAPACITY = classonrunning.CLASS_CAPACITY

            axios.post(`http://localhost:8000/api/class_on_running`, {
                ID_CLASS_ON_RUNNING: ID_CLASS_ON_RUNNING,
                ID_INSTRUCTOR: ID_INSTRUCTOR,
                ID_CLASS: ID_CLASS,
                DATE: DATE,
                START_CLASS: START_CLASS,
                END_CLASS: END_CLASS,
                CLASS_CAPACITY: CLASS_CAPACITY
            }).then(() => {
                //redirect ke post index
                router.push({
                    name: 'classonrunning.index'
                })
            }).catch(error => {
                //assign state validation with error
                validation.value = error.response.data
            })
        }
        //return
        return {
            classonrunning,
            instructor,
            class_detail,
            validation,
            router,
            store
        }
    }
}
</script>

<style></style>