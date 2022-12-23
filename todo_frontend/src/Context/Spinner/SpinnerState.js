import { useCookies } from "react-cookie";
import SpinnerContext from "./SpinnerContext";

export const SpinnerState = (props) => {
    const [isLoad, setLoad] = useCookies()

    return (
        <SpinnerContext.Provider value={{ isLoad, setLoad }}>
            {props.children}
        </SpinnerContext.Provider>
    )
}
