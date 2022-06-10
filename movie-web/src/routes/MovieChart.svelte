<script>
    import { Card } from "flowbite-svelte";
    import { Rating, Button, Search, Select } from "flowbite-svelte";
    import { Heart, ThumbUp, EmojiHappy, CurrencyDollar } from "svelte-heros";

    const datas = [
        {
            id: 1,
            image: "https://img.cgv.co.kr/Movie/Thumbnail/Poster/000085/85689/85689_320.jpg",
            rate: 3.8,
            reservation: "78.2",
            name: "주라기",
        },
        {
            id: 2,
            image: "https://img.cgv.co.kr/Movie/Thumbnail/Poster/000085/85689/85689_320.jpg",
            rate: 3.8,
            reservation: "78.2",
            name: "주라기",
        },
        {
            id: 3,
            image: "https://img.cgv.co.kr/Movie/Thumbnail/Poster/000085/85689/85689_320.jpg",
            rate: 3.8,
            reservation: "78.2",
            name: "주라기",
        },
        {
            id: 4,
            image: "https://img.cgv.co.kr/Movie/Thumbnail/Poster/000085/85689/85689_320.jpg",
            rate: 3.8,
            reservation: "78.2",
            name: "주라기",
        },
    ];

    let hoverId = -1;
    let selected = "normal";
    let selectprops = {
        name: "sort type",
        label: "정렬 기준",
    };
</script>

<div class="main-wrap">
    <h1
        class="'mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'"
    >
        무비차트
    </h1>
    <Search />
    <Select {...selectprops} bind:value={selected}>
        <option value="normal">기본</option>
        <option value="select">예매율순</option>
        <option value="rate">평점순</option>
    </Select>
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
                <Card img={data.image} header={data.name}>
                    <div slot="paragraph">
                        <Rating total="5" rating={data.rate}>
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
                        <Rating total="5" rating={data.rate}>
                            <span slot="ratingUp">
                                <CurrencyDollar
                                    class="text-red-300 dark:text-red-200"
                                />
                            </span>
                            <span slot="ratingDown">
                                <CurrencyDollar
                                    class="text-gray-300 dark:text-gray-500"
                                />
                            </span>
                        </Rating>
                    </div>
                    <Button btnColor="red">예매하기</Button>
                </Card>
            </div>
        {/each}
    </div>
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
