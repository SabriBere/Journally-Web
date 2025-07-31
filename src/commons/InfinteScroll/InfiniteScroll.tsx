import { useEffect, useRef } from "react";

interface InfiniteProps {
    fetchNextPage: () => void;
    children: React.ReactNode;
}

const InfiniteScroll = ({ children, fetchNextPage }: InfiniteProps) => {
    const targetRef = useRef(null);

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: "0px",
            threshold: 0.1,
        };

        const handlerIntersection = (entries: any) => {
            const [entry] = entries;
            if (entry.isIntersecting) {
                fetchNextPage();
            }
        };

        const observer = new IntersectionObserver(handlerIntersection, options);

        if (targetRef.current) {
            observer.observe(targetRef.current);
        }

        return () => {
            observer.disconnect();
        };
    }, [targetRef]);

    return (
        <>
            {children}
            <div ref={targetRef} />
        </>
    );
};

export default InfiniteScroll;
