<template>
    <div class="category-admin">
        <b-form>
            <b-row>
                <b-form-group
                        label-cols-lg="3"
                        label="Categoria"
                        label-size="lg"
                        label-class="font-weight-bold pt-0"
                        class="mb-0"
                > </b-form-group>
            </b-row>
            <input id="category-id" type="hidden" v-model="category.id" />
            <b-row>
                <b-col xs="12">
                    <b-form-group label="Nome:" label-for="category-name">
                        <b-form-input id="category-name" type="text"
                                      v-model="category.nome" required
                                      :readonly="mode === 'remove'"
                                      placeholder="Informe o Nome da Categoria..." />
                    </b-form-group>
                </b-col>

            </b-row>

            <b-row v-if="mode === 'save'">
                <b-col md="6" sm="12">
                    <b-form-group label="Categoria Pai:" label-for="category-pai">
                        <b-form-select id="category-pai"  v-model="category.parentId"  :readonly="mode === 'remove'">
                            <template slot="first">
                                <option :value="null" disabled>-- Selecione Categoria Pai --</option>
                            </template>
                            <option v-for="categoria in categoriesOpt" v-bind:value="categoria.id" >
                                  {{ categoria.path}}
                            </option>
                        </b-form-select>
                    </b-form-group>
                </b-col>

            </b-row>

            <b-row>
                <b-col xs="12">
                    <b-button variant="primary" v-if="mode === 'save'"
                              @click="save">Salvar</b-button>
                    <b-button variant="danger" v-if="mode === 'remove'"
                              @click="remove">Excluir</b-button>
                    <b-button class="ml-2" @click="reset">Cancelar</b-button>
                </b-col>
            </b-row>
        </b-form>
        <hr>
        <div class="overflow-auto">

        <b-table id="my-table" hover striped :items="categories" :fields="fields">
            <template slot="actions" slot-scope="data">
                <b-button variant="warning" @click="loadCategory(data.item)" class="mr-2">
                    <i class="fa fa-pencil"></i>
                </b-button>
                <b-button variant="danger" @click="loadCategory(data.item, 'remove')">
                    <i class="fa fa-trash"></i>
                </b-button>
            </template>
        </b-table>
            <b-pagination size="md" v-model="page" :total-rows="count" :per-page="limit" />

            <p class="mt-3">Página Atual: {{ page }}</p>
        </div>
    </div>
</template>

<script>
    import { showError } from '@/global'
    export default {
        name: "CategoryAdmin",
        data(){
            return{
                mode: 'save',
                category: {},
                categories: [],
                categoriesOpt: [],
                selected: null,
                options: [],
                page: 0,
                limit: 3,
                count: 0,
                perPage:3,
                fields: [
                    { key: 'id', label: 'Código', sortable: true },
                    { key: 'nome', label: 'Nome', sortable: true },
                    { key: 'path', label: 'Caminho', sortable: true },
                    { key: 'actions', label: 'Ações' }
                ]
            }
        },

        methods:{


            loadCategoriesList(){

                this.$http.get('/categoria/list').then(
                    res => {
                        this.categoriesOpt = res.data
                    }
                )
            },

            loadCategories(){

                this.$http.get('/categoria?',{ params: {
                        page:this.page-1,
                        size:this.limit
                    }}).then(
                    res => {
                        this.categories = res.data.content
                        this.count = res.data.totalElements
                        this.limit = res.data.pageable.pageSize

                    }
                )
            },
            reset() {
                this.mode = 'save'
                this.category = {}
                this.loadCategories()
            },
            save() {
                const method = this.category.id ? 'put' : 'post'
                const id = this.category.id ? `/${this.category.id}` : ''

                this.$http[method](`/categoria${id}`, this.category)
                    .then(() => {
                        this.$toasted.global.defaultSuccess()
                        this.$store.commit('setUpdate', true)
                        this.loadCategoriesList()
                        this.reset()
                    })
                    .catch(showError)
            },
            remove() {
                const id = this.category.id

                this.$http.delete(`/categoria/${id}`)
                    .then(() => {
                        this.$toasted.global.defaultSuccess()
                        this.loadCategoriesList()
                        this.$store.commit('setUpdate', true)
                        this.reset()
                    })
                    .catch(showError)
            },
            loadCategory(category, mode = 'save') {
                this.$http.get(`/categoria/${category.id}`).then(
                    res => {
                        this.category = res.data;

                    }
                )
                this.mode = mode
                //this.user = { ...this.user}

            }
        },
        computed: {
            rows() {

                return this.totalPages
            },

            pageSize(){

                return this.totalItems
            }
        },
        watch: {
            page() {
                this.loadCategories()
            }
        },
        mounted() {
            this.loadCategories()
            this.loadCategoriesList()
        }
    }


</script>

<style>

</style>