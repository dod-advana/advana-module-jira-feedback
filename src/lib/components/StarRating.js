import React from 'react';

const starStyles = {
	fontSize: 26,
	paddingRight: 8,
	marginTop: 6,
	cursor: 'pointer'
}

const styles = {
	inactive: {
		color: 'grey',
		...starStyles
	},
	active: {
		color: 'gold',
		...starStyles
	}
}

export default function StarRating({ rating, hoveredRating, max=5, setRating, setHoveredRating }){
	let stars = [];
	let compareRating;
	if (hoveredRating) compareRating = hoveredRating;
	else if (rating) compareRating = rating;

	for (let i=0; i< max; i++){
		stars.push(<i 
			key={'star'+i} 
			onClick={() => setRating(i+1)} 
			onMouseEnter={() => setHoveredRating(i+1)} 
			onMouseLeave={() => setHoveredRating(null)} 
			className="fa fa-star" style={i+1 <= compareRating? styles.active: styles.inactive} 
		/> )
	}
	return <div>
		{stars}
	</div>
}