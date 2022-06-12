<script>
    import axios from "axios";
    import { get } from "svelte/store";
    import { screenInfo } from "../function/store.js";
    import { axiosInstance } from "../function/source.js";
    import { onMount } from "svelte";  
    import { push } from "svelte-spa-router";
    import LayoutGrid, { Cell } from '@smui/layout-grid';

    let screenId;
    let reservedSeatInfo = []; // 이미 예약된 좌석
    let theaterMaxSeat = [];  // 상영관 전체 좌석 수

    let maxNumOfPersion = [0, 1, 2, 3, 4];
    let numOfPerson = -1;
    let selectedSeats = 0;
    let selectSeatMatrices = []; // 내가 선택한 좌석 목록

    let price = 0;
    $: totalPrice = numOfPerson * selectedSeats;

    onMount(async () => {
        // screenId = get(screenInfo).selectedScreen
        screenId=1;
        axiosInstance.get(`/screen/${screenId}/seat`)
            .then(res => {
                reservedSeatInfo = res.data;
                console.log(reservedSeatInfo);
            })

        axiosInstance.get(`/theater/${screenId}`)
            .then(res => {
                theaterMaxSeat[0] = alpabetToAscii(res.data.row) + 1;
                theaterMaxSeat[1] = res.data.col + 1;
                console.log(theaterMaxSeat);
            })

        axiosInstance.get(`/screen/${screenId}/price`)
            .then(res => {
                price = res.data;
                console.log(price);
            })
    })

    function changeNumOfPerson(num) {
        numOfPerson = num;
    }

    async function ticketing() {

        let data = {
            "screenId": screenId,
            "seatMatrices": selectSeatMatrices
        }

        await axiosInstance.post("/ticket/reservation", data)
            .catch(err => {
                console.log(err);
            });
    }

    function alpabetToAscii(alpabet) {
        let index = alpabet.charCodeAt(0);

        if (65 <= index && index <= 90)
            return index - 64;
        else if (97 <= index && index <= 122)
            return index - 96;
        return 0;
    }
</script>

<div class="seat-container">
    <div class="seat-container-title">
        <span>인원 / 좌석</span>
    </div>

    <div class="seat-container-select-person">
        <div class="seat-container-select-person-container">
            <span>일반</span>
            {#each maxNumOfPersion as num}
                <label class="numOfPerson">
                    <input type="radio" name="numOfPerson" on:click={() => changeNumOfPerson(num)}>
                    <span>{num}</span>
                </label>
            {/each}
            {numOfPerson}
        </div>
    </div>

    <div class="seat-container-select-seat">
        <div class="seat-container-select-screen">
            <span>SCREEN</span>
        </div>

        <div class="seat-container-select-seats">
            <LayoutGrid>
            {#each new Array(theaterMaxSeat[0]) as a, i}
                <div class="seat-container-select-seats-row"> 
                {#each new Array(theaterMaxSeat[1]) as b, j}
                    <div class="seat-container-select-seats-col"> 
                        <Cell span={2}>
                            {#if i == 0 && j == 0}
                                좌석
                            {/if}

                            {#if i == 0 && j > 0}
                                {j}열
                            {/if}

                            {#if i > 0 && j == 0}
                                {String.fromCharCode(64 + i)}행
                            {/if}

                            {#if i > 0 && j > 0}
                                ㅁ 
                            {/if}
                        </Cell>
                    </div>
                {/each}
                </div>
            {/each}
            </LayoutGrid>
        </div>
    </div>

    <div class="seat-container-ticketing">
        <div class="seat-container-ticketing-price">
            <span>{totalPrice}원</span>
        </div>
        {#if numOfPerson == selectedSeats}
            <div class="seat-container-ticketing-btn">
                <button on:click={() => ticketing()} class="w-btn w-btn-red btn" type="button">
                    예매
                </button>
            </div>
        {:else}
            <div class="seat-container-ticketing-btn">
                <button class="w-btn-outline w-btn-red-outline btn" type="button">
                    예매
                </button>
            </div>
        {/if}
    </div>
</div>

<style>
    .numOfPerson input[type="radio"] {
        display: none;
    }
 
    .numOfPerson input[type="radio"] + span {
        display: inline-block;
        padding: 10px 10px;
        border: 1px solid #dfdfdf;
        background-color: #ffffff;
        text-align: center;
        cursor: pointer;
        width: 3rem;
        height: 3rem;
    }
 
    .numOfPerson input[type="radio"]:checked + span {
        background-color: #113a6b;
        color: #ffffff;
    }

    .numOfPerson {
        display: inline-block;
    }



    .seat-container {
        height: 35rem;
        position: relative;
    }

        .seat-container-title {
            text-align: center;
            vertical-align: middle;
            color: white;
            background-color: #242424; 
            width: 50rem;
            height: 2rem;
            line-height:2rem;
        }  

        .seat-container-select-person {
            position: relative;
            background-color: #F2F0E5;
            width: 50rem;
            height: 8rem;
            border: 2px solid #D4D1C9;
        }

            .seat-container-select-person-container {
                position: absolute;
                width: 50rem;
                top:50%;
                transform:translateY(-50%); 
            }

        .seat-container-select-seat {
            background-color: #F2F0E5;
            width: 50rem;
            height: 20rem;
            border: 2px solid #D4D1C9;
            border-top: none;
        }

            .seat-container-select-screen {
                background-color: #E4E2D7;
                text-align: center;
                vertical-align: middle;
                font-weight: bold;
                position: relative;
                margin: auto;
                width: 40rem;
                height: 2rem;
                top: 1rem;
                line-height:2rem;
            }

            .seat-container-select-seats {
                text-align: center;
                position: relative;
                margin-top: 1rem;
                top: 1rem;
                width: 50rem;
                height: 17rem;
            }

                .seat-container-select-seats-row {

                }

                .seat-container-select-seats-col {
                    display:inline-block;
                }

        .seat-container-ticketing {
            position: relative;
            background-color: #242424; 
            width: 50rem;
            height: 5rem;
        }

            .seat-container-ticketing-price {
                position: absolute;
                top:50%;
                transform:translateY(-50%); 
                left: 60%;
                font-size: 1.5rem;
                color: white;
            }

        .seat-container-ticketing-btn {
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
        width: 132px;
        height: 55px;
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