<script>
    import Header from "./component/Header.svelte";
    import Router from "svelte-spa-router";
    import routes from "./routes";

    import "flowbite/dist/flowbite.css";
</script>

<Header />
<main>
    <Router {routes} />
</main>

<style>
    main {
        padding: 1em auto;
        margin: 1em auto;
    }
</style>
