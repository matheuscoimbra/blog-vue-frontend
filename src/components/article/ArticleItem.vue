<template>
    <div class="article-item">
        <router-link :to="{ name: 'articleById', params: { id: article.id, post_slug: article.nome.replace('\s+', '-')} }">
            <div class="article-item-image d-none d-sm-block">
                <img v-if="article.url"
                     :src="article.url"
                     height="150" width="150" alt="Article">
                <img v-else
                     src="@/assets/article.jpg"
                     height="150" width="150" alt="Article">
            </div>
            <div class="article-item-info">
                <h2>{{ article.nome }}</h2>
                <p>{{ article.descricao }}</p>
                <span class="article-item-author">
                    <strong>Autor: </strong>{{ article.autor }}
                </span>
                <span class="tags" >
                    <strong>Tags: </strong><input-tag :read-only=true	 v-model="article.tags"/>
                </span>
                <span class="article-item-data" v-show="!user">
                    <strong>Publicação: </strong>{{ article.dataCriacao }}
                </span>

            </div>
        </router-link>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    export default {
        name: 'ArticleItem',
        props: ['article'],
        computed: mapState(['user']),
    }
</script>

<style>
    .article-item {
        border-radius: 8px;
        margin-bottom: 20px;
        background-color: #FFF;
        padding: 20px;
        border: 1px solid rgba(0, 0, 0, 0.2);
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
    }

    .tags{
        display: flex;
        flex-direction: row;
        text-decoration: none;
        padding-right: 5px;


    }
    .vue-input-tag-wrapper{
        border: none !important;
        padding-top: 0px !important;
    }

    .vue-input-tag-wrapper .input-tag{
        border-radius: 10px !important;
        color: white !important;
        background-color: #17a2b8 !important;
        border: 1px solid #17a2b8 !important;
    }

    .article-item a {
        display: flex;
        align-items: flex-start;
        text-decoration: none;
        color: #000;
    }

    .article-item-info h2 {
        font-size: 1.7rem;
    }

    .article-item-image {
        padding-right: 20px;
        margin-right: 20px;
        border-right: 1px solid #AAA;
    }

    .article-item-image img {
        border-radius: 5px;
    }

    .article-item-info {
        display: flex;
        align-self: stretch;
        flex-direction: column;
    }

    .article-item-info p {
        flex: 1;
        color: #555;
        font-size: 1.1rem;
    }
</style>
