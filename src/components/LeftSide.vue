<template>
    <div class="col-md-3 d-none d-lg-block pe-0 position-absolute top-0 bottom-0 start-0 overflow-auto left">
        <div class="left-content">
            <div class="left-top py-2 px-3 border-bottom">
                <div class="mb-1">
                    <select class="form-select rounded-0" name="" id="">
                        <option selected>Select one</option>
                        <option value="">New Delhi</option>
                        <option value="">Istanbul</option>
                        <option value="">Jakarta</option>
                    </select>
                </div>
            </div>
            <div class="left-middle border-bottom">
                <ul class="list-group list-group-flush rounded-0 text-start">
                    <router-link to="/" class="list-group-item"><i class="bi bi-house-door"></i> Home</router-link>
                    <router-link to="/Live" class="list-group-item"> <i class="bi bi-activity"></i> Live Now</router-link>
                    <router-link to="/Upcoming" class="list-group-item"><i class="bi bi-calendar-event"></i> Upcoming</router-link>
                    <!-- <router-link class="list-group-item"><i class="bi bi-calendar-event-fill"></i> Today</a> -->
                    <router-link to="/Virtual" class="list-group-item">Virtual</router-link>
                    <router-link to="/Casino" class="list-group-item">Casino</router-link>
                </ul>
            </div>
            <div class="left-bottom">
                <div class="accordion accordion-flush" id="accordionFlushExample">
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="flush-headingOne">
                            <button class="accordion-button collapsed fw-bold text-uppercase" type="button" data-bs-toggle="collapse"
                                data-bs-target="#flush-collapseOne" aria-expanded="false"
                                aria-controls="flush-collapseOne">
                                Tournaments
                            </button>
                        </h2>
                        <div id="flush-collapseOne" class="accordion-collapse collapse"
                            aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                            <div class="accordion-body px-1">
                                <ul class="list-group list-group-flush rounded-0 text-start">
                                    <li v-for="(tournament, index) in tournaments" :key="index" class="list-group-item">{{ tournament.tournament.name }}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="flush-headingTwo">
                            <button class="accordion-button collapsed fw-bold text-uppercase" type="button" data-bs-toggle="collapse"
                                data-bs-target="#flush-collapseTwo" aria-expanded="false"
                                aria-controls="flush-collapseTwo">
                                Sports
                            </button>
                        </h2>
                        <div id="flush-collapseTwo" class="accordion-collapse collapse"
                            aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                            <div class="accordion-body">
                                <ul class="list-group list-group-flush rounded-0 text-start">
                                    <li v-for="(tournament, index) in tournaments" :key="index" class="list-group-item">{{ tournament.tournament.category.name }}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <!-- <div class="accordion-item">
                        <h2 class="accordion-header" id="flush-headingThree">
                            <button class="accordion-button collapsed fw-bold text-uppercase" type="button" data-bs-toggle="collapse"
                                data-bs-target="#flush-collapseThree" aria-expanded="false"
                                aria-controls="flush-collapseThree">
                                Other Countries
                            </button>
                        </h2>
                        <div id="flush-collapseThree" class="accordion-collapse collapse"
                            aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
                            <div class="accordion-body">Placeholder content for this accordion, which is intended to
                                demonstrate the <code>.accordion-flush</code> class. This is the third item's accordion
                                body. Nothing more exciting happening here in terms of content, but just filling up the
                                space to make it look, at least at first glance, a bit more representative of how this
                                would look in a real-world application.</div>
                        </div>
                    </div> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'left-side',
        props: ['tournaments']
    }
</script>

<style scoped>
    .left{
        width: 22% !important;
        /* z-index: ; */
    }
    .left-content{
        height: calc(100vh - 73px);
        border-right: 1px solid rgba(235, 238, 241,.125);
        /* position: absolute;
        overflow: hidden;
        left: 0; */
    }
    .list-group .list-group-item{
        padding-top: 10px;
        padding-bottom: 10px;
        background-color: transparent;
        border-color: rgba(235, 238, 241,.125);
        color: #fff;
    }

    .list-group .list-group-item i{
        display: none;
    }

    .list-group .list-group-item.router-link-exact-active.router-link-active{
        /* background-colo/r: white; */
        border-color: rgba(235, 238, 241,.125);
        border-left: 6px solid #04a7f8;
        color: #04a7f8;
        font-weight: 800;
    }

    .list-group .list-group-item.router-link-exact-active.router-link-active i{
        display: inline;
        color: #04a7f8;
    }

    .accordion.accordion-flush .accordion-item .accordion-button{
        background-color: #16202c;
        color: white;
    }
    .accordion{
                border-color: rgba(235, 238, 241,.125);
    }
</style>