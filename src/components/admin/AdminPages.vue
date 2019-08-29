<template>
    <div class="admin-pages">
        <PageTitle icon="fa fa-cogs" main="Administração do Sistema" sub="Cadastros & Cia "></PageTitle>
        <div class="admin-page-tabs">
            <b-card no-body>
                <b-tabs card>
                    <b-tab title="Artigos" active>
                        <ArticleAdmin></ArticleAdmin>
                    </b-tab>
                    <b-tab title="Categorias">
                        <CategoryAdmin></CategoryAdmin>
                    </b-tab>
                    <b-tab title="Usuários">
                        <UserAdmin></UserAdmin>
                    </b-tab>
                    <b-tab title="Calendario">
                        <CalendarAdmin></CalendarAdmin>
                    </b-tab>
                </b-tabs>
            </b-card>
        </div>
    </div>
</template>

<script>
    import PageTitle from '../template/PageTitle'
    import ArticleAdmin from './ArticleAdmin'
    import CategoryAdmin from './CategoryAdmin'
    import UserAdmin from './UserAdmin'
    import CalendarAdmin from "./CalendarTemp";

    export default {
        name: "AdminPages",
        components:{CalendarAdmin, PageTitle, ArticleAdmin, CategoryAdmin, UserAdmin}
    }
</script>

<style scoped>

</style>