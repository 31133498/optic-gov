import { useState, useEffect, useMemo } from 'react';
import type { Project, ProjectFilters } from '@/types/project';
import { projectService } from '@/services/projectService';

// Fallback mock projects for when backend is unavailable
const mockProjects: Project[] = [
  {
    id: 'DEMO-001',
    title: 'Lagos-Ibadan Expressway Repair',
    location: 'Lagos State',
    status: 'completed',
    budget: 0.02, // ETH equivalent
    total_budget_ngn: 50000000, // 50M Naira
    total_budget_eth: 0.02,
    budget_currency: 'NGN',
    aiConfidence: 98.5,
    coordinates: { lat: 6.5244, lng: 3.3792 }
  },
  {
    id: 'DEMO-002', 
    title: 'Abuja Metro Line Extension',
    location: 'FCT Abuja',
    status: 'in-progress',
    budget: 0.48, // ETH equivalent
    total_budget_ngn: 1200000000, // 1.2B Naira
    total_budget_eth: 0.48,
    budget_currency: 'NGN',
    progress: 45,
    coordinates: { lat: 9.0765, lng: 7.3986 }
  },
  {
    id: 'DEMO-003',
    title: 'Port Harcourt Bridge Construction',
    location: 'Rivers State',
    status: 'pending',
    budget: 1.4, // ETH equivalent
    total_budget_ngn: 3500000000, // 3.5B Naira
    total_budget_eth: 1.4,
    budget_currency: 'NGN',
    votes: 82,
    coordinates: { lat: 4.8156, lng: 7.0498 }
  }
];

export const useProjects = () => {
  const [filters, setFilters] = useState<ProjectFilters>({ status: 'all' });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);

  // Fetch projects from backend
  const fetchProjects = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await projectService.getAllProjects();
      const transformedProjects = response.projects.map(p => projectService.transformProject(p));
      setProjects(transformedProjects.length > 0 ? transformedProjects : mockProjects);
      setExchangeRate(response.exchange_rate);
    } catch (err) {
      console.error('Failed to fetch projects:', err);
      setError('Failed to load projects from server. Using demo data.');
      setProjects(mockProjects); // Fallback to mock data
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      if (filters.status && filters.status !== 'all' && project.status !== filters.status) {
        return false;
      }
      if (filters.search) {
        const search = filters.search.toLowerCase();
        return project.title.toLowerCase().includes(search) ||
               project.id.toString().toLowerCase().includes(search) ||
               (project.location && project.location.toLowerCase().includes(search));
      }
      return true;
    });
  }, [projects, filters]);

  const updateFilters = (newFilters: Partial<ProjectFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  return {
    projects: filteredProjects,
    allProjects: projects,
    filters,
    selectedProject,
    loading,
    error,
    exchangeRate,
    updateFilters,
    setSelectedProject,
    refetch: fetchProjects
  };
};