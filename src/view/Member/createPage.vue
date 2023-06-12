<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>TAMBAH MEMBER</h4>
                        <hr />
                        <form @submit.prevent="store">
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
                                    placeholder="Masukkan Password" />
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
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
export default {
    setup() {
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
        //method store
        function store() {
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
            axios.post(`http://localhost:8000/api/member`, {
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
            }).then(() => {
                //redirect ke post index
                router.push({
                    name: 'member.index'
                })
            }).catch(error => {
                //assign state validation with error
                validation.value = error.response.data
            })
        }
        //return
        return {
            member,
            validation,
            router,
            store
        }
    }
}
</script>

<style></style>
