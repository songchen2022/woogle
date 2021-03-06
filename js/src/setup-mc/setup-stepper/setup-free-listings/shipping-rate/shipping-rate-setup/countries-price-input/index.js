/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { createInterpolateElement } from '@wordpress/element';

/**
 * Internal dependencies
 */
import AppInputPriceControl from '.~/components/app-input-price-control';
import EditRateButton from './edit-rate-button';
import AppSpinner from '.~/components/app-spinner';
import useTargetAudienceFinalCountryCodes from '.~/hooks/useTargetAudienceFinalCountryCodes';
import CountryNames from '.~/components/free-listings/configure-product-listings/country-names';
import './index.scss';

const CountriesPriceInput = ( props ) => {
	const { value, onBlur } = props;
	const { countries, currency, price } = value;
	const { data: selectedCountryCodes } = useTargetAudienceFinalCountryCodes();

	if ( ! selectedCountryCodes ) {
		return <AppSpinner />;
	}

	return (
		<div className="gla-countries-price-input">
			<AppInputPriceControl
				label={
					<div className="label">
						<div>
							{ createInterpolateElement(
								__(
									`Shipping rate for <countries />`,
									'google-listings-and-ads'
								),
								{
									countries: (
										<CountryNames
											countries={ countries }
											total={
												selectedCountryCodes.length
											}
										/>
									),
								}
							) }
						</div>
						<EditRateButton rate={ value } />
					</div>
				}
				suffix={ currency }
				value={ price }
				onBlur={ onBlur }
			/>
		</div>
	);
};

export default CountriesPriceInput;
