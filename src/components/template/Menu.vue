<template>
    <aside class="menu" v-show="isMenuVisible">
        <div class="profile">
            <Gravatar email="mathcoimbr4@gmail.com"  default-img="robohash" alt="Nobody"></Gravatar>
            <h3>Matheus Coimbra</h3>
            <p class="title">Desenvolvedor</p>
            <div style="margin: 24px 0;">
                <a href="#"><i class="fa fa-dribbble"></i></a>
                <a href="#"><i class="fa fa-twitter"></i></a>
                <a href="#"><i class="fa fa-linkedin"></i></a>
                <a href="#"><i class="fa fa-facebook"></i></a>
            </div>
        </div>
        <div class="menu-filter">
            <i class="fa fa-search fa-lg"></i>
            <input type="text" placeholder="Digite para filtrar..."
                   v-model="treeFilter" class="filter-field">
        </div>
        <Tree :data="treeData" :options="treeOptions" :filter="treeFilter"
              ref="tree"  />
    </aside>

</template>

<script>
    import Gravatar from 'vue-gravatar'
    import {mapState} from 'vuex'
    import Tree from 'liquor-tree'
    export default {
        name: "Menu",
        components:{Tree,Gravatar},
        computed: mapState(['isMenuVisible','update']),
        data(){
            return{
                treeFilter: '',
                treeData: this.getTreeData(),
                componentKey: 0,
                treeOptions: {
                    propertyNames: { 'text': 'nome' },
                    filter: { emptyText: 'Categoria não encontrada' }
                }
            }
        },
        methods: {
            getTreeData(){
                return this.$http.get('/categoria/tree').then(res=> res.data

              )
            },

            mountTree(){
                 this.$refs.tree.$on('node:selected', this.onNodeSelect)
            },

            onNodeSelect(node) {
                this.$router.push({
                    name: 'articlesByCategory',
                    params: { id: node.id }
                })

                if(this.$mq === 'xs' || this.$mq === 'sm') {
                    this.$store.commit('toggleMenu', false)
                }
            }
        },
        watch:{
            update(newValue, oldValue){
                console.log(`Updating from ${oldValue} to ${newValue}`);
                this.treeData = this.getTreeData();
                this.$store.commit('setUpdate', false);

            }

        },
        mounted() {
            this.mountTree()
        }

    }
</script>

<style>
    .menu {
        grid-area: menu;
        background: linear-gradient(to right, #232526, #414345);

        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
    }

    .menu a,
    .menu a:hover {
        color: #fff;
        text-decoration: none;
    }

    .menu .tree-node.selected > .tree-content,
    .menu .tree-node .tree-content:hover {
        background-color: rgba(255, 255, 255, 0.2);
    }

    .tree-arrow.has-child {
        filter: brightness(2);
    }

    .menu .menu-filter {
        display: flex;
        justify-content: center;
        align-items: center;

        margin: 20px;
        padding-bottom: 8px;
        border-bottom: 1px solid #AAA;
    }

    .menu .menu-filter i {
        color: #AAA;
        margin-right: 10px;
    }

    .menu input {
        color: #CCC;
        font-size: 1.3rem;
        border: 0;
        outline: 0;
        width: 100%;
        background: transparent;
    }

    .tree-filter-empty {
        color: #CCC;
        font-size: 1.3rem;
        margin-left: 20px;
    }

    .profile {
        box-shadow: 0 4px 8px 0 rgba(241, 241, 241, 0.09);
        max-width: 300px;
        text-align: center;
        font-family: arial;
        color: #fff;

    }

    .title {
        color: grey;
        font-size: 18px;
    }

</style>