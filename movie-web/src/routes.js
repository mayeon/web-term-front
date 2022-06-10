import Main from "./routes/Main.svelte"
import Login from "./routes/Signin.svelte"
import SignUp from "./routes/SignUp.svelte"
import Movie from "./routes/Movie.svelte"

const routes = {
    "/": Main,
    "/signin": Login,
    "/signup": SignUp,
    "/movie": Movie,
};

export default routes