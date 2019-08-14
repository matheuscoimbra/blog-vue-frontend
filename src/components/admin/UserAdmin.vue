<template>
    <div class="user-admin">
        <b-form>
            <b-row>
                <b-form-group
                        label-cols-lg="3"
                        label="Usuário"
                        label-size="lg"
                        label-class="font-weight-bold pt-0"
                        class="mb-0"
                > </b-form-group>
            </b-row>
            <input id="user-id" type="hidden" v-model="user.id" />
            <b-row>
                <b-col md="6" sm="12">
                    <b-form-group label="Nome:" label-for="user-name">
                        <b-form-input id="user-name" type="text"
                                      v-model="user.nome" required
                                      :readonly="mode === 'remove'"
                                      placeholder="Informe o Nome do Usuário..." />
                    </b-form-group>
                </b-col>
                <b-col md="6" sm="12">
                    <b-form-group label="E-mail:" label-for="user-email">
                        <b-form-input id="user-email" type="text"
                                      v-model="user.email" required
                                      :readonly="mode === 'remove'"
                                      placeholder="Informe o E-mail do Usuário..." />
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col md="6" sm="12">
                <b-form-group label="CPF:" label-for="user-cpfOuCnpj">
                    <b-form-input id="user-cpfOuCnpj" type="text"
                                  v-model="user.cpfOuCnpj" required
                                  :readonly="mode === 'remove'"
                                  placeholder="Informe o CPF do Usuário..." />
                </b-form-group>
                </b-col>
                <b-col md="6" sm="12">
            <b-form-checkbox id="user-admin" v-show="mode === 'save'"
                             v-model="user.admin" class="mt-3 mb-3">
                Administrador?
            </b-form-checkbox>
                </b-col>

            </b-row>
            <b-row v-show="mode === 'save'">
                <b-col md="6" sm="12">
                    <b-form-group label="Senha:" label-for="user-password">
                        <b-form-input id="user-password" type="password"
                                      v-model="user.senha" required
                                      placeholder="Informe a Senha do Usuário..." />
                    </b-form-group>
                </b-col>
                <b-col md="6" sm="12">
                    <b-form-group label="Confirmação de Senha:"
                                  label-for="user-confirm-password">
                        <b-form-input id="user-confirm-password" type="password"
                                      v-model="user.senha" required
                                      placeholder="Confirme a Senha do Usuário..." />
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-form-group
                        label-cols-lg="3"
                        label="Endereço"
                        label-size="lg"
                        label-class="font-weight-bold pt-0"
                        class="mb-0"
                > </b-form-group>
            </b-row>
            <b-row>
                <b-col md="6" sm="12">
                    <b-form-group label="Logradouro:" label-for="user-logradouro">
                        <b-form-input id="user-logradouro" type="text"
                                      v-model="user.logradouro" required
                                      :readonly="mode === 'remove'"
                                      placeholder="Informe o Logradouro do Usuário..." />
                    </b-form-group>
                </b-col>
                <b-col md="6" sm="12">
                    <b-form-group label="Cep:" label-for="user-cep">
                        <b-form-input id="user-cep" type="text"
                                      v-model="user.cep" required
                                      :readonly="mode === 'remove'"
                                      placeholder="Informe o Cep do Usuário..." />
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col md="6" sm="12">
                    <b-form-group label="Complemento:" label-for="user-complemento">
                        <b-form-input id="user-complemento" type="text"
                                      v-model="user.complemento" required
                                      :readonly="mode === 'remove'"
                                      placeholder="Informe o Complemento" />
                    </b-form-group>
                </b-col>
                <b-col md="6" sm="12">
                    <b-form-group label="Nº:" label-for="user-numero">
                        <b-form-input id="user-numero" type="number"
                                      v-model="user.numero" required
                                      :readonly="mode === 'remove'"
                                      placeholder="Informe o numero" />
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col md="6" sm="12">
                    <b-form-group label="Municipio:" label-for="user-municipio">
                        <b-form-select id="user-municipio"  v-model="user.mununicipioId">
                            <template slot="first">
                                <option :value="null" disabled>-- Selecione seu Município --</option>
                            </template>
                            <option v-for="municipio in options" v-bind:value="municipio.id">
                                {{ municipio.nome }}
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
        <b-table hover striped :items="users" :fields="fields">
            <template slot="actions" slot-scope="data">
                <b-button variant="warning" @click="loadUser(data.item)" class="mr-2">
                    <i class="fa fa-pencil"></i>
                </b-button>
                <b-button variant="danger" @click="loadUser(data.item, 'remove')">
                    <i class="fa fa-trash"></i>
                </b-button>
            </template>
        </b-table>
    </div>
</template>

<script>
    import { showError } from '@/global'
    export default {
        name: "UserAdmin",
        data(){
            return{
                mode: 'save',
                user: {},
                users: [],
                selected: null,
                options: [],
                fields: [
                    { key: 'id', label: 'Código', sortable: true },
                    { key: 'nome', label: 'Nome', sortable: true },
                    { key: 'email', label: 'E-mail', sortable: true },
                    { key: 'perfil', label: 'Administrador', sortable: true,
                        formatter: value => value ? 'Sim' : 'Não' },
                    { key: 'actions', label: 'Ações' }
                ]
            }
        },

        methods:{
            loadMunicipios(){
                this.$http.get('/municipios').then(
                    res => {
                        this.options = res.data;
                        console.log(this.options)
                    }
                )


                console.log(this.options)
            },
            loadUsers(){
                this.$http.get('/usuarios').then(
                    res => {
                        this.users = res.data;
                        console.log(this.users)
                    }
                )
            },
            reset() {
                this.mode = 'save'
                this.user = {}
                this.loadUsers()
            },
            save() {
                const method = this.user.id ? 'put' : 'post'
                const id = this.user.id ? `/${this.user.id}` : ''
                console.log(this.user)
                this.$http[method](`/usuarios${id}`, this.user)
                    .then(() => {
                        this.$toasted.global.defaultSuccess()
                        this.reset()
                    })
                    .catch(showError)
            },
            remove() {
                const id = this.user.id
                this.$http.delete(`/usuarios/${id}`)
                    .then(() => {
                        this.$toasted.global.defaultSuccess()
                        this.reset()
                    })
                    .catch(showError)
            },
            loadUser(user, mode = 'save') {
                this.mode = mode
                this.user = { ...user }
            }
        },
        mounted() {
            this.loadUsers(),
                this.loadMunicipios();
        }
    }


</script>

<style>

</style>