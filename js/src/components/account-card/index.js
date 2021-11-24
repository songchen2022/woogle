/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import classnames from 'classnames';
import { Flex, FlexItem, FlexBlock } from '@wordpress/components';
import GridiconPhone from 'gridicons/dist/phone';
import { Icon, store as storeIcon } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import Section from '.~/wcdl/section';
import Subsection from '.~/wcdl/subsection';
import googleLogoURL from './gogole-g-logo.svg';
import './index.scss';

/**
 * Enum of account card appearances.
 *
 * @enum {string}
 */
export const APPEARANCE = {
	GOOGLE: 'google',
	GOOGLE_MERCHANT_CENTER: 'google_merchant_center',
	GOOGLE_ADS: 'google-ads',
	PHONE: 'phone',
	ADDRESS: 'address',
};

const googleLogo = (
	<img
		src={ googleLogoURL }
		alt={ __( 'Google Logo', 'google-listings-and-ads' ) }
		width="40"
		height="40"
	/>
);

const appearanceDict = {
	[ APPEARANCE.GOOGLE ]: {
		icon: googleLogo,
		title: __( 'Google account', 'google-listings-and-ads' ),
	},
	[ APPEARANCE.GOOGLE_MERCHANT_CENTER ]: {
		icon: googleLogo,
		title: __( 'Google Merchant Center', 'google-listings-and-ads' ),
	},
	[ APPEARANCE.GOOGLE_ADS ]: {
		icon: googleLogo,
		title: __( 'Google Ads', 'google-listings-and-ads' ),
		defaultDescription: __(
			'Required to create paid campaigns with your product listings',
			'google-listings-and-ads'
		),
	},
	[ APPEARANCE.PHONE ]: {
		icon: <GridiconPhone size={ 32 } />,
		title: __( 'Phone number', 'google-listings-and-ads' ),
	},
	[ APPEARANCE.ADDRESS ]: {
		icon: <Icon icon={ storeIcon } size={ 32 } />,
		title: __( 'Store address', 'google-listings-and-ads' ),
	},
};

// The `center` is the default alignment, and no need to append any additional class name.
const alignStyleName = {
	center: false,
	top: `gla-account-card__styled--align-top`,
};

/**
 * Renders a Card component with account info and status.
 *
 * @param {Object} props React props.
 * @param {string} [props.className] Additional CSS class name to be appended.
 * @param {APPEARANCE | {icon, title, defaultDescription}} props.appearance Kind of account to indicate the card appearance, or a tuple with icon, title and optional defaultDescription to be used.
 * @param {boolean} [props.disabled=false] Whether display the Card in disabled style.
 * @param {JSX.Element} [props.description] Content below the card title. It will fall back to `appearance.defaultDescription` if not specified and the default is applicable.
 * @param {JSX.Element} [props.helper] Helper content below the card description.
 * @param {boolean} [props.hideIcon=false] Whether hide the leading icon.
 * @param {'center'|'top'} [props.alignIcon='center'] Specify the vertical alignment of leading icon.
 * @param {JSX.Element} [props.indicator] Indicator of actions or status on the right side of the card.
 * @param {'center'|'top'} [props.alignIndicator='center'] Specify the vertical alignment of `indicator`.
 * @param {Array<JSX.Element>} [props.children] Children to be rendered if needs more content within the card.
 */
export default function AccountCard( {
	className,
	appearance,
	disabled = false,
	description,
	helper,
	hideIcon = false,
	alignIcon = 'center',
	indicator,
	alignIndicator = 'center',
	children,
} ) {
	const { icon, title, defaultDescription } =
		typeof appearance === 'object'
			? appearance
			: appearanceDict[ appearance ];

	const cardClassName = classnames(
		'gla-account-card',
		disabled ? 'gla-account-card--is-disabled' : false,
		className
	);

	const iconClassName = classnames(
		'gla-account-card__icon',
		alignStyleName[ alignIcon ]
	);

	const indicatorClassName = classnames(
		'gla-account-card__indicator',
		alignStyleName[ alignIndicator ]
	);

	return (
		<Section.Card className={ cardClassName }>
			<Section.Card.Body>
				<Flex gap={ 4 }>
					{ ! hideIcon && (
						<FlexItem className={ iconClassName }>
							{ icon }
						</FlexItem>
					) }
					<FlexBlock>
						{ title && (
							<Subsection.Title className="gla-account-card__title">
								{ title }
							</Subsection.Title>
						) }
						<div className="gla-account-card__description">
							{ description || defaultDescription }
						</div>
						{ helper && (
							<div className="gla-account-card__helper">
								{ helper }
							</div>
						) }
					</FlexBlock>
					{ indicator && (
						<FlexItem className={ indicatorClassName }>
							{ indicator }
						</FlexItem>
					) }
				</Flex>
			</Section.Card.Body>
			{ children }
		</Section.Card>
	);
}
