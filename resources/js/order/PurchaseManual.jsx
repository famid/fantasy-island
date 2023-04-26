import { Select } from "@mantine/core";
import React, { useState, useEffect } from "react";
import notify from "./components/notify";
import { domain } from "../uitls";

const paymentSystems = [
    {
        payment_system: "Bkash",
        value: "Bkash",
        label: "Bkash",
        mercent_accounts_phone: [
            {
                value: "01716128008",
                label: "01716128008",
            },
        ],
    },
    {
        payment_system: "Nagad",
        value: "Nagad",
        label: "Nagad",
        mercent_accounts_phone: [
            {
                value: "01716128008",
                label: "01716128008",
            },
        ],
    },
    {
        payment_system: "Rocket",
        value: "Rocket",
        label: "Rocket",
        mercent_accounts_phone: [
            {
                value: "01716128008",
                label: "01716128008",
            },
        ],
    },
];

function PurchaseManual({ data }) {
    const [selectedPaymentSystem, setSelectedPaymentSystem] = useState(null);
    const [clientPhone, setClientPhone] = useState("");
    const [transactionId, setTransactionId] = useState("");
    const [selectedMercentAccountPhone, setSelectedMerchantAccountPhone] =
        useState(null);
    const [loading, setLoading] = useState(false);

    const purchase = async (event) => {
        event.preventDefault();

        const ticket_purchase_order_id = localStorage.getItem(
            "ticket_purchase_order_id"
        );

        if (
            !selectedPaymentSystem?.value ||
            clientPhone.length < 11 ||
            transactionId.length < 5 ||
            !ticket_purchase_order_id ||
            !selectedMercentAccountPhone
        ) {
            notify("Please select all the credentials properly!");
            return;
        }
        setLoading(true);
        const user = JSON.parse(data.authUser);
        let tempData = {
            payment_system: selectedPaymentSystem?.value,
            client_phone: clientPhone,
            transaction_id: transactionId,
            order_id: ticket_purchase_order_id,
            merchant_account_phone: selectedMercentAccountPhone,
            user_id: user.id,
        };

        try {
            const response = await fetch("/orders/make-manual-payment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": data.csrfToken,
                },
                body: JSON.stringify(tempData),
            });

            if (response.ok) {
                // notify('You are being redirected to purchase page!')
                 window.location.href = `${domain}/purchase-success`
                // const result = await response.json();
                // notify('Payment successfully done')
            }
        } catch (error) {}

        setLoading(false);
    };

    const selectPaymentSystem = (system) => {
        let obj;
        paymentSystems.forEach((sys, i) => {
            if (system === sys.value) {
                obj = { ...sys };
            }
        });

        if (obj) setSelectedPaymentSystem(obj);
    };

    return (
        <div>
            <div>
                <Select
                    label="Please Select A Payment Method/System"
                    placeholder="Pick one"
                    data={paymentSystems}
                    onChange={selectPaymentSystem}
                />
            </div>

            <div className="mt-3">
                {selectedPaymentSystem && (
                    <Select
                        label="Please Select A Send Account Number"
                        placeholder="Pick one"
                        onChange={(value) =>
                            setSelectedMerchantAccountPhone(value)
                        }
                        data={selectedPaymentSystem?.mercent_accounts_phone}
                    />
                )}
            </div>

            <div className="mb-4">
                <label
                    htmlFor="text"
                    className="block text-gray-700 font-bold mb-1"
                >
                    Client Account Number
                </label>
                <input
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    type="text"
                    name="text"
                    id="text"
                    className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none "
                    required
                />
            </div>

            <div className="mb-5">
                <label
                    htmlFor="text"
                    className="block text-gray-700 font-bold mb-1"
                >
                    Transaction Id
                </label>
                <input
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value)}
                    type="text"
                    name="text"
                    id="text"
                    className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none "
                    required
                />
            </div>
            <button
                type="submit"
                onClick={purchase}
                disabled={loading}
                className="bg-[#E94E77] hover:bg-[#C15B8A] text-white font-bold py-2 px-4 w-full rounded focus:outline-none "
            >
                {!loading ? (
                    "Submit"
                ) : (
                    <div className="w-full h-full flex justify-center items-center">
                        <svg
                            width="26"
                            height="26"
                            viewBox="0 0 38 38"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <defs>
                                <linearGradient
                                    x1="8.042%"
                                    y1="0%"
                                    x2="65.682%"
                                    y2="23.865%"
                                    id="a"
                                >
                                    <stop
                                        stop-color="#fff"
                                        stop-opacity="0"
                                        offset="0%"
                                    />
                                    <stop
                                        stop-color="#fff"
                                        stop-opacity=".631"
                                        offset="63.146%"
                                    />
                                    <stop stop-color="#fff" offset="100%" />
                                </linearGradient>
                            </defs>
                            <g fill="none" fill-rule="evenodd">
                                <g transform="translate(1 1)">
                                    <path
                                        d="M36 18c0-9.94-8.06-18-18-18"
                                        id="Oval-2"
                                        stroke="url(#a)"
                                        stroke-width="2"
                                    >
                                        <animateTransform
                                            attributeName="transform"
                                            type="rotate"
                                            from="0 18 18"
                                            to="360 18 18"
                                            dur="0.9s"
                                            repeatCount="indefinite"
                                        />
                                    </path>
                                    <circle fill="#fff" cx="36" cy="18" r="1">
                                        <animateTransform
                                            attributeName="transform"
                                            type="rotate"
                                            from="0 18 18"
                                            to="360 18 18"
                                            dur="0.9s"
                                            repeatCount="indefinite"
                                        />
                                    </circle>
                                </g>
                            </g>
                        </svg>
                    </div>
                )}
            </button>
            <div className="mt-3 mb-3">
                <h2 className="text-lg  font-bold">How you will proceed:</h2>
                <o>
                    <li>Select your payment system.</li>
                    <li>
                        Select{" "}
                        <span className="text-gray-800 font-bold">
                            'Send Money'
                        </span>{" "}
                        number.
                    </li>
                    <li>Send the specified amount to this number.</li>
                    <li>Enter your number.</li>
                    <li>Enter the transaction id.</li>

                    <li>Submit information.</li>
                </o>
            </div>
        </div>
    );
}

export default PurchaseManual;
