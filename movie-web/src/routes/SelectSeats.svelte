<script>
    import { get } from "svelte/store";
    import { movieScreenInfo } from "../function/store.js";
    import { axiosInstance } from "../function/source.js";
    import { onMount } from "svelte";  
    import { push } from "svelte-spa-router";

    onMount(async () => {
        let screenId = get(movieScreenInfo).selectedScreen;
        console.log(screenId);
        // axiosInstance.get("/")
    })
</script>

<div>
    <div>
    
    </div>

    <div>
    
    </div>

    <div>
        
    </div>
</div>