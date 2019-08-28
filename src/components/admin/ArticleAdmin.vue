<template>
    <div class="article-admin">
        <b-form>
            <input id="article-id" type="hidden" v-model="article.id" />
            <b-form-group label="Nome:" label-for="article-name">
                <b-form-input id="article-name" type="text"
                              v-model="article.nome" required
                              :readonly="mode === 'remove'"
                              placeholder="Informe o Nome do Artigo..." />
            </b-form-group>
            <b-form-group label="Descrição" label-for="article-description">
                <b-form-input id="article-description" type="text"
                              v-model="article.descricao" required
                              :readonly="mode === 'remove'"
                              placeholder="Informe o Nome do Artigo..." />
            </b-form-group>
            <b-form-group v-if="mode === 'save'"
                          label="Imagem (URL):" label-for="article-imageUrl">
                <b-form-input id="article-imageUrl" type="text"
                              v-model="article.url" required
                              :readonly="mode === 'remove'"
                              placeholder="Informe a URL da Imagem..." />
            </b-form-group>
            <b-form-group v-if="mode === 'save'"
                          label="Categoria:" label-for="article-categoryId">
                <b-form-select id="article-categoryId" v-model="article.categoria" >
                    <template slot="first">
                        <option :value="null" disabled>-- Selecione uma Categoria --</option>
                    </template>
                    <option v-for="categoria in categories" v-bind:value="categoria.id">
                        {{ categoria.nome}}
                    </option>
                </b-form-select>
            </b-form-group>
            <b-form-group v-if="mode === 'save'"
                          label="Autor:" label-for="article-userId">
                <b-form-select id="article-userId" v-model="article.usuario" >
                    <template slot="first">
                        <option :value="null" disabled>-- Selecione o Autor --</option>
                    </template>
                    <option v-for="autor in users" v-bind:value="autor.id">
                        {{ autor.nome}}
                    </option>
                </b-form-select>
            </b-form-group>
            <b-form-group v-if="mode === 'save'"
                          label="Conteúdo" label-for="article-content">
                <VueEditor v-model="article.conteudo"
                           placeholder="Informe o Conteúdo do Artigo..." />
            </b-form-group>
            <b-button variant="primary" v-if="mode === 'save'"
                      @click="save">Salvar</b-button>
            <b-button variant="danger" v-if="mode === 'remove'"
                      @click="remove">Excluir</b-button>
            <b-button class="ml-2" @click="reset">Cancelar</b-button>
        </b-form>
        <br/>
        <b-row>
            <b-form-group
                    label-cols-lg="3"
                    label="Consulta"
                    label-size="lg"
                    label-class="font-weight-bold pt-0"
                    class="mb-0"
            > </b-form-group>
        </b-row>
        <b-form>
            <input id="article-id-c" type="hidden" v-model="article.id" />
            <b-form-group label="Nome:" label-for="article-name">
                <b-form-input id="article-name-c" type="text"
                              v-model="nomeArticle" required
                              placeholder="Nome do Artigo" />
            </b-form-group>
            <b-button variant="primary"
                      @click="loadArticles">Consultar</b-button>
        </b-form>
        <hr>
        <b-table id="my-table" hover striped :items="articles" :fields="fields">
            <template slot="actions" slot-scope="data">
                <b-button variant="warning" @click="loadArticle(data.item)" class="mr-2">
                    <i class="fa fa-pencil"></i>
                </b-button>
                <b-button variant="danger" @click="loadArticle(data.item, 'remove')">
                    <i class="fa fa-trash"></i>
                </b-button>
            </template>
        </b-table>
        <b-pagination size="md" v-model="page" :total-rows="count" :per-page="limit" />
        <p class="mt-3">Página Atual: {{ page }}</p>
    </div>
</template>

<script>
    import { VueEditor } from "vue2-editor"
    import {  showError } from '@/global'


    export default {
        name: 'ArticleAdmin',
        components: { VueEditor },
        data: function() {
            return {
                mode: 'save',
                article: {},
                articles: [],
                categories: [],
                users: [],
                nomeArticle:null,
                page: 0,
                limit: 3,
                count: 0,
                perPage:3,
                fields: [
                    { key: 'id', label: 'Código', sortable: true },
                    { key: 'nome', label: 'Nome', sortable: true },
                    { key: 'descricao', label: 'Descrição', sortable: true },
                    { key: 'actions', label: 'Ações' }
                ]
            }
        },
        methods: {


            loadArticles() {

                this.$http.get('artigo?',{ params: {
                        page:this.page-1,
                        size:this.limit,
                        nome:this.nomeArticle
                    }}).then(res => {

                    this.articles = res.data.content
                    this.count = res.data.totalElements
                    this.limit = res.data.pageable.pageSize
                })
            },

            reset() {
                this.mode = 'save'
                this.article = {}
                this.loadArticles()
            },
            save() {
                const method = this.article.id ? 'put' : 'post'
                const id = this.article.id ? `/${this.article.id}` : ''
                this.$http[method](`/artigo`, this.article)
                    .then(() => {
                        this.$toasted.global.defaultSuccess()
                        this.reset()
                    })
                    .catch(showError)
            },
            remove() {
                const id = this.article.id
                this.$http.delete(`/artigo/${id}`)
                    .then(() => {
                        this.$toasted.global.defaultSuccess()
                        this.reset()
                    })
                    .catch(showError)
            },
            loadArticle(article, mode = 'save') {
                this.mode = mode
                this.$http.get(`/artigo/${article.id}`).then(
                    res => {
                        this.article = res.data;

                    }
                )
                this.mode = mode
            },
            loadCategories(){
                this.$http.get('/categoria').then(
                    res => {
                        this.categories = res.data.content

                    }
                )
            },
            loadUsers(){
                this.$http.get('/usuarios').then(
                    res => {
                        this.users = res.data;
                        console.log(this.users)
                    }
                )
            }
        },
        watch: {
            page() {
                this.loadArticles()
            }
        },
        mounted() {
            this.loadUsers()
            this.loadCategories()
            this.loadArticles()
        }
    }
</script>

<style>

</style>