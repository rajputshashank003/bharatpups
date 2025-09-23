import AppRoutes from './AppRoutes.jsx';
import Loading from './components/Loading/Loading.jsx';
import BottomBar from './components_v3/BottomBar.jsx';
import AdvertisementBanner from './components/AdvertisementBanner/AdvertisementBanner.jsx';
import { Analytics } from "@vercel/analytics/react";

function App() {

    return (
        <div className='flex flex-col  justify-center items-center'>
            <div className='lg:max-w-[1200px] w-screen mx-[40px]'>
                <Analytics />
                <AdvertisementBanner />
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
