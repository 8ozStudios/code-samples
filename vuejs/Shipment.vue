<template>
    <div class="telehealth-shipment">
        <div class="contained">
            <b-container>
                <b-row>
                    <b-col>
                        <!-- This comes from API data probably? Keep static for now. -->
                        <h1>
                            Welcome Back, your continuous glucose monitor‎
                            should arrive tomorrow!
                        </h1>
                        <h3>Expected Arrival: May 23</h3>
                        <h5>
                            Tracking number:
                            <span class="number">1231278hdS</span>
                        </h5>
                        <!-- End API Data -->
                    </b-col>
                </b-row>
            </b-container>
            <b-container>
                <b-row align-v="center">
                    <b-col sm class="app-screenshot">
                        <prismic-image v-bind="shipment_image" />
                    </b-col>
                    <b-col sm="8" class="app-links-wrapper">
                        <prismic-content
                            :content="shipment_download_app_copy"
                        />
                        <div class="app-button-wrapper">
                            <a-div
                                v-if="google_play_link"
                                :href="google_play_link"
                                class="app-download-btn"
                            >
                                <img src="/images/GooglePlay.png" />
                            </a-div>
                            <a-div
                                v-if="app_store_link"
                                :href="app_store_link"
                                class="app-download-btn"
                            >
                                <img src="/images/AppStore.png" />
                            </a-div>
                        </div>
                    </b-col>
                </b-row>
            </b-container>
        </div>
    </div>
</template>

<script>
export default {
    props: [
        'shipment_image',
        'shipment_download_app_copy',
        'google_play_link',
        'app_store_link',
    ],
}
</script>

<style lang="scss">
.telehealth-shipment {
    margin-bottom: 3.125rem;
    h1,
    h3,
    h5 {
        text-align: center;
    }
    h1 {
        font-size: 1.8125rem;
        line-height: 2.125rem;
        margin-bottom: 1.875rem;
    }
    h3 {
        font-size: 1.875rem;
        line-height: 2.1875rem;
        margin-bottom: 1.25ren;
    }
    h5 {
        font-size: 1.5rem;
        color: #999;
        span {
            color: var(--blue);
        }
    }
    .app-screenshot {
        .prismic-image {
            width: 210px;
            max-width: 100%;
            margin: auto;
        }
    }
    .app-links-wrapper {
        h1,
        h2,
        h3,
        h4,
        h5 {
            text-align: left;
            margin-bottom: 1.875rem;
        }
        .app-download-btn {
            img {
                height: 70px;
                margin-right: 1.5625rem;
            }
        }
    }
}

@include bp(s) {
    .telehealth-shipment {
        .app-screenshot {
            .prismic-image {
                width: 250px;
            }
        }
        .app-button-wrapper {
            text-align: center;
            a {
                display: block;
                margin-bottom: 25px;
            }
        }
    }
}
</style>
