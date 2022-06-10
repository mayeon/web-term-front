import Main from "./routes/Main.svelte"
import Login from "./routes/Signin.svelte"
import SignUp from "./routes/SignUp.svelte"
import MovieChart from "./routes/MovieChart.svelte"
import Movie from "./routes/Movie.svelte"

const routes = {
    "/": Main,
    "/signin": Login,
    "/signup": SignUp,
    "/movie": MovieChart,
    "/movie/:movieId": Movie,
};

export default routes