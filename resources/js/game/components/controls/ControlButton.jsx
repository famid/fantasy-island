/**
 * Render a rounded button with light blue/indigo background
 * @param {string|JSX.Element} children - the content to render inside the button
 * @param {object} rest - other attributes to pass on to the <button /> component (mostly the onClick attribute)
 * @returns {JSX.Element}
 * @constructor
 */
const ControlButton = ({children, ...rest}) => {
    return (
        <button
            {...rest}
            className="rounded-full border border-black px-5 py-2.5 font-medium hover:bg-gray-200/25"
        >
            {children}
        </button>
    );
}

export default ControlButton;