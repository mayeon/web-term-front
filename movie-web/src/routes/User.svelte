<script>
    import { Card, HorizontalCard, Textarea, Range } from "flowbite-svelte";

    const user = {
        id: "dsad3123",
    };
</script>

<div>
    <h1 class="text-5xl dark:text-white">Id : {user.id}</h1>
    <br />
    <h1 class="text-3xl dark:text-white">예매내역</h1>
    <Card header="Simple card with header and content">
        <p
            class="mb-3 font-normal text-gray-700 dark:text-gray-400"
            slot="paragraph"
        >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla
            distinctio.
        </p>
    </Card>
    <br />
    <Card header="Simple card with header and content">
        <p
            class="mb-3 font-normal text-gray-700 dark:text-gray-400"
            slot="paragraph"
        >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla
            distinctio.
        </p>
    </Card>
    <Card header="Simple card with header and content">
        <p
            class="mb-3 font-normal text-gray-700 dark:text-gray-400"
            slot="paragraph"
        >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla
            distinctio.
        </p>
    </Card>
</div>
