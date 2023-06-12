<template>

</template>

<script>
import axios from "axios";
import { onMounted, ref } from "vue";
export default {
    submit() {
      let url = this.$api + "/login";
      this.$http
        .post(url, {
          username: this.username,
          password: this.password,
        })
        .then((response) => {
          if (response.data.data.id_pegawai != null) {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("id_pegawai", response.data.data.id_pegawai);
            localStorage.setItem(
              "nama_pegawai",
              response.data.data.nama_pegawai
            );
            localStorage.setItem("role", response.data.data.role);

            this.$router.push("/dashboard");
            this.error_message = response.data.message;
            this.color = "blue";
            this.snackbar = true;
            this.clear();
            this.load = false;
          } else {
            localStorage.setItem("id_member", response.data.data.id_member);
            this.$router.push("/dashboard");
          }
        })
        .catch((error) => {
          this.error_message = error.response.data.message;
          this.color = "red";
          this.snackbar = true;
          localStorage.removeItem("token");
          this.load = false;
        });
    },
};
</script>