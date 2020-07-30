<template>
    <main class="account">
        <div class="contained">
            <b-form>
                <b-container>
                    <h1>Account Settings</h1>
                    <b-row>
                        <b-col sm>
                            <b-form-group label="First Name">
                                <b-input
                                    type="text"
                                    id="first-name"
                                    v-model="firstName"
                                />
                            </b-form-group>
                        </b-col>
                        <b-col sm>
                            <b-form-group label="Last Name">
                                <b-input
                                    type="text"
                                    id="last-name"
                                    v-model="lastName"
                                />
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col sm>
                            <b-form-group label="Gender">
                                <b-form-radio-group
                                    id="gender"
                                    v-model="gender"
                                    :options="options"
                                    buttons
                                    name="gender"
                                />
                            </b-form-group>
                        </b-col>
                        <b-col sm>
                            <b-form-group label="Date of Birth">
                                <b-form-datepicker
                                    id="date-of-birth"
                                    class="mb-2"
                                    :date-format-options="{
                                        year: 'numeric',
                                        month: 'numeric',
                                        day: 'numeric',
                                    }"
                                    v-model="dateOfBirth"
                                />
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col sm>
                            <b-form-group label="Email Address">
                                <b-input
                                    type="text"
                                    id="email"
                                    v-model="email"
                                />
                            </b-form-group>
                        </b-col>
                        <b-col sm>
                            <b-form-group label="Phone Number">
                                <b-input
                                    type="text"
                                    id="phone"
                                    v-model="phone"
                                />
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col sm>
                            <b-form-group label="Street Address">
                                <b-input
                                    type="text"
                                    id="street-address"
                                    v-model="addressLine1"
                                />
                            </b-form-group>
                        </b-col>
                        <b-col sm>
                            <b-form-group label="Zip Code">
                                <b-input
                                    type="text"
                                    id="zip-code"
                                    v-model="addressLine2"
                                />
                            </b-form-group>
                        </b-col>
                        <b-col sm>
                            <b-form-group label="State">
                                <b-input
                                    type="text"
                                    id="state"
                                    v-model="state"
                                />
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <b-button pill class="save">
                        Save
                    </b-button>
                </b-container>
            </b-form>
        </div>
    </main>
</template>

<script>
import head from '~/mixins/head'

// TODO: must be logged in to reach this page

export default {
    mixins: [head],
    async asyncData({ $prismic, error }) {
        const doc = await $prismic.api.getSingle('account')
        if (!doc) return error({ code: 404, message: 'Page not found.' })
        return {
            page: doc.data,
        }
    },
    watch: {
        user: {
            immediate: true,
            handler(user) {
                if (user) {
                    this.firstName = user.given_name || ''
                    this.lastName = user.family_name || ''
                    this.email = user.email || ''
                }
            },
        },
    },
    data() {
        return {
            firstName: '',
            lastName: '',
            gender: '',
            dateOfBirth: '',
            email: '',
            phone: '',
            addressLine1: '',
            addressLine2: '',
            state: '',
            options: [
                { text: 'Female', value: 'female' },
                { text: 'Male', value: 'male' },
                { text: 'Other', value: 'other' },
            ],
        }
    },
    computed: {
        user() {
            return _get(this.$store.state, 'auth.user')
        },
    },
}
</script>

<style lang="scss">
main.account {
    padding-top: var(--header-height);
    h1 {
        font-size: 1.9rem;
        margin-bottom: 30px;
    }
    .container {
        padding: 0;
        input[type='text'],
        .b-form-datepicker {
            background: #fbfbfb;
            border: 1px solid #c8c8c8;
            border-radius: 6px;
        }
        input[type='text'],
        label#date-of-birth__value_,
        .btn-group-toggle label {
            font-size: 1.1rem;
            text-align: center;
            font-weight: 500;
            color: #000000;
        }
        .btn-group-toggle {
            width: 100%;
            label.btn-secondary {
                padding: 0.5rem 0.75rem;
                &:not(.active) {
                    background: #fbfbfb;
                    border: 1px solid #c8c8c8;
                    color: #000000;
                }
                &:not(:disabled):not(.disabled).active {
                    background-color: var(--blue);
                    color: #ffffff;
                }
            }
        }
        button.save {
            width: 215px;
            margin: 50px auto;
            display: block;
        }
        .b-form-datepicker {
            .b-calendar {
                header.b-calendar-header {
                    display: none;
                }
                .b-calendar-grid-caption {
                    font-size: 0.8rem;
                }
                .b-calendar-nav {
                    padding-top: 18px;
                }
            }
        }
    }
}
</style>
