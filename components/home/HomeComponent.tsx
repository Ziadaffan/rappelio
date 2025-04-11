import React, { useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Button,
} from "react-native";
import axios, { AxiosError, AxiosInstance } from "axios";

// Define types for our data
interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

const HomeComponent = () => {
  const [data, setData] = useState<Task[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Create a reusable API client
  const createApiClient = (): AxiosInstance => {
    return axios.create({
      baseURL: "https://rappelio-api.vercel.app/api/",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1MDdmMWY3N2JjZjg2Y2Q3OTk0MzkwMTQiLCJpYXQiOjE3NDQ0MDI3OTR9.eODzxpGx8Bs12MYmd2nhF-msVCS2UYtpuemfWa_mpfA",
        "x-api-key": "rp_8fK9mP2vL5nX7qW4hJ3tY6cB1sD0aE9uR",
      },
    });
  };

  // Fetch tasks from the API
  const fetchTasks = async () => {
    setLoading(true);
    setError(null);

    try {
      const api = createApiClient();
      const response = await api.get<ApiResponse<Task[]>>("task");
      
      if (response.data.success) {
        setData(response.data.data);
      } else {
        setError(response.data.message || "Failed to fetch tasks");
      }
    } catch (err) {
      const axiosError = err as AxiosError;
      setError(
        "Error fetching tasks: " + (axiosError.message || "Unknown error")
      );
      console.error("Axios error:", axiosError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Task Manager</Text>
      
      <View style={styles.buttonContainer}>
        <Button title="Fetch Tasks" onPress={fetchTasks} />
      </View>
      
      {loading && (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
      )}
      
      {error && <Text style={styles.error}>{error}</Text>}
      
      {data && (
        <View style={styles.dataContainer}>
          <Text style={styles.dataTitle}>Tasks:</Text>
          {data.map((task) => (
            <View key={task.id} style={styles.taskItem}>
              <Text style={styles.taskTitle}>{task.title}</Text>
              {task.description && (
                <Text style={styles.taskDescription}>{task.description}</Text>
              )}
              <Text style={styles.taskStatus}>
                Status: {task.completed ? "Completed" : "Pending"}
              </Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  buttonContainer: {
    marginBottom: 20,
  },
  buttonSpacer: {
    height: 10,
  },
  loader: {
    marginVertical: 20,
  },
  error: {
    color: "red",
    marginVertical: 10,
  },
  dataContainer: {
    padding: 15,
    backgroundColor: "white",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  dataTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  taskItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  taskDescription: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  taskStatus: {
    fontSize: 14,
    color: "#007AFF",
    marginTop: 5,
  },
});

export default HomeComponent;
