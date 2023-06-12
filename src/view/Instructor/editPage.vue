<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>EDIT INSTRUCTOR</h4>
                        <hr />
                        <form @submit.prevent="update">
                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Nama Instructor</label>
                                <input class="form-control" v-model="instructor.FULL_NAME"
                                    placeholder="Masukkan Nama Instructor" />
                                <!-- validation -->
                                <div v-if="validation.FULL_NAME" class="mt-2 alert alert-danger">
                                    {{ validation.FULL_NAME[0] }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Gender</label>
                                <input class="form-control" v-model="instructor.GENDER"
                                    placeholder="Masukkan Jenis Gender" />
                                <!-- validation -->
                                <div v-if="validation.GENDER" class="mt-2 alert alert-danger">
                                    {{ validation.GENDER[0] }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Tanggal Lahir</label>
                                <input type="date" class="form-control" v-model="instructor.TANGGAL_LAHIR" />
                                <!-- validation -->
                                <div v-if="validation.TANGGAL_LAHIR" class="mt-2 alert alert-danger">
                                    {{ validation.TANGGAL_LAHIR[0] }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Nomor Telepon</label>
                                <input type="text" class="form-control" v-model="instructor.PHONE_NUMBER"
                                    placeholder="Masukkan Nomor Telepon" />
                                <!-- validation -->
                                <div v-if="validation.PHONE_NUMBER" class="mt-2 alert alert-danger">
                                    {{ validation.PHONE_NUMBER[0] }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Address</label>
                                <input type="ADDRESS" class="form-control" v-model="instructor.ADDRESS"
                                    placeholder="Masukkan Address" />
                                <!-- validation -->
                                <div v-if="validation.ADDRESS" class="mt-2 alert alert-danger">
                                    {{ validation.ADDRESS[0] }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Email</label>
                                <input type="EMAIL" class="form-control" v-model="instructor.EMAIL"
                                    placeholder="Masukkan Email" />
                                <!-- validation -->
                                <div v-if="validation.EMAIL" class="mt-2 alert alert-danger">
                                    {{ validation.EMAIL[0] }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Password</label>
                                <input type="PASSWORD" class="form-control" v-model="instructor.PASSWORD"
                                    placeholder="Masukkan Password" disabled/>
                                <!-- validation -->
                                <div v-if="validation.PASSWORD" class="mt-2 alert alert-danger">
                                    {{ validation.PASSWORD[0] }}
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
        //state instructor
        const instructor = reactive({
            FULL_NAME: '',
            GENDER: '',
            TANGGAL_LAHIR: '',
            PHONE_NUMBER: '',
            ADDRESS: '',
            EMAIL: '',
            PASSWORD: '',
        })
        //state validation
        const validation = ref([])
        //vue router
        const router = useRouter()

        onMounted(() => {
            axios.get(`http://localhost:8000/api/instructor/${route.params.ID_INSTRUCTOR}`)
                .then(response => {
                    instructor.FULL_NAME = response.data.data.FULL_NAME
                    instructor.GENDER = response.data.data.GENDER
                    instructor.TANGGAL_LAHIR = response.data.data.TANGGAL_LAHIR
                    instructor.PHONE_NUMBER = response.data.data.PHONE_NUMBER
                    instructor.ADDRESS = response.data.data.ADDRESS
                    instructor.EMAIL = response.data.data.EMAIL
                    // instructor.PASSWORD = response.data.data.PASSWORD
                })
                .catch(error => {
                    console.log(error.response.data)
                })
        })

        //method update instructor
        function update() {
            let FULL_NAME = instructor.FULL_NAME
            let GENDER = instructor.GENDER
            let TANGGAL_LAHIR = instructor.TANGGAL_LAHIR
            let PHONE_NUMBER = instructor.PHONE_NUMBER
            let ADDRESS = instructor.ADDRESS
            let EMAIL = instructor.EMAIL
            // let PASSWORD = member.PASSWORD

            axios.put(`http://localhost:8000/api/instructor/${route.params.ID_INSTRUCTOR}`, {
                FULL_NAME: FULL_NAME,
                GENDER: GENDER,
                TANGGAL_LAHIR: TANGGAL_LAHIR,
                PHONE_NUMBER: PHONE_NUMBER,
                ADDRESS: ADDRESS,
                EMAIL: EMAIL,
                // PASSWORD: PASSWORD,
            }).then((response) => {
                //redirect ke post index
                console.log(response.data)
                router.push({
                    name: 'instructor.index'
                })
            }).catch(error => {
                console.log(error.response.data)
                //assign state validation with error
                validation.value = error.response.data
            })
        }

        //return
        return {
            instructor,
            validation,
            router,
            update
        }
    }
}
</script>

<style></style>
