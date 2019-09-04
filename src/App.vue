<template>
	<div v-if="!blog"  id="app" :class="{'hide-menu':!isMenuVisible || !user}">
		<Header title="Administração"  :hideToggle="!user" :hideUserDropdown="!user"></Header>
		<Menu v-if="user" ></Menu>
		<Loading v-if="validatingToken" />
		<Content v-else />
		<Footer></Footer>
	</div>
		<div v-else id="app2" :class="{'hide-menu':!isMenuVisible}">
		<Header title="Blog - Mente Atual"  :hideToggle="false" :hideUserDropdown="true"></Header>
		<Menu ></Menu>
		<Content  />
		<Footer></Footer>
	</div>
</template>

<script>
	import {userKey} from "./global";
	import Content from '@/components/template/Content'
	import Footer from '@/components/template/Footer'
	import Menu from '@/components/template/Menu'
	import Header from '@/components/template/Header'
	import Loading from "@/components/template/Loading"
	import {mapState} from 'vuex'

	// the main Calender App found here

	// ded for calendar locale
	export default {
	name: "App",
	components:{Content,Header,Footer,Menu,Loading},
		computed: mapState(['isMenuVisible','user','blog','update']),
		data(){
			return{
				validatingToken:true,
				componentKey: false,
			}
		},
		methods: {
			async validateToken(){
				this.validatingToken = true

				const json = localStorage.getItem(userKey)
				const userData = JSON.parse(json)
				this.$store.commit('setUser',null)

				if(!userData){
					this.validatingToken = false;
					//return this.$router.push({name:'auth'})
					return;
				}

				console.log("here")

				const res = await this.$http.post(`/auth/validateToken/${userData.token}`)

				if (res.data) {
					this.$store.commit('setUser', userData)

					if(this.$mq === 'xs' || this.$mq === 'sm') {
						this.$store.commit('toggleMenu', false)
					}
				} else {
					localStorage.removeItem(userKey)
					this.$router.push({ name: 'auth' })
				}

				this.validatingToken = false
			}
		},

		created() {
			this.validateToken()
		}
	}
</script>

<style>
	*{
		font-family: "Lato", "sans-serif";
	}

	body{
		margin: 0;
	}

	#app2{
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;

		height: 100vh;
		display: grid;
		grid-auto-rows: 60px 1fr 40px;
		grid-auto-columns: 260px 1fr;
		grid-template-areas:
				"header header"
				"menu content"
				"menu footer";
	}

	#app2.hide-menu{
		grid-template-areas:
				"header header"
				"content content"
				"footer footer";
	}

	#app{
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;

		height: 100vh;
		display: grid;
		grid-auto-rows: 60px 1fr 40px;
		grid-auto-columns: 300px 1fr;
		grid-template-areas:
				"header header"
				"menu content"
				"menu footer";
	}

	#app.hide-menu{
		grid-template-areas:
				"header header"
				"content content"
				"footer footer";
	}
	 #app2 .content{
		 grid-area: content;
		 background-color: white;
		 padding: 20px;

	 }

</style>