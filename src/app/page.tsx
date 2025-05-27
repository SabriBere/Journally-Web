// import styles from "./page.module.css";

export default function Home() {
    return <div>{`.v ${process.env.NEXT_PUBLIC_APP_VERSION}`}</div>;
}
