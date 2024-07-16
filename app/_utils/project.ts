'use client';
import { type Project } from '../_types/Project';
import { compress, decompress } from 'compress-json';

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
