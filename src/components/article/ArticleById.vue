<template>
    <div class="article-by-id">
        <PageTitle icon="fa fa-file-o" :main="article.nome" :sub="article.descricao" :criacao="article.dataCriacao" :autor="article.autor" />
        <div class="article-content" v-html="article.conteudo"></div>
        <div>
            <b-button variant="outline-primary" @click="voltar">Voltar</b-button>
        </div>
        <vue-disqus v-if="blog" shortname="ktquez" :identifier="url" language="pt_BR" ></vue-disqus>
    </div>



</template>

<script>
    import PageTitle from '../template/PageTitle'
    import 'highlightjs/styles/dracula.css'
    import hljs from 'highlightjs/highlight.pack.js'
    import {mapState} from 'vuex'
    export default {
        name: "ArticleById",
        components: {PageTitle},
        computed: mapState(['blog']),
        data: function () {
            return {
                article: {},
                url:''
            }
        },
        methods:{
            voltar(){
                this.$router.go(-1)
            }
        },
        mounted() {
            console.log(this.$store.state.user)
            if(!this.$store.state.user){
                this.$store.commit('setBlog',true)
            }
            this.$store.commit('toggleMenu',true)
            this.url = `/artigo/dto/${this.$route.params.id}`,
            this.$http.get(this.url).then(
                res => {
                    this.article = res.data.data;
                    console.log( this.article)
                }
            )
        },
        updated() {
            document.querySelectorAll('.article-content pre.ql-syntax').forEach(e => {
                hljs.highlightBlock(e)
            })
        }
    }
</script>

<style >
    .article-content {
        background-color: #FFF;
        border-radius: 8px;
        padding: 25px;
    }

    .article-content pre {
        padding: 20px;
        border-radius: 8px;
        font-size: 1.2rem;
        background-color: #1e1e1e;
        color: #FFF;
    }



    .article-content img {
        max-width: 100%;
    }

    .article-content :last-child {
        margin-bottom: 0px;
    }
</style>