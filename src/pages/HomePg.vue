<template>
  <q-page class="text-h5 text-center q-mt-xl">
    <div v-if="user">
      <p> Welcome back <strong><span style="color:blue">{{user.user_metadata.username}}</span></strong> </p>
    </div>
  </q-page>
</template>

<script>
import useAuthUser from "src/composables/UseAuthUser";

export default({
    name: "HomePage",
    
    setup(){
      // Get logged user using composable
      const{user} = useAuthUser()

      return{
        user
      }
    }
})
</script>
