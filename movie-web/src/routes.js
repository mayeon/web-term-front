import Main from "./routes/Main.svelte"
import Login from "./routes/Signin.svelte"
import SignUp from "./routes/SignUp.svelte"
import MovieChart from "./routes/MovieChart.svelte"
import Movie from "./routes/Movie.svelte"
import Ticketing from "./routes/Ticketing.svelte"
import SelectSeats from "./routes/SelectSeats.svelte"
import User from "./routes/User.svelte"
import Admin from "./routes/Admin.svelte"
import Schedule from "./routes/Schedule.svelte"

const routes = {
    "/": Main,
    "/signin": Login,
    "/signup": SignUp,
    "/movie": MovieChart,
    "/movie/:movieId": Movie,
    "/schedule": Schedule,
    "/ticketing": Ticketing,
    "/ticketing/:movieId/:screenId": Ticketing,
    "/selectSeat": SelectSeats,
    "/user": User,
    "/admin": Admin,
};

export default routes