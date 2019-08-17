<template>
    <div class="articles-by-category">
        <PageTitle icon="fa fa-folder-o"
                   :main="category.nome" sub="Categoria" />
        <ul>
            <li v-for="article in articles" :key="article.id">
                <ArticleItem :article="article" />
            </li>

        </ul>
        <div class="load-more">
            <button v-if="loadMore"
                    class="btn btn-lg btn-outline-primary"
                    @click="getCategory">Carregar Mais Artigos</button>
        </div>
    </div>
</template>

<script>
    import PageTitle from '../template/PageTitle'
    import ArticleItem from './ArticleItem'

    export default {
        name: "ArticlesByCategory",
        components:{PageTitle,ArticleItem},
        data(){
            return{
                category:{},
                articles:[],
                page:0,
                loadMore:true,
                count:0,
                limit:3
            }
        },
        methods:{
            getCategory() {

                this.$http.get(`/artigo/${this.category.id}/artigos`,{ params: {
                        page:this.page,
                        size:this.limit
                    }}).then(res => {
                    this.articles = this.articles.concat(res.data.artigosDTOPage.content)
                    this.page++
                    this.category = res.data.categoria
                    console.log(this.articles)
                    this.count = res.data.artigosDTOPage.totalElements
                    this.limit = res.data.artigosDTOPage.pageable.pageSize
                    if(res.data.artigosDTOPage.content.length === 0) this.loadMore = false
                })
            },
        },
        mounted() {
            this.category.id = this.$route.params.id
            this.getCategory()
        }
    }
</script>

<style>
    .articles-by-category ul {
        list-style-type: none;
        padding: 0px;
    }

    .articles-by-category .load-more {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 25px;
    }
</style>