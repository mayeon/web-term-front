<script>
    import axios from "axios";
    import { get } from "svelte/store";
    import { screenInfo } from "../function/store.js";
    import { axiosInstance } from "../function/source.js";
    import { onMount } from "svelte";
    import { push } from "svelte-spa-router";
    import LayoutGrid, { Cell } from "@smui/layout-grid";

    let screenId;
    let reservedSeatInfo = []; // 이미 예약된 좌석
    let theaterMaxSeat = []; // 상영관 전체 좌석 수

    let maxNumOfPersion = [0, 1, 2, 3, 4];
    let numOfPerson = -1;
    let selectedSeats = 0;
    let selectSeatMatrices = []; // 내가 선택한 좌석 목록

    let price = 0;
    $: totalPrice = price * selectedSeats;

    export let params = {};
    onMount(async () => {
        screenId = params.screenId;
        axiosInstance.get(`/screen/${screenId}/seat`).then((res) => {
            reservedSeatInfo = res.data;
            console.log(reservedSeatInfo);
        });

        axiosInstance.get(`/theater/${screenId}`).then((res) => {
            theaterMaxSeat[0] = alpabetToAscii(res.data.row);
            theaterMaxSeat[1] = res.data.col + 1;
            console.log(theaterMaxSeat);
        });

        axiosInstance.get(`/screen/${screenId}/price`).then((res) => {
            price = res.data;
            console.log(price);
        });
    });

    function changeNumOfPerson(num) {
        if (num >= selectedSeats) numOfPerson = num;
        else alert("선택된 좌석이 더 많아 변경 불가능");
    }

    async function ticketing() {
        let data = {
            screenId: screenId,
            seatMatrices: selectSeatMatrices,
        };

        console.log(data);

        await axiosInstance
            .post("/ticket/reservation", data)
            .then((res) => {
                push("/");
            })
            .catch((err) => {
                console.log(err);
            });

        push("/");
    }

    function alpabetToAscii(alpabet) {
        let index = alpabet.charCodeAt(0);

        if (65 <= index && index <= 90) return index - 64;
        else if (97 <= index && index <= 122) return index - 96;
        return 0;
    }

    function checkSeat(row, col, obj) {
        if (numOfPerson > selectedSeats) {
            let alpabetRow = String.fromCharCode(row + 64);
            selectedSeats++;
            selectSeatMatrices = [
                ...selectSeatMatrices,
                { row: alpabetRow, col: col },
            ];
        } else {
            alert("인원 수 초과");
        }
    }

    function isReserved(row, col) {
        for (let seat of reservedSeatInfo) {
            if (String.fromCharCode(row + 64) == seat.row && seat.col == col) {
                return true;
            }
        }
        return false;
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
                    <input
                        type="radio"
                        name="numOfPerson"
                        on:click={() => changeNumOfPerson(num)}
                    />
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
            <!-- 행 -->
            {#each new Array(theaterMaxSeat[0]) as a, i}
                <!-- 열 기존 크기에서 1 추가됨 (~행 자리) -->
                <div class="seat-container-select-seats-row">
                    {#each new Array(theaterMaxSeat[1]) as b, j}
                        <div class="seat-container-select-seats-col">
                            <!-- ~행 -->
                            {#if j == 0}
                                <span>{String.fromCharCode(65 + i)}행</span>
                            {:else if isReserved(i + 1, j)}
                                <span>■</span>
                            {:else}
                                <label>
                                    <input
                                        on:click={() => checkSeat(i + 1, j)}
                                        style="display:none"
                                    />
                                    <span id="seat">▢</span>
                                </label>
                            {/if}
                        </div>
                    {/each}
                </div>
            {/each}
        </div>
    </div>

    <div class="seat-container-ticketing">
        <div class="seat-container-ticketing-price">
            <span>{totalPrice}원</span>
        </div>
        {#if numOfPerson == selectedSeats}
            <div class="seat-container-ticketing-btn">
                <button
                    on:click={() => ticketing()}
                    class="w-btn w-btn-red btn"
                    type="button"
                >
                    예매
                </button>
            </div>
        {:else}
            <div class="seat-container-ticketing-btn">
                <button
                    class="w-btn-outline w-btn-red-outline btn"
                    type="button"
                >
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
        line-height: 2rem;
    }

    .seat-container-select-person {
        position: relative;
        background-color: #f2f0e5;
        width: 50rem;
        height: 8rem;
        border: 2px solid #d4d1c9;
    }

    .seat-container-select-person-container {
        position: absolute;
        width: 50rem;
        top: 50%;
        transform: translateY(-50%);
    }

    .seat-container-select-seat {
        background-color: #f2f0e5;
        width: 50rem;
        height: 20rem;
        border: 2px solid #d4d1c9;
        border-top: none;
    }

    .seat-container-select-screen {
        background-color: #e4e2d7;
        text-align: center;
        vertical-align: middle;
        font-weight: bold;
        position: relative;
        margin: auto;
        width: 40rem;
        height: 2rem;
        top: 1rem;
        line-height: 2rem;
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
        position: relative;
        margin: auto;
        width: 30rem;
        height: 2rem;
    }

    .seat-container-select-seats-col {
        display: inline-block;
        width: 2rem;
        height: 2rem;
    }

    .seat-container-ticketing {
        position: relative;
        background-color: #242424;
        width: 50rem;
        height: 5rem;
    }

    .seat-container-ticketing-price {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 60%;
        font-size: 1.5rem;
        color: white;
    }

    .seat-container-ticketing-btn {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 82%;
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
