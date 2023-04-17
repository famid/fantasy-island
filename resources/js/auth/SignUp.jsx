import React, { useState } from "react";

function SignUp({csrf}) {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [otp, setOTP] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [buttonValue, setButtonValue] = useState("SEND OTP");

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        //   setButtonValue('SENDING OTP')
        setError("");

        try {
            const response = await fetch("/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": csrf,
                },
                body: JSON.stringify({ name, phone, password }),
            });

            console.log(response);

            if (response.ok) {
                // setButtonValue('OTP SENT')
                // Handle successful signup
            } else {
                // setButtonValue('OTP WASN"T SENT')
                const data = await response.json();
                setError(data.message);
            }
        } catch (error) {
            setError("Something went wrong. Please try again later.");
        }

        setLoading(false);
    };

    const verifyOtp = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            const response = await fetch("/verify-otp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": csrf,
                },
                body: JSON.stringify({ phone_verification_code:otp, phone }),
            });

            console.log(response);

            if (response.ok) {
                // setButtonValue('OTP SENT')
                // Handle successful signup
            } else {
                // setButtonValue('OTP WASN"T SENT')
                const data = await response.json();
                setError(data.message);
            }
        } catch (error) {
            setError("Something went wrong. Please try again later.");
        }

        setLoading(false);
    }

    return (
        <div className="max-w-md mx-auto h-full flex justify-center items-center flex-col  rounded-lg overflow-hidden">
            <header className="mb-8 text-2xl md:text-3xl font-semibold text-center">
                <h1>
                    Register To Buy Tickets And Have A Chance To Win Prizes!
                </h1>
            </header>
            <div className="py-4 px-6 bg-[#A5D7E8] rounded-lg md:w-[400px] w-[300px]">
                <h2 className="text-2xl font-bold mb-2">Register</h2>
                <form>
                    <div className="mb-4">
                        <label
                            htmlFor="name"
                            className="block text-gray-700 font-bold mb-2"
                        >
                            Name
                        </label>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            name="name"
                            id="name"
                            className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none "
                            required
                        />
                    </div>
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
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none "
                            id="send-otp"
                        >
                            {" "}
                            {buttonValue}
                        </button>
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="otp"
                            className="block text-gray-700 font-bold mb-2"
                        >
                            OTP
                        </label>
                        <input
                            value={otp}
                            onChange={(e) => setOTP(e.target.value)}
                            type="text"
                            name="otp"
                            id="otp"
                            className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none "
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <button
                            onClick={verifyOtp}
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none "
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignUp;
