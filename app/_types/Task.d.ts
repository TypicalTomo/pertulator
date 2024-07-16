export interface Task {
    name: string;
    description?: string;
    pessimisticEstimate: number;
    optimisticEstimate: number;
    mostLikelyEstimate: number;
}