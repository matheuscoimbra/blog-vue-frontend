<template>
    <footer class="footer">
        <span>Copyright<strong>mcm</strong>© 2019</span>
    </footer>
</template>

<script>
    export default {
        name: "Footer"
    }
</script>

<style>
    .footer{
        grid-area: footer;
        background-color: #ddd;
        color: #333;

        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding-right: 10px;
    }

</style>