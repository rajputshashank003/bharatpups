import { useEffect } from 'react'
import AppRoutes from './AppRoutes.jsx';
import Header from './components/Header/Header.jsx';
import Loading from './components/Loading/Loading.jsx';
import Footer from './components/Footer/Footer.jsx';
import "./App.css";
import Header_v2 from './components_v2/Header_v2/Header_v2.jsx';
import SmallDisplayTitle_v2 from './components_v2/SmallDisplayTitle/SmallDisplayTitle_v2.jsx';
import useDimensions from './components/Hooks/useDimensions.jsx';
import axios from 'axios';
import BottomBar from './components_v3/BottomBar.jsx';

function App() {
    
    const { width } = useDimensions();

    return (
        <div style={{ fontFamily: 'cdg, serif' }} className='flex flex-col  justify-center items-center'>
            <div className='lg:max-w-[1200px] w-screen mx-[40px]'>
                <Loading />
                {/* <SmallDisplayTitle/> */}
                {/* {
                    width > 600 ?
                        <div className='mx-[20%] pt-[12px]'>
                            <Header />
                        </div>
                        :
                        <>
                            <SmallDisplayTitle_v2 />
                            <Header_v2 />
                        </>
                } */}
                <div className=''>
                    <AppRoutes />
                </div>
                {/* <Footer /> */}
                <BottomBar />
            </div>
        </div>
    )
}

export default App
