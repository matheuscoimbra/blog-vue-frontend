<template>
    <div clas="blog" >
        <PageTitle icon="fa fa-home" main="Tecnologia e Outras Paradinhas" sub="Últimas Postagens"></PageTitle>
    </div>
</template>

<script>
import PageTitle from '../template/PageTitle'
    export default {
        name: "Blog",
        components:{PageTitle},
        mounted() {
            this.$store.commit('setBlog',true)
            this.$store.commit('toggleMenu',true)
        }
    }


</script>

<style scoped>

</style>