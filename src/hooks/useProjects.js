import { useEffect, useState } from 'react';
import api from '../lib/api';

const useProjects = () => {
  const [state, setState] = useState({ status: 'loading', projects: [] });

  useEffect(() => {
    let ignore = false;

    api('/projects')
      .then((projects) => {
        if (!ignore) setState({ status: 'ready', projects });
      })
      .catch(() => {
        if (!ignore) setState({ status: 'error', projects: [] });
      });

    return () => {
      ignore = true;
    };
  }, []);

  return state;
};

export default useProjects;
