<script>
    import {
        Button,
        Navbar,
        NavBrand,
        NavHamburger,
        NavUl,
        NavLi,
    } from "flowbite-svelte";
    import "flowbite/dist/flowbite.css";
    import Router from "svelte-spa-router";
    import routes from "./routes";
</script>

<Navbar let:hidden let:toggle>
    <NavBrand href="/">
        <img
            src="https://img.cgv.co.kr/R2014/images/common/logo/logoRed.png"
            class="mr-3 h-6 sm:h-9"
            alt="Flowbite Logo"
        />
        <span
            class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
        >
            영화관
        </span>
    </NavBrand>
    <NavHamburger on:click={toggle} />
    <NavUl {hidden}>
        <NavLi href="/">영화</NavLi>
        <NavLi href="/">극장</NavLi>
        <NavLi href="/">로그인</NavLi>
        <NavLi href="/">회원가입</NavLi>
    </NavUl>
</Navbar>
<main>
    <Router {routes} />
</main>
