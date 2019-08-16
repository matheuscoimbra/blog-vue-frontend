<template>
    <div class="articles-by-category">
        <PageTitle icon="fa fa-folder-o"
                   :main="category.nome" sub="Categoria" />
    </div>
</template>

<script>
    import PageTitle from '../template/PageTitle'
    export default {
        name: "ArticlesByCategory",
        components:{PageTitle},
        data(){
            return{
                category:{},
                articles:[],
                page:0,
                loadMore:true,
                count:0,
                limit:5
            }
        },
        methods:{
            getCategory() {

                this.$http.get(`/artigo/${this.category.id}/artigos`,{ params: {
                        page:this.page-1,
                        size:this.limit
                    }}).then(res => {

                    this.category = res.data.categoria
                    console.log(this.category)
                    this.count = res.data.artigosDTOPage.totalElements
                    this.limit = res.data.artigosDTOPage.pageable.pageSize
                })
            },
        },
        mounted() {
            this.category.id = this.$route.params.id
            this.getCategory()
        }
    }
</script>

<style scoped>

</style>