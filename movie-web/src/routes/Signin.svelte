<script>
    import { SignInCard } from "flowbite-svelte";

    const btnSignInColor = "red";
    const title = "로그인";
    const action = {};
    const signupLink = "/#/signup";
    const lostPasswordLink = "das";
</script>

<SignInCard
    id="id1"
    {btnSignInColor}
    {title}
    {action}
    {signupLink}
    {lostPasswordLink}
/>
