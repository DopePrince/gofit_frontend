<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>ADD INSTRUCTOR</h4>
                        <hr />
                        <form @submit.prevent="store">
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
                                    placeholder="Masukkan Password" />
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
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
export default {
    setup() {
        //state member
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
        //method store
        function store() {
            let FULL_NAME = instructor.FULL_NAME
            let GENDER = instructor.GENDER
            let TANGGAL_LAHIR = instructor.TANGGAL_LAHIR
            let PHONE_NUMBER = instructor.PHONE_NUMBER
            let ADDRESS = instructor.ADDRESS
            let EMAIL = instructor.EMAIL
            // let PASSWORD = instructor.PASSWORD
            axios.post(`http://localhost:8000/api/instructor`, {
                FULL_NAME: FULL_NAME,
                GENDER: GENDER,
                TANGGAL_LAHIR: TANGGAL_LAHIR,
                PHONE_NUMBER: PHONE_NUMBER,
                ADDRESS: ADDRESS,
                EMAIL: EMAIL,
                // PASSWORD: PASSWORD,
            }).then(() => {
                //redirect ke post index
                router.push({
                    name: 'instructor.index'
                })
            }).catch(error => {
                //assign state validation with error
                validation.value = error.response.data
            })
        }
        //return
        return {
            instructor,
            validation,
            router,
            store
        }
    }
}
</script>

<style></style>
