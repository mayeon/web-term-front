<script>
    import { get } from "svelte/store";
    import { screenInfo } from "../function/store.js";
    import { axiosInstance } from "../function/source.js";
    import { onMount } from "svelte";  
    import List, { Item, Text } from '@smui/list';
    import { push } from "svelte-spa-router";

    export let selectInfo = {}

    let movieList = [];
    let theater1screenList = [];
    let theater2screenList = [];

    let rawScreenList = [];

    let selectedMovie = "";
    let selectedScreen = "";

    onMount(async () => {
        await axiosInstance.get("/movie/list")
            .then(res => {
                movieList = res.data;
                console.log(movieList);
            })
            .catch(err => {
                console.log(err);
            });
    });

    async function getMoviesScreens(movieId) {
        await axiosInstance.get("/screen/" + movieId)
            .then(res => {
                selectedMovie = movieId;
                selectedScreen = "";
                rawScreenList = res.data;
                console.log(rawScreenList);
                theater1screenList = [];
                theater2screenList = [];
                
                rawScreenList.forEach(element => {
                    if(element.theaterName=="1상영관") {
                        theater1screenList = [
                            ...theater1screenList,
                            element
                        ]
                    } else {
                        theater2screenList = [
                            ...theater2screenList,
                            element
                        ]
                    }
                });
            })
    }

    function setScreen(screenId) {
        selectedScreen = screenId;
    }

    function selectSeats() {
        console.log("seats");
        console.log(selectedMovie);
        console.log(selectedScreen);
        //TODO 로그인 정보
        let userLogin = sessionStorage.getItem("access_token");
        if(userLogin != null) {
            alert("로그인이 필요합니다.");
            push("/signin");
        } else {
            screenInfo.set({selectedScreen});
            push("/selectSeat");
        }
    }
</script>

<div class="ticketing-container">
    <div class="ticketing-container-movie"> 
        <div class="ticketing-container-movie-title"> 
            영화
        </div>
        
        <div class="ticketing-container-movies">
            <div class="ticketing-container-movies-list">
                <div> <br> </div>

                <List class="movie-list">
                    {#each movieList as movie}
                        <Item on:SMUI:action={getMoviesScreens(movie.movieId)}>
                            <a class="movie">
                                <div class="movie-list-ageCut"> 
                                    <span class="movie-span">
                                        {movie.ageCut}세
                                    </span>
                                </div>
                                <span class="movie-span">
                                    {movie.movieTitle}
                                </span>
                            </a>
                        </Item>
                    {/each}
                </List>
            </div>
        </div>
    </div>

    <div class="ticketing-container-screen">
        <div class="ticketing-container-screen-title">
            시간
        </div>
        
        <div class="ticketing-container-screens">
            <div> <br> </div>
    
            {#if theater1screenList.length != 0}
                <span>1관</span>
                <List class="screen-list-theater1">
                    {#each theater1screenList as screen}
                        <Item on:SMUI:action={setScreen(screen.screenId)}>
                            <div class="screen">
                                <div class="screen-start-time">
                                    <span>
                                        {#if new Date(screen.startTime).getHours() < 10}
                                            0{new Date(screen.startTime).getHours()}
                                        {:else}
                                            {new Date(screen.startTime).getHours()}
                                        {/if}
                                            :
                                        {#if new Date(screen.startTime).getMinutes() == 0}
                                            00
                                        {:else}
                                            {new Date(screen.startTime).getMinutes()}
                                        {/if}
                                    </span>
                                </div>
                            </div>
                        </Item>
                    {/each}
                    <br>
                </List>
            {/if}

            {#if theater2screenList.length != 0}
                <span>2관</span>
                <List class="screen-list-theater2">
                    {#each theater2screenList as screen}
                        <Item on:SMUI:action={setScreen(screen.screenId)}>
                            <div class="screen">
                                <div class="screen-start-time">
                                    <span>
                                        {#if new Date(screen.startTime).getHours() < 10}
                                            0{new Date(screen.startTime).getHours()}
                                        {:else}
                                            {new Date(screen.startTime).getHours()}
                                        {/if}
                                            :
                                        {#if new Date(screen.startTime).getMinutes() == 0}
                                            00
                                        {:else}
                                            {new Date(screen.startTime).getMinutes()}
                                        {/if}
                                    </span>
                                </div>
                            </div>
                        </Item>
                    {/each}
                </List>
            {/if}

            {#if theater1screenList.length == 0 && theater2screenList.length == 0}
                <span> 상영 정보 없음 </span>
            {/if}
        </div>
    </div>

    <div class="ticketing-container-select-seat">
        {#if (selectedMovie != "" && selectedScreen != "")}
            <!-- 둘 다 선택 -->
            <button on:click={selectSeats} class="w-btn w-btn-red btn" type="button">
                좌석 선택
            </button>
        {:else}
            <button class="w-btn-outline w-btn-red-outline btn" type="button">
                좌석 선택
            </button>
        {/if}
    </div>
</div>

<style>
    .ticketing-container {
        height: 40rem;
    }

    .ticketing-container-movie {
        vertical-align: top;
        display: inline-block;
        text-align: center;
        width: 20rem;
        height: 100%;
    }

        .ticketing-container-movie-title {
            color: white;
            background-color: #242424;
            height: 4%;
        }

        .ticketing-container-movies {
            background-color: #F2F0E5;
            height: 96%;
        }

            .ticketing-container-movies-list {
                text-align: left;
                position: relative;
                margin: auto;
                width: 90%;
                height: 100%;
            }

            .movie {
                height: 2rem;
                text-decoration: none;
            }

            .movie-span {
                font-size: 1.2rem;
                text-decoration: none;
            }

            .movie-list-ageCut {
                position:relative;
                display:inline-block;
                padding-right: 10px;
            }



    .ticketing-container-screen {
        vertical-align: top;
        display: inline-block;
        text-align: center;
        width: 30rem;
        height: 100%;
    }

        .ticketing-container-screen-title {
            color: white;
            background-color: #242424;
            height: 4%;
        }

        .ticketing-container-screens {
            background-color: #F2F0E5;
            height: 96%;
        }



    .ticketing-container-select-seat {
        position: relative;
        background-color: #242424;
        width: 50.3rem;
        max-height: 5rem;
        height: 100%;
    }

    .ticketing-container-select-seat .btn {
        position: absolute;
        top:50%;
        transform:translateY(-50%); 
        left: 82%
    }

    .w-btn {
        width: 132px;
        height: 55px;
        position: relative;
        border: none;
        display: inline-block;
        padding: 15px 30px;
        border-radius: 15px;
        font-family: "paybooc-Light", sans-serif;
        box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
        text-decoration: none;
        font-weight: 600;
        transition: 0.25s;
    }

    .w-btn-red {
        background-color: #ff5f2e;
        color: #e1eef6;
    }

    .w-btn-outline {
        background-color: #343434;
        position: relative;
        padding: 15px 30px;
        border-radius: 15px;
        font-family: "paybooc-Light", sans-serif;
        box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
        text-decoration: none;
        font-weight: 600;
        transition: 0.25s;
    }

    .w-btn-red-outline {
        border: 3px solid #979797;
        color: #ffffff;
    }
</style>