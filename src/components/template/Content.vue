<template>
    <div class="content">
        <transition name="moveInUp">
        <router-view ></router-view>
        </transition>
    </div>
</template>

<script>
    export default {
        name:'Content',

    };
</script>

<style>
    .content{
        grid-area: content;
        background-color: #efefef;
        padding: 20px;

    }

    .moveInUp-enter-active{
        animation: fadeIn 2s ease-in;
    }
    @keyframes fadeIn{
        0%{
            opacity: 0;
        }
        50%{
            opacity: 0.5;
        }
        100%{
            opacity: 1;
        }
    }
    .moveInUp-leave-active{
        animation: moveInUp .3s ease-in;
    }
    @keyframes moveInUp {
        0% {
            transform: translateX(0);
        }
        100% {
            transform: translateX(400px);
        }
    }

</style>
