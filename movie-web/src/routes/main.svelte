<script>
    import { Card } from "flowbite-svelte";
    import { Rating, Button } from "flowbite-svelte";
    import { Heart, ThumbUp, EmojiHappy, CurrencyDollar } from "svelte-heros";
    import { push } from "svelte-spa-router";
    import { axiosInstance } from "../function/source.js";
    import { onMount } from "svelte";

    let datas = [];

    onMount(async () => {
        await axiosInstance
            .get("/movie/list/0")
            .then((res) => {
                datas = res.data;
            })
            .catch((err) => {
                console.log(err);
            });
    });

    let hoverId = -1;
</script>

<div class="main-wrap">
    <div>
        <h1
            class="'mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'"
        >
            현재 상영작
        </h1>
        <Button btnColor="red" on:click={() => push("/movie")}>전체 보기</Button
        >
    </div>
    <div class="cards-wrap">
        {#each datas as data}
            <div
                class="card-wrap"
                on:mouseenter={() => {
                    hoverId = data.movieId;
                }}
                on:mouseleave={() => {
                    hoverId = -1;
                }}
            >
                <Card img={data.posterLink} header={data.movieTitle}>
                    <div slot="paragraph">
                        <Rating total="10" rating={data.grade}>
                            <span slot="ratingUp">
                                <ThumbUp
                                    class="text-yellow-300 dark:text-yellow-200"
                                />
                            </span>
                            <span slot="ratingDown">
                                <ThumbUp
                                    class="text-gray-300 dark:text-gray-500"
                                />
                            </span>
                        </Rating>
                        예매율 : {data.reservationRate}
                        스토리 : {data.story}
                    </div>
                </Card>
                <div class="buttons" class:on={hoverId == data.movieId}>
                    <Button
                        btnColor="light"
                        on:click={() => {
                            push(`/movie/${data.movieId}`);
                        }}>상세보기</Button
                    >
                    <Button btnColor="red">예매하기</Button>
                </div>
            </div>
        {/each}
    </div>
    <Button btnColor="red">이전</Button>
    <Button btnColor="red">다음</Button>
</div>

<style>
    .cards-wrap {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 80%;
        margin: auto;
    }

    .card-wrap {
        max-width: 30%;
        max-height: 30%;
        width: 20%;
    }

    .card-wrap > .buttons {
        display: none;
        position: relative;
        margin-top: -20em;
        margin-left: auto;
        margin-right: auto;
        width: 50%;
    }

    .card-wrap > .on {
        display: flex;
        flex-direction: column;
    }
</style>
