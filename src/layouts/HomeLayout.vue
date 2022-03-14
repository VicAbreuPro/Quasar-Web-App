<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <q-toolbar-title> Web App </q-toolbar-title>

        <div>
          <q-btn-dropdown color="primary" icon="settings">
            <q-list>
              <q-item clickable v-close-popup >
                <q-item-section>
                  <q-item-label>Account</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup @click.prevent="logoutUser">
                <q-item-section>
                  <q-item-label>Logout</q-item-label>
                </q-item-section>
              </q-item>

            </q-list>
          </q-btn-dropdown>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Essential Links </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from "components/EssentialLink.vue";

const linksList = [
  {
    title: "Home Page",
    icon: "house",
    link: "https://vnamanager.netlify.app/HomePg",
  },
  {
    title: "Clients",
    caption: "Client Management",
    icon: "person",
    link: "https://vnamanager.netlify.app/ClientPg",
  },
  {
    title: "Products",
    caption: "Product Management",
    icon: "star",
    link: "https://vnamanager.netlify.app/ProductPg",
  },
  {
    title: "Sales",
    caption: "Sales Management",
    icon: "money",
    link: "https://vnamanager.netlify.app/SalesPg",
  },
  {
    title: "Admin",
    caption: "@quasarframework",
    icon: "key",
    link: "https://twitter.quasar.dev",
  }
];

import { defineComponent, ref } from "vue";
import useAuthUser from "src/composables/UseAuthUser";
import {useRouter} from 'vue-router';
import { useQuasar } from "quasar";
import useNotify from "src/composables/UseNotify";

export default defineComponent({
  name: "HomeLayout",

  components: {
    EssentialLink,
  },

  setup() {

    const {notifySuccess} = useNotify()

    const leftDrawerOpen = ref(false);

    const $q = useQuasar()

    // Routing user to intial login page
    const router = useRouter()

    //Use logout method from composable
    const {logout} = useAuthUser()

    //Logout async function
    const logoutUser = async () =>{
      $q.dialog({

        title:'Logout Account',
        message:"Please Confirm Logout Operation!",
        cancel: true,
        persistence: true
      }).onOk(async () => {

        //Logout currently user
        await logout()

        notifySuccess('Logged Out!')

        // With replace method, the user cannot back by back arrow button
        router.replace({name: 'loginPg'})
      })

    }



    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      logoutUser
    };
  },
});
</script>
