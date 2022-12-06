<template>
    <div class="center-body">
        <div class="center-content">
            <div class="center-game_list">
                <div class="card bg-transparent border-0 rounded-0">
                    <div class="card-header rounded-0 text-start page_headline py-3">
                        <h1>Casino Games</h1>
                    </div>
                    <iframe title="casino" style="width: 100%; border: 0; height: 100vh;" :src="url" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Casino",
        data() {
            return {
                
            }
        },
        computed:{
            user(){
                return this.$store.state.auth.user;
            },
            url(){
                return `https://ui.io.co.ke/?cid=1&token=${this.user?.auth_code}-SBE`
            }
        }
    };
</script>

<style>
    .top-image {
        padding: 0px;
    }

    .page_headline h1 {
        font-size: 22px;
        margin-bottom: 0;
        font-weight: 800;

    }
</style>