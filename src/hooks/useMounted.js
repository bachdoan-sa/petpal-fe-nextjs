// Cái này dùng để fix React Hydration Error trong trang admin (ex: <div> in <li>) 
// Có thể không dùng cái này nếu đổi thẻ <div> thành <span> nhưng mà hiển thị sẽ không đẹp với phần noti

import { useState, useEffect } from 'react';

const useMounted = () => {
    const [hasMounted, setHasMounted] = useState(false);
	useEffect(() => { setHasMounted(true); }, []);
	return hasMounted;
};

export default useMounted;
