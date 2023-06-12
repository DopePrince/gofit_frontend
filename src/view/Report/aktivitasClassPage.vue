<template>
  <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
    <h1 class="h2">Laporan Aktivitas Kelas Bulanan</h1>
  </div>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-12">
        <div class="card border-0 rounded shadow">
          <div class="card-body">
            <div class="mt-2">

              <input type="month" class="form-control" v-model="parameter.Tanggal" />
            </div>

            <div class="mt-2">

              <button class="btn btn-md btn-primary mr-2" @click="GetAktivitasKelas()">Search Data</button>
              <button class="btn btn-md btn-success mr-2" @click="PrintAktivitasKelas()">Print</button>
            </div>
            <table class="table table-striped table-bordered mt-4">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">Kelas</th>
                  <th scope="col">Instruktur</th>
                  <th scope="col">Jumlah Peserta</th>
                  <th scope="col">Jumlah Libur</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(Result, CLASS_NAME) in Results" :key="CLASS_NAME">
                  <td>{{ Result.CLASS_NAME }}</td>
                  <td>{{ Result.FULL_NAME }}</td>
                  <td>{{ Result.CLASS_CAPACITY }}</td>
                  <td>{{ Result.libur }}</td>
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
import { reactive, ref } from 'vue';
//import { onMounted, ref } from "vue";
//import { useRouter } from "vue-router";
export default {

  methods: {
    formatDepositAmt(value) {
      let val = (value / 1).toFixed(2).replace('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    }
  },

  setup() {
    const parameter = reactive({
      Tanggal: ''
    });
    //reactive state
    let Results = ref([]);
    //mounted

    function goToIndex() {
      window.location.reload();
    }
    function GetAktivitasKelas() {
      let Tanggals = parameter.Tanggal;
      axios.post(`http://localhost:8000/api/report_aktivitas_class`, {
        Tanggals: Tanggals + '-01',

      }).then((response) => {
        Results.value = response.data.data;
      }).catch((error) => {
        console.log(error.response.data);
      });


    }

    function PrintAktivitasKelas() {
      let Tanggals = parameter.Tanggal;
      Tanggals = Tanggals + '01';
      Tanggals = Tanggals.replace('-', '');
      window.location.replace(`http://localhost:8000/api/report_aktivitas_class_print/${Tanggals}`)
    }

    //return
    return {
      parameter,
      Results,
      goToIndex,
      GetAktivitasKelas,
      PrintAktivitasKelas
    };
  },
};
</script>

<style></style>
