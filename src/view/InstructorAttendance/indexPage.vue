<template>
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">INSTRUCTOR ATTENDANCE DATA</h1>
    </div>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <!-- <router-link :to="{ name: 'instructorattendance.create' }" class="btn btn-md btn-success">ADD INSTRUCTOR
                            ATTENDANCE</router-link> -->
                        <table class="table table-striped table-bordered mt-4">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">ID_GYM_BOOKING</th>
                                    <th scope="col">DATE_TIME_PRESENSI</th>
                                    <th scope="col">ID_MEMBER</th>
                                    <th scope="col">ID_GYM</th>
                                    <th scope="col">DATE_TIME_BOOKING</th>
                                    <th scope="col">START_TIME</th>
                                    <th scope="col">END_TIME</th>
                                    <!-- <th scope="col">SLOT_WAKTU</th> -->
                                    <th scope="col">ACTION</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(gymbooking, ID_GYM_BOOKING) in gym_bookings" :key="ID_GYM_BOOKING">
                                    <td>{{ gymbooking.ID_GYM_BOOKING }}</td>
                                    <td>{{ gymbooking.DATE_TIME_PRESENSI }}</td>
                                    <td>{{ gymbooking.ID_MEMBER }}</td>
                                    <td>{{ gymbooking.ID_GYM }}</td>
                                    <td>{{ gymbooking.DATE_TIME_BOOKING }}</td>
                                    <td>{{ gymbooking.gym.START_TIME }}</td>
                                    <td>{{ gymbooking.gym.END_TIME }}</td>
                                    <!-- <td>{{ gymbooking.SLOT_WAKTU }}</td> -->
                                    <td class="text-center">
                                        <button class="btn btn-sm btn-warning m1-1"
                                            @click.prevent="addPresensiGym(gymbooking.ID_GYM_BOOKING)">ADD PRESENSI</button>
                                        <button class="btn btn-sm btn-danger m1-1"
                                            @click.prevent="deleteGymBooking(gymbooking.ID_GYM_BOOKING)">DELETE</button>
                                        <a class="btn btn-md btn-success" target="_blank"
                                            :href="`http://localhost:8000/api/gym_booking_presensi_print/${gymbooking.ID_GYM_BOOKING}`">
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
        let gym_bookings = ref([]);
        //mounted
        onMounted(() => {
            //get API from Laravel Backend
            axios
                .get("http://localhost:8000/api/gym_booking")
                .then((response) => {
                    //assign state posts with response data
                    gym_bookings.value = response.data.data;
                })
                .catch((error) => {
                    console.log(error.response.data);
                });
        });

        function addPresensiGym(ID_GYM_BOOKING) {
            axios
                .put(`http://localhost:8000/api/gym_booking_add_presensi/${ID_GYM_BOOKING}`)
                .then((response) => {
                    console.log(response.data.message);
                    location.reload();
                })
                .catch(error => {
                    console.log(error.response.data.message);
                });
        }

        function deleteGymBooking(ID_GYM_BOOKING) {
            axios
                .post(`http://localhost:8000/api/delete_gym_booking/${ID_GYM_BOOKING}`)
                .then(() => {
                    gym_bookings.value.splice(gym_bookings.value.indexOf(ID_GYM_BOOKING), 1);
                }).catch(error => {
                    console.log(error.response.data);
                })
        }

        function printPresensiGym(ID_GYM_BOOKING) {
            axios
                .get(`http://localhost:8000/api/gym_booking_presensi_print/${ID_GYM_BOOKING}`)
                .then((response) => {
                    //assign state posts with response data
                    gym_bookings.value = response.data.data;
                })
                .catch((error) => {
                    console.log(error.response.data);
                });
        }

        //return
        return {
            gym_bookings,
            deleteGymBooking,
            addPresensiGym,
            printPresensiGym,
        };
    },
};
</script>
    
<style></style>  