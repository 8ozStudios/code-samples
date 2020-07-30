<template>
    <div class="telehealth-payment">
        <div class="contained payment-wrapper">
            <b-form>
                <b-container fluid>
                    <h3>Shipment Information</h3>
                    <b-form-row>
                        <b-col>
                            <b-form-group>
                                <b-form-input placeholder="Name" type="text" />
                            </b-form-group>
                        </b-col>
                    </b-form-row>
                    <b-form-row>
                        <b-col>
                            <b-form-group>
                                <b-form-input
                                    placeholder="Address"
                                    type="text"
                                />
                            </b-form-group>
                        </b-col>
                    </b-form-row>
                    <b-form-row>
                        <b-col>
                            <b-form-group>
                                <b-form-input placeholder="City" type="text" />
                            </b-form-group>
                        </b-col>
                        <b-col>
                            <b-form-group>
                                <b-form-input placeholder="State" type="text" />
                            </b-form-group>
                        </b-col>
                        <b-col>
                            <b-form-group>
                                <b-form-input
                                    placeholder="Zipcode"
                                    type="text"
                                />
                            </b-form-group>
                        </b-col>
                    </b-form-row>
                    <h3 class="payment-title">Payment Information</h3>
                    <b-form-row>
                        <b-col>
                            <div id="card-element">
                                <!-- A Stripe Element will be inserted here. -->
                            </div>

                            <!-- Used to display form errors. -->
                            <div id="card-errors" role="alert">
                                {{ stripeErr }}
                            </div>
                        </b-col>
                    </b-form-row>
                    <b-form-row>
                        <b-col>
                            <br />
                            <b-form-checkbox
                                id="self-pay-agreement"
                                name="self-pay-agreement"
                            >
                                Self Pay Agreement
                                <b-button
                                    v-b-modal.self-pay-modal
                                    class="self-pay-tooltip"
                                >
                                    ?
                                </b-button>
                            </b-form-checkbox>

                            <b-modal
                                id="self-pay-modal"
                                centered
                                ok-only
                                hide-header-close
                            >
                                <p class="my-4">
                                    {{ self_pay_agreement_tooltip[1].text }}
                                </p>
                            </b-modal>
                        </b-col>
                    </b-form-row>
                </b-container>
            </b-form>
            <aside>
                <div class="order-summary">
                    <h3>Order Summary for Today</h3>
                    <b-row>
                        <b-col cols="8">{{ telehealth_visit_label }}</b-col>
                        <b-col>${{ telehealth_visit_price }}</b-col>
                    </b-row>
                </div>
                <div class="january-program">
                    <h3>January Program</h3>
                    <div class="program-note">
                        {{ january_program_description }}
                    </div>
                    <b-row
                        v-for="(item, index) in january_program_line_items"
                        :key="index"
                    >
                        <b-col cols="8">{{ item.label }}</b-col>
                        <b-col>${{ item.price }}</b-col>
                    </b-row>
                </div>

                <b-button pill block class="confirm-payment" @click="onSubmit">
                    Confirm Payment of $##.##
                </b-button>
            </aside>
        </div>
    </div>
</template>

<script>
export default {
    props: [
        'self_pay_agreement_tooltip',
        'telehealth_visit_label',
        'telehealth_visit_price',
        'january_program_description',
        'january_program_line_items',
    ],
    data() {
        return {
            stripe: null,
            cardElement: null,
            stripeErr: '',
        }
    },
    mounted() {
        this.stripe = Stripe(process.env.STRIPE_PUBLISHABLE_KEY)

        var elements = this.stripe.elements()
        this.cardElement = elements.create('card', {
            hideIcon: true,
            style: {
                base: {
                    color: '#000',
                    fontWeight: 400,
                    fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
                    fontSize: '17.5px',
                    fontSmoothing: 'antialiased',
                    lineHeight: 1.5,
                    ':-webkit-autofill': {
                        color: '#707070',
                    },
                    '::placeholder': {
                        color: '#707070',
                    },
                },
                invalid: {
                    iconColor: '#FFC7EE',
                    color: '#FFC7EE',
                },
            },
        })
        this.cardElement.mount('#card-element')
    },
    methods: {
        async onSubmit() {
            // Send to stripe, their endpoint, etc.
            return this.$router.push('/telehealth?step=review')

            // TODO: Get client secret from API here
            const clientSecret = ''
            this.stripe
                .confirmCardSetup(clientSecret, {
                    payment_method: {
                        card: this.cardElement,
                        billing_details: {
                            name: '',
                        },
                    },
                })
                .then((result) => {
                    if (result.error) {
                        this.stripeErr = result.error
                    } else {
                        // The setup has succeeded.
                        this.$router.push('/telehealth?step=review')
                    }
                })
        },
    },
}
</script>

<style lang="scss">
.telehealth-payment {
    padding-bottom: 50px;

    > .contained {
        max-width: 1100px;
    }
    .payment-wrapper {
        display: flex;
        h3 {
            font-size: 1.8125rem;
            line-height: 2.125rem;
            margin-bottom: 1.5625rem;
        }
        form {
            flex: 2;
            padding-right: 50px;
            input[type='text'] {
                border: 1px solid #cacaca;
                border-radius: 4px;
            }
            button.btn.self-pay-tooltip {
                width: 20px;
                height: 20px;
                border-radius: 100%;
                border: 1px solid #000;
                background: none;
                color: #000;
                font-size: 0.75rem;
                line-height: 0;
                padding: 0;
                margin-left: 10px;
            }
        }

        // Payment Area
        .payment-title {
            margin-top: 1em;
        }
        #card-element {
            border: 1px solid #cacaca;
            border-radius: 4px;
            padding: 8px 12px;
        }
        aside {
            flex: 1;
            .order-summary,
            .january-program {
                box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
                border-radius: 12px;
                padding: 25px;
                margin-bottom: 25px;
                .row {
                    margin-top: 10px;
                    margin-bottom: 10px;
                }
            }
            .order-summary {
                background: linear-gradient(
                        180deg,
                        #ffffff 0%,
                        rgba(255, 255, 255, 0) 100%
                    ),
                    #fff8f5;
            }
            .january-program {
                background: linear-gradient(
                        180deg,
                        #ffffff 0%,
                        rgba(255, 255, 255, 0) 100%
                    ),
                    #fcfcfc;
                .program-note {
                    background: rgba(223, 255, 245, 0.45);
                    color: #2b7563;
                    padding: 9px 12px;
                    margin: 0 auto 13px;
                }
            }
            .confirm-payment {
                padding-right: 2em;
                padding-left: 2em;
                font-size: 20px;
                font-weight: 500;
            }
        }
    }
}

@include bp(m) {
    .telehealth-payment {
        .payment-wrapper {
            display: block;
            form {
                margin-bottom: 25px;
                padding-right: 0;
            }
            aside {
            }
        }
    }
}
</style>
