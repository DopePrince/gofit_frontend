<template>
  <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
    <h1 class="h2">Laporan Pendapatan Bulanan</h1>
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
              <button class="btn btn-md btn-primary mr-2" @click="GetPendapatanBulanan()">Search Data</button>
              <button class="btn btn-md btn-success mr-2" @click="PrintPendapatanBulanan()">Print</button>
            </div>
            <table class="table table-striped table-bordered mt-4">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">Bulan</th>
                  <th scope="col">Deposit</th>
                  <th scope="col">Aktivasi</th>
                  <th scope="col">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(Result, MONTH) in Results" :key="MONTH">
                  <td>{{ Result.MONTH }}</td>
                  <td>{{ 'Rp' + formatAngka(Result.deposit) }}</td>
                  <td>{{ 'Rp' + formatAngka(Result.aktivasi) }}</td>
                  <td>{{ 'Rp' + formatAngka(Result.deposit + Result.aktivasi) }}</td>
                </tr>
                <tr v-for="(Total, result) in Totals" :key="result">
                  <td colspan="3" style=" text-align: right;">Total</td>
                  <td>{{ 'Rp' + formatAngka(Total.result) }}</td>
                </tr>
              </tbody>
            </table>
            <div id="divChart" v-for="(Total, result) in Totals" :key="result">
              <CanvasJSChart id="myChart" :options="options" :CanvasJSChart-data="data" />
            </div>
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
import CanvasJSChart from '../../assets/CanvasJSVueComponent.vue';
export default {

  components: {
    CanvasJSChart
  },

  methods: {
    formatAngka(value) {
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
    let Totals = ref([]);
    //mounted
    function goToIndex() {
      window.location.reload();
    }
    let data = ref([]);

    function GetPendapatanBulanan() {

      let Tanggals = parameter.Tanggal;

      axios.post(`http://localhost:8000/api/report_laporan_pendapatan`, {
        Tanggals: Tanggals + '-01',

      }).then((response) => {


        Results.value = response.data.data;
        data.value = response.data.dataGrafik;
        Totals.value = response.data.total;

        //data = ref([]);


      }).catch((error) => {
        console.log(error.response.data);
      });



    }
    data.value = [];

    function PrintPendapatanBulanan() {
      let Tanggals = parameter.Tanggal;
      Tanggals = Tanggals + '01';
      Tanggals = Tanggals.replace('-', '');
      window.location.replace(`http://localhost:8000/api/report_laporan_pendapatan_print/${Tanggals}`)
    }

    //return
    return {
      data,
      parameter,
      Results,
      goToIndex,
      GetPendapatanBulanan,
      PrintPendapatanBulanan,
      Totals,
      options: {
        animationEnabled: true,
        title: {
          text: "Laporan Pendapatan"
        },
        data: [{
          type: "column",
          dataPoints: data
        }]
      }





    };
  },
};
</script>

<style></style>
