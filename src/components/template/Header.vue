<template>
 <header class="header">
     <a class="toggle" @click="toggleMenu" v-if="!hideToggle">
         <i class="fa fa-lg" :class="icon"></i> </a>
         <h1 class="title">
             <router-link to="/"> {{title}}</router-link>
         </h1>
        <div id="menutop" v-if="blog">
         <h1 class="sobre" >
             <router-link to="/sobre"> Sobre</router-link>
         </h1>
        </div>
        <UserDropdown v-if="!hideUserDropdown"></UserDropdown>
 </header>
</template>

<script>
    import UserDropdown from './UserDropdown'
    import {mapState} from 'vuex'
    export default {
        name: "Header",
        components:{UserDropdown},

        props:{
            title: String,
            hideToggle: Boolean,
            hideUserDropdown: Boolean
        },
        computed:{
            ...mapState(['blog']),
            icon(){
                return this.$store.state.isMenuVisible?"fa-angle-left":"fa-angle-down"
            }
        },
        methods:{
            toggleMenu(){
                this.$store.commit('toggleMenu')
            }
        }
    }
</script>

<style>
    .header{
        grid-area: header;
        background: linear-gradient(to right, #1e469a, #49a7c1);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .title {
        font-size: 1.2em;
        color: #fff;
        font-weight: 100;
        flex-grow: 1;
        text-align: center;
    }
    #menutop {
        font-size: 1.0em;
        color: #fff;
        font-weight: 100;
        margin-right: 10px;
        flex: content;
        text-align: right;
    }
    .sobre{
        font-size: 1.0em;
        background-color: white ;
        font-weight: bold;
        color: #22577a;
        border-radius: 10px;
        padding: 5px;
    }
    .title a{
        color: white;
        text-decoration: none;
    }
    .title a:hover{
        color: white;
        text-decoration: none;
    }
    .sobre a{
        color: cornflowerblue;
        text-decoration: none;
    }
    .sobre a:hover{
        color: #22577a;;
        text-decoration: none;
    }

    header.header > a.toggle{
        width: 60px;
        height: 100%;
        color: white;
        text-decoration: none;
        justify-self: flex-start;

        display: flex;
        justify-content: center;
        align-items: center;
    }

    header.header > a.toggle:hover{
        color: white;
        background-color: rgba(0,0,0,0.2);
    }

</style>