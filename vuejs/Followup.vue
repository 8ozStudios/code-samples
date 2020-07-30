<template>
    <div class="telehealth-followup">
        <div class="contained">
            <prismic-content class="entry" :content="followup_content" />
            <nuxt-link
                class="btn btn-secondary rounded-pill"
                to="/telehealth?step=payment"
                >Continue</nuxt-link
            >
        </div>
    </div>
</template>

<script>
export default {
    props: ['followup_content'],
}
</script>

<style lang="scss">
.telehealth-followup {
    margin-top: 100px;
    .btn {
        width: 430px;
        margin: 50px auto;
        display: block;
    }
}

@include bp(s) {
    .telehealth-followup {
        margin-top: 25px;
        .btn {
            width: 100%;
        }
    }
}
</style>
