<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>ADD BOOKING</h4>
                        <hr />
                        <form @submit.prevent="store">
                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Member</label>
                                <select name="ID_MEMBER" id="ID_MEMBER" class="form-select"
                                    v-model="gymbooking.ID_MEMBER">
                                    <option value="Pilih..." disabled selected>Pilih...</option>
                                    <option v-for="(item, ID_MEMBER) in member.value" :key="ID_MEMBER" v-bind:value="item.ID_MEMBER">{{
                                        item.FULL_NAME
                                    }}</option>
                                </select>
                                <!-- validation -->
                                <div v-if="validation.ID_MEMBER" class="mt-2 alert alert-danger">
                                    {{ validation.ID_MEMBER[0] }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Gym</label>
                                <select name="ID_GYM" id="ID_GYM" class="form-select"
                                    v-model="gymbooking.ID_GYM">
                                    <option value="Pilih..." disabled selected>Pilih...</option>
                                    <option v-for="(item, ID_GYM) in gym.value" :key="ID_GYM" v-bind:value="item.ID_GYM">{{
                                        item.ID_GYM
                                    }}</option>
                                </select>
                                <!-- validation -->
                                <div v-if="validation.ID_GYM" class="mt-2 alert alert-danger">
                                    {{ validation.ID_GYM[0] }}
                                </div>
                            </div>
                            <button type="submit" class="btn btn-primary">SIMPAN</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

export default {
    setup() {
        //state member
        const gymbooking = reactive({
            ID_MEMBER: '',
            ID_GYM: '',
            DATE_TIME_BOOKING: '',
            DATE_TIME_PRESENSI: ''
        })
        const member = reactive([])

        const gym = reactive([])
        //state validation
        const validation = ref([])
        //vue router
        const router = useRouter()

        onMounted(() => {
            //get API from Laravel Backend
            axios
            .get("http://localhost:8000/api/member")
                .then((response) => {
                    //assign state posts with response data
                    member.value = response.data.data;
                    console.log(member.value.data)
                })
                .catch((error) => {
                    console.log(error.response.data);
                });

            axios
                .get("http://localhost:8000/api/gym")
                .then((response) => {
                    //assign state posts with response data
                    gym.value = response.data.data;
                    console.log(gym.value.data)
                })
                .catch((error) => {
                    console.log(error.response.data);
                });
        });

        //method store
        function store() {
            let ID_MEMBER = gymbooking.ID_MEMBER
            let ID_GYM = gymbooking.ID_GYM
            // let DATE_TIME_BOOKING = gymbooking.DATE_TIME_BOOKING
            // let DATE_TIME_PRESENSI = gymbooking.DATE_TIME_PRESENSI
            axios.post(`http://localhost:8000/api/gym_booking`, {
                ID_MEMBER: ID_MEMBER,
                ID_GYM: ID_GYM,
                // DATE_TIME_BOOKING: DATE_TIME_BOOKING,
                // DATE_TIME_PRESENSI: DATE_TIME_PRESENSI,
            }).then(() => {
                //redirect ke post index
                router.push({
                    name: 'gymbooking.index'
                })
            }).catch(error => {
                //assign state validation with error
                validation.value = error.response.data
            })
        }
        //return
        return {
            gymbooking,
            member,
            gym,
            validation,
            router,
            store
        }
    }
}
</script>

<style></style>
