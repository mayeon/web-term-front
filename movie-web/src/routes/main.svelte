<script>
    import { Card } from "flowbite-svelte";

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
                <Card img={data.image} header={data.name} />
            </div>
        {/each}
    </div>
</div>

<style>
    .cards-wrap {
        display: flex;
        flex-direction: row;
    }

    .cards-wrap {
        max-width: 50%;
        max-height: 50%;
    }
</style>
