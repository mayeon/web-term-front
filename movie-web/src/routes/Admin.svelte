<script>
    import { onMount } from "svelte";
    import { axiosInstance } from "../function/source.js";
    import { push } from "svelte-spa-router";

    let movieList = [];

    onMount(async() => {
        axiosInstance.get("/screen/list")
            .then(res => {
                movieList = res.data;
                console.log(movieList);
            })
    })

    function updatePrice(screenId) {
        push("/modify/" + screenId);
    }
</script>

<div>
    {#each movieList as movie, i}
        <div class="movie-list">
            <span class="movie-list-title">{movie.movieName}</span>
            {#each movie.screens as screen, j}
                <div class="screen-list" on:click={() => updatePrice(screen.screenId)}> 
                    <span>{screen.theaterName}</span>
                    <span>
                        {#if new Date(screen.startTime).getHours() < 10}
                            0{new Date(screen.startTime).getHours()}
                        {:else}
                            {new Date(screen.startTime).getHours()}
                        {/if}
                            :
                        {#if new Date(screen.startTime).getMinutes() == 0}
                            00
                        {:else}
                            {new Date(screen.startTime).getMinutes()}
                        {/if}
                    </span>
                </div>
            {/each}
        </div>
    {/each}
</div>

<style>
    .movie-list {
        text-align: center;
        position: relative;
        width: 10rem;
        border: 1px black solid;
        margin: 0px 0px 5px 0px;
    }

        .movie-list-title {
        display: block;
        }

    .screen-list {
        display: inline-block;
    }
</style>