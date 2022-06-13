<script>
    import { onMount } from "svelte";
    import { axiosInstance } from "../function/source.js";
    import { push } from "svelte-spa-router";
    export let params = {};

    onMount(async() => {
        console.log(params.screenId)
    })

    let discountPolicy;
    let discountPrice;

    function setPolicy(policy) {
        discountPolicy = policy;
    }

    function setPrice(price) {
        discountPrice = document.getElementById('discount-price').value;
    }

    function asd() {
        console.log(discountPolicy)
    }

    async function submit() {
        if (discountPolicy == 'RATED_AMOUNT') {
            if (discountPrice > 100 || discountPrice < 0) {
                alert("0~100%를 넘길 수 없습니다.");
                discountPrice = 0;
                document.getElementById('discount-price').value = 0;
                return;
            }
            if (discountPrice == null) {
                alert("가격 정보를 입력해주세요.");
                return;
            }
        } else if (discountPolicy == 'FIXED_AMOUNT'){
            if (discountPrice > 5000 || discountPrice < 0) {
                alert("0~5000원을 넘길 수 없습니다.");
                discountPrice = 0;
                document.getElementById('discount-price').value = 0;
                return;
            }
            if (discountPrice == null) {
                alert("가격 정보를 입력해주세요.");
                return;
            }
        } else {
            alert("할인 방법을 선택해주세요.");
            return;
        }

        alert("적용되었습니다.");

        const data = {
            "screenId": params.screenId,
            "discountPolicy": discountPolicy,
            "discountRate": discountPrice
        }
        axiosInstance.post("/screen/modify/price", data).then(() => push("/"))
    }
</script>

<div>
    <span> ScreenId = {params.screenId} <span>
    <label>
        <input type="radio" name="discount-policy" on:click={() => setPolicy("RATED_AMOUNT")}/>
        <span> 정률 <span>
    </label>
    <label>
        <input type="radio" name="discount-policy" on:click={() => setPolicy("FIXED_AMOUNT")}/>
        <span> 정액 <span>
    </label>
    <label>
        <span> 할인율 <span>
        <input id="discount-price" name="discount-price" on:keyup={() => setPrice()}/>
    </label>
</div>

<div>
    <button on:click={() => submit()}>가격 수정</button>
</div>