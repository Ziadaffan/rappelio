import { Redirect } from "expo-router";
import { getToken } from "@/store/authentification";
import { Suspense, useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function Index() {
    const [isLoading, setIsLoading] = useState(true);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const checkToken = async () => {
            try {
                const tokenValue = await getToken();
                setToken(tokenValue);
            } catch (error) {
                console.error("Error checking token:", error);
            } finally {
                setIsLoading(false);
            }
        };
        
        checkToken();
    }, []);

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Loading...</Text>
            </View>
        );
    }

    if (token) {
        return <Redirect href="/(tabs)/about" />;
    }
    
    return <Redirect href="/(auth)/login" />;
}
