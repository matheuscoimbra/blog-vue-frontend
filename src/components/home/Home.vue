<template>
    <div class="home" >
        <PageTitle icon="fa fa-home" main="Dashboard" sub="Base de Conhecimento"></PageTitle>
        <div class="stats">
            <Stat title="Categorias" :value="stat.categoria" icon="fa fa-folder" color="#d54d50"></Stat>
            <Stat title="Artigos" :value="stat.artigos" icon="fa fa-file" color="#3bc480"></Stat>
            <Stat title="Usuários" :value="stat.usuarios" icon="fa fa-user" color="#3282cd"></Stat>
        </div>
        <div class="calendar">
            <CalendarAdmin></CalendarAdmin>
        </div>
    </div>
</template>

<script>
    import PageTitle from '../template/PageTitle'
    import Stat from './Stat'
    import CalendarAdmin from "../admin/CalendarTemp";
    export default {
        name: "Home",
        components:{PageTitle,Stat,CalendarAdmin},
        data(){
            return{
                stat:{}
            }
        },
        methods:{
            getStats(){
                return this.$http.get('/estatisticas').then(
                    res => this.stat = res.data
                )
            }
        },
        mounted() {
            this.getStats()
        }
    }
</script>

<style >
    .stats {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }

    .calendar{
        display: flex;
        background-color: white;
        border: 1px #777777;
        border-radius: 10px;
    }
</style>