<template>
    <div
      class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
    >
      <h1 class="h2">INSTRUCTOR DATA</h1>
    </div>
    <div class="container mt-5">
      <div class="row">
        <div class="col-md-12">
          <div class="card border-0 rounded shadow">
            <div class="card-body">
              <router-link
                :to="{ name: 'instructor.create' }"
                class="btn btn-md btn-success"
                >ADD INSTRUCTOR</router-link
              >
              <div class="mt-2">
                <button class="btn btn-md btn-secondary" @click="resetLateAmount()">RESET LATE AMOUNT</button>
              </div>
              <table class="table table-striped table-bordered mt-4">
                <thead class="thead-dark">
                  <tr>
                    <th scope="col">ID_INSTRUCTOR</th>
                    <th scope="col">NAME</th>
                    <th scope="col">GENDER</th>
                    <th scope="col">TANGGAL_LAHIR</th>
                    <th scope="col">PHONE_NUMBER</th>
                    <th scope="col">ADDRESS</th>
                    <th scope="col">EMAIL</th>
                    <th scope="col">LATE AMOUNT</th>
                    <th scope="col">ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(instructor, ID_INSTRUCTOR) in instructors" :key="ID_INSTRUCTOR">
                    <td>{{ instructor.ID_INSTRUCTOR }}</td>
                    <td>{{ instructor.FULL_NAME }}</td>
                    <td>{{ instructor.GENDER }}</td>
                    <td>{{ instructor.TANGGAL_LAHIR }}</td>
                    <td>{{ instructor.PHONE_NUMBER }}</td>
                    <td>{{ instructor.ADDRESS }}</td>
                    <td>{{ instructor.EMAIL }}</td>
                    <td>{{ instructor.LATE_AMOUNT }}</td>
                    <td class="text-center">
                      <router-link :to="{ name: 'instructor.edit', params: { ID_INSTRUCTOR: instructor.ID_INSTRUCTOR } }" class="btn btn-sm btn-primary mr-1">
                          EDIT
                      </router-link>
                      <button class="btn btn-sm btn-danger m1-1"
                        @click.prevent="deleteInstructor(instructor.ID_INSTRUCTOR)">DELETE</button>
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
          let instructors = ref([]);
          //mounted
          onMounted(() => {
          //get API from Laravel Backend
          axios
              .get("http://localhost:8000/api/instructor")
              .then((response) => {
              //assign state posts with response data
              instructors.value = response.data.data;
              })
              .catch((error) => {
              console.log(error.response.data);
              });
          });

          function resetLateAmount() {
            axios
              .post(`http://localhost:8000/api/instructor_late_reset`)
              .then((response) => {
                console.log(response.data.message);
                location.reload();
              })
              .catch(error => {
                console.log(error.response.data.message);
              });
          }
  
          function deleteInstructor(ID_INSTRUCTOR) {
              axios
                  .delete(`http://localhost:8000/api/instructor/${ID_INSTRUCTOR}`)
                  .then(() => {
                      instructors.value.splice(instructors.value.indexOf(ID_INSTRUCTOR), 1);
                  }).catch(error => {
                      console.log(error.response.data);
                  })
          }
  
          //return
          return {
          instructors,
          resetLateAmount,
          deleteInstructor,
          };
      },
  };
</script>
  
<style></style>  