'use client';
import { type Project } from '../_types/Project';
import { type Task } from '../_types/Task';
import { compress, decompress } from 'compress-json';
import { getStandardDeviation, getVariance, getExpectedTime } from './calculator';

export const projectToJSON = (project: Project) => {
  return {
    name: project.name,
    description: project.description,
    manager: project.manager,
    tasks: project.tasks,
  };
};

export const JSONToProject = (data: any): Project => {
  return {
    name: data.name,
    description: data.description,
    manager: data.manager,
    tasks: data.tasks,
  };
};

export const saveProject = (project: Project): boolean => {
  try {
    const projectData = projectToJSON(project);
    const compressedData = compress(projectData);

    if (typeof window !== 'undefined') {
      window.localStorage.setItem('project', JSON.stringify(compressedData));
    } else {
      console.error('Window object is not available');
      return false;
    }

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const loadProject = (): Project | undefined => {
  if (typeof window === 'undefined') {
    console.error('Window object is not available');
    return undefined;
  }

  const compressedData = window.localStorage.getItem('project');

  if (compressedData) {
    const projectData = decompress(JSON.parse(compressedData));

    return JSONToProject(projectData);
  }

  return undefined;
};

export const clearProject = (): boolean => {
  if (typeof window === 'undefined') {
    console.error('Window object is not available');
    return false;
  }

  window.localStorage.removeItem('project');
  return true;
};

export const exportProjectToJSON = (project: Project): void => {
  const data = JSON.stringify(project);
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${project.name}.pertulator.json`;
  a.click();
};

export const importProjectFromJSON = (file: File): Promise<Project> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      if (event.target) {
        const data = event.target.result as string;
        const project = JSON.parse(data) as Project;
        resolve(project);
      }
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsText(file);
  });
};

export const exportProjectTasksToCSV = (project: Project): void => {
  const tasks = project.tasks;

  const csvData = [
    [
      'Name',
      'Description',
      'Pessimistic Estimate',
      'Optimistic Estimate',
      'Most Likely Estimate',
      'Expected Time',
      'Standard Deviation',
      'Variance',
    ],
    ...tasks.map((task) => [
      task.name,
      task.description,
      task.pessimisticEstimate,
      task.optimisticEstimate,
      task.mostLikelyEstimate,
      getExpectedTime(task.pessimisticEstimate, task.optimisticEstimate, task.mostLikelyEstimate),
      getStandardDeviation(task.pessimisticEstimate, task.optimisticEstimate),
      getVariance(task.pessimisticEstimate, task.optimisticEstimate),
    ]),
  ];

  const csvContent = csvData.map((row) => row.join(',')).join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href =
    typeof URL.createObjectURL === 'function'
      ? URL.createObjectURL(blob)
      : (window.webkitURL as any).createObjectURL(blob);
  a.download = `${project.name}.pertulator.csv`;
  a.click();
};
