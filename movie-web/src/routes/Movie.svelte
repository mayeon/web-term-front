<script>
    import { Card, HorizontalCard, Textarea, Range } from "flowbite-svelte";
    import { Rating, Button, Search, Select } from "flowbite-svelte";
    import { Heart, ThumbUp, EmojiHappy, CurrencyDollar } from "svelte-heros";
    import { axiosInstance } from "../function/source.js";
    import Chart from "svelte-frappe-charts";
    import { onMount, afterUpdate } from "svelte";
    import Admin from "./Admin.svelte";

    export let params = {};

    let movie = {
        movieId: 1,
        movieTitle: "닥터 스트레인지2",
        posterLink:
            "https://drive.google.com/file/d/12jcTy8lW2kKCY-0ViTfPNdlsav-Px7WC/view?usp=sharing",
        director: "샘 레이미",
        openDate: 1651590000000,
        genre: "ACTION",
        runningTime: 126,
        reservationRate: 18.1,
        grade: 7.5,
        story: "스토리1",
    };

    let stat = {
        ageStatsMap: {
            Thirties: 1,
            Teens: 2,
            Forties: 0,
            Twenties: 2,
            underTeens: 0,
            upperFifties: 0,
        },
        genderStatsMap: {
            female: 3,
            male: 2,
        },
    };

    $: ageChart = {
        labels: Object.keys(stat.ageStatsMap),
        datasets: [
            {
                values: Object.values(stat.ageStatsMap),
            },
        ],
    };

    $: genderChart = {
        labels: Object.keys(stat.genderStatsMap),
        datasets: [
            {
                values: Object.values(stat.genderStatsMap),
            },
        ],
    };

    let reviews = [
        {
            reviewId: 1,
            grade: 7,
            comment: "닥스 7점",
            userName: "박",
            likes: 1,
        },
        {
            reviewId: 2,
            grade: 8,
            comment: "닥스 8점",
            userName: "이",
            likes: 2,
        },
    ];

    let score = 0;
    let review = "";

    onMount(() => {
        axiosInstance
            .get(`/movie/detail/${params.movieId}/info`)
            .then((res) => {
                movie = res.data;
            })
            .catch((err) => {
                console.log(err);
            });

        axiosInstance
            .get(`/movie/detail/${params.movieId}/stats`)
            .then((res) => {
                stat = res.data;
            })
            .catch((err) => {
                console.log(err);
            });

        axiosInstance
            .get(`/movie/detail/${params.movieId}/review`)
            .then((res) => {
                reviews = res.data;
            })
            .catch((err) => {
                console.log(err);
            });
    });
</script>

<div style="display: flex; flex-direction:column">
    <div class="right">
        <img src={movie.posterLink} alt="movie poster" style="width: 50%;" />
        <br />
        <div>
            <h1 class="text-5xl dark:text-white">{movie.movieTitle}</h1>
            <h2 class="text-3xl dark:text-white">
                러닝타임 : {movie.runningTime}분
            </h2>
            <h2 class="text-3xl dark:text-white">
                개봉일 : {new Date(movie.openDate)}
            </h2>
            <h2 class="text-3xl dark:text-white">감독 : {movie.director}</h2>
            <h2 class="text-3xl dark:text-white">스토리 : {movie.story}</h2>
            <h2 class="text-3xl dark:text-white">
                예매율 : {movie.reservationRate}
            </h2>
            <h2 class="text-3xl dark:text-white">평점 : {movie.grade}</h2>
            <h2 class="text-3xl dark:text-white">장르 : {movie.genre}</h2>
            <Chart data={genderChart} type="pie" />
            <Chart data={ageChart} type="bar" />
        </div>
    </div>
    <br />
    <div>
        {#each reviews as review}
            <Card header="작성자 : {review.userName}">
                <div
                    class="mb-3 font-normal text-gray-700 dark:text-gray-400"
                    slot="paragraph"
                >
                    <h1>평점 : {review.grade}</h1>
                    <h1>댓글 : {review.comment}</h1>
                    <h1>좋아요 : {review.likes}</h1>
                    <Button
                        btnColor="red"
                        rounded="true"
                        on:click={() => {
                            axiosInstance
                                .post(`/review/like`, {
                                    reviewId: `${review.reviewId}`,
                                })
                                .then((res) => {
                                    axiosInstance
                                        .get(
                                            `/movie/detail/${params.movieId}/review`
                                        )
                                        .then((res) => {
                                            reviews = res.data;
                                        })
                                        .catch((err) => {
                                            console.log(err);
                                        });
                                })
                                .catch((err) => {
                                    console.log(err);
                                });
                        }}
                    >
                        <Heart
                            size="24"
                            class="text-red-500 dark:text-Gray-100"
                        />
                    </Button>
                    <Button btnColor="red" rounded="true" on:click={() => {}}
                        >수정</Button
                    >
                    <Button
                        btnColor="red"
                        rounded="true"
                        on:click={() => {
                            console.log("!");
                            axiosInstance
                                .post(`/review/delete`, {
                                    reviewId: `${review.reviewId}`,
                                })
                                .then((res) => {
                                    console.log("delete");
                                    axiosInstance
                                        .get(
                                            `/movie/detail/${params.movieId}/review`
                                        )
                                        .then((res) => {
                                            reviews = res.data;
                                        })
                                        .catch((err) => {
                                            console.log(err);
                                        });
                                })
                                .catch((err) => {
                                    console.log(err);
                                });
                        }}>삭제</Button
                    >
                </div>
            </Card>
            <br />
        {/each}

        <br />
        <label
            for="message"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
            >Your message</label
        >
        <textarea
            id="message"
            rows="4"
            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Your message..."
            bind:value={review}
        />
        <br />
        <Range
            id="range-minmax"
            label="평점"
            min="0"
            max="10"
            bind:value={score}
        />
        <p>평점 : {score}</p>
        <br />
        <Button
            btnColor="red"
            on:click={() => {
                axiosInstance
                    .post("/review/add", {
                        movieId: params.movieId,
                        comment: review,
                        rate: score,
                    })
                    .then((res) => {
                        axiosInstance
                            .get(`/movie/detail/${params.movieId}/review`)
                            .then((res) => {
                                reviews = res.data;
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }}>작성</Button
        >
    </div>
</div>

<style>
    .right {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
</style>
