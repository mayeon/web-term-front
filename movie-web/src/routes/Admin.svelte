<script>
    import { onMount } from "svelte";
    import { axiosInstance } from "../function/source.js";

    let movieList = [];

    onMount(async() => {
        axiosInstance.get("/screen/list")
            .then(res => {
                movieList = res.data;
                console.log(movieList);
            })
    })

    async function updatePrice(screenId) {
        let inputPolicy = prompt("할인 방식을 입력하세요. ('정률', '정액')");
        let inputRate;

        if (inputPolicy == '정률') {
            inputPolicy = "RATED_AMOUNT";
            inputRate = prompt("할인률을 입력하세요. (0~100)");
            if (inputRate > 100 && inputRate < 0) {
                alert("0~100%를 넘길 수 없습니다.");
                return;
            }
        } else if (inputPolicy == '정액'){
            inputPolicy = "FIXED_AMOUNT";
            inputRate = prompt("할인액을 입력하세요. (0~5000)");
            if (inputRate > 5000 && inputRate < 0) {
                alert("0~5000원을 넘길 수 없습니다.");
                return;
            }
        } else {
            alert("잘못 입력하셨습니다.");
            return;
        }

        alert("적용되었습니다.");

        const data = {
            "screenId": screenId,
            "discountPolicy": inputPolicy,
            "discountRate": inputRate
        }
        axiosInstance.post("/screen/modify/price", data);
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