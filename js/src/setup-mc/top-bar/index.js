/**
 * External dependencies
 */
import { Link } from '@woocommerce/components';
import { getNewPath } from '@woocommerce/navigation';
import { __ } from '@wordpress/i18n';
import GridiconChevronLeft from 'gridicons/dist/chevron-left';
import GridiconHelpOutline from 'gridicons/dist/help-outline';

/**
 * Internal dependencies
 */
import AppIconButton from '../../components/app-icon-button';
import { recordSetupMCEvent } from '../../utils/recordEvent';
import './index.scss';

const TopBar = () => {
	const handleBackButtonClick = () => {
		recordSetupMCEvent( 'back' );
	};

	const handleHelpButtonClick = () => {
		recordSetupMCEvent( 'help' );
	};

	return (
		<div className="gla-setup-mc-top-bar">
			<Link
				className="back-button"
				href={ getNewPath( {}, '/google/start' ) }
				type="wc-admin"
				onClick={ handleBackButtonClick }
			>
				<GridiconChevronLeft />
			</Link>
			<span className="title">
				{ __(
					'Get started with Google Listings & Ads',
					'google-listings-and-ads'
				) }
			</span>
			<div className="actions">
				{ /* TODO: click and navigate to where? */ }
				<AppIconButton
					icon={ <GridiconHelpOutline /> }
					text={ __( 'Help', 'google-listings-and-ads' ) }
					onClick={ handleHelpButtonClick }
				/>
			</div>
		</div>
	);
};

export default TopBar;