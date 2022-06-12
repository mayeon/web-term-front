<script>
    import { link } from "svelte-spa-router";
    import {
        Navbar,
        NavBrand,
        NavHamburger,
        NavUl,
        NavLi,
    } from "flowbite-svelte";
    import { SignInModal, ModalButton, Button } from "flowbite-svelte";
    import { onMount } from "svelte";

    let token = null;

    onMount(() => {
        token = sessionStorage.getItem("access_token");
    });
</script>

<Navbar let:hidden let:toggle>
    <NavBrand href="/">
        <img
            src="https://img.cgv.co.kr/R2014/images/common/logo/logoRed.png"
            class="mr-3 h-6 sm:h-9"
            alt="theater Logo"
        />
        <span
            class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
        >
            영화관
        </span>
    </NavBrand>
    <NavUl {hidden}>
        <NavLi href="#/movie">영화</NavLi>
        <NavLi href="#/schedule">극장</NavLi>
        {#if token == null}
            <NavLi href="#/signin">로그인</NavLi>
        {:else}
            <NavLi href="#/user">내정보</NavLi>
        {/if}
    </NavUl>
</Navbar>
