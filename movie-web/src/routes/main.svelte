<script>
    import { Card } from "flowbite-svelte";
    import { Rating, Button } from "flowbite-svelte";
    import { Heart, ThumbUp, EmojiHappy, CurrencyDollar } from "svelte-heros";
    import { push } from "svelte-spa-router";

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
    function cardInHandle() {}

    function cardOutHandle() {}
</script>

<div class="main-wrap">
    <div>
        <h1
            class="'mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'"
        >
            현재 상영작
        </h1>
        <Button btnColor="red">전체 보기</Button>
    </div>
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
                </Card>
                <div class="buttons" class:on={hoverId == data.id}>
                    <Button
                        btnColor="light"
                        on:click={() => {
                            push(`/movie/${data.id}`);
                        }}>상세보기</Button
                    >
                    <Button btnColor="red">예매하기</Button>
                </div>
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
