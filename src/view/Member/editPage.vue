<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>EDIT MEMBER</h4>
                        <hr />
                        <form @submit.prevent="update">
                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Nama Member</label>
                                <input class="form-control" v-model="member.FULL_NAME"
                                    placeholder="Masukkan Nama Member" />
                                <!-- validation -->
                                <div v-if="validation.FULL_NAME" class="mt-2 alert alert-danger">
                                    {{ validation.FULL_NAME[0] }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Gender</label>
                                <input class="form-control" v-model="member.GENDER"
                                    placeholder="Masukkan Jenis Gender" />
                                <!-- validation -->
                                <div v-if="validation.GENDER" class="mt-2 alert alert-danger">
                                    {{ validation.GENDER[0] }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Tanggal Lahir</label>
                                <input type="date" class="form-control" v-model="member.TANGGAL_LAHIR" />
                                <!-- validation -->
                                <div v-if="validation.TANGGAL_LAHIR" class="mt-2 alert alert-danger">
                                    {{ validation.TANGGAL_LAHIR[0] }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Nomor Telepon</label>
                                <input type="text" class="form-control" v-model="member.PHONE_NUMBER"
                                    placeholder="Masukkan Nomor Telepon" />
                                <!-- validation -->
                                <div v-if="validation.PHONE_NUMBER" class="mt-2 alert alert-danger">
                                    {{ validation.PHONE_NUMBER[0] }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Address</label>
                                <input type="ADDRESS" class="form-control" v-model="member.ADDRESS"
                                    placeholder="Masukkan Address" />
                                <!-- validation -->
                                <div v-if="validation.ADDRESS" class="mt-2 alert alert-danger">
                                    {{ validation.ADDRESS[0] }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Email</label>
                                <input type="EMAIL" class="form-control" v-model="member.EMAIL"
                                    placeholder="Masukkan Email" />
                                <!-- validation -->
                                <div v-if="validation.EMAIL" class="mt-2 alert alert-danger">
                                    {{ validation.EMAIL[0] }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Password</label>
                                <input type="PASSWORD" class="form-control" v-model="member.PASSWORD"
                                    placeholder="Masukkan Password" disabled/>
                                <!-- validation -->
                                <div v-if="validation.PASSWORD" class="mt-2 alert alert-danger">
                                    {{ validation.PASSWORD[0] }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Jumlah Deposit Regular</label>
                                <input type="number" class="form-control" v-model="member.DEPOSIT_REGULAR_AMOUNT"
                                    placeholder="Masukkan Jumlah Deposit Regular" />
                                <!-- validation -->
                                <div v-if="validation.DEPOSIT_REGULAR_AMOUNT" class="mt-2 alert alert-danger">
                                    {{ validation.DEPOSIT_REGULAR_AMOUNT[0] }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Tanggal Expire Membership</label>
                                <input type="date" class="form-control" v-model="member.EXPIRE_DATE" />
                                <!-- validation -->
                                <div v-if="validation.EXPIRE_DATE" class="mt-2 alert alert-danger">
                                    {{ validation.EXPIRE_DATE[0] }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Status Membership</label>
                                <select name="STATUS_MEMBERSHIP" id="STATUS_MEMBERSHIP" class="form-select" v-model="member.STATUS_MEMBERSHIP">
                                    <option value="Pilih..." disabled selected>Pilih...</option>
                                    <option value="1">Aktif</option>
                                    <option value="0">Non-Aktif</option>
                                </select>
                                <!-- validation -->
                                <div v-if="validation.STATUS_MEMBERSHIP" class="mt-2 alert alert-danger">
                                    {{ validation.STATUS_MEMBERSHIP[0] }}
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
        const member = reactive({
            FULL_NAME: '',
            GENDER: '',
            TANGGAL_LAHIR: '',
            PHONE_NUMBER: '',
            ADDRESS: '',
            EMAIL: '',
            PASSWORD: '',
            DEPOSIT_REGULAR_AMOUNT: '',
            EXPIRE_DATE: '',
            STATUS_MEMBERSHIP: ''
        })
        //state validation
        const validation = ref([])
        //vue router
        const router = useRouter()

        onMounted(() => {
            axios.get(`http://localhost:8000/api/member/${route.params.ID_MEMBER}`)
                .then(response => {
                    member.FULL_NAME = response.data.data.FULL_NAME
                    member.GENDER = response.data.data.GENDER
                    member.TANGGAL_LAHIR = response.data.data.TANGGAL_LAHIR
                    member.PHONE_NUMBER = response.data.data.PHONE_NUMBER
                    member.ADDRESS = response.data.data.ADDRESS
                    member.EMAIL = response.data.data.EMAIL
                    // member.PASSWORD = response.data.data.PASSWORD
                    member.DEPOSIT_REGULAR_AMOUNT = response.data.data.DEPOSIT_REGULAR_AMOUNT
                    member.EXPIRE_DATE = response.data.data.EXPIRE_DATE
                    member.STATUS_MEMBERSHIP = response.data.data.STATUS_MEMBERSHIP
                })
                .catch(error => {
                    console.log(error.response.data)
                })
        })

        // function getDataMember() {
        //     axios.get(`http://localhost:8000/api/member/${route.params.ID_MEMBER}`)
        //         .then(response => {
        //             member.FULL_NAME = response.data.data.FULL_NAME
        //             member.GENDER = response.data.data.GENDER
        //             member.TANGGAL_LAHIR = response.data.data.TANGGAL_LAHIR
        //             member.PHONE_NUMBER = response.data.data.PHONE_NUMBER
        //             member.ADDRESS = response.data.data.ADDRESS
        //             member.EMAIL = response.data.data.EMAIL
        //             member.PASSWORD = response.data.data.PASSWORD
        //             member.DEPOSIT_REGULAR_AMOUNT = response.data.data.DEPOSIT_REGULAR_AMOUNT
        //             member.EXPIRE_DATE = response.data.data.EXPIRE_DATE
        //             member.STATUS_MEMBERSHIP = response.data.data.STATUS_MEMBERSHIP
        //         })
        //         .catch(error => {
        //             console.log(error.response.data)
        //         })
        // }

        //method update member
        function update() {
            let FULL_NAME = member.FULL_NAME
            let GENDER = member.GENDER
            let TANGGAL_LAHIR = member.TANGGAL_LAHIR
            let PHONE_NUMBER = member.PHONE_NUMBER
            let ADDRESS = member.ADDRESS
            let EMAIL = member.EMAIL
            // let PASSWORD = member.PASSWORD
            let DEPOSIT_REGULAR_AMOUNT = member.DEPOSIT_REGULAR_AMOUNT
            let EXPIRE_DATE = member.EXPIRE_DATE
            let STATUS_MEMBERSHIP = member.STATUS_MEMBERSHIP

            axios.put(`http://localhost:8000/api/member/${route.params.ID_MEMBER}`, {
                FULL_NAME: FULL_NAME,
                GENDER: GENDER,
                TANGGAL_LAHIR: TANGGAL_LAHIR,
                PHONE_NUMBER: PHONE_NUMBER,
                ADDRESS: ADDRESS,
                EMAIL: EMAIL,
                // PASSWORD: PASSWORD,
                DEPOSIT_REGULAR_AMOUNT: DEPOSIT_REGULAR_AMOUNT,
                EXPIRE_DATE: EXPIRE_DATE,
                STATUS_MEMBERSHIP: STATUS_MEMBERSHIP,
            }).then((response) => {
                //redirect ke post index
                console.log(response.data)
                router.push({
                    name: 'member.index'
                })
            }).catch(error => {
                console.log(error.response.data)
                //assign state validation with error
                validation.value = error.response.data
            })
        }

        //return
        return {
            member,
            validation,
            router,
            update
        }
    }
}
</script>

<style></style>
