/**

 * Outer wrapper of the entire app,
 * places the app content in the center of the screen and sets a top level background
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */
import LogoLink from "../../../application/components/ui/logo-link";

const FoundationLayout = ({ children }) => {
    return (
        <div
            className="bg-cover  relative overflow-auto bg-center object-cover"
            style={{
                background: 'url("/assets/game.jpg")',
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
            }}
        >
            <div className="relative">

                <header
                    className="absolute inset-x-0 z-20 py-4 sm:fixed sm:h-24 bg-[#587AAA] bg-opacity-[0.9]  sm:py-6 "

                >
                    <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6 lg:px-8">
                        <a href="/">
                            <LogoLink />
                        </a>

                        <nav className="flex items-center justify-between sm:ml-16 sm:w-full">
                            <div className="hidden gap-10 sm:flex"></div>
                            <a
                                href="/order"
                                className="rounded-full bg-black px-5 py-2.5 font-medium text-white hover:bg-gray-900"
                            >
                                Buy Ticket
                            </a>
                        </nav>
                    </div>
                </header>
            </div>
            <div className="min-h-screen z-50   flex items-center mx-auto justify-between max-w-7xl">
                <div className="flex flex-col md:justify-center py-7 md:py-32 md:flex-row gap-6 p-4 top-0 left-0 right-0 bottom-0 absolute ">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default FoundationLayout;
