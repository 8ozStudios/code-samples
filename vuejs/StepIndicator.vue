<template>
    <section class="onboarding-step-indicator">
        <b-container fluid class="contained">
            <b-row>
                <b-col
                    v-for="(item, index) in navItems"
                    :key="index"
                    :class="getStepClass(item, index)"
                >
                    <div class="step-circle">{{ index + 1 }}</div>
                    <div class="step-title">{{ item }}</div>
                </b-col>
            </b-row>
        </b-container>
    </section>
</template>

<script>
import { kebabCase as _kebabCase } from 'lodash'

export default {
    props: {
        step: {
            type: String,
            default: 'get-started',
        },
    },
    methods: {
        getStepClass(name, index) {
            let classes = []
            classes.push('step-' + (index + 1))
            classes.push(_kebabCase(name) === this.step ? 'active' : '')
            return classes.join(' ')
        },
    },
    data() {
        return {
            navItems: [
                'Get Started',
                'Telehealth visit',
                'Payment',
                'Telehealth review',
                'Shipment',
            ],
        }
    },
}
</script>

<style lang="scss">
.onboarding-step-indicator {
    margin-bottom: 75px;
    .container-fluid {
        .row {
            .col {
                text-align: center;
                &:first-child::before {
                    display: none;
                }
                &:last-child::after {
                    display: none;
                }
                &::before,
                &:after {
                    content: ' ';
                    display: block;
                    width: 50%;
                    border-bottom: 2px solid #c9c9c9;
                    position: absolute;
                    top: 32px;
                    z-index: 0;
                }
                &::before {
                    left: 0;
                }
                &::after {
                    right: 0;
                }
                .step-circle {
                    width: 37px;
                    height: 37px;
                    background-color: #c9c9c9;
                    border-radius: 100%;
                    color: transparent;
                    display: inline-block;
                    margin: 13.5px 0;
                    z-index: 1;
                    position: relative;
                }
                .step-title {
                    margin-top: 25px;
                    color: #686565;
                    font-size: 0.9rem;
                    line-height: 1.2rem;
                }
                &.active {
                    .step-circle {
                        color: #ffffff;
                        width: 64px;
                        height: 64px;
                        background-color: var(--blue);
                        margin: 0;
                        font-size: 1.9rem;
                        font-weight: bold;
                        padding: 8px;
                    }
                    .step-title {
                        color: var(--blue);
                    }
                }
                &.step-5.active {
                    .step-circle {
                        color: transparent;
                        background-image: url(/images/package.svg);
                        background-repeat: no-repeat;
                        background-position: center center;
                        background-size: 40px;
                    }
                }
            }
        }
    }
}
@include bp(s) {
    .onboarding-step-indicator {
        margin: 0 6% 15px;
        .container-fluid {
            .row {
                .col {
                    padding: 0;
                    &::before,
                    &:after {
                        top: 25px;
                    }
                    .step-circle {
                        width: 20px;
                        height: 20px;
                        margin-top: 16px;
                    }
                    .step-title {
                        display: none;
                    }
                    &.active {
                        .step-circle {
                            width: 50px;
                            height: 50px;
                            font-size: 1.45rem;
                        }
                        .step-title {
                            display: block;
                            margin-top: 13px;
                            font-size: 0.8rem;
                        }
                    }

                    &.step-5.active {
                        .step-circle {
                            background-size: 30px;
                        }
                    }
                }
            }
        }
    }
}
</style>
