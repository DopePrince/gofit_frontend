<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>EDIT STATUS JADWAL HARIAN</h4>
                        <hr />
                        <form @submit.prevent="update">
                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Status Kelas</label>
                                <select name="STATUS" id="STATUS" class="form-select" v-model="classonrunningdaily.STATUS">
                                    <option value="Pilih..." disabled selected>Pilih...</option>
                                    <option value="Normal">Normal</option>
                                    <option value="Libur">Libur</option>
                                </select>
                                <!-- validation -->
                                <div v-if="validation.STATUS" class="mt-2 alert alert-danger">
                                    {{ validation.STATUS[0] }}
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
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'

export default {
    setup() {
        // vue route
        const route = useRoute()
        //state member
        const classonrunningdaily = reactive({
            ID_CLASS_ON_RUNNING: '',
            DATE: '',
            DAY_NAME: '',
            STATUS: ''
        })
        const classonrunning = reactive([])
        //state validation
        const validation = ref([])
        //vue router
        const router = useRouter()

        onMounted(() => {
            axios.get(`http://localhost:8000/api/class_on_running_daily/${route.params.ID_CLASS_ON_RUNNING_DAILY}`)
                .then(response => {
                    classonrunningdaily.ID_CLASS_ON_RUNNING_DAILY = response.data.data.ID_CLASS_ON_RUNNING_DAILY
                    classonrunningdaily.ID_CLASS_ON_RUNNING = response.data.data.ID_CLASS_ON_RUNNING
                    classonrunningdaily.DATE = response.data.data.DATE
                    classonrunningdaily.DAY_NAME = response.data.data.DAY_NAME
                    classonrunningdaily.STATUS = response.data.data.STATUS
                })
                .catch(error => {
                    console.log(error.response.data)
                });

            axios.get(`http://localhost:8000/api/class_on_running/${route.params.ID_CLASS_ON_RUNNING}`)
                .then(response => {
                    classonrunning.ID_INSTRUCTOR = response.data.data.ID_INSTRUCTOR
                    classonrunning.ID_CLASS = response.data.data.ID_CLASS
                    classonrunning.DATE = response.data.data.DATE
                    classonrunning.START_CLASS = response.data.data.START_CLASS
                    classonrunning.END_CLASS = response.data.data.END_CLASS
                    classonrunning.CLASS_CAPACITY = response.data.data.CLASS_CAPACITY
                })
                .catch(error => {
                    console.log(error.response.data)
                });
        })

        function update() {
            let STATUS = classonrunningdaily.STATUS

            axios.put(`http://localhost:8000/api/class_on_running_daily/${route.params.ID_CLASS_ON_RUNNING_DAILY}`, {
                STATUS: STATUS,
            }).then((response) => {
                //redirect ke post index
                console.log(response.data)
                router.push({
                    name: 'classonrunningdaily.index'
                })
            }).catch(error => {
                console.log(error.response.data)
                //assign state validation with error
                validation.value = error.response.data
            })
        }

        //return
        return {
            classonrunningdaily,
            classonrunning,
            validation,
            router,
            update
        }
    }
}
</script>

<style></style>
