import { useEffect, useState } from 'react';

const FullLoading = () => {
	const [style, setStyle] = useState('loading');

	useEffect(() => {
		setTimeout(() => {
			setStyle('loading animate');
		}, 100);
	}, []);

	return (
		<div className="loading-container">
				<div className={style}></div>
		</div>
	)
}

export default FullLoading;