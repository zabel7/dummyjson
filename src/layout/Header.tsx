
// assets
import AstudioIcon from 'assets/astudio-icon.svg';


// Header component
// It renders the header of the application fixed at the top
const Header = () => {
    return (
        <header className="fixed top-1 rounded-xl z-30 inset-x-2 shadow justify-center border border-gray-200  bg-white/75 backdrop-blur p-4 text-white bg-opacity-50">
            <div className="flex items-center">
                <button >
                    <img
                        src={AstudioIcon}
                        alt="Astudio"
                        className="w-auto h-5"
                    />
                </button>
            </div>
        </header>
    );
};

export default Header;
