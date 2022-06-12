<script>
    import { Card } from "flowbite-svelte";
    import { Rating, Button } from "flowbite-svelte";
    import { Heart, ThumbUp, EmojiHappy, CurrencyDollar } from "svelte-heros";
    import { push } from "svelte-spa-router";
    import { axiosInstance } from "../function/source.js";
    import { onMount } from "svelte";

    let datas = [];
    let hoverId = -1;
    let page = 0;
    $: leftDisable = page == 0;

    function dataLoad() {
        axiosInstance
            .get(`/movie/list/${page}`)
            .then((res) => {
                datas = res.data;
            })
            .catch((err) => {
                console.log(err);
            });
    }

    onMount(async () => {
        axiosInstance
            .get(`/movie/list/${page}`)
            .then((res) => {
                datas = res.data;
            })
            .catch((err) => {
                console.log(err);
            });
    });
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
                        <p>평점: {data.grade}</p>
                        <p>
                            예매율 : {data.reservationRate}
                        </p>
                        <p>
                            스토리 : {data.story}
                        </p>
                    </div>
                </Card>
                <div class="buttons" class:on={hoverId == data.movieId}>
                    <Button
                        btnColor="light"
                        on:click={() => {
                            push(`/movie/${data.movieId}`);
                        }}>상세보기</Button
                    >
                    <Button
                        btnColor="red"
                        on:click={() => {
                            push(`/ticketing`);
                        }}>예매하기</Button
                    >
                </div>
            </div>
            <br />
        {/each}
    </div>
    <div>
        <Button
            btnColor="red"
            on:click={() => {
                page -= 1;
                dataLoad();
            }}>이전</Button
        >
        <Button
            btnColor="red"
            on:click={() => {
                page += 1;
                dataLoad();
            }}>다음</Button
        >
    </div>
</div>

<style>
    .cards-wrap {
        display: flex;
        flex-direction: row;
        margin: auto;
    }

    .card-wrap {
        max-width: 30%;
        max-height: 30%;
        width: 15%;
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
