<template>
    <div>
        <div class="center-body" v-if="!loading">
            <div class="center-content">
                <div class="center-game_list">
                    <div class="card bg-transparent rounded-0 border-0 rounded-0">
                        <div class="card-header row text-center page_headline py-3">
                            <div class="col-10 d-flex">
                                <router-link to="/bets/open" class="text-decoration-none text-white me-5"> <i class="bi bi-arrow-left"></i> </router-link>
                                <h6>BET ID {{ id }}</h6>
                            </div>
                            
                        </div>
                        <div class="card-body text-start border-bottom">
                            <div class="d-flex justify-content-between">
                                <p>Odds</p>
                                <p>{{ details.odds }}</p>
                            </div>
                            <div class="d-flex justify-content-between">
                                <p>Stake</p>
                                <p>{{ details.stake }}</p>
                            </div>
                            <div class="d-flex justify-content-between">
                                <p>Potential Winnings</p>
                                <p>{{ details.pot_winnings }}</p>
                            </div>
                            <div class="d-flex justify-content-between">
                                <p>Status</p>
                                <p></p>
                            </div>
                        </div>
                        <div class="card-body text-start border-bottom" v-for="(i, index) in details.selections"
                            :key="index">
                            <div>
                                <div class="justify-content-between d-flex">
                                    <small>{{ formatDate(i.created_at) }}</small>
                                    <div>
                                        <span>{{ i.odds }}</span>
                                        <span :class="i.status === 0 ? 'bg-secondary' : i.status === 1 ? 'bg-success' : i.status === 2 ? 'bg-danger' : 'bg-warning'" class="badge badge-result type-pending mode-circle"><span
                                                class="text"></span></span>
                                    </div>
                                </div>
                                <div class="d-flex justify-content-between align-items-start">
                                    <div>
                                        <p class="text-white mb-0 small">{{ i.event }}</p>
                                        <p class="text-muted small mb-0">
                                            {{ i.sport }} - {{ i.tournament }}
                                        </p>
                                    </div>
                                    <span class="fw-bolder">{{ i.score ? i.score : "--" }}</span>
                                </div>
                                <p class="fw-bolder small">
                                    {{ i.market_name }} - FT({{ i.odd_name }})
                                </p>
                            </div>
                        </div>
                        <div class="legend my-3">
                            <div class="lightgray placed-date">
                                <div>
                                    Bet placed on
                                    <span class="nowrap">Sat 12/11 at 11:37 pm</span>
                                </div>
                                <div class=" mt-3 summary-legend d-flex align-items-center justify-content-center">
                                    <span class="badge type-pending bg-secondary me-2 mode-circle">
                                        <span class="text"></span>
                                    </span>
                                    <span class="me-3">Pending</span><span
                                        class="badge type-win bg-success me-2 mode-circle"><span
                                            class="text"></span></span><span class="me-2">Won</span><span
                                        class="badge type-lose bg-danger mode-circle me-2"><span
                                            class="text"></span></span><span>Lost</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="loading" class="loading mt-5 text-center">
            <img src="@/assets/loading.gif" style="height: 40px" alt="" srcset="">
          </div>
    </div>
</template>

<script>
    import axios from "@/services/api";
    import moment from 'moment'
    export default {
        data() {
            return {
                id: "",
                details: [],
                loading: false,
            };
        },
        watch: {
            $route: {
                immediate: true,
                handler(to) {
                    // react to route changes...
                    this.id = to.params.id;
                    this.getBetlist();
                },
            },
        },
        methods: {
            getBetlist() {
                this.loading = true;
                axios
                    .get(`/sports/find-coupon/${this.id}`)
                    .then((res) => {
                        this.details = res.data.coupon;
                        this.loading = false;
                    })
                    .catch((error) => {
                        this.loading = false;
                        console.log(error);
                    });
            },
            formatDate(date){
                return moment(date).format('h:mma ddd DD/MM')
            }
        },
    };
</script>

<style>
    .border-bottom {
        border-bottom: 1px solid rgba(235, 238, 241, 0.125) !important;
    }

    .mode-circle {
        width: 18px;
        height: 18px;
        margin: 0 7px;
        vertical-align: text-bottom;
    }

    .badge {
        margin-right: 0;
    }

    .badge {
        display: inline-block;
        padding: 2px 7px;
        /* margin-right: 7px; */
        font-size: 13px;
        line-height: 14px;
        text-align: center;
        color: #252a2d;
        border: 0;
        background: #fff;
        border-radius: 0;
        background-clip: border-box;
        background-origin: border-box;
    }
</style>