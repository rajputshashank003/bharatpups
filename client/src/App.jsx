import AppRoutes from './AppRoutes.jsx';
import Loading from './components/Loading/Loading.jsx';
import BottomBar from './components_v3/BottomBar.jsx';
import { useWelcomeModal } from './components/Hooks/useWelcomeModal.jsx';
import { useNavigate } from 'react-router-dom';

function App() {
    const { isOpen, closeModal } = useWelcomeModal();
    const navigate = useNavigate();

    const handle_advertisement_click = () => {
        closeModal();
        navigate('/explore/breed/?breed=Bull%20dog');
    }

    return (
        <div className='flex flex-col  justify-center items-center'>
            {isOpen && (
                <div className="fixed cursor-pointer inset-0 flex items-center justify-center bg-black/70 z-[9999999]">
                    <div className="bg-white p-6 rounded-xl shadow-lg relative max-w-sm">
                        <button
                            className="absolute -top-[16px] -right-[12px] text-xl bg-neutral-300 p-[8px] py-[6px] hover:bg-neutral-400 duration-100 rounded-[12px] font-bold text-gray-700"
                            onClick={closeModal}
                        >
                            ✖
                        </button>
                        <img
                            onClick={handle_advertisement_click}
                            src="/AdvertisementImages/Bull15.png"
                            alt="Welcome"
                            className="rounded-lg w-full"
                        />
                    </div>
                </div>
            )}
            <div className='lg:max-w-[1200px] w-screen mx-[40px]'>
                <Loading />
                <div className=''>
                    <AppRoutes />
                </div>
                <BottomBar />
            </div>
        </div>
    )
}

export default App
