import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types'

export function AppSidemenuItem({ linkData }) {
	return <NavLink to={linkData.to} className='NavLinkItem1'>{linkData.name}</NavLink>;
}

export default function AppSidemenuItems({ navData }) {
	return (
		<div className='NavLinkMenu'>
			{navData.map((d, index) => {
				if (d.type === 'link') return <AppSidemenuItem key={index} linkData={d} />;
				return <></>;
			})}
		</div>
	);
}

AppSidemenuItems.propTypes = {
	items: PropTypes.arrayOf(PropTypes.any).isRequired,
}