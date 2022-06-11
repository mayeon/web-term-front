import Main from "./routes/Main.svelte"
import Login from "./routes/Signin.svelte"
import SignUp from "./routes/SignUp.svelte"
import MovieChart from "./routes/MovieChart.svelte"
import Movie from "./routes/Movie.svelte"
import User from "./routes/User.svelte"

const routes = {
    "/": Main,
    "/signin": Login,
    "/signup": SignUp,
    "/movie": MovieChart,
    "/movie/:movieId": Movie,
    "/user/:userId": User,
};

export default routes