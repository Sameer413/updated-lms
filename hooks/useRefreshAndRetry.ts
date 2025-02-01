import { useLazyGetRefreshTokenQuery } from '@/redux/features/auth/authApi';
import { useEffect } from 'react';

type RefetchFunction = () => Promise<void>;

const useTokenRefreshAndRetry = (fn: RefetchFunction, error: boolean) => {
    const [refreshToken, { }] = useLazyGetRefreshTokenQuery();

    useEffect(() => {
        const handleTokenRefreshAndRetry = async () => {
            console.log("Token expired. Refreshing...");

            await refreshToken();  // Refresh the token
            await fn();  // Retry the passed function
        };

        if (error) {
            handleTokenRefreshAndRetry();  // Call the function when an error occurs
        }
    }, [fn, error, refreshToken]);  // Dependency on the function, error, and refreshToken
};

export default useTokenRefreshAndRetry;