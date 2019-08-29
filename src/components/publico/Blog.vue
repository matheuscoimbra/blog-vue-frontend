<template>
    <div clas="blog" >
        <PageTitle icon="fa fa-home" main="Tecnologia e Outras Paradinhas" sub="Últimas Postagens"></PageTitle>
        <div class="artigos">
            <ul>
                <li v-for="article in articles" :key="article.id">
                    <ArticleItem :article="article" />
                </li>
                <b-pagination size="md" v-model="page" :total-rows="count" :per-page="limit" />
                <p class="mt-3">Página Atual: {{ page }}</p>
            </ul>
        </div>
    </div>
</template>

<script>
import PageTitle from '../template/PageTitle'
import ArticleItem from '../article/ArticleItem'
    export default {
        name: "Blog",
        components:{PageTitle,ArticleItem},
        data(){
            return{
                articles:[],
                page:0,
                loadMore:true,
                count:0,
                limit:3
            }
        },
        methods:{
            getCategory() {

                this.$http.get('/artigo/pagina',{ params: {
                        page:this.page-1,
                        size:this.limit
                    }}).then(res => {
                    this.articles = res.data.content
                    console.log(this.articles)
                    this.count = res.data.totalElements
                    this.limit = res.data.pageable.pageSize
                })
            }
        },
        watch: {
            page() {
                this.getCategory()
            }
        },
        mounted() {
            this.$store.commit('setBlog',true)
            this.$store.commit('toggleMenu',true)
            this.getCategory()
        }
    }


</script>

<style >
    .header{
        grid-area: header;
        background: #22577a;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    #app2 .header{
        background: #44a0ef;
    }

    .artigos ul {
        list-style-type: none;
        padding: 0px;
    }

    #app2 .menu {
        grid-area: menu;
        background: #86c7ff;

        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
    }

     span.article-item-data{
        font-size: 10px;
         color: white;
        background-color: #2fc483;
         border-radius: 10px;
         margin-right: auto;
         padding: 2px;
    }
</style>