<template>
  <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
    <h1 class="h2">MEMBER DATA</h1>
  </div>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-12">
        <div class="card border-0 rounded shadow">
          <div class="card-body">
            <router-link :to="{ name: 'member.create' }" class="btn btn-md btn-success mr-2">ADD MEMBER</router-link>
            <div class="mt-2">
              <button class="btn btn-md btn-primary mr-2" @click="getExpiredMembers()">SHOW EXPIRED MEMBERS</button>
            </div>
            <div class="mt-2">
              <button class="btn btn-md btn-danger" @click="deactivateMembers()">DEACTIVATE MEMBERS</button>
            </div>
            <div class="mt-2">
              <button class="btn btn-md btn-secondary" @click="goToIndex()">BACK</button>
            </div>
            <table class="table table-striped table-bordered mt-4">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">ID_MEMBER</th>
                  <th scope="col">NAME</th>
                  <th scope="col">GENDER</th>
                  <th scope="col">TANGGAL_LAHIR</th>
                  <th scope="col">PHONE_NUMBER</th>
                  <th scope="col">ADDRESS</th>
                  <th scope="col">EMAIL</th>
                  <th scope="col">DEPOSIT_REGULAR_AMOUNT</th>
                  <th scope="col">EXPIRE_DATE</th>
                  <th scope="col">STATUS_MEMBERSHIP</th>
                  <th scope="col">ACTION</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(member, ID_MEMBER) in members" :key="ID_MEMBER">
                  <td>{{ member.ID_MEMBER }}</td>
                  <td>{{ member.FULL_NAME }}</td>
                  <td>{{ member.GENDER }}</td>
                  <td>{{ member.TANGGAL_LAHIR }}</td>
                  <td>{{ member.PHONE_NUMBER }}</td>
                  <td>{{ member.ADDRESS }}</td>
                  <td>{{ member.EMAIL }}</td>
                  <td>{{ 'Rp' + formatDepositAmt(member.DEPOSIT_REGULAR_AMOUNT) }}</td>
                  <td>{{ member.EXPIRE_DATE }}</td>
                  <td>{{ member.STATUS_MEMBERSHIP == 1 ? 'Aktif' : 'Non-Aktif' }}</td>
                  <td class="text-center">
                    <router-link :to="{ name: 'member.edit', params: { ID_MEMBER: member.ID_MEMBER } }"
                      class="btn btn-sm btn-primary mr-1">
                      EDIT
                    </router-link>
                    <button class="btn btn-sm btn-danger m1-1"
                      @click.prevent="deleteMember(member.ID_MEMBER)">DELETE</button>
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
//import { useRouter } from "vue-router";
export default {

  methods: {
    formatDepositAmt(value) {
      let val = (value / 1).toFixed(2).replace('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    }
  },

  setup() {
    //reactive state
    let members = ref([]);
    //mounted
    onMounted(() => {
      //get API from Laravel Backend
      axios
        .get("http://localhost:8000/api/member")
        .then((response) => {
          //assign state posts with response data
          members.value = response.data.data;
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    });

    function deleteMember(ID_MEMBER) {
      axios
        .delete(`http://localhost:8000/api/member/${ID_MEMBER}`)
        .then(() => {
          members.value.splice(members.value.indexOf(ID_MEMBER), 1);
        }).catch(error => {
          console.log(error.response.data);
        })
    }

    function getExpiredMembers() {
      axios
        .get("http://localhost:8000/api/member_show_expire")
        .then((response) => {
          this.members = response.data.data;
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    }

    function goToIndex() {
      window.location.reload();
    }

    function deactivateMembers() {
      axios.post(`http://localhost:8000/api/member_deactivate`)
        .then((response) => {
          console.log(response.data.message);
          // refresh page
          location.reload();
        })
        .catch(error => {
          console.log(error.response.data.message);
        });
    }

    //return
    return {
      members,
      deleteMember,
      getExpiredMembers,
      goToIndex,
      deactivateMembers
    };
  },
};
</script>

<style></style>
