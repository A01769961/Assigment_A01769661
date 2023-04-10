<script setup>
//import {getAuth, createUserWhitEmailAndPassword} from "firebase/auth"
import { useRouter } from "vue-router";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
import router from '../router';

</script>

<template>
   <v-app-bar class="px-md-8 mr-auto" color="#384FFE">
      <v-img class="logo" src="/logoTec.png" alt="logo" aspect-ratio="16/9" />
      <v-spacer class="d-none d-sm-block" />
      <div class="ml-auto" v-if="true">
        <RouterLink class="whiteboton pa-4" to="/">INICO DE SESION</RouterLink>
        <RouterLink class="whiteboton pa-4" to="/register">REGISTER</RouterLink>
      </div>

      <!-- <div class="ml-auto" v-else>
        <RouterLink class="whiteboton pa-4" to="/home">INICIO</RouterLink>
        <RouterLink class="whiteboton pa-4" to="/lista">LISTA DE MATERIAS</RouterLink>
      </div> -->
      </v-app-bar>



  <div style="padding: 1rem ">
    <h1>CREA UNA CUENTA</h1>
    <v-responsive class="mx-auto" max-width="344" style="padding-top: 3rem;"> 
      <v-form ref="form" v-model="valid" @submit.prevent="submitcuenta">
        <v-text-field v-model="cuenta.name" :rules= "nameRules"
        label="Nombre Completo" placeholder="Juan Escutia" type="name" variant="outlined"></v-text-field>

        <v-text-field v-model="cuenta.matricula" :rules= "matriculaRules"
        label="Matricula" placeholder="A0xxxxxxx" type="matricula" variant="outlined"></v-text-field>

        <v-text-field v-model="cuenta.correoinst" :rules= "emailRules"
        label="Correo institucional" placeholder="a0xxxxxx@tec.mx" type="email" variant="outlined"></v-text-field>

        <v-text-field v-model="cuenta.correoper" :rules= "emailRules2"
        label="Correo personal" placeholder="a0xxxxxx@tec.mx" type="email" variant="outlined"></v-text-field>

        <v-text-field v-model="cuenta.contra1" :rules= "passwordRules"
        label="Contraseña"  type="password" variant="outlined"></v-text-field>

        <v-text-field  v-model="cuenta.contra2" :rules="[
    v => !!v || 'Campo requerido', 
    v => v.length >= 6 || 'Necesitas 6 caracteres',
    v => v === cuenta.contra1 || 'Contraseñas no coincidentes',
    ]"  
        label="Confirma contraseña"  type="password" variant="outlined"></v-text-field>


        <v-switch v-model="cuenta.terminos" label="Acepto terminos y condiciones" color="success"
              value="1" :rules= "condicione" style="padding-left: 1rem;"></v-switch>
              <v-btn
            block
            size="large"
            type="submit"
            variant="elevated"
            @click="submitcuenta"
            style="background-color: var(--azul); color: white; "
          >
            Inicia sesión
          </v-btn>
      </v-form>
      
    </v-responsive>
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
const db = getFirestore(app);



export default{
  data: () => ({
    valid: true,
    cuenta :{
      name: "",
      matricula: "",
      correoinst: "",
      correoper: "",
      contra1: "",
      contra2: "",
      terminos: " "
    },
    nameRules: [
    v => !!v || 'Campo requerido',
    ],
    matriculaRules: [
    v => !!v || 'Campo requerido',
    v => v.length == 9 || 'Matricula no valida',
    ],
    emailRules:[
      value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(value) || 'Email invalido'
      },
      v => !!v || 'Campo requerido',
    ],
    emailRules2:[
      value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(value) || 'Email invalido'
      },
      v => !!v || 'Campo requerido',
    ],
    passwordRules: [
    v => !!v || 'Campo requerido', 
    v => v.length >= 6 || 'Necesitas 6 caracteres',
    ],
    condicione: [
    v => v=="1" || "Acepta los terminos y condiciones"
    ],
  }),

  methods: {
    async submitcuenta () {
      const { valid } = await this.$refs.form.validate()
       if (valid){
        createUserWithEmailAndPassword(auth, this.cuenta.correoinst, this.cuenta.contra1)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user.uid;
          setDoc(doc(db, "users", user), {
          name: this.cuenta.name,
          matricula: this.cuenta.matricula,
          correoper: this.cuenta.correoper,
          correoinst: this.cuenta.correoinst
        }
        );
        router.push("/")
        })
       } 
      
    },
    
  },
}</script>

<style scoped>
h1 {
  
  text-align: center;
  color: var(--azul);
  
}

.icono {
  aspect-ratio: 1;
  border-radius: 100000px;
  margin: 2rem auto;
  max-width: 16rem;
  overflow: hidden;
}

.contenido {
  max-width: 50rem;
}

.campo{
  max-width: 50rem;
}
.whiteboton {
  font-weight: bold;
  color: white;
}

.logo {
  max-width: 10rem;
}


</style>


