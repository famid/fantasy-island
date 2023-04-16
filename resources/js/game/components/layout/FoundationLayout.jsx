/**
 * Outer wrapper of the entire app,
 * places the app content in the center of the screen and sets a top level background
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */
const FoundationLayout = ({children}) => {
    return (
        <div className=" bg-cover bg-[#0B2447] bg-center">
            <div
                className="  min-h-screen flex items-center justify-center"
            >
                <div className="flex flex-col md:flex-row gap-6 p-4 ">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default FoundationLayout;
