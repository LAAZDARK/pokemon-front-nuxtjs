<!--
	This is the sign in page, it uses the dashboard layout in:
	"./layouts/Default.vue" .
 -->

 <template>
  <div class="sign-in">

    <a-row type="flex" :gutter="[24, 24]" justify="space-around" align="middle">

      <!-- Sign In Form Column -->
      <a-col :span="24" :md="12" :lg="{ span: 12, offset: 0 }" :xl="{ span: 6, offset: 2 }" class="col-form">
        <h1 class="mb-15">Iniciar sesión</h1>
        <h5 class="font-regular text-muted">Ingrese su correo electronico y contraseña</h5>

        <!-- Sign In Form -->
        <a-form class="login-form" @submit.prevent="handleSubmit">
          <a-form-item class="mb-10" label="Correo electrónico" :colon="false">
            <a-input v-model="email"
              v-decorator="['email', { rules: [{ required: true, message: 'Ingresar correo electrónico' }] },]"
              placeholder="Correo electrónico" />
          </a-form-item>
          <a-form-item class="mb-5" label="Contraseña" :colon="false">
            <a-input v-model="password" v-decorator="[
              'password',
              { rules: [{ required: true, message: 'Ingresar contraseña' }] },
            ]" type="password" placeholder="Contraseña" />
          </a-form-item>
          <a-form-item>
            <a-button type="primary" block html-type="submit" class="login-form-button">
              Iniciar sessión
            </a-button>
          </a-form-item>
        </a-form>
      </a-col>
      <!-- / Sign In Form Column -->

      <!-- Sign In Image Column -->
      <a-col :span="24" :md="12" :lg="12" :xl="12" class="col-img">
      </a-col>

    </a-row>

  </div>
</template>

<script>
import { login } from '@/api/authService'

export default ({
  data() {
    return {
      email: 'luis@example.com',
      password: 'secret',
      rememberMe: true,
    }
  },
  methods: {
    // Handles input validation after submission.
    async handleSubmit(e) {
      const data = JSON.stringify({
        email: this.email,
        password: this.password
      })
      await login(data).then(response => {
        localStorage.setItem('access_token', response.data.access_token)
      }).catch(error => {
        console.log(error)
      })

      await this.$router.push('/');
    },
  },
})

</script>

<style lang="css">
body {
  background-color: #ffffff;
}
</style>
