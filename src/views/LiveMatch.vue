<template>
    <div>
        <div class="center-body">
            <div class="center-content">
                <div class="center-game_list">
                    <div class="card bg-transparent rounded-0 border-0 rounded-0">
                    <div class="card-header text-start page_headline py-3">
                        <div v-if="!live" class="d-flex justify-content-start fixture_time_date">
                            <span class="pe-2">{{ details.event_time }} </span>
                            <span class="fw-bold"> {{ formatDate(details.event_date) }}</span>
                        </div>
                        <div class="d-flex flex-column">
                            <div class="d-flex justify-content-between">
                                <h1 class="team">{{ details.team_a }} - {{ details.team_b }}</h1>
                                <span v-if="live">{{ details.score }}</span>
                            </div>
                            <div class="sport_tournament text-muted">
                                <p class="mb-0"> {{ details.sport_tournament_name }} - {{ details.sport_category_name }} - {{ details.sport_name }} </p>
                            </div>
                        </div>
                    </div>
                    <div class="card-body text-start" v-for="(i, o) in details.markets" :key="o">
                        <!-- <div v-for="(i, o) in details.markets" :key="o">
                            {{ i.market_name }}
                            <div v-for="(x,y) in i.selections" :key="y">
                                <p>{{ x.name }}</p>
                            </div>
                        </div> -->
                        <div v-if="i.active == '1'">
                            <h6 class="fw-bolder">{{ i.market_name }}</h6>
                            <p v-if="i.active == '1'">sdfsfsdfs</p>
                            <div >
                                <div class="bets" :class="(i.selections.length % 2) === 0 ? 'bets-2': 'bets-3' ">
                                    <div class="bet" v-for="(x,y) in i.selections" :key="y">
                                        <div class="anchor-wrap column">
                                            <span class="event_selection">
                                                {{ x.name }}
                                            </span>
                                            <span class="event_odds">
                                                {{ x.odds }}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <!-- <div v-if="loading" class="loading mt-5 text-center">
                        <img src="@/assets/loading.gif" style="height: 40px" alt="" srcset="">
                    </div>
                    <fixtures :fixtures="fixtures" v-if="!loading && fixtures.length"></fixtures> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from "@/services/api";
    export default {
        data() {
            return {
                event_id: "",
                details: [],
            };
        },
        watch: {
            $route: {
                immediate: true,
                handler(to) {
                    // react to route changes...
                    document.title = to.params.name.replace(/[^a-z0-9+]+/gi, " ");
                    this.event_id = to.params.event_id; //this.baseConverter(to.params.game_id, 36, 10);
                    this.live = to.params.status === "live";
                    this.getMatch();
                },
            },
        },
        methods: {
            getMatch() {
                this.loading = true;
                axios
                    .get(`/sports/live/${this.event_id}`)
                    .then((res) => {
                        
                        this.details = res.data.data;
                        this.odds = JSON.parse(details.live_data)
                        this.loading = false;
                    })
                    .catch((error) => {
                        this.loading = false;
                        console.log(error);
                    });
            },
        },
    };
</script>

<style>
.bet .anchor-wrap.column{
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    flex-direction: column;
}

.bets.bets-2 .bet {
    -webkit-box-flex: 1;
    -webkit-flex: 1 calc(50% - 8px);
    flex: 1 calc(50% - 8px);
    max-width: 50%
}

@media (max-width:220px) {
    .bets.bets-2 .bet {
        -webkit-box-flex: 1;
        -webkit-flex: 1 100%;
        flex: 1 100%;
        max-width: none
    }
}

.bets.bets-3 .bet {
    -webkit-box-flex: 0;
    -webkit-flex: none;
    flex: none;
    width: calc(33.33333% - 8px)
}



/* .bets:not(.bets-2):not(.bets-3) {
    -webkit-flex-wrap: nowrap;
    flex-wrap: nowrap
} */



</style>