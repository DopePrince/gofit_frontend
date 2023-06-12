<template>
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">HISTORY DEPOSIT REGULAR DATA</h1>
    </div>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <router-link :to="{ name: 'depositregularhistory.create' }" class="btn btn-md btn-success">
                            ADD HISTORY DEPOSIT REGULAR
                        </router-link>
                        <table class="table table-striped table-bordered mt-4">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">NO_STRUK_REGULAR</th>
                                    <th scope="col">TANGGAL_TRANSAKSI</th>
                                    <th scope="col">ID_MEMBER</th>
                                    <!-- <th scope="col">MEMBER NAME</th> -->
                                    <th scope="col">ID_PEGAWAI</th>
                                    <!-- <th scope="col">PEGAWAI NAME</th> -->
                                    <!-- <th scope="col">ID_PROMO_REGULAR</th> -->
                                    <th scope="col">TOPUP_AMOUNT</th>
                                    <th scope="col">BONUS</th>
                                    <th scope="col">REMAINING_REGULAR</th>
                                    <th scope="col">TOTAL_REGULAR</th>
                                    <th scope="col">ACTION</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(reportdepositregular, NO_STRUK_REGULAR) in report_deposit_regulars"
                                    :key="NO_STRUK_REGULAR">
                                    <td>{{ reportdepositregular.NO_STRUK_REGULAR }}</td>
                                    <td>{{ reportdepositregular.TANGGAL_TRANSAKSI }}</td>
                                    <td>{{ reportdepositregular.ID_MEMBER }}</td>
                                    <!-- <td>{{ reportdepositregular.member.FULL_NAME }}</td> -->
                                    <td>{{ reportdepositregular.ID_PEGAWAI }}</td>
                                    <!-- <td>{{ reportdepositregular.pegawai.FULL_NAME }}</td> -->
                                    <!-- <td>{{ reportdepositregular.ID_PROMO_REGULAR }}</td> -->
                                    <td>{{ 'Rp' + formatAngka(reportdepositregular.TOPUP_AMOUNT) }}</td>
                                    <td>{{ 'Rp' + formatAngka(reportdepositregular.BONUS) }}</td>
                                    <td>{{ 'Rp' + formatAngka(reportdepositregular.REMAINING_REGULAR) }}</td>
                                    <td>{{ 'Rp' + formatAngka(reportdepositregular.TOTAL_REGULAR) }}</td>
                                    <td class="text-center">
                                        <a class="btn btn-md btn-success" target="_blank"
                                            :href="`http://localhost:8000/api/report_regular_print/${reportdepositregular.NO_STRUK_REGULAR}`">
                                            PRINT
                                        </a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import axios from "axios";
import { onMounted, ref } from "vue";
export default {

    methods: {
        formatAngka(value) {
            let val = (value / 1).toFixed(2).replace('.', ',')
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        }
    },

    setup() {
        //reactive state
        let report_deposit_regulars = ref([]);
        //mounted
        onMounted(() => {
            //get API from Laravel Backend
            axios
                .get("http://localhost:8000/api/report_regular")
                .then((response) => {
                    //assign state posts with response data
                    report_deposit_regulars.value = response.data.data;
                })
                .catch((error) => {
                    console.log(error.response.data);
                });
        });

        function printReportDepositRegular(NO_STRUK_REGULAR) {
            axios
                .get(`http://localhost:8000/api/report_regular_print/${NO_STRUK_REGULAR}`)
                .then((response) => {
                    //assign state posts with response data
                    report_deposit_regulars.value = response.data.data;
                })
                .catch((error) => {
                    console.log(error.response.data);
                });
        }

        //return
        return {
            report_deposit_regulars,
            printReportDepositRegular
        };
    },
};
</script>
  
<style></style>
  