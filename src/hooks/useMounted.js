// Cái này dùng để fix React Hydration Error trong trang admin (ex: <div> in <li>)

import { useState, useEffect } from 'react';

const useMounted = () => {
    const [hasMounted, setHasMounted] = useState(false);
	useEffect(() => { setHasMounted(true); }, []);
	return hasMounted;
};

export default useMounted;
