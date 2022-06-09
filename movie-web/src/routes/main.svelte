<script>
    import { Card } from "flowbite-svelte";
    import { Rating } from "flowbite-svelte";
    import { Heart, ThumbUp, EmojiHappy } from "svelte-heros";

    const datas = [
        {
            image: "https://img.cgv.co.kr/Movie/Thumbnail/Poster/000085/85689/85689_320.jpg",
            rate: 3.8,
            reservation: "78.2",
            name: "주라기",
        },
        {
            image: "https://img.cgv.co.kr/Movie/Thumbnail/Poster/000085/85689/85689_320.jpg",
            rate: 3.8,
            reservation: "78.2",
            name: "주라기",
        },
        {
            image: "https://img.cgv.co.kr/Movie/Thumbnail/Poster/000085/85689/85689_320.jpg",
            rate: 3.8,
            reservation: "78.2",
            name: "주라기",
        },
        {
            image: "https://img.cgv.co.kr/Movie/Thumbnail/Poster/000085/85689/85689_320.jpg",
            rate: 3.8,
            reservation: "78.2",
            name: "주라기",
        },
    ];
</script>

<div>
    <h1>현재 상영작</h1>
    <div class="cards-wrap">
        {#each datas as data}
            <div
                class="card=warp"
                on:mouseenter={() => console.log("in")}
                on:mouseleave={() => console.log("out")}
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
                    </div>
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
        width: 90%;
    }

    .cards-wrap {
        max-width: 50%;
        max-height: 50%;
    }
</style>
