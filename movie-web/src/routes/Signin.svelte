<script>
    import { SignInCard } from "flowbite-svelte";

    const btnSignInColor = "red";
    const title = "로그인";
    const action = {};
    const signup = {
        name: "회원가입",
        href: "#/signup",
    };
</script>

<SignInCard {btnSignInColor} {title} {action} {signup} />
