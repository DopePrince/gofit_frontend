<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>ADD HISTORY DEPOSIT CLASS</h4> <!-- BELUM SELESAI BUAT -->
                        <hr />
                        <form @submit.prevent="store">
                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Member</label>
                                <select name="ID_MEMBER" id="ID_MEMBER" class="form-select"
                                    v-model="reportdepositregular.ID_MEMBER">
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
                                    v-model="reportdepositregular.ID_PEGAWAI">
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
                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Promo Regular</label>
                                <select name="ID_PROMO_REGULAR" id="ID_PROMO_REGULAR" class="form-select"
                                    v-model="reportdepositregular.ID_PROMO_REGULAR">
                                    <option value="Pilih..." disabled selected>Pilih...</option>
                                    <option v-for="(item, ID_PROMO_REGULAR) in promo_regular.value" :key="ID_PROMO_REGULAR"
                                        v-bind:value="item.ID_PROMO_REGULAR">{{
                                            item.ID_PROMO_REGULAR
                                        }}</option>
                                </select>
                                <!-- validation -->
                                <div v-if="validation.ID_PROMO_REGULAR" class="mt-2 alert alert-danger">
                                    {{ validation.ID_PROMO_REGULAR[0] }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Topup Amount</label>
                                <input type="number" class="form-control" v-model="reportdepositregular.TOPUP_AMOUNT"
                                    placeholder="Masukkan Jumlah Topup Deposit" />
                                <!-- validation -->
                                <div v-if="validation.TOPUP_AMOUNT" class="mt-2 alert alert-danger">
                                    {{ validation.TOPUP_AMOUNT[0] }}
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
        //state
        const reportdepositregular = reactive({
            NO_STRUK_REGULAR: '',
            ID_MEMBER: '',
            ID_PEGAWAI: '',
            ID_PROMO_REGULAR: '',
            TANGGAL_TRANSAKSI: '',
            TOPUP_AMOUNT: '',
            BONUS: '',
            REMAINING_REGULAR: '',
            TOTAL_REGULAR: '',
        })
        const member = reactive([])

        const pegawai = reactive([])

        const promo_regular = reactive([])
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

            axios
                .get("http://localhost:8000/api/promo_regular")
                .then((response) => {
                    //assign state posts with response data
                    promo_regular.value = response.data.data;
                    console.log(promo_regular.value.data)
                })
                .catch((error) => {
                    console.log(error.response.data);
                });
        });

        //STORE DATA BELUM JADI
        //method store
        function store() {
            let ID_MEMBER = reportdepositregular.ID_MEMBER
            let ID_PEGAWAI = reportdepositregular.ID_PEGAWAI
            let ID_PROMO_REGULAR = reportdepositregular.ID_PROMO_REGULAR
            let TOPUP_AMOUNT = reportdepositregular.TOPUP_AMOUNT
            // let BONUS = reportdepositregular.BONUS
            // let REMAINING_REGULAR = reportdepositregular.REMAINING_REGULAR
            // let TOTAL_REGULAR = reportdepositregular.TOTAL_REGULAR

            axios.post(`http://localhost:8000/api/report_regular`, {
                ID_MEMBER: ID_MEMBER,
                ID_PEGAWAI: ID_PEGAWAI,
                ID_PROMO_REGULAR: ID_PROMO_REGULAR,
                TOPUP_AMOUNT: TOPUP_AMOUNT,
                // BONUS: BONUS,
                // REMAINING_REGULAR: REMAINING_REGULAR,
                // TOTAL_REGULAR: TOTAL_REGULAR
            }).then(() => {
                //redirect ke post index
                router.push({
                    name: 'depositregularhistory.index'
                })
            }).catch(error => {
                //assign state validation with error
                validation.value = error.response.data
            })
        }
        //return
        return {
            reportdepositregular,
            member,
            pegawai,
            promo_regular,
            validation,
            router,
            store
        }
    }
}
</script>

<style></style>