import { Select } from "@mantine/core";
import React, { useState, useEffect } from "react";
import notify from "./components/notify";

const paymentSystems = [
    {
        payment_system: "Bikash",
        value: "Bikash",
        label: "Bikash",
        mercent_accounts_phone: [
            {
                value: "0187236232",
                label: "0187236232",
            },
            {
                value: "0187236234",
                label: "0187236234",
            },
            {
                value: "0187236235",
                label: "0187236235",
            },
        ],
    },
    {
        payment_system: "Nagad",
        value: "Nagad",
        label: "Nagad",
        mercent_accounts_phone: [
            {
                value: "0187236232",
                label: "0187236232",
            },
            {
                value: "0187236238",
                label: "0187236238",
            },
        ],
    },
    {
        payment_system: "Rocket",
        value: "Rocket",
        label: "Rocket",
        mercent_accounts_phone: [
            {
                value: "0187236239",
                label: "0187236239",
            },
            {
                value: "0187236237",
                label: "0187236237",
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

        setLoading(true);

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
        }



        let tempData = {
            payment_system: selectedPaymentSystem?.value,
            client_phone: clientPhone,
            transaction_id: transactionId,
            order_id: ticket_purchase_order_id,
            mercent_account_phone: selectedMercentAccountPhone,
            user_id: data.authUser.id,
        }

        console.log(tempData)

        try {

            const response = await fetch("/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": csrfToken,
                },
                body: JSON.stringify(tempData),
            });

            console.log(response)

            if (response.ok) {
                // notify('You are being redirected to purchase page!')

                const result = await response.json();

                // notify('OTP sent to your phone')
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

       if(obj) setSelectedPaymentSystem(obj);
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
                        label="Please Select A Mercent Account Number"
                        placeholder="Pick one"
                        onChange={(value) => setSelectedMerchantAccountPhone(value)}
                        data={selectedPaymentSystem?.mercent_accounts_phone}
                    />
                )}
            </div>
            <div className="mt-3 mb-3">
                <h2 className="text-lg  font-bold">How you will proceed:</h2>
                <o>
                    <li>Select your payment system.</li>
                    <li>Select merchant number.</li>
                    <li>Pay the specified amount to this number.</li>
                    <li>Enter the transaction id.</li>
                    <li>Enter your number.</li>
                    <li>Submit information.</li>
                </o>
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
                className="bg-[#E94E77] hover:bg-[#C15B8A] text-white font-bold py-2 px-4 w-full rounded focus:outline-none "
            >
                Submit
            </button>
        </div>
    );
}

export default PurchaseManual;
