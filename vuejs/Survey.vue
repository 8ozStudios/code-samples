<template>
    <div class="telehealth-survey">
        <div class="contained">
            <div class="typeform" ref="typeform" v-once />
        </div>
    </div>
</template>

<script>
import * as typeformEmbed from '@typeform/embed'

export default {
    props: ['typeform_url'],
    async mounted() {
        await this.$nextTick()
        typeformEmbed.makeWidget(this.$refs.typeform, this.typeform_url, {
            hideScrollbars: true,
            onSubmit: this.onTypeformSubmit,
            hideHeaders: true,
        })
    },
    methods: {
        onTypeformSubmit(response) {
            // successful typeform submission,
            // response just carries the ID of the submission.
            this.$router.push('/telehealth?step=followup')
        },
    },
}
</script>

<style lang="scss">
.telehealth-survey {
    margin-top: -65px;
    padding-bottom: 50px;

    .typeform {
        height: 500px;
    }
}
</style>
