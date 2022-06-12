<script>
    import { Card, Input } from "flowbite-svelte";
    import { Rating, Button, Search, Select } from "flowbite-svelte";
    import { Heart, ThumbUp, EmojiHappy, CurrencyDollar } from "svelte-heros";
    import { onMount } from "svelte";
    import { axiosInstance } from "../function/source.js";

    let datas = [];

    onMount(async () => {
        await axiosInstance
            .get("/movie/list")
            .then((res) => {
                datas = res.data;
                console.log(datas);
            })
            .catch((err) => {
                console.log(err);
            });
    });

    function hadleChangeSlect(type) {
        if (type == "normal") {
            axiosInstance
                .get("/movie/list")
                .then((res) => {
                    datas = res.data;
                    console.log(datas);
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            axiosInstance
                .get(`/list/order/${type}`)
                .then((res) => {
                    datas = res.data;
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    let hoverId = -1;
    let selected = "normal";
    let selectprops = {
        name: "sort type",
        label: "정렬 기준",
    };
    let searchText = "";

    $: hadleChangeSlect(selected);
</script>

<div class="main-wrap">
    <h1
        class="'mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'"
    >
        무비차트
    </h1>
    <br />
    <div class="right">
        <div class="select">
            <Select {...selectprops} bind:value={selected}>
                <option value="normal">기본</option>
                <option value="reservation">예매율순</option>
                <option value="rate">평점순</option>
            </Select>
        </div>
        <div>
            <Input
                class="mb-6"
                placeholder="영화정보"
                label="영화 검색"
                bind:value={searchText}
            />
            <Button
                btnColor="red"
                on:click={() => {
                    axiosInstance
                        .get(`/movie/search/?query=${searchText}`)
                        .then((res) => {
                            datas = res.data;
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                }}>검색</Button
            >
        </div>
    </div>
    <br />
    <div class="cards-wrap">
        {#each datas as data}
            <div
                class="card-wrap"
                on:mouseenter={() => {
                    hoverId = data.id;
                }}
                on:mouseleave={() => {
                    hoverId = -1;
                }}
            >
                <Card img={data.posterLink} header={data.movieTitle}>
                    <div slot="paragraph">
                        <h1>평점 : {data.grade}</h1>
                        <h1>예매율: {data.reservationRate}</h1>
                        <h1>스토리 : {data.story}</h1>
                        <Button btnColor="red">예매하기</Button>
                    </div>
                </Card>
            </div>
            <br />
        {/each}
    </div>
</div>

<style>
    .cards-wrap {
        display: flex;
        flex-direction: column;
        /* justify-content: space-between; */
        width: 80%;
        margin: auto;
    }

    .right {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .select {
        width: 10%;
    }

    .search {
        width: 50%;
    }

    .card-wrap {
        max-width: 30%;
        max-height: 30%;
        width: 20%;
    }
</style>
