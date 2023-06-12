<template>
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">AKTIVASI TAHUNAN DATA</h1>
    </div>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <router-link :to="{ name: 'aktivasitahunan.create' }" class="btn btn-md btn-success">
                            ADD AKTIVASI TAHUNAN
                        </router-link>
                        <table class="table table-striped table-bordered mt-4">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">NO_STRUK_AKTIVASI</th>
                                    <th scope="col">TANGGAL_TRANSAKSI</th>
                                    <th scope="col">ID_MEMBER</th>
                                    <!-- <th scope="col">MEMBER NAME</th> -->
                                    <th scope="col">ID_PEGAWAI</th>
                                    <th scope="col">PEGAWAI NAME</th>
                                    <th scope="col">PRICE</th>
                                    <th scope="col">EXPIRE_DATE</th>
                                    <th scope="col">ACTION</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(reportaktivasi, NO_STRUK_AKTIVASI) in report_aktivasis"
                                    :key="NO_STRUK_AKTIVASI">
                                    <td>{{ reportaktivasi.NO_STRUK_AKTIVASI }}</td>
                                    <td>{{ reportaktivasi.TANGGAL_TRANSAKSI }}</td>
                                    <td>{{ reportaktivasi.ID_MEMBER }}</td>
                                    <!-- <td>{{ reportaktivasi.member.FULL_NAME }}</td> -->
                                    <td>{{ reportaktivasi.ID_PEGAWAI }}</td>
                                    <td>{{ reportaktivasi.pegawai.FULL_NAME }}</td>
                                    <td>{{ 'Rp' + formatAngka(reportaktivasi.PRICE) }}</td>
                                    <td>{{ reportaktivasi.EXPIRE_DATE }}</td>
                                    <td class="text-center">
                                        <a class="btn btn-md btn-success" target="_blank"
                                            :href="`http://localhost:8000/api/report_aktivasi_print/${reportaktivasi.NO_STRUK_AKTIVASI}`">
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
        let report_aktivasis = ref([]);
        //mounted
        onMounted(() => {
            //get API from Laravel Backend
            axios
                .get("http://localhost:8000/api/report_aktivasi")
                .then((response) => {
                    //assign state posts with response data
                    report_aktivasis.value = response.data.data;
                })
                .catch((error) => {
                    console.log(error.response.data);
                });
        });

        function printReportAktivasi(NO_STRUK_AKTIVASI) {
            axios
                .get(`http://localhost:8000/api/report_aktivasi_print/${NO_STRUK_AKTIVASI}`)
                .then((response) => {
                    //assign state posts with response data
                    report_aktivasis.value = response.data.data;
                })
                .catch((error) => {
                    console.log(error.response.data);
                });
        }

        //return
        return {
            report_aktivasis,
            printReportAktivasi
            // deleteAktivasiTahunan,
        };
    },
};
</script>
  
<style></style>
  