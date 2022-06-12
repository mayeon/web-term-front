<script>
    import { Card, HorizontalCard, Textarea, Range } from "flowbite-svelte";
    import { axiosInstance } from "../function/source.js";
    import { onMount } from "svelte";

    let user = {
        name: "",
        ticketData: [],
    };

    onMount(async () => {
        axiosInstance
            .get("/user/info")
            .then((res) => {
                user = res.data;
                console.log(user);
            })
            .catch((err) => {
                console.log(err);
            });
    });
</script>

<div>
    <h1 class="text-5xl dark:text-white">이름 : {user.name}</h1>
    <br />
    <h1 class="text-3xl dark:text-white">예매내역</h1>
    {#each user.ticketData as data}
        <Card header={data.movieName}>
            <h1>
                {data.screenName}
            </h1>
            <h1>
                {data.screenFloor}
            </h1>
            <h1>
                {data.startDate}
            </h1>
            <h1>
                {data.movieName}
            </h1>
            <h1>
                {data.movieName}
            </h1>
            {#each data.sheets as sheet}
                <h1>
                    {sheet.row}{sheet.col}
                </h1>
            {/each}
        </Card>
        <br />
    {/each}
</div>
