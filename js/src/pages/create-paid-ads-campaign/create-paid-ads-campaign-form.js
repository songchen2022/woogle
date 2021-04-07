/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { createInterpolateElement, useState } from '@wordpress/element';
import { Form } from '@woocommerce/components';
import { getNewPath, getHistory } from '@woocommerce/navigation';
import apiFetch from '@wordpress/api-fetch';
import { format as formatDate } from '@wordpress/date';

/**
 * Internal dependencies
 */
import StepContent from '.~/components/stepper/step-content';
import StepContentHeader from '.~/components/stepper/step-content-header';
import StepContentFooter from '.~/components/stepper/step-content-footer';
import AppDocumentationLink from '.~/components/app-documentation-link';
import AppButton from '.~/components/app-button';
import useDispatchCoreNotices from '.~/hooks/useDispatchCoreNotices';
import { useAppDispatch } from '.~/data';
import CreateCampaignFormContent from '.~/components/paid-ads/create-campaign-form-content';

const CreatePaidAdsCampaignForm = () => {
	const [ loading, setLoading ] = useState( false );
	const { fetchAdsCampaigns } = useAppDispatch();
	const { createNotice } = useDispatchCoreNotices();

	const handleValidate = () => {
		const errors = {};

		// TODO: validation logic.

		return errors;
	};

	const handleSubmit = async ( values ) => {
		const { amount, country } = values;

		setLoading( true );

		try {
			const date = formatDate( 'Y-m-d', new Date() );

			await apiFetch( {
				path: `/wc/gla/ads/campaigns`,
				method: 'POST',
				data: {
					name: `Ads Campaign ${ date }`,
					amount: Number( amount ),
					country: country && country[ 0 ],
				},
			} );
		} catch ( e ) {
			createNotice(
				'error',
				__(
					'Unable to launch your ads campaign. Please try again later.',
					'google-listings-and-ads'
				)
			);
			setLoading( false );
			return;
		}

		await fetchAdsCampaigns();
		getHistory().push( getNewPath( {}, '/google/dashboard', {} ) );

		setLoading( false );
	};

	return (
		<Form
			initialValues={ {
				amount: 0,
				country: [],
			} }
			validate={ handleValidate }
			onSubmitCallback={ handleSubmit }
		>
			{ ( formProps ) => {
				const { handleSubmit: handleLaunchCampaignClick } = formProps;

				return (
					<StepContent>
						<StepContentHeader
							title={ __(
								'Create your paid campaign',
								'google-listings-and-ads'
							) }
							description={ createInterpolateElement(
								__(
									'Paid Smart Shopping campaigns are automatically optimized for you by Google. <link>See what your ads will look like.</link>',
									'google-listings-and-ads'
								),
								{
									link: (
										<AppDocumentationLink
											context="edit-ads"
											linkId="see-what-ads-look-like"
											href="https://support.google.com/google-ads/answer/6275294"
										/>
									),
								}
							) }
						/>
						<CreateCampaignFormContent formProps={ formProps } />
						<StepContentFooter>
							<AppButton
								isPrimary
								loading={ loading }
								onClick={ handleLaunchCampaignClick }
							>
								{ __(
									'Launch paid campaign',
									'google-listings-and-ads'
								) }
							</AppButton>
						</StepContentFooter>
					</StepContent>
				);
			} }
		</Form>
	);
};

export default CreatePaidAdsCampaignForm;
