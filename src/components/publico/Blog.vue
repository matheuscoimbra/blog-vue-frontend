<template>
    <div clas="blog" >
        <PageTitle icon="fa fa-home" main="Tecnologia e Outras Paradinhas" sub="Últimas Postagens"></PageTitle>
        <div v-if="pending" class="text-center">
            <img src="https://files.codethink.de/public/Preloader_2.gif" alt="loading" class="mx-auto">
            <span class="text-gray-400 font-medium">Carregando ...</span>
        </div>
        <div v-else class="artigos">
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
                pending: true,
                articles:[],
                page:0,
                loadMore:true,
                count:0,
                limit:3
            }
        },
        methods:{
            async   getCategory() {
                this.pending= true;
                try {
                await  this.$http.get('/artigo/pagina',{ params: {
                        page:this.page-1,
                        size:this.limit
                    }}).then(res => {
                    this.articles = res.data.content
                    console.log(this.articles)
                    this.count = res.data.totalElements
                    this.limit = res.data.pageable.pageSize
                })
            }catch(e){
                    this.articles = null
                    this.error = e;
            }this.pending = false;
        }},
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
        background: black;
        border: 1px;
        box-shadow: 0 0.25rem 0.25rem rgba(0,0,0,.25), inset 0 -1px 5px rgba(0,0,0,.25);
    }

    .artigos ul {
        list-style-type: none;
        padding: 0px;
    }
    .article-item{
        border-radius: unset !important;
        border:none !important;
        border-bottom: 1px solid rgba(0, 0, 0, 0.2) !important;

        padding: 10px !important;
    }

    .article-item:hover{
        box-shadow: 5px 5px 11px 0 rgba(0,0,0,0.75);
    }





    #app2 .menu {
        grid-area: menu;

       /* background-color: #a4b494;
        background-image: url('https://www.transparenttextures.com/patterns/batthern.png');*/
        background-color: #a4b494;
        background-image: url('~@/assets/cube.png');


        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
    }

     span.article-item-data{
        font-size: 10px;
         color: white;
        background-color: #7C7C7C;
         border-radius: 10px;
         margin-right: auto;
         padding: 2px;
    }
</style>