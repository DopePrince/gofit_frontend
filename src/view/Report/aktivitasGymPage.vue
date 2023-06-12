<template>
  <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
    <h1 class="h2">Laporan Aktivitas Gym Bulanan</h1>
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

              <button class="btn btn-md btn-primary mr-2" @click="GetAktivitasGym()">Search Data</button>
              <button class="btn btn-md btn-success mr-2" @click="PrintAktivitasGym()">Print</button>
            </div>
            <table class="table table-bordered mt-4">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">Tanggal</th>
                  <th scope="col">Jumlah Member</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(Result, date) in Results" :key="date" :class="{ 'highlight': Result.member !== 0 }">
                  <td>{{ Result.Date }}</td>
                  <td>{{ Result.member }}</td>
                </tr>
                <tr v-if="Results.length > 0" :class="{ 'total_highlight' : Results.length > 0 }">
                  <td><b>TOTAL :</b></td>
                  <td>{{ totalMember }}</td>
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

    const totalMember = ref(0);

    //mounted
    function goToIndex() {
      window.location.reload();
    }

    function GetAktivitasGym() {
      let Tanggals = parameter.Tanggal;
      axios.post(`http://localhost:8000/api/report_aktivitas_gym`, {
        Tanggals: Tanggals + '-01',

      }).then((response) => {
        Results.value = response.data.data;
        totalMember.value = response.data.totalMember;
      }).catch((error) => {
        console.log(error.response.data);
      });
    }

    function PrintAktivitasGym() {
      let Tanggals = parameter.Tanggal;
      Tanggals = Tanggals + '01';
      Tanggals = Tanggals.replace('-', '');
      window.location.replace(`http://localhost:8000/api/report_aktivitas_gym_print/${Tanggals}`)
    }

    //return
    return {
      totalMember,
      parameter,
      Results,
      goToIndex,
      GetAktivitasGym,
      PrintAktivitasGym
    };
  },
};
</script>

<style>
.highlight {
  background-color: #FFFFE0;
}

.total_highlight {
  background-color: khaki;
}
</style>
