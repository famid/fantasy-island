import React, { useState, useEffect } from "react";
import notify from "./components/notify";
import { redirect } from "react-router-dom";

function SignIn({ csrf }) {
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [buttonValue, setButtonValue] = useState("LOGIN");

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        //   setButtonValue('SENDING OTP')
        setError("");

        try {
            const response = await fetch("/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": csrf,
                },
                body: JSON.stringify({ phone, password }),
            });

            const result = await response.json();

            if (result.success) {
                notify("Logged in successfully");
                window.location.href = "http://127.0.0.1:8000/order";
            } else {
                notify(result.message);
            }
        } catch (error) {
            setError("Something went wrong. Please try again later.");
        }

        setLoading(false);
    };

    return (
        <div className="max-w-md mx-auto h-full flex justify-center items-center flex-col  rounded-lg overflow-hidden">
            <header className="mb-8 text-2xl md:text-3xl font-semibold text-center">
                <h1>Login To Buy Tickets And Have A Chance To Win Prizes!</h1>
            </header>
            <div className="py-4 px-6 bg-[#A5D7E8] rounded-lg md:w-[400px] w-[300px]">
                <h2 className="text-2xl font-bold mb-2">Login</h2>
                <form>
                    <div className="mb-4">
                        <label
                            htmlFor="phone"
                            className="block text-gray-700 font-bold mb-2"
                        >
                            Phone Number
                        </label>
                        <input
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            type="tel"
                            name="phone"
                            id="phone"
                            className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none "
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="password"
                            className="block text-gray-700 font-bold mb-2"
                        >
                            Password
                        </label>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            name="password"
                            id="password"
                            className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none "
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <button
                            onClick={handleSubmit}
                            type="button"
                            className="bg-blue-500 hover:bg-blue-700 w-full text-white font-bold py-2 px-4 rounded focus:outline-none "
                            id="send-otp"
                        >
                            {" "}
                            {buttonValue}
                        </button>
                    </div>
                    <div className="mb-4 flex gap-2 justify-center items-center">
                        <p className="block text-gray-700 font-medium ">
                            Don't have account sign up!
                        </p>
                        <a
                            className="block text-blue-700 font-semibold "
                            href="/signup"
                        >
                            Sign Up
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignIn;
