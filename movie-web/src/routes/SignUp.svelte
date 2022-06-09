<script>
    import { Card, Input, Button } from "flowbite-svelte";
    let id;
    let password;
</script>

<Card header="회원가입">
    <p
        class="mb-3 font-normal text-gray-700 dark:text-gray-400"
        slot="paragraph"
    >
        <Input
            class="mb-6"
            placeholder="example@email.com"
            label="아이디"
            bind:value={id}
        />
        <Input
            class="mb-6"
            placeholder="password"
            label="비밀번호"
            type="password"
            bind:value={password}
        />
        <Button
            type="submit"
            on:click={() => {
                console.log(id);
                console.log(password);
            }}>제출</Button
        >
    </p>
</Card>
