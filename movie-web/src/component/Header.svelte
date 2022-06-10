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
        <NavLi href="/">극장</NavLi>
        <NavLi href="#/signin">로그인</NavLi>
    </NavUl>
</Navbar>
