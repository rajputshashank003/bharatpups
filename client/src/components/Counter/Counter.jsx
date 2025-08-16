import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { theme_color } from "../../constants/constants";
import { useCart } from "../Hooks/useCart";
import { motion } from "framer-motion";

const Counter = ( props ) => {

    const [ one , setOne ] = useState(props?.min === undefined || props?.min < 9 ? undefined : Math.floor(props.min / 10) );
    const [ two , setTwo ] = useState(props?.min);
    const curr = props.curr;
    const setCurr = props.setCurr;
    const { increaseQuantity, decreaseQuantity } = useCart();
    const one_ref = useRef();
    const two_ref = useRef();

    const stop_animation = () => {
        const gtl = gsap.timeline();
        const curr_arr = ['.counter_par'];
        gtl.to(
            curr_arr,
            {
                x: -10,
                filter: 'blur(5px)',
                duration: 0.03,
                opacity: 1
            }
        ).to(
            curr_arr,
            {
                x: 10,
                filter: 'blur(0px)',
                duration: 0.03,
                opacity: 1
            }
        )
        .to(
            curr_arr,
            {
                x: -10,
                filter: 'blur(5px)',
                duration: 0.03,
                opacity: 1
            }
        ).to(
            curr_arr,
            {
                x: 10,
                duration: 0.03,
                opacity: 1
            }
        )
        .to(
            curr_arr,
            {
                x: 0,
                filter: 'blur(0px)',
                duration: 0.05,
                opacity: 1
            }
        )
    }

    const handleIncrease = () => {
        if ( curr == props?.max ) {
            stop_animation();
            return ;
        }
        increaseQuantity(props?.foodId);
        setCurr( prev => prev + 1 );
        const gtl = gsap.timeline();
        const curr_arr = [two_ref?.current , ...( one !== Math.floor( ( curr + 1) / 10 ) ? [one_ref?.current] : [] ) ];
        gtl.to(
            curr_arr,
            {
                scale: 0.8,
                y: -20,
                filter: 'blur(5px)',
                duration: 0.2,
                opacity: 0
            }
        ).to(
            curr_arr,
            {
                y: 20,
                duration: 0,
                opacity: 1,
            }
        ).to(
            curr_arr,
            {
                y: 0,
                scale: 1,
                filter: 'blur(0px)',
                duration: 0.3,
            }
        )
    }

    const handleDecrease = () => {
        if( curr == props?.min) {
            stop_animation();
            return ;
        }
        decreaseQuantity(props?.foodId);
        setCurr( prev => prev - 1 );
        const gtl = gsap.timeline();
        const curr_arr = [two_ref?.current , ...( one !== Math.floor( ( curr - 1) / 10 ) ? [one_ref?.current] : [] ) ];
        gtl.to(
            curr_arr,
            {
                scale: 0.8,
                y: 20,
                filter: 'blur(5px)',
                duration: 0.2,
                opacity: 0
            }
        ).to(
            curr_arr,
            {
                y: -20,
                duration: 0,
                opacity: 1,
            }
        ).to(
            curr_arr,
            {
                y: 0,
                scale: 1,
                filter: 'blur(0px)',
                duration: 0.3,
            }
        )
    }

    useEffect(() => {
        if ( curr <= 9 ) {
            setOne(undefined);
            setTwo(curr);
        } else {
            setOne( Math.floor(curr / 10) );
            setTwo( Math.floor(curr % 10) );
        }
    }, [curr] );

    return (
        <div className="flex counter_par flex-row justify-between text-[30px] font-bold">
            <Button onClick={() => handleDecrease() } >
                <svg  xmlns="http://www.w3.org/2000/svg"  width="20"  height="20"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="4"  stroke-linecap="round"  stroke-linejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-minus"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l14 0" /></svg>
            </Button>
            <div className="number flex flex-row w-[10px] justify-center text-zinc-800">
                <div ref={one_ref} className="one">
                    {one}
                </div>
                <div 
                    ref={two_ref}
                    className="two"
                >
                    {two}
                </div>
            </div>
            <Button onClick={() => handleIncrease() }>
                <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="4"  stroke-linecap="round"  stroke-linejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 5l0 14" /><path d="M5 12l14 0" /></svg>
            </Button>
        </div>
    )
}

const Button = ({ onClick, children }) => {
    return (
        <motion.button
            whileTap={{
                scale: 0.75
            }}
            transition={{
                duration: 0.2,
                ease: 'linear'
            }}
            onClick={onClick}
            style={{ backgroundColor: theme_color }}
            className="h-[40px] w-[40px] cursor-pointer shadow-sm shadow-neutral-400 flex justify-center items-center text-[15px] text-white font-bold rounded-full"
        >
            {children}
        </motion.button>
    );
};

export default Counter