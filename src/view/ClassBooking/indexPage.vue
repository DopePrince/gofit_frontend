<template>
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      <h1 class="h2">CLASS BOOKING & PRESENSI DATA</h1>
    </div>
    <div class="container mt-5">
      <div class="row">
        <div class="col-md-12">
          <div class="card border-0 rounded shadow">
            <div class="card-body">
              <!-- <router-link :to="{ name: 'classonrunning.create' }" class="btn btn-md btn-success">ADD JADWAL UMUM</router-link> -->
              <table class="table table-striped table-bordered mt-4">
                <thead class="thead-dark">
                  <tr>
                    <th scope="col">ID_CLASS_BOOKING</th>
                    <th scope="col">ID_MEMBER</th>
                    <th scope="col">ID_CLASS_ON_RUNNING</th>
                    <th scope="col">DATE_TIME</th>
                    <th scope="col">ID_CLASS</th>
                    <th scope="col">ID_INSTRUCTOR</th>
                    <th scope="col">PAYMENT_TYPE</th>
                    <th scope="col">STATUS PRESENSI</th>
                    <th scope="col">ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(classbooking, ID_CLASS_BOOKING) in class_bookings" :key="ID_CLASS_BOOKING">
                    <td>{{ classbooking.ID_CLASS_BOOKING }}</td>
                    <td>{{ classbooking.ID_MEMBER }}</td>
                    <td>{{ classbooking.ID_CLASS_ON_RUNNING_DAILY }}</td>
                    <td>{{ classbooking.DATE_TIME }}</td>
                    <td>{{ classbooking.class_on_running_daily.class_on_running.class_detail.CLASS_NAME}}</td>
                    <td>{{ classbooking.class_on_running_daily.instructor.FULL_NAME }}</td>
                    <td>{{ classbooking.PAYMENT_TYPE }}</td>
                    <td>{{ classbooking.STATUS_PRESENSI }}</td>
                    <td class="text-center">
                      <!-- <router-link :to="{ name: 'classbooking.edit', params: { ID_CLASS_BOOKING: classbooking.ID_CLASS_BOOKING } }" class="btn btn-sm btn-primary mr-1">
                            EDIT
                        </router-link> -->
                      <!-- <button class="btn btn-sm btn-danger m1-1"
                        @click.prevent="deleteClassOnRunning(classonrunning.ID_CLASS_ON_RUNNING)">DELETE</button> -->
                        <button class="btn btn-sm btn-warning m1-1"
                          @click.prevent="confirmMemberPresensiByInstructor(classbooking.ID_CLASS_BOOKING)">CONFIRM</button>
                        <a class="btn btn-md btn-success" target="_blank"
                            :href="`http://localhost:8000/api/class_booking_print_presensi/${classbooking.ID_CLASS_BOOKING}`">
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
  
    setup() {
      //reactive state
      let class_bookings = ref([]);
      //mounted
      onMounted(() => {
        //get API from Laravel Backend
        axios
          .get("http://localhost:8000/api/class_booking")
          .then((response) => {
            //assign state posts with response data
            class_bookings.value = response.data.data;
          })
          .catch((error) => {
            console.log(error.response.data);
          });
      });
  
    //   function deleteClassOnRunning(ID_CLASS_ON_RUNNING) {
    //     axios
    //       .delete(`http://localhost:8000/api/class_on_running/${ID_CLASS_ON_RUNNING}`)
    //       .then(() => {
    //         class_on_runnings.value.splice(class_on_runnings.value.indexOf(ID_CLASS_ON_RUNNING), 1);
    //       }).catch(error => {
    //         console.log(error.response.data);
    //       })
    //   }

    function printPresensi(ID_CLASS_BOOKING) {
        axios
            .get(`http://localhost:8000/api/class_booking_print_presensi/${ID_CLASS_BOOKING}`)
            .then((response) => {
                //assign state posts with response data
                class_bookings.value = response.data.data;
            })
            .catch((error) => {
                console.log(error.response.data);
            });
    }

    function confirmMemberPresensiByInstructor(ID_CLASS_BOOKING){
        axios
            .put(`http://localhost:8000/api/class_booking_status_presensi_member/${ID_CLASS_BOOKING}`)
            .then((response) => {
                //assign state posts with response data
                console.log(response.data)
                location.reload();
            })
            .catch(error => {
                console.log(error.response.data.message);
            });
    }
  
      //return
      return {
        class_bookings,
        // printPresensiRegular,
        // printPresensiPaket
        printPresensi,
        confirmMemberPresensiByInstructor
      };
    },
  };
  </script>
    
  <style></style>  