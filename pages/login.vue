<!--
	This is the sign in page, it uses the dashboard layout in:
	"./layouts/Default.vue" .
 -->

 <template>
  <div class="sign-in">

    <a-row type="flex" :gutter="[24,24]" justify="space-around" align="middle">

      <!-- Sign In Form Column -->
      <a-col :span="24" :md="12" :lg="{span: 12, offset: 0}" :xl="{span: 6, offset: 2}" class="col-form">
        <h1 class="mb-15">Sign In</h1>
        <h5 class="font-regular text-muted">Enter your email and password to sign in</h5>

        <!-- Sign In Form -->
        <a-form class="login-form" @submit.prevent="handleSubmit">
          <a-form-item class="mb-10" label="Email" :colon="false">
            <a-input v-model="email"
              v-decorator="['email', { rules: [{ required: true, message: 'Please input your email!' }] },]"
              placeholder="Email" />
          </a-form-item>
          <a-form-item class="mb-5" label="Password" :colon="false">
            <a-input v-model="password" v-decorator="[
            'password',
            { rules: [{ required: true, message: 'Please input your password!' }] },
            ]" type="password" placeholder="Password" />
          </a-form-item>
          <a-form-item class="mb-10">
            <a-switch v-model="rememberMe" /> Remember Me
          </a-form-item>
          <a-form-item>
            <a-button type="primary" block html-type="submit" class="login-form-button">
              SIGN IN
            </a-button>
          </a-form-item>
        </a-form>
        <!-- / Sign In Form -->

        <p class="font-semibold text-muted">Don't have an account? <router-link to="/sign-in"
            class="font-bold text-dark">Sign Up</router-link>
        </p>
      </a-col>
      <!-- / Sign In Form Column -->

      <!-- Sign In Image Column -->
      <a-col :span="24" :md="12" :lg="12" :xl="12" class="col-img">
        <!-- <img src="images/img-signin.jpg" alt=""> -->
      </a-col>
      <!-- Sign In Image Column -->

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
		beforeCreate() {
			// Creates the form and adds to it component's "form" property.
			// this.form = this.$form.createForm(this, { name: 'normal_login' });
		},
		methods: {
			// Handles input validation after submission.
			async handleSubmit(e) {
          // const response = await fetch('http://localhost:4000/api/v1/auth/login', {
          //   method: 'POST',
          //   headers: {
          //     'Content-Type': 'application/json',
          //     'Accept': 'application/json',
          //   },
          //   // credentials: 'include',
          //   body: JSON.stringify({
          //     email: this.email,
          //     password: this.password
          //   })
          // });
          // const data = await response.json()
          const data = JSON.stringify({
              email: this.email,
              password: this.password
            })
          await login(data).then(response => {
            localStorage.setItem('access_token', response.data.access_token)
          })
          // console.log(data)

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
