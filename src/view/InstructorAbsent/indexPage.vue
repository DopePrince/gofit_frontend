<template>
    <div
      class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
    >
      <h1 class="h2">INSTRUCTOR ABSENT DATA</h1>
    </div>
    <div class="container mt-5">
      <div class="row">
        <div class="col-md-12">
          <div class="card border-0 rounded shadow">
            <div class="card-body">
              <!-- <router-link
                :to="{ name: 'instructor.create' }"
                class="btn btn-md btn-success"
                >ADD INSTRUCTOR</router-link
              > -->
              <div class="mt-2">
                <button class="btn btn-md btn-success" @click="showNotConfirmed()">SHOW NOT CONFIRMED</button>
              </div>
              <div class="mt-2">
                <button class="btn btn-md btn-secondary" @click="goToIndex()">BACK</button>
              </div>
              <table class="table table-striped table-bordered mt-4">
                <thead class="thead-dark">
                  <tr>
                    <th scope="col">ID_INSTRUCTOR_ABSENT</th>
                    <th scope="col">ID_CLASS_ON_RUNNING_DAILY</th>
                    <th scope="col">ID_INSTRUCTOR</th>
                    <th scope="col">ABSENT_REASON</th>
                    <th scope="col">ID_SUBSTITUTE_INSTRUCTOR</th>
                    <th scope="col">IS_CONFIRMED</th>
                    <th scope="col">ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(instructor_absent, ID_INSTRUCTOR_ABSENT) in instructor_absents" :key="ID_INSTRUCTOR_ABSENT">
                    <td>{{ instructor_absent.ID_INSTRUCTOR_ABSENT }}</td>
                    <td>{{ instructor_absent.ID_CLASS_ON_RUNNING_DAILY }}</td>
                    <td>{{ instructor_absent.ID_INSTRUCTOR }}</td>
                    <td>{{ instructor_absent.ABSENT_REASON }}</td>
                    <td>{{ instructor_absent.ID_SUBSTITUTE_INSTRUCTOR }}</td>
                    <td>{{ instructor_absent.IS_CONFIRMED == 1 ? 'Terkonfirmasi' : 'Belum Konfirmasi' }}</td>
                    <td class="text-center">
                      <!-- <router-link :to="{ name: 'instructor.edit', params: { ID_INSTRUCTOR: instructor_absent.ID_INSTRUCTOR_ABSENT } }" class="btn btn-sm btn-primary mr-1">
                          EDIT
                      </router-link> -->
                      <button class="btn btn-sm btn-warning m1-1"
                        @click.prevent="updateConfirmation(instructor_absent.ID_INSTRUCTOR_ABSENT)">CONFIRM</button>
                      <button class="btn btn-sm btn-danger m1-1"
                        @click.prevent="deleteInstructorAbsent(instructor_absent.ID_INSTRUCTOR_ABSENT)">DELETE</button>
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
          let instructor_absents = ref([]);
          //mounted
          onMounted(() => {
          //get API from Laravel Backend
          axios
              .get("http://localhost:8000/api/instructor_absent")
              .then((response) => {
              //assign state posts with response data
              instructor_absents.value = response.data.data;
              })
              .catch((error) => {
              console.log(error.response.data);
              });
          });
  
          function deleteInstructorAbsent(ID_INSTRUCTOR_ABSENT) {
              axios
                .delete(`http://localhost:8000/api/instructor_absent/${ID_INSTRUCTOR_ABSENT}`)
                .then(() => {
                    instructor_absents.value.splice(instructor_absents.value.indexOf(ID_INSTRUCTOR_ABSENT), 1);
                }).catch(error => {
                    console.log(error.response.data);
                })
          }

          function showNotConfirmed() {
            axios
              .get("http://localhost:8000/api/instructor_absent_not_confirmed")
              .then((response) => {
                this.instructor_absents = response.data.data;
              })
              .catch((error) => {
                console.log(error.response.data);
              });
          }

          function updateConfirmation(ID_INSTRUCTOR_ABSENT) {
              axios
                .put(`http://localhost:8000/api/instructor_absent_confirmation/${ID_INSTRUCTOR_ABSENT}`)
                .then((response) => {
                  console.log(response.data)
                  location.reload();
                }).catch(error => {
                    console.log(error.response.data.message);
                })
          }

          function goToIndex() {
            window.location.reload();
          }
  
          //return
          return {
            instructor_absents,
            deleteInstructorAbsent,
            showNotConfirmed,
            updateConfirmation,
            goToIndex
          };
      },
  };
</script>
  
<style></style>  