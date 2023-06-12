<template>
  <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
    <h1 class="h2">JADWAL HARIAN DATA</h1>
  </div>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-12">
        <div class="card border-0 rounded shadow">
          <div class="card-body">
            <button class="btn btn-md btn-success" @click.prevent="generateClassOnRunningDaily()">GENERATE JADWAL
              HARIAN</button>
            <table class="table table-striped table-bordered mt-4">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">ID_JADWAL_HARIAN</th>
                  <th scope="col">DATE</th>
                  <th scope="col">DAY</th>
                  <th scope="col">START TIME</th>
                  <th scope="col">END TIME</th>
                  <th scope="col">CLASS</th>
                  <th scope="col">INSTRUCTOR</th>
                  <th scope="col">STATUS</th>
                  <th scope="col">CAPACITY</th>
                  <th scope="col">ACTION</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(classonrunningdaily, ID_CLASS_ON_RUNNING_DAILY) in class_on_running_dailies"
                  :key="ID_CLASS_ON_RUNNING_DAILY">
                  <td>{{ classonrunningdaily.ID_CLASS_ON_RUNNING_DAILY }}</td>
                  <td>{{ classonrunningdaily.DATE }}</td>
                  <td>{{ classonrunningdaily.DAY_NAME }}</td>
                  <td>{{ classonrunningdaily.START_CLASS }}</td>
                  <td>{{ classonrunningdaily.END_CLASS }}</td>
                  <td>{{ classonrunningdaily.class_on_running.class_detail.CLASS_NAME }}</td>
                  <td>{{ classonrunningdaily.instructor.FULL_NAME }}</td>
                  <td>{{ classonrunningdaily.STATUS }}</td>
                  <td>{{ classonrunningdaily.CLASS_CAPACITY }}</td>
                  <td class="text-center">
                    <router-link
                      :to="{ name: 'classonrunningdaily.edit', params: { ID_CLASS_ON_RUNNING_DAILY: classonrunningdaily.ID_CLASS_ON_RUNNING_DAILY } }"
                      class="btn btn-sm btn-primary mr-1">
                      EDIT STATUS
                    </router-link>
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
import { useRouter } from "vue-router";

export default {

  setup() {
    let class_on_running_dailies = ref([]);

    const class_on_running = ref([]);

    const instructor = ref([]);

    const generateDaily = ref([]);

    const validation = ref([]);

    const router = useRouter()
    //mounted
    onMounted(() => {
      //get API from Laravel Backend
      axios
        .get("http://localhost:8000/api/class_on_running")
        .then((response) => {
          //assign state posts with response data
          class_on_running.value = response.data.data;
          console.log(class_on_running.value.data)
        })
        .catch((error) => {
          console.log(error.response.data);
        });

      axios
        .get("http://localhost:8000/api/class_on_running_daily")
        .then((response) => {
          //assign state posts with response data
          class_on_running_dailies.value = response.data.data;
        })
        .catch((error) => {
          console.log(error.response.data);
        });

      axios
        .get("http://localhost:8000/api/instructor")
        .then((response) => {
          //assign state posts with response data
          instructor.value = response.data.data;
          console.log(instructor.value.data)
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    });

    function generateClassOnRunningDaily() {
      axios
        .post(`http://localhost:8000/api/class_on_running_daily`, {})
        .then(() => {
          location.reload();
        }).catch(error => {
          validation.value = error.response.data
        })
    }

    //return
    return {
      class_on_running,
      instructor,
      class_on_running_dailies,
      generateDaily,
      validation,
      generateClassOnRunningDaily,
      router
    };
  },
};
</script>
    
<style></style>  