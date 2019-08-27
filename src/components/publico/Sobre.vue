<template>
    <div>
    <h1>Sobre</h1>
        <p>Bacon ipsum dolor amet filet mignon turducken kevin venison, buffalo chicken ham hock.
            Tongue pork chuck kevin jerky andouille beef flank meatloaf jowl tri-tip. Buffalo biltong
            jowl beef ribs pork loin shank chicken. Porchetta tenderloin chuck ground round beef shank
            tri-tip filet mignon burgdoggen drumstick short ribs kielbasa ham hock venison. Pig filet mignon
            ball tip pork chop beef tri-tip. Capicola t-bone porchetta doner andouille pork belly. Salami
            t-bone pig beef ribs short loin fatback swine chuck shoulder cow tongue meatloaf ham hock cupim.</p>

        <p>Landjaeger shoulder short ribs porchetta. Spare ribs drumstick turkey,
            prosciutto venison capicola leberkas ham hock landjaeger ham kevin strip
            steak andouille brisket meatball. Porchetta shankle capicola tenderloin, corned
            beef biltong pork chop turkey fatback t-bone ground round filet mignon cow. Leberkas
            t-bone short ribs jerky kevin. Leberkas t-bone short loin hamburger ham drumstick.
            Biltong burgdoggen ground round short loin shank boudin chicken. Landjaeger
            spare ribs beef ribs leberkas drumstick boudin kevin ground round fatback pig burgdoggen andouille beef picanha.</p>

        <p>Turkey corned beef pastrami cupim swine biltong. Sirloin tri-tip tenderloin beef.
            Tongue brisket ham pork belly sirloin cupim fatback. Cow cupim boudin, biltong pork
            belly ground round spare ribs tenderloin ham drumstick.</p>
    </div>
</template>

<script>
    export default {
        name: "Sobre",
        created() {
            this.$store.commit('setBlog',true)
            this.$store.commit('toggleMenu',true)
        }
    }
</script>

<style scoped>

</style>