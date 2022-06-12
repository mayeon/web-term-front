<script>
    import { SignInCard } from "flowbite-svelte";
    import { axiosInstance } from "../function/source.js";
    import { pop } from "svelte-spa-router";

    let userEmail = "";
    let userPw = "";

    async function login() {
        try {
            const useAccount = {
                userId: userEmail,
                password: userPw,
            };
            await axiosInstance
                .post("/auth/login", JSON.stringify(useAccount))
                .then((res) => {
                    sessionStorage.removeItem("access_token");
                    sessionStorage.setItem(
                        "access_token",
                        JSON.stringify(res.data)
                    );
                    pop();
                })
                .catch((err) => {
                    alert("계정 정보를 확인해주세요.");
                    console.log("login requset fail : " + err);
                })
                .finally(() => {
                    console.log("login request end");
                });
        } catch (err) {
            console.log(err);
        }
    }
</script>

<div
    class="p-4 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700"
>
    <form class="space-y-6">
        <h5 class="text-xl font-medium text-gray-900 dark:text-white">
            Sign in to our platform
        </h5>
        <div>
            <label
                for="email"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >Your email</label
            >
            <input
                bind:value={userEmail}
                type="email"
                name="email"
                id="email"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="name@company.com"
                required
            />
        </div>
        <div>
            <label
                for="password"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >Your password</label
            >
            <input
                bind:value={userPw}
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
            />
        </div>
        <button
            on:click={login}
            type="button"
            class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >Login to your account</button
        >
        <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
            Not registered? <a
                href="#/signup"
                class="text-blue-700 hover:underline dark:text-blue-500"
                >Create account</a
            >
        </div>
    </form>
</div>
