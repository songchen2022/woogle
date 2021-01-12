/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { createInterpolateElement } from '@wordpress/element';

/**
 * Internal dependencies
 */
import Section from '../../../../wcdl/section';
import RadioHelperText from '../../../../wcdl/radio-helper-text';
import AppRadioContentControl from '../../../../components/app-radio-content-control';
import TrackedExternalLink from '../../../../components/tracked-external-link';
import VerticalGapLayout from '../components/vertical-gap-layout';
import ShippingTimeSetup from './shipping-time-setup';

const ShippingTime = ( props ) => {
	const { formProps } = props;
	const { getInputProps } = formProps;

	return (
		<Section
			title={ __( 'Shipping time', 'google-listings-and-ads' ) }
			description={
				<div>
					<p>
						{ __(
							'Your estimated shipping time will be shown to potential customers on Google. ',
							'google-listings-and-ads'
						) }
					</p>
					<p>
						{ /* TODO: Link to read more on shipping rate. */ }
						<TrackedExternalLink
							id="setup-mc:shipping-time"
							href="https://docs.woocommerce.com/"
						>
							{ __( 'Read more', 'google-listings-and-ads' ) }
						</TrackedExternalLink>
					</p>
				</div>
			}
		>
			<Section.Card>
				<Section.Card.Body>
					<VerticalGapLayout size="large">
						<AppRadioContentControl
							{ ...getInputProps( 'shippingTimeOption' ) }
							label={ __(
								'I can estimate a flat shipping time for all my products.',
								'google-listings-and-ads'
							) }
							value="simple"
						>
							<ShippingTimeSetup formProps={ formProps } />
						</AppRadioContentControl>
						<AppRadioContentControl
							{ ...getInputProps( 'shippingTimeOption' ) }
							label={ __(
								'I cannot estimate a flat shipping time for all my products.',
								'google-listings-and-ads'
							) }
							value="complex"
						>
							<RadioHelperText>
								{ createInterpolateElement(
									__(
										' I’ll set this up manually in <link>Google Merchant Center</link>. I understand that if I don’t set this up, my products will be disapproved.',
										'google-listings-and-ads'
									),
									{
										link: (
											<TrackedExternalLink
												id="setup-mc:shipping-time-manual"
												href="https://www.google.com/retail/solutions/merchant-center/"
											/>
										),
									}
								) }
							</RadioHelperText>
						</AppRadioContentControl>
					</VerticalGapLayout>
				</Section.Card.Body>
			</Section.Card>
		</Section>
	);
};

export default ShippingTime;
