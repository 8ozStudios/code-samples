<template>
    <div class="telehealth-review">
        <div class="contained">
            <b-container>
                <b-row>
                    <b-col>
                        <prismic-content :content="processedReviewContent" />
                    </b-col>
                </b-row>
            </b-container>
            <b-container>
                <b-row align-v="center">
                    <b-col sm class="fitvids">
                        <div v-if="video" v-html="video.html" />
                    </b-col>
                    <b-col sm class="centered">
                        <div>
                            <a-div
                                class="what-to-expect btn btn-secondary rounded-pill"
                                :href="review_primary_cta_link"
                            >
                                {{ review_primary_cta_text }}
                            </a-div>
                        </div>
                        <div>
                            <a-div
                                :href="review_secondary_cta_link"
                                class="faq"
                            >
                                {{ review_secondary_cta_text }}
                            </a-div>
                        </div>
                    </b-col>
                </b-row>
            </b-container>
        </div>
    </div>
</template>

<script>
import fitvids from 'fitvids'

export default {
    props: [
        'review_primary_content',
        'video',
        'review_primary_cta_text',
        'review_primary_cta_link',
        'review_secondary_cta_text',
        'review_secondary_cta_link',
    ],
    async mounted() {
        await this.$nextTick()
        fitvids('.fitvids')
    },
    watch: {
        async video() {
            await this.$nextTick()
            fitvids('.fitvids')
        },
    },
    computed: {
        processedReviewContent() {
            if (!this.review_primary_content) return []
            const userFirstName =
                _get(this.$store.state.auth, 'user.given_name') || 'Patient'
            return this.review_primary_content.map((tag) => {
                let replacement = { ...tag }
                if (replacement.text) {
                    replacement.text = String(tag.text).replace(
                        /\[first_name\]/,
                        userFirstName
                    )
                }
                return replacement
            })
        },
    },
}
</script>

<style lang="scss">
.telehealth-review {
    padding-bottom: 50px;

    h1,
    h2,
    h3,
    h4,
    h5 {
        margin-bottom: 25px;
    }
    .prismic-content {
        margin-bottom: 30px;
    }
    .what-to-expect {
        font-weight: 500;
        width: 250px;
        font-size: 1rem;
        margin-bottom: 1.3rem;
    }
    .faq {
        color: #000000;
        font-weight: 500;
    }
    .centered.col {
        text-align: center;
    }
}

@include bp(s) {
    .telehealth-review {
        .what-to-expect {
            margin-top: 30px;
            width: 100%;
        }
        .faq {
            display: block;
            text-align: center;
        }
    }
}
</style>
