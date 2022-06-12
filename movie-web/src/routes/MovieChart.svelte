<script>
    import { Card } from "flowbite-svelte";
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

    let hoverId = -1;
    let selected = "normal";
    let selectprops = {
        name: "sort type",
        label: "정렬 기준",
    };
    let a = "";
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
                <option value="select">예매율순</option>
                <option value="rate">평점순</option>
            </Select>
        </div>
        <div class="search">
            <form>
                <label
                    for="default-search"
                    class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
                    >Search</label
                >
                <div class="relative">
                    <div
                        class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
                    >
                        <svg
                            class="w-5 h-5 text-gray-500 dark:text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            ><path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            /></svg
                        >
                    </div>
                    <input
                        type="search"
                        id="default-search"
                        class="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search Mockups, Logos..."
                        bind:value={a}
                        required
                    />
                    <button
                        class="text-white absolute right-2.5 bottom-2.5 bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        type="button"
                        on:click={() => {
                            console.log({ a });
                        }}>검색</button
                    >
                </div>
            </form>
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
                    </div>
                    <Button btnColor="red">예매하기</Button>
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
