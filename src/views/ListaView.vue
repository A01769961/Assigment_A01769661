<script setup>
import { ref, onMounted } from 'vue'
import DatosMat from '../components/DatosMat.vue'
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getAuth, signOut } from "firebase/auth";
import router from '../router';




const firebaseConfig = {
  apiKey: "AIzaSyCSlWWUBNe9GtN2hPMyRTg953FzgzfSFVI",
  authDomain: "ideen-e749a.firebaseapp.com",
  projectId: "ideen-e749a",
  storageBucket: "ideen-e749a.appspot.com",
  messagingSenderId: "237417789337",
  appId: "1:237417789337:web:6c530e72be7f86909f4508"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


// const materias = ref([
//   {
//     nombre: 'Título de la materia',
//     profe: 'Cristiano Ronaldo',
//     salon: 'La Congeladora',
//     dia: 'Lunes, Miercoles, Viernes',
//     hora: '7:00 - 9:00'
//   },
//   {
//     nombre: 'Título de la materia',
//     profe: 'Cristiano Ronaldo',
//     salon: 'La Congeladora',
//     dia: 'Lunes',
//     hora: '7:00 - 9:00'
//   },
//   {
//     nombre: 'Título de la materia',
//     profe: 'Cristiano Ronaldo',
//     salon: 'La Congeladora',
//     dia: 'Lunes, Miercoles',
//     hora: '7:00 - 9:00'
//   }
// ])

const materias = ref([])



onMounted(async () =>{
const querySnapshot = await getDocs(collection(db, "materias"));
  const dbt =[]
  querySnapshot.forEach((doc) => {
    dbt.push(doc.data())
});
  materias.value=dbt;
})

</script>

<template>
  <v-app-bar class="px-md-8 mr-auto" color="#384FFE">
      <v-img class="logo" src="/logoTec.png" alt="logo" aspect-ratio="16/9" />
      <v-spacer class="d-none d-sm-block" />
      <!-- <div class="ml-auto" v-if="true">
        <RouterLink class="whiteboton pa-4" to="/">INICO DE SESION</RouterLink>
        <RouterLink class="whiteboton pa-4" to="/register">REGISTER</RouterLink>
      </div> -->

      <div class="ml-auto" >
        <RouterLink class="whiteboton pa-4" to="/home">INICIO</RouterLink>
        <RouterLink class="whiteboton pa-4" to="/lista">LISTA DE MATERIAS</RouterLink>
      </div>

      <v-btn class="link"  @click="logout"  icon="mdi-logout"></v-btn>
      
      </v-app-bar>

  <h1>MATERIAS INSCRITAS</h1>
  <div>
    <DatosMat v-for="(materia, i) in materias" v-bind="materia" :key="i" />
  </div>
</template>

<script>
const firebaseConfig = {
  apiKey: "AIzaSyCSlWWUBNe9GtN2hPMyRTg953FzgzfSFVI",
  authDomain: "ideen-e749a.firebaseapp.com",
  projectId: "ideen-e749a",
  storageBucket: "ideen-e749a.appspot.com",
  messagingSenderId: "237417789337",
  appId: "1:237417789337:web:6c530e72be7f86909f4508"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default{
  methods: {
    async logout () {
      signOut(auth)
      router.push("/")      
}}}
</script>

<style scoped>
h1 {
  text-align: center;
  color: var(--azul);
}

.whiteboton {
  font-weight: bold;
  color: white;
}

.logo {
  max-width: 10rem;
}

</style>
