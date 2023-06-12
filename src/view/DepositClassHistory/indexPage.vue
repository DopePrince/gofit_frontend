<template>
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">HISTORY DEPOSIT CLASS DATA</h1>
    </div>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <!-- <router-link :to="{ name: 'depositclasshistory.create' }" class="btn btn-md btn-success">
                            ADD HISTORY DEPOSIT CLASS
                        </router-link> -->
                        <table class="table table-striped table-bordered mt-4">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">NO_STRUK_CLASS</th>
                                    <th scope="col">TANGGAL_TRANSAKSI</th>
                                    <th scope="col">ID_MEMBER</th>
                                    <!-- <th scope="col">MEMBER NAME</th> -->
                                    <th scope="col">ID_PEGAWAI</th>
                                    <!-- <th scope="col">PEGAWAI NAME</th> -->
                                    <th scope="col">ID_CLASS</th>
                                    <!-- <th scope="col">CLASS</th> -->
                                    <th scope="col">TOTAL_PRICE</th>
                                    <th scope="col">TOTAL_PACKAGE</th>
                                    <th scope="col">EXPIRE_DATE</th>
                                    <th scope="col">ACTION</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(reportdepositclass, NO_STRUK_CLASS) in report_deposit_classes"
                                    :key="NO_STRUK_CLASS">
                                    <td>{{ reportdepositclass.NO_STRUK_CLASS }}</td>
                                    <td>{{ reportdepositclass.TANGGAL_TRANSAKSI }}</td>
                                    <td>{{ reportdepositclass.ID_MEMBER }}</td>
                                    <!-- <td>{{ reportdepositclass.member.FULL_NAME }}</td> -->
                                    <td>{{ reportdepositclass.ID_PEGAWAI }}</td>
                                    <!-- <td>{{ reportdepositclass.pegawai.FULL_NAME }}</td> -->
                                    <td>{{ reportdepositclass.ID_CLASS }}</td>
                                    <!-- <td>{{ reportdepositclass.class_detail.CLASS_NAME }}</td> -->
                                    <td>{{ 'Rp' + formatAngka(reportdepositclass.TOTAL_PRICE) }}</td>
                                    <td>{{ reportdepositclass.TOTAL_PACKAGE }}</td>
                                    <td>{{ reportdepositclass.EXPIRE_DATE }}</td>
                                    <td class="text-center">
                                        <a class="btn btn-md btn-success" target="_blank"
                                            :href="`http://localhost:8000/api/report_class_print/${reportdepositclass.NO_STRUK_CLASS}`">
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
        let report_deposit_classes = ref([]);
        let members = ref([]);
        let pegawais = ref([]);
        let class_details = ref([]);
        //mounted
        onMounted(() => {
            //get API from Laravel Backend
            axios
                .get("http://localhost:8000/api/report_class")
                .then((response) => {
                    //assign state posts with response data
                    report_deposit_classes.value = response.data.data;
                })
                .catch((error) => {
                    console.log(error.response.data);
                });

            axios
                .get("http://localhost:8000/api/member")
                .then((response) => {
                    //assign state posts with response data
                    members.value = response.data.data;
                })
                .catch((error) => {
                    console.log(error.response.data);
                });

            axios
                .get("http://localhost:8000/api/pegawai")
                .then((response) => {
                    //assign state posts with response data
                    pegawais.value = response.data.data;
                })
                .catch((error) => {
                    console.log(error.response.data);
                });

            axios
                .get("http://localhost:8000/api/class_detail")
                .then((response) => {
                    //assign state posts with response data
                    class_details.value = response.data.data;
                })
                .catch((error) => {
                    console.log(error.response.data);
                });
        });

        function printReportDepositClass(NO_STRUK_CLASS) {
            axios
                .get(`http://localhost:8000/api/report_class_print/${NO_STRUK_CLASS}`)
                .then((response) => {
                    //assign state posts with response data
                    report_deposit_classes.value = response.data.data;
                })
                .catch((error) => {
                    console.log(error.response.data);
                });
        }

        //return
        return {
            report_deposit_classes,
            members,
            pegawais,
            class_details,
            printReportDepositClass
        };
    },
};
</script>
  
<style></style>
  