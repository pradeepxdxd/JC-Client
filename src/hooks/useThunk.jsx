import { useCallback, useState } from "react"
import { useDispatch } from "react-redux";

export const useThunk = thunk => {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    const dispatch = useDispatch();

    const runThunk = useCallback((args) => {
        dispatch(thunk(args))
            .unwrap()
            .catch(err => {
                setIsError(true);
                setError(err);
            })
            .finally((data) => {
                setIsLoading(false);
                setIsSuccess(true);
                setData(data)
            })
    }, [dispatch, thunk]);

    return [runThunk, data, isLoading, isSuccess, isError, error];
}