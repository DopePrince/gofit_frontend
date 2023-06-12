<template>
  <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
    <h1 class="h2">JADWAL UMUM DATA</h1>
  </div>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-12">
        <div class="card border-0 rounded shadow">
          <div class="card-body">
            <router-link :to="{ name: 'classonrunning.create' }" class="btn btn-md btn-success">ADD JADWAL UMUM</router-link>
            <table class="table table-striped table-bordered mt-4">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">ID_CLASS_ON_RUNNING</th>
                  <th scope="col">INSTRUCTOR</th>
                  <th scope="col">CLASS</th>
                  <th scope="col">DATE</th>
                  <th scope="col">DAY</th>
                  <th scope="col">START_CLASS</th>
                  <th scope="col">END_CLASS</th>
                  <th scope="col">CLASS_CAPACITY</th>
                  <th scope="col">ACTION</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(classonrunning, ID_CLASS_ON_RUNNING) in class_on_runnings" :key="ID_CLASS_ON_RUNNING">
                  <td>{{ classonrunning.ID_CLASS_ON_RUNNING }}</td>
                  <td>{{ classonrunning.instructor.FULL_NAME }}</td>
                  <td>{{ classonrunning.class_detail.CLASS_NAME }}</td>
                  <td>{{ classonrunning.DATE }}</td>
                  <td>{{ classonrunning.DAY_NAME }}</td>
                  <td>{{ classonrunning.START_CLASS }}</td>
                  <td>{{ classonrunning.END_CLASS }}</td>
                  <td>{{ classonrunning.CLASS_CAPACITY }}</td>
                  <td class="text-center">
                    <router-link :to="{ name: 'classonrunning.edit', params: { ID_CLASS_ON_RUNNING: classonrunning.ID_CLASS_ON_RUNNING } }" class="btn btn-sm btn-primary mr-1">
                          EDIT
                      </router-link>
                    <button class="btn btn-sm btn-danger m1-1"
                      @click.prevent="deleteClassOnRunning(classonrunning.ID_CLASS_ON_RUNNING)">DELETE</button>
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

  setup() {
    //reactive state
    let class_on_runnings = ref([]);
    //mounted
    onMounted(() => {
      //get API from Laravel Backend
      axios
        .get("http://localhost:8000/api/class_on_running")
        .then((response) => {
          //assign state posts with response data
          class_on_runnings.value = response.data.data;
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    });

    function deleteClassOnRunning(ID_CLASS_ON_RUNNING) {
      axios
        .delete(`http://localhost:8000/api/class_on_running/${ID_CLASS_ON_RUNNING}`)
        .then(() => {
          class_on_runnings.value.splice(class_on_runnings.value.indexOf(ID_CLASS_ON_RUNNING), 1);
        }).catch(error => {
          console.log(error.response.data);
        })
    }

    //return
    return {
      class_on_runnings,
      deleteClassOnRunning,
    };
  },
};
</script>
  
<style></style>  