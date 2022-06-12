<script>
    import { Card, HorizontalCard, Textarea, Range } from "flowbite-svelte";
    import { Rating, Button, Search, Select } from "flowbite-svelte";
    import { Heart, ThumbUp, EmojiHappy, CurrencyDollar } from "svelte-heros";
    import Chart from "svelte-frappe-charts";

    const movie = {
        id: 1,
        image: "https://img.cgv.co.kr/Movie/Thumbnail/Poster/000085/85689/85689_320.jpg",
        grade: "14세",
        gerne: "액션",
        runtime: "140",
        opendate: "2012-21-21",
        actors: "dsa, dsa, dsa, das",
        rate: 3.8,
        reservation: "78.2",
        name: "주라기",
    };

    let data = {
        labels: ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"],
        datasets: [
            {
                values: [10, 12, 3, 9, 8, 15, 9],
            },
        ],
    };

    let textareaprops = {
        id: "message",
        name: "message",
        label: "Your message",
        rows: 4,
        placeholder: "Leave a comment...",
    };

    let minmaxValue = 0;
</script>

<div style="display: flex; flex-direction:column">
    <div class="right">
        <img src={movie.image} alt="movie poster" style="width: 50%;" />
        <br />
        <div>
            <h1 class="text-5xl dark:text-white">{movie.name}</h1>
            <h2 class="text-3xl dark:text-white">
                상영등급 :{movie.grade}시청
            </h2>
            <h2 class="text-3xl dark:text-white">
                러닝타임 : {movie.runtime}분
            </h2>
            <h2 class="text-3xl dark:text-white">개봉일 : {movie.opendate}</h2>
            <h2 class="text-3xl dark:text-white">배우 : {movie.actors}</h2>
            <Chart {data} type="line" />
            <Chart {data} type="pie" />
        </div>
    </div>
    <br />
    <div>
        <br />
        <Card header="Simple card with header and content">
            <p
                class="mb-3 font-normal text-gray-700 dark:text-gray-400"
                slot="paragraph"
            >
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla
                distinctio.
            </p>
        </Card>
        <Card header="Simple card with header and content">
            <p
                class="mb-3 font-normal text-gray-700 dark:text-gray-400"
                slot="paragraph"
            >
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla
                distinctio.
            </p>
        </Card>

        <br />
        <Textarea {...textareaprops} />
        <br />
        <Range
            id="range-minmax"
            label="평점"
            min="0"
            max="10"
            bind:value={minmaxValue}
        />
        <p>평점 : {minmaxValue}</p>
        <br />
        <Button btnColor="red">작성</Button>
    </div>
</div>

<style>
    .right {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
</style>
