import Main from "./routes/Main.svelte"
import Login from "./routes/Signin.svelte"
import SignUp from "./routes/SignUp.svelte"

const routes = {
    "/": Main,
    "/signin": Login,
    "/signup": SignUp,
};

export default routes