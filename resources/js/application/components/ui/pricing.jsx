const plans = [
  {
    name: "Starter",
    features: [
      "Multi-layered encryption",
      "Pay later, interest-free",
      "$1,000 credit limit",
    ],
    upgradeFeatures: [],
  },
  {
    name: "Everyday",
    monthlyPrice: 15,
    features: ["Multi-layered encryption", "Pay later, interest-free"],
    upgradeFeatures: ["Approval in minutes", "$5,000 credit limit"],
  },
  {
    name: "Pro",
    monthlyPrice: 30,
    features: ["Multi-layered encryption", "Pay later, interest-free"],
    upgradeFeatures: [
      "Approval in minutes",
      "Flexible repayments",
      "Product protection",
      "Unlimited credit limit",
    ],
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="isolate pb-20 md:pb-32">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <h2 className="mt-24 max-w-2xl text-4xl font-bold sm:text-6xl md:mt-40">
          Prize bundles for you
        </h2>
        <section className="text-gray-600 body-font  flex justify-center items-center">
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-wrap -m-4 text-center">
              <div className="p-4 sm:w-1/2 lg:w-1/3 w-full hover:scale-105 duration-500">
                <div className=" flex items-center  justify-between p-4  rounded-lg bg-transparent ">
                  <div>
                    <h2 className="text-gray-900 text-lg font-bold">1st Prize</h2>
                    <h3 className="mt-2 text-xl font-bold text-yellow-500 text-left">+ 150000 TK</h3>

                  </div>
                  <div
                    className="bg-gradient-to-tr from-yellow-500 to-yellow-400 w-32 h-32  rounded-full shadow-2xl shadow-yellow-400 border-white  border-dashed border-2  flex justify-center items-center ">
                    <div>
                      <h1 className="text-white text-2xl">DIAMOND</h1>
                    </div>
                  </div>
                </div>

              </div>


              <div className="p-4 sm:w-1/2 lg:w-1/3 w-full hover:scale-105 duration-500">
                <div className=" flex items-center  justify-between p-4  rounded-lg bg-white ">
                  <div>
                    <h2 className="text-gray-900 text-lg font-bold">2nd Prize</h2>
                    <h3 className="mt-2 text-xl font-bold text-cyan-500 text-left">+ 150.000 Taka</h3>

                  </div>
                  <div
                    className="bg-gradient-to-tr from-cyan-500 to-cyan-400 w-32 h-32  rounded-full shadow-2xl shadow-cyan-400 border-white  border-dashed border-2  flex justify-center items-center ">
                    <div>
                      <h1 className="text-white text-2xl">GOLD</h1>
                    </div>
                  </div>
                </div>

              </div>
              <div className="p-4 sm:w-1/2 lg:w-1/3 w-full hover:scale-105 duration-500">
                <div className=" flex items-center  justify-between p-4  rounded-lg bg-white ">
                  <div>
                    <h2 className="text-gray-900 text-lg font-bold">First Prize</h2>
                    <h3 className="mt-2 text-xl font-bold text-indigo-500 text-left">+ 150.000 ₭</h3>
                    <p className="text-sm font-semibold text-gray-400">Last Transaction</p>
                  </div>
                  <div
                    className="bg-gradient-to-tr from-indigo-500 to-indigo-400 w-32 h-32  rounded-full shadow-2xl shadow-[#304FFE] border-white  border-dashed border-2  flex justify-center items-center ">
                    <div>
                      <h1 className="text-white text-2xl">Silver</h1>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
