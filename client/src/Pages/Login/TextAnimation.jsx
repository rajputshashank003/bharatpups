import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { motion } from "framer-motion"; // use 'framer-motion' not 'motion/react'
import { useRef } from "react";

const TextAnimation = ({ text }) => {
    const containerRef = useRef(null);

    useGSAP(() => {
        const gtl = gsap.timeline();

        text.split(" ").forEach((t, ind) => {
            gtl.to(`.text_${t}_${ind}`, {
                opacity: 1,
                duration: 0.4,
                x: 0,
                filter: "blur(0px)",
            }, '+=0.01');
        });
        gtl.to(containerRef.current, {
            scale: 1,
            duration: 0.3,
        })
        .to('.login_input_email', {
            scale: 1,
            opacity: 1,
            duration: 0.4,
            ease: 'linear'
        })
    }, [text]);

    return (
        <div
            ref={containerRef}
            className="text_animation_par flex flex-row items-center gap-2 justify-center"
            style={{ transform: "scale(1.3)" }}
        >
            {text.split(" ").map((t, ind) => (
                <motion.div
                    className={`text_${t}_${ind}`}
                    key={ind}
                    initial={{
                        opacity: 0,
                        x: -30,
                        filter: "blur(2px)",
                    }}
                >
                    {t}
                </motion.div>
            ))}
        </div>
    );
};

export default TextAnimation;
