import React from "react";
import { useState, useEffect } from "react";
import { Group } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useClickOutside } from "@mantine/hooks";
import { BsCalendarDate } from "react-icons/bs";
import notify from "./components/notify";

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

function Order({ data }) {
    const [datePickerToggle, setDatePickerToggle] = useState(false);
    const ref = useClickOutside(() => setDatePickerToggle(false));
    const [noOfTickets, setNoOfTickets] = useState(1);
    const [totalPrice, setTotalPrice] = useState(0);
    const [perTicketPrice, setPerTicketPrice] = useState(200);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [date, setDate] = useState(null);
    const [purchasePage, setPurchasePage] = useState(false);
    const [loading, setLoading] = useState();
    const [order, setOrder] = useState();

    const { authUser, csrfToken } = data;

    const user = authUser ? JSON.parse(authUser) : {};

    // request handlers
    const handleOrderSubmit = async (event) => {
        event.preventDefault();

        setLoading(true);

        if (!date || noOfTickets < 1) {
            notify("Please select date and tickets!");
            return;
        }

        try {
            console.log(selectedDate.toLocaleString('en-US', { timeZone: 'Asia/Dhaka' }))

            const response = await fetch("/orders/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": csrfToken,
                },
                body: JSON.stringify({
                    quantity: noOfTickets,
                    amount: totalPrice,
                    purchase_date: selectedDate.toLocaleString('en-US', { timeZone: 'Asia/Dhaka' }),
                    user_id: user.id,
                }),
            });

            if (response.ok) {
                // notify('You are being redirected to purchase page!')

                const result = await response.json();
                setOrder(result.data);
                localStorage.setItem(
                    "ticket_purchase_order_id",
                    result.data.id
                );

                setTimeout(() => {
                    setPurchasePage(true);
                }, 500);

                // notify('OTP sent to your phone')
            } else {
                setIsOtpSentState(false);
            }
        } catch (error) {}

        setLoading(false);
    };

    const purchaseHandler = async (e) => {
        try {
            const response = await fetch(`/orders/${order?.id}/make-payment`);
            const result = await response.json();

            window.location.href = result.data.data;

            if (response.ok) {
            } else {
            }
        } catch (e) {}
    };

    useEffect(async () => {

        if (data.authUser) {
            // console.log(JSON.parse(user))
            const response = await fetch(
                `/orders/${JSON.parse(data.authUser).id}/unpaid-order`
            );
            const result = await response.json();
            console.log(result);
        }
    }, []);

    // side effects


    useEffect(() => {
        setTotalPrice(() => {
            return noOfTickets * perTicketPrice;
        });
    }, [noOfTickets]);

    useEffect(() => {
        if (selectedDate) {
            const year = selectedDate.getFullYear();
            const month = selectedDate.getMonth() + 1;
            const day = selectedDate.getDate();
            setDate(`${day} ${months[month]} ${year}`);
        }
    }, [selectedDate]);

    useEffect(() => {
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth() + 1;
        const day = today.getDate();
        setDate(`${day} ${months[month]} ${year}`);
    }, []);

    return (
        <div className="container h-screen mx-auto py-8 px-6">
            <div className="max-w-md mx-auto h-full flex justify-center items-center flex-col  rounded-lg ">
                <header className="mb-8 text-2xl md:text-3xl font-semibold text-center">
                    <h1 className="">Buy Tickets</h1>
                </header>
                <div></div>

                <div className="py-8 px-6 bg-[#A5D7E8] rounded-lg md:w-[600px] w-[300px]">
                    {!purchasePage && (
                        <form>
                            <div className="mb-8 flex justify-center flex-col items-center">
                                <label
                                    htmlFor="name"
                                    className="block mb-2 text-2xl  font-semibold text-gray-900"
                                >
                                    Place
                                </label>
                                <span className="block mb-2 underline    text-sm font-medium text-gray-900">
                                    House 10 Rd. 03 Sector 01 Uttara Dhaka,
                                    Dhaka 1230 BD
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
                                                        onChange={
                                                            setSelectedDate
                                                        }
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
                                                        old > 1 ? old - 1 : old
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
                                                    setNoOfTickets(
                                                        (old) => old + 1
                                                    )
                                                }
                                                className="text-3xl cursor-pointer"
                                            >
                                                +
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="border border-gray-900 h-[100px] md:block hidden"></div>
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
                                        <span className="block mb-2 ml-1 text-xl font-semibold text-gray-900">
                                            {totalPrice} TK
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-4">
                                <button
                                    onClick={handleOrderSubmit}
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-full rounded focus:outline-none "
                                >
                                    Place Order
                                </button>
                            </div>
                        </form>
                    )}

                    {purchasePage && (
                        <div className="max-w-[400px] mx-auto">
                            <div className="flex flex-col mt-4 mb-8">
                                <h2 className="my-3 text-2xl font-semibold">
                                    You are purchasing {noOfTickets}{" "}
                                    {noOfTickets < 2 ? "ticket" : "tickets"} at
                                    the price of {totalPrice}
                                </h2>

                                <div>
                                    {/* <Select
                                    label="Please Select A Payment Method"
                                    placeholder="Pick one"
                                    data={[
                                        { value: 'Nagad', label: 'Nagad' },
                                        { value: 'Bikash', label: 'Bikash' },
                                        { value: 'Rocket', label: 'Rocket' },
                                    ]}
                                    /> */}
                                </div>
                            </div>
                            <button
                                type="submit"
                                onClick={purchaseHandler}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-full rounded focus:outline-none "
                            >
                                Purchase
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Order;
