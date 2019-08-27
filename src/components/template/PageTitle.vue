<template>
    <div class="page-title">
        <h1><i v-if="icon" :class="icon"></i>{{main}}</h1>
        <h2>{{sub}}</h2>
        <div class="info" v-if="autor">
            <span class="infospan"><strong>Autor:</strong> {{autor}}
          <strong>Data publicação:</strong> {{criacao}}</span>
        </div>
        <hr>
    </div>
</template>

<script>
    export default {
        name: "PageTitle",
        props:['icon','main','sub','autor','criacao']
    }
</script>

<style>
    .page-title h1{
        margin: 0px;
    }

    .page-title h2{
        color: #777;
        margin-top: 5px;
        font-size: 1.3rem;
    }

    .info{
        display: flex;
        flex-flow: row;
        margin:10px 0px -10px 0px ;
        padding: 2px;
    }
    .infospan{
        color: white;
        font-size: small;
        padding: 4px;
        margin-right: 10px;
        background-color: #2fc483;
        border-radius: 10px;
    }



</style>