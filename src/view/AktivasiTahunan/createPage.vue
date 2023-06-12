<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>ADD AKTIVASI TAHUNAN</h4>
                        <hr />
                        <form @submit.prevent="store">
                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Member</label>
                                <select name="ID_MEMBER" id="ID_MEMBER" class="form-select"
                                    v-model="aktivasitahunan.ID_MEMBER">
                                    <option value="Pilih..." disabled selected>Pilih...</option>
                                    <option v-for="(item, ID_MEMBER) in member.value" :key="ID_MEMBER"
                                        v-bind:value="item.ID_MEMBER">{{
                                            item.FULL_NAME
                                        }}</option>
                                </select>
                                <!-- validation -->
                                <div v-if="validation.ID_MEMBER" class="mt-2 alert alert-danger">
                                    {{ validation.ID_MEMBER[0] }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Pegawai</label>
                                <select name="ID_PEGAWAI" id="ID_PEGAWAI" class="form-select"
                                    v-model="aktivasitahunan.ID_PEGAWAI">
                                    <option value="Pilih..." disabled selected>Pilih...</option>
                                    <option v-for="(item, ID_PEGAWAI) in pegawai.value" :key="ID_PEGAWAI"
                                        v-bind:value="item.ID_PEGAWAI">{{
                                            item.FULL_NAME
                                        }}</option>
                                </select>
                                <!-- validation -->
                                <div v-if="validation.ID_PEGAWAI" class="mt-2 alert alert-danger">
                                    {{ validation.ID_PEGAWAI[0] }}
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
        const aktivasitahunan = reactive({
            NO_STRUK_AKTIVASI: '',
            ID_MEMBER: '',
            ID_PEGAWAI: '',
            TANGGAL_TRANSAKSI: '',
            PRICE: '',
            EXPIRE_DATE: ''
        })
        const member = reactive([])

        const pegawai = reactive([])
        //state validation
        const validation = ref([])
        //vue router
        const router = useRouter()

        onMounted(() => {
            //get API from Laravel Backend
            axios
                .get("http://localhost:8000/api/member")
                .then((response) => {
                    //assign state posts with response data
                    member.value = response.data.data;
                    console.log(member.value.data)
                })
                .catch((error) => {
                    console.log(error.response.data);
                });

            axios
                .get("http://localhost:8000/api/pegawai")
                .then((response) => {
                    //assign state posts with response data
                    pegawai.value = response.data.data;
                    console.log(pegawai.value.data)
                })
                .catch((error) => {
                    console.log(error.response.data);
                });
        });

        //method store
        function store() {
            let ID_MEMBER = aktivasitahunan.ID_MEMBER
            let ID_PEGAWAI = aktivasitahunan.ID_PEGAWAI
            // let TANGGAL_TRANSAKSI = aktivasitahunan.TANGGAL_TRANSAKSI
            // let PRICE = aktivasitahunan.PRICE
            // let EXPIRE_DATE = aktivasitahunan.EXPIRE_DATE

            axios.post(`http://localhost:8000/api/report_aktivasi`, {
                ID_MEMBER: ID_MEMBER,
                ID_PEGAWAI: ID_PEGAWAI,
                // TANGGAL_TRANSAKSI: TANGGAL_TRANSAKSI,
                // PRICE: PRICE,
                // EXPIRE_DATE: EXPIRE_DATE
            }).then(() => {
                //redirect ke post index
                router.push({
                    name: 'aktivasitahunan.index'
                })
            }).catch(error => {
                //assign state validation with error
                validation.value = error.response.data
            })
        }
        //return
        return {
            aktivasitahunan,
            member,
            pegawai,
            validation,
            router,
            store
        }
    }
}
</script>

<style></style>