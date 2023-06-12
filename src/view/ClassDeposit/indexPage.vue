<template>
    <div
      class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
    >
      <h1 class="h2">CLASS DEPOSIT DATA</h1>
    </div>
    <div class="container mt-5">
      <div class="row">
        <div class="col-md-12">
          <div class="card border-0 rounded shadow">
            <div class="card-body">
              <!-- <router-link
                :to="{ name: 'classdeposit.create' }"
                class="btn btn-md btn-success"
                >ADD CLASS DEPOSIT</router-link
              > -->
              <div class="mt-2">
                <button class="btn btn-md btn-success" @click="listExpiringMemberClassDeposits()">SHOW LIST EXPIRING MEMBER CLASS DEPOSITS</button>
              </div>
              <div class="mt-2">
                <button class="btn btn-md btn-warning" @click="resetClassDeposit()">RESET EXPIRING CLASS DEPOSIT</button>
              </div>
              <div class="mt-2">
                <button class="btn btn-md btn-secondary" @click="goToIndex()">BACK</button>
              </div>
              <table class="table table-striped table-bordered mt-4">
                <thead class="thead-dark">
                  <tr>
                    <th scope="col">ID_CLASS_DEPOSIT</th>
                    <th scope="col">ID_MEMBER</th>
                    <th scope="col">ID_CLASS</th>
                    <th scope="col">CLASS_AMOUNT</th>
                    <th scope="col">EXPIRE_DATE</th>
                    <th scope="col">ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(class_deposit, ID_CLASS_DEPOSIT) in class_deposits" :key="ID_CLASS_DEPOSIT">
                    <td>{{ class_deposit.ID_CLASS_DEPOSIT }}</td>
                    <td>{{ class_deposit.ID_MEMBER }}</td>
                    <td>{{ class_deposit.ID_CLASS }}</td>
                    <td>{{ class_deposit.CLASS_AMOUNT }}</td>
                    <td>{{ class_deposit.EXPIRE_DATE }}</td>
                    <td class="text-center">
                      <!-- <router-link :to="{ name: 'classdeposit.edit', params: { ID_CLASS_DEPOSIT: class_deposit.ID_CLASS_DEPOSIT } }" class="btn btn-sm btn-primary mr-1">
                          EDIT
                      </router-link> -->
                      <button class="btn btn-sm btn-danger m1-1"
                        @click.prevent="deleteClassDeposit(class_deposit.ID_CLASS_DEPOSIT)">DELETE</button>
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
          let class_deposits = ref([]);
          let member = ref([]);
          let class_detail = ref([]);

          //mounted
          onMounted(() => {
            //get API from Laravel Backend
            axios
                .get("http://localhost:8000/api/class_deposit")
                .then((response) => {
                    //assign state posts with response data
                    class_deposits.value = response.data.data;
                })
                .catch((error) => {
                    console.log(error.response.data);
                });
            
            axios
                .get("http://localhost:8000/api/member")
                .then((response) => {
                    //assign state posts with response data
                    member.value = response.data.data;
                })
                .catch((error) => {
                    console.log(error.response.data);
                });
            
            axios
                .get("http://localhost:8000/api/class_detail")
                .then((response) => {
                    //assign state posts with response data
                    class_detail.value = response.data.data;
                })
                .catch((error) => {
                    console.log(error.response.data);
                });

          });
  
          function deleteClassDeposit(ID_CLASS_DEPOSIT) {
              axios
                .delete(`http://localhost:8000/api/class_deposit/${ID_CLASS_DEPOSIT}`)
                .then(() => {
                    class_deposits.value.splice(class_deposits.value.indexOf(ID_CLASS_DEPOSIT), 1);
                }).catch(error => {
                    console.log(error.response.data);
                })
          }

          function listExpiringMemberClassDeposits() {
            axios
                .get("http://localhost:8000/api/class_deposit_show_expire")
                .then((response) => {
                    this.class_deposits = response.data.data;
                })
                .catch((error) => {
                    console.log(error.response.data);
                });
          }

          function resetClassDeposit() {
              axios
                .post(`http://localhost:8000/api/class_deposit_reset`)
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
            class_deposits,
            member,
            class_detail,
            deleteClassDeposit,
            listExpiringMemberClassDeposits,
            resetClassDeposit,
            goToIndex
          };
      },
  };
</script>
  
<style></style>  