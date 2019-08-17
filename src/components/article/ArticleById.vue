<template>
    <div class="article-by-id">
        <PageTitle icon="fa fa-file-o" :main="article.nome" :sub="article.descricao" />
        <div class="article-content" v-html="article.conteudo"></div>
    </div>
</template>

<script>
    import PageTitle from '../template/PageTitle'

    export default {
        name: "ArticleById",
        components: {PageTitle},
        data: function () {
            return {
                article: {}
            }
        },
        mounted() {
            this.$http.get(`/artigo/dto/${this.$route.params.id}`).then(
                res => {
                    this.article = res.data.data;

                }
            )
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