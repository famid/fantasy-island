import React from "react";
import { useState, useEffect } from "react";
import { Group } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useClickOutside } from "@mantine/hooks";
import { BsCalendarDate } from "react-icons/bs";

const months = {
    1: "January",
    2: "February",
    3: "March",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8: "August",
    9: "September",
    10: "October",
    11: "November",
    12: "December",
};

function Order() {
    const [value, setValue] = useState(null);
    const [datePickerToggle, setDatePickerToggle] = useState(false);
    const ref = useClickOutside(() => setDatePickerToggle(false));
    const [noOfTickets, setNoOfTickets] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [perTicketPrice, setPerTicketPrice] = useState(200);
    const [selectedDate, setSelectedDate] = useState(null);
    const [date, setDate] = useState("");

    useEffect(() => {
        setTotalPrice(() => {
            return noOfTickets * perTicketPrice;
        });
    }, [noOfTickets]);

    useEffect(() => {
        if (selectedDate) {
            console.log(selectedDate);
            const year = selectedDate.getFullYear();
            const month = selectedDate.getMonth() + 1;
            const day = selectedDate.getDate();
            setDate(`${day} ${months[month]} ${year}`);
        }
    }, [selectedDate]);

    return (
        <div className="container h-screen mx-auto py-8 px-6">
            <div className="max-w-md mx-auto h-full flex justify-center items-center flex-col  rounded-lg ">
                <header className="mb-8 text-2xl md:text-3xl font-semibold text-center">
                    <h1 className="">Buy Tickets</h1>
                </header>
                <div className="py-4 px-6 bg-[#A5D7E8] rounded-lg md:w-[600px] w-[300px]">
                    <form>
                        <div className="mb-8 flex justify-center flex-col items-center">
                            <label
                                htmlFor="name"
                                className="block mb-2 text-2xl  font-semibold text-gray-900"
                            >
                                Place
                            </label>
                            <span className="block mb-2 underline    text-sm font-medium text-gray-900">
                                House 10 Rd. 03 Sector 01 Uttara Dhaka, Dhaka
                                1230 BD
                            </span>
                        </div>
                        <div className="w-full mb-8 flex md:flex-row flex-col justify-between">
                            <div className="w-full md:w-2/5">
                                <div className="mb-4 relative">
                                    <label
                                        htmlFor="phone"
                                        className=" mb-2 text-xl font-semibold flex gap-3 items-center text-gray-900"
                                    >
                                        Pick Your Date{" "}
                                        <BsCalendarDate
                                            onClick={() =>
                                                setDatePickerToggle(true)
                                            }
                                        />
                                    </label>

                                    {datePickerToggle && (
                                        <div
                                            ref={ref}
                                            className="absolute top-8 left-2 bg-white"
                                        >
                                            <Group position="center shadow-lg">
                                                <DatePicker
                                                    value={selectedDate}
                                                    onClick={() =>
                                                        setDatePickerToggle(
                                                            false
                                                        )
                                                    }
                                                    onChange={setSelectedDate}
                                                />
                                            </Group>
                                        </div>
                                    )}
                                </div>
                                <div className="mb-4">
                                    <label
                                        htmlFor="otp"
                                        className="block mb-2 text-xl font-semibold text-gray-900"
                                    >
                                        Select No Of Tickets.
                                    </label>
                                    <div className="flex gap-3 max-w-[150px]">
                                        <span
                                            onClick={() =>
                                                setNoOfTickets((old) =>
                                                    old > 0 ? old - 1 : old
                                                )
                                            }
                                            className="text-3xl cursor-pointer"
                                        >
                                            -
                                        </span>
                                        <input
                                            className="text-2xl text-center appearance-none border rounded w-[50px]  px-1 text-gray-700 leading-tight focus:outline-none"
                                            type="text"
                                            onChange={() => null}
                                            value={noOfTickets}
                                        />
                                        <span
                                            onClick={() =>
                                                setNoOfTickets((old) => old + 1)
                                            }
                                            className="text-3xl cursor-pointer"
                                        >
                                            +
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="border border-gray-900 h-[100px] md:block hidden"></div>
                            <div className="flex w-full md:w-2/5 flex-col gap-3 mb-4 items-start">
                                <div>
                                    <p className="block mb-2 text-xl font-semibold text-gray-900">
                                        Date: {date}
                                    </p>
                                </div>
                                <div className="flex">
                                    <label
                                        htmlFor="price"
                                        className="block mb-2 text-xl font-semibold text-gray-900"
                                    >
                                        Total Price:
                                    </label>
                                    <span className="block mb-2 text-xl font-semibold text-gray-900">
                                        {totalPrice} TK
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="mb-4">
                            <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-full rounded focus:outline-none "
                            >
                                Place Order
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Order;
