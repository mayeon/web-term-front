<script>
    import { onMount } from "svelte";
    import { axiosInstance } from "../function/source.js";
    import { Card } from "flowbite-svelte";
    import { push } from "svelte-spa-router";

    let movieList = [];

    onMount(async () => {
        axiosInstance.get("/screen/list").then((res) => {
            movieList = res.data;
            console.log(movieList);
        });
    });
</script>

<div>
    {#each movieList as movie, i}
        <Card header={movie.movieName}>
            <div slot="paragraph">
                {#each movie.screens as screen, j}
                    <div
                        class="screen-list"
                        on:click={() => {
                            push("");
                        }}
                    >
                        <span>{screen.theaterName}</span>
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
                    </div>
                    <br />
                {/each}
            </div>
        </Card>
    {/each}
</div>
