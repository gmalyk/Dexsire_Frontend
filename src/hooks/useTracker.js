import { useCallback, useContext, useEffect, useMemo } from "react";
import { CoreContext } from "context/CoreContext";
import { Create, Update } from "services/core";
import { getUserIp } from "services/api";
import { generateUUID, getOS, normalizeStrapiRegister } from "utils";
import useSocket from "./useSocket";

export default function useTracker(skip){

    const { user, tracker, setTracker } = useContext(CoreContext)

    const uuid = useMemo(() => {
        return generateUUID()
    }, [])

    useSocket({ uuid })

    const track = useCallback(async (type, payload) => {
        const result = await Create("actions", { data: { type, ...payload, user: user?.id } })
        const normalResult = normalizeStrapiRegister(result)
        if(tracker?.id && normalResult?.id){
            const actions = [ ...(tracker?.actions||[]), normalResult?.id ]
            const users_session = [ ...(tracker?.users_session||[]), user?.id ]?.reduce((p, c) => p?.includes(c) ? p : [...p, c] ,[])
            const res = await Update("visitors", { data:{ actions, users_session } }, tracker?.id)
            const normalRes = normalizeStrapiRegister(res)
            setTracker({ ...normalRes, actions, users_session })
        }
    }, [tracker])

    const init = async () => {
        if(!tracker?.id && !skip){
            const ip = await getUserIp()
            const result = await Create("visitors", {
                data: {
                    ip,
                    session_start: (new Date()).toISOString(),
                    users_session: [user?.id]?.filter(f => f),
                    os: getOS(),
                    actions: []
                }
            })
            const normalResult = normalizeStrapiRegister(result)
            setTracker(normalResult)
        }
    }

    useEffect(() => { init() ;}, [])

    return {
        track
    }
}