import Main from "./routes/Main.svelte"
import Login from "./routes/Signin.svelte"

const routes = {
    "/": Main,
    "/signin": Login,
};

export default routes