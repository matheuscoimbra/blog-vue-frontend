<template>
    <div clas="home" >
        <PageTitle icon="fa fa-home" main="Dashboard" sub="Base de Conhecimento"></PageTitle>
    </div>
</template>

<script>
    import PageTitle from '../template/PageTitle'
    import Stat from './Stat'
    import axios from 'axios'
    import {baseApiUrl} from "@/global";

    export default {
        name: "Home",
        components:{PageTitle,Stat},
        data(){
            return{
                stat:{}
            }
        }
    }
</script>

<style scoped>

</style>