<script>
    import { Card, HorizontalCard, Textarea, Range } from "flowbite-svelte";

    const user = {
        id: "dsad3123",
    };

    let datas = [];
</script>

<div>
    <h1 class="text-5xl dark:text-white">Id : {user.id}</h1>
    <br />
    <h1 class="text-3xl dark:text-white">예매내역</h1>
    {#each datas as data}
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
