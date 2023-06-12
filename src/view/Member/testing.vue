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
          <router-link :to="{ name: 'member.edit', params: { ID_MEMBER: member.ID_MEMBER } }" class="btn btn-sm btn-primary mr-1">
              EDIT
          </router-link>
          <button class="btn btn-sm btn-danger m1-1"
            @click.prevent="deleteMember(member.ID_MEMBER)">DELETE</button>
        </td>
      </tr>
    </tbody>
  </table>