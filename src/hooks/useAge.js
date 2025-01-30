import { useContext, useEffect } from "react";
import { CoreContext } from "context/CoreContext";

export default function useAge(){

    const { aged, setAged, setModal } = useContext(CoreContext)

    const askPermission = () => {
        if (!aged) { setModal({ type: 'ageverification' }); }
    }

    return {
        askPermission
    }
}